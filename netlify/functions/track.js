/* ============================================================
   PupSmile — Order Tracking Proxy
   Calls the 17track API server-side so the customer never
   sees a third-party URL, carrier names, or origin country.
   Requires env var: TRACK17_API_KEY
   ============================================================ */

const CHINESE_KEYWORDS = [
  'china', 'shenzhen', 'guangzhou', 'shanghai', 'beijing', 'hangzhou',
  'yiwu', 'dongguan', 'foshan', 'suzhou', 'ningbo', 'wuhan', 'chengdu',
  'tianjin', 'chongqing', 'guangdong', 'jiangsu', 'zhejiang', 'fujian',
  'sichuan', 'hong kong', 'hongkong', 'macau',
];

const CARRIER_PATTERNS = [
  /\b(yanwen|4px|yunexpress|yun\s*express)\b/gi,
  /\bchina\s*post\b/gi,
  /\bems\s+(china|eub)\b/gi,
  /\b(sf|sto|zto|yto|jt)\s*express\b/gi,
  /\bcainiao\b/gi,
  /\b(rc|rr)\s*china\b/gi,
  /\bsingpost\b/gi,
];

function isOriginLocation(location) {
  if (!location) return false;
  const loc = location.toLowerCase();
  return CHINESE_KEYWORDS.some((kw) => loc.includes(kw));
}

function sanitize(text) {
  if (!text) return '';
  let t = text;
  CARRIER_PATTERNS.forEach((re) => {
    t = t.replace(re, 'carrier');
  });
  // Replace specific Chinese city names left after pattern cleanup
  const cityRe = /\b(shenzhen|guangzhou|shanghai|beijing|hangzhou|yiwu|dongguan|guangdong|chengdu|tianjin|wuhan|ningbo|suzhou|foshan)\b/gi;
  t = t.replace(cityRe, 'fulfillment center');
  t = t.replace(/\bchina\b/gi, 'fulfillment center');
  t = t.replace(/\bhong\s*kong\b/gi, 'fulfillment center');
  return t;
}

// Human-readable status info
const STATUS_MAP = {
  0:  { key: 'pending',     label: 'Processing',         color: 'gray'   },
  10: { key: 'transit',     label: 'In Transit',          color: 'blue'   },
  20: { key: 'expired',     label: 'Shipment Expired',    color: 'red'    },
  30: { key: 'pickup',      label: 'Ready for Pickup',    color: 'yellow' },
  35: { key: 'undelivered', label: 'Delivery Attempted',  color: 'yellow' },
  40: { key: 'failed',      label: 'Delivery Failed',     color: 'red'    },
  50: { key: 'delivered',   label: 'Delivered',           color: 'green'  },
};

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers };
  }

  const trackNum = ((event.queryStringParameters || {}).number || '').trim();
  if (!trackNum || trackNum.length < 4) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Please enter a valid tracking number.' }),
    };
  }

  const apiKey = process.env.TRACK17_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Tracking service is not yet configured. Please contact support.' }),
    };
  }

  try {
    // Try to fetch first — costs no quota if already registered.
    // Only register (costs 1 quota) if the number isn't known yet.
    let res = await fetch('https://api.17track.net/track/v2.2/gettrackinfo', {
      method: 'POST',
      headers: { '17token': apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify([{ number: trackNum }]),
    });

    let json = await res.json();
    let accepted = json?.data?.accepted;

    // Number not registered yet — register it (1 quota) then fetch
    if (!accepted || accepted.length === 0) {
      await fetch('https://api.17track.net/track/v2.2/register', {
        method: 'POST',
        headers: { '17token': apiKey, 'Content-Type': 'application/json' },
        body: JSON.stringify([{ number: trackNum }]),
      });
      res = await fetch('https://api.17track.net/track/v2.2/gettrackinfo', {
        method: 'POST',
        headers: { '17token': apiKey, 'Content-Type': 'application/json' },
        body: JSON.stringify([{ number: trackNum }]),
      });
      json = await res.json();
      accepted = json?.data?.accepted;
    }

    if (!accepted || accepted.length === 0) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          status: 'not_found',
          statusLabel: 'Not Found',
          message:
            'No shipment found for that tracking number. Please double-check it from your shipping confirmation email, or allow 48–72 hours for tracking to activate.',
        }),
      };
    }

    const track = accepted[0]?.track;
    if (!track) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          status: 'pending',
          statusLabel: 'Processing',
          message: 'Your order is being prepared. Tracking will activate within 48–72 hours of shipment.',
        }),
      };
    }

    const statusInfo = STATUS_MAP[track.e] ?? STATUS_MAP[10];
    const estimatedDelivery = track.w2?.b || null; // "YYYY-MM-DD"

    // Filter events — hide anything from origin country, strip carrier names
    const rawEvents = Array.isArray(track.z1) ? track.z1 : [];
    let hadOriginEvents = false;

    const cleanEvents = rawEvents
      .filter((ev) => {
        if (isOriginLocation(ev.z)) { hadOriginEvents = true; return false; }
        return true;
      })
      .map((ev) => ({
        description: sanitize(ev.a || ''),
        location: sanitize(ev.z || ''),
        date: ev.d || '',
      }));

    // Destination city: take the most-recent event that has a usable location
    let destinationCity = null;
    for (const ev of cleanEvents) {
      if (ev.location && ev.location.trim().length > 1) {
        destinationCity = ev.location.trim();
        break;
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        status: statusInfo.key,
        statusLabel: statusInfo.label,
        statusColor: statusInfo.color,
        estimatedDelivery,
        destinationCity,
        events: cleanEvents,
        hadOriginEvents,
        trackingNumber: trackNum,
      }),
    };
  } catch (err) {
    console.error('[track fn]', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Unable to fetch tracking information. Please try again in a moment.' }),
    };
  }
};
