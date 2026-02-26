/* ============================================================
   PupSmile — Order Tracking Proxy
   Calls 17track API server-side. Strips carrier names and
   Asian origin locations. Returns progress stage + transit days.
   Env var required: TRACK17_API_KEY
   ============================================================ */

const CARRIER_PATTERNS = [
  /\b(yanwen|4px|yunexpress|yun\s*express)\b/gi,
  /\bchina\s*post\b/gi,
  /\bems\s+(china|eub)\b/gi,
  /\b(sf|sto|zto|yto|jt)\s*express\b/gi,
  /\bcainiao\b/gi,
  /\b(rc|rr)\s*china\b/gi,
  /\b(huanan|huananyun)\b/gi,
  /\bsingpost\b/gi,
  /\bpostnl\b/gi,
];

const ASIAN_KEYWORDS = [
  'china', 'shenzhen', 'guangzhou', 'shanghai', 'beijing', 'hangzhou',
  'yiwu', 'dongguan', 'foshan', 'suzhou', 'ningbo', 'wuhan', 'chengdu',
  'tianjin', 'chongqing', 'guangdong', 'jiangsu', 'zhejiang', 'fujian',
  'sichuan', 'hong kong', 'hongkong', 'hk,', ', hk', 'macau',
];

function isAsianLocation(loc) {
  if (!loc) return true;
  const l = loc.toLowerCase();
  return ASIAN_KEYWORDS.some((kw) => l.includes(kw));
}

function sanitizeText(text) {
  if (!text) return '';
  let t = text;
  CARRIER_PATTERNS.forEach((re) => { t = t.replace(re, 'carrier'); });
  const cityRe = /\b(shenzhen|guangzhou|shanghai|beijing|hangzhou|yiwu|dongguan|guangdong|chengdu|tianjin|wuhan|ningbo|suzhou|foshan|zhejiang|fujian)\b/gi;
  t = t.replace(cityRe, 'our warehouse');
  t = t.replace(/\bhong\s*kong\b/gi, 'our warehouse');
  t = t.replace(/\bchina\b/gi, 'our warehouse');
  t = t.replace(/\bmacau\b/gi, 'our warehouse');
  return t;
}

function sanitizeLocation(loc) {
  if (!loc || isAsianLocation(loc)) return 'Fulfillment Center';
  return sanitizeText(loc);
}

// 0 = Preparing, 1 = Shipped, 2 = In Transit / Customs, 3 = Out for Delivery, 4 = Delivered
function getProgressStage(statusCode, rawEvents) {
  if (statusCode === 50) return 4;
  if (!rawEvents || rawEvents.length === 0) return 0;

  // Check for out for delivery / delivery attempt
  for (const ev of rawEvents) {
    const d = (ev.a || '').toLowerCase();
    if (d.includes('out for delivery') || d.includes('delivery attempt') ||
        statusCode === 30 || statusCode === 35) return 3;
  }

  // If any event is from destination country (non-Asian), package has arrived
  const hasDestEvent = rawEvents.some((ev) => !isAsianLocation(ev.z));
  if (hasDestEvent) return 2;

  // Still originating — check if departed
  for (const ev of rawEvents) {
    const d = (ev.a || '').toLowerCase();
    if (d.includes('depart') || d.includes('international') || d.includes('picked up') ||
        d.includes('shipment information')) return 1;
  }

  return rawEvents.length > 0 ? 1 : 0;
}

function getTransitDays(rawEvents) {
  if (!rawEvents || rawEvents.length < 2) return null;
  const oldest = rawEvents[rawEvents.length - 1];
  const newest = rawEvents[0];
  if (!oldest.d || !newest.d) return null;
  const start = new Date(oldest.d);
  const end = new Date(newest.d);
  if (isNaN(start) || isNaN(end)) return null;
  const days = Math.round((end - start) / 86400000);
  return days >= 1 ? days : null;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const STATUS_MAP = {
  0:  { key: 'pending',     label: 'Processing',        color: 'gray'   },
  10: { key: 'transit',     label: 'In Transit',         color: 'blue'   },
  20: { key: 'expired',     label: 'Shipment Expired',   color: 'red'    },
  30: { key: 'pickup',      label: 'Ready for Pickup',   color: 'yellow' },
  35: { key: 'undelivered', label: 'Delivery Attempted', color: 'yellow' },
  40: { key: 'failed',      label: 'Delivery Failed',    color: 'red'    },
  50: { key: 'delivered',   label: 'Delivered',          color: 'green'  },
};

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers };

  const trackNum = ((event.queryStringParameters || {}).number || '').trim();
  if (!trackNum || trackNum.length < 4) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Please enter a valid tracking number.' }) };
  }

  const apiKey = process.env.TRACK17_API_KEY;
  if (!apiKey) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Tracking service is not yet configured. Please contact support.' }) };
  }

  const fetchInfo = async () => {
    const res = await fetch('https://api.17track.net/track/v2.2/gettrackinfo', {
      method: 'POST',
      headers: { '17token': apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify([{ number: trackNum }]),
    });
    const json = await res.json();
    return json?.data?.accepted;
  };

  try {
    let accepted = await fetchInfo();

    // Not in system yet — register (1 quota), then wait for 17track to sync
    if (!accepted || accepted.length === 0) {
      await fetch('https://api.17track.net/track/v2.2/register', {
        method: 'POST',
        headers: { '17token': apiKey, 'Content-Type': 'application/json' },
        body: JSON.stringify([{ number: trackNum }]),
      });
      await sleep(3000);
      accepted = await fetchInfo();
    }

    if (!accepted || accepted.length === 0) {
      return { statusCode: 200, headers, body: JSON.stringify({
        status: 'not_found',
        statusLabel: 'Not Found',
        message: 'No shipment found for that tracking number. Please double-check it from your shipping confirmation email.',
      })};
    }

    let track = accepted[0]?.track;

    // Registered but 17track hasn't fetched data yet — wait and retry once
    if (!track) {
      await sleep(3000);
      accepted = await fetchInfo();
      track = accepted?.[0]?.track;
    }

    if (!track) {
      return { statusCode: 200, headers, body: JSON.stringify({
        status: 'syncing',
        statusLabel: 'Syncing',
        message: 'Your tracking number was found but data is still syncing. Please try again in about 30 seconds.',
      })};
    }

    const statusInfo = STATUS_MAP[track.e] ?? STATUS_MAP[10];
    const rawEvents = Array.isArray(track.z1) ? track.z1 : [];
    const estimatedDelivery = track.w2?.b || null;

    const progressStage = getProgressStage(track.e, rawEvents);
    const transitDays = getTransitDays(rawEvents);

    const cleanEvents = rawEvents.map((ev) => ({
      description: sanitizeText(ev.a || ''),
      location: sanitizeLocation(ev.z || ''),
      date: ev.d || '',
    }));

    // Destination city = most-recent event from a non-Asian location
    let destinationCity = null;
    for (const ev of cleanEvents) {
      if (ev.location && ev.location !== 'Fulfillment Center') {
        destinationCity = ev.location;
        break;
      }
    }

    return { statusCode: 200, headers, body: JSON.stringify({
      status: statusInfo.key,
      statusLabel: statusInfo.label,
      statusColor: statusInfo.color,
      progressStage,
      transitDays,
      estimatedDelivery,
      destinationCity,
      events: cleanEvents,
      trackingNumber: trackNum,
    })};

  } catch (err) {
    console.error('[track fn]', err);
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Unable to fetch tracking information. Please try again in a moment.' }) };
  }
};
