/* ============================================================
   HERO LOAD SEQUENCE — staggered fade-up on page load
   ============================================================ */
window.addEventListener('load', () => {
  document.querySelectorAll('.hero-anim').forEach(el => {
    const delay = parseFloat(getComputedStyle(el).getPropertyValue('--d')) || 0;
    setTimeout(() => el.classList.add('loaded'), delay * 1000);
  });
});

/* ============================================================
   NAV SHADOW ON SCROLL
   ============================================================ */
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.style.boxShadow = window.scrollY > 8
    ? '0 2px 24px rgba(0,0,0,.09)'
    : 'none';
}, { passive: true });

/* ============================================================
   SCROLL REVEALS (reveal-up, reveal-split)
   ============================================================ */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-on');
    revealObs.unobserve(entry.target);
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal-up, .reveal-split').forEach(el => {
  revealObs.observe(el);
});

/* ============================================================
   COUNT-UP NUMBERS — call to start animation on an element
   ============================================================ */
function startCountUp(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1600;
  const startTime = performance.now();
  const tick = (now) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/* ============================================================
   STAGGER GROUPS — children animate in with delay cascade
   Also fires count-up on any .count-up children, timed to
   each item's reveal so numbers tick as they appear.
   ============================================================ */
const staggerObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const items = entry.target.querySelectorAll('.stagger-item');
    items.forEach((item, i) => {
      setTimeout(() => {
        item.classList.add('is-on');
        item.querySelectorAll('.count-up').forEach(el => startCountUp(el));
      }, i * 110);
    });
    staggerObs.unobserve(entry.target);
  });
}, { threshold: 0.1 });

document.querySelectorAll('.stagger-group').forEach(el => {
  staggerObs.observe(el);
});

/* ============================================================
   FAQ — smooth height transition via CSS + details toggle
   ============================================================ */
document.querySelectorAll('.faq-item').forEach(item => {
  const body = item.querySelector('.faq-body');
  if (!body) return;

  item.addEventListener('toggle', () => {
    if (item.open) {
      body.style.maxHeight = body.scrollHeight + 'px';
      body.style.paddingBottom = '24px';
    } else {
      body.style.maxHeight = '0';
      body.style.paddingBottom = '0';
    }
  });

  // Set initial state for CSS transition
  body.style.maxHeight = '0';
  body.style.overflow = 'hidden';
  body.style.paddingBottom = '0';
  body.style.transition = 'max-height .3s ease, padding-bottom .3s ease';
});

/* ============================================================
   PRODUCT IMAGE GALLERY
   ============================================================ */
function switchGallery(thumb, src) {
  document.getElementById('galleryMain').src = src;
  document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('gallery-thumb--active'));
  thumb.classList.add('gallery-thumb--active');
}

/* ============================================================
   CART SIDEBAR
   ============================================================ */
const SHOPIFY_STORE = 'trypupsmile.myshopify.com';
const VARIANT_ID = '53319800521031';
const PRICE = 39.95;
let cartQty = 0;

function openCart() {
  document.getElementById('cartOverlay').classList.add('open');
  document.getElementById('cartSidebar').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cartOverlay').classList.remove('open');
  document.getElementById('cartSidebar').classList.remove('open');
  document.body.style.overflow = '';
}

function updateCart() {
  document.getElementById('qtyDisplay').textContent = cartQty;
  const total = (cartQty * PRICE).toFixed(2);
  document.getElementById('cartItemPrice').textContent = '$' + total;
  document.getElementById('cartTotal').textContent = '$' + total;
  document.getElementById('formQty').value = cartQty;
  // Show ebook gift only when there's at least one jar in cart
  document.getElementById('cartEbook').style.display = cartQty > 0 ? 'flex' : 'none';
}

document.getElementById('addToCartBtn').addEventListener('click', () => {
  cartQty += 1;
  updateCart();
  openCart();
});

document.getElementById('qtyPlus').addEventListener('click', () => {
  cartQty += 1;
  updateCart();
});

document.getElementById('qtyMinus').addEventListener('click', () => {
  if (cartQty > 1) {
    cartQty -= 1;
    updateCart();
  }
});

document.getElementById('cartClose').addEventListener('click', closeCart);
document.getElementById('cartOverlay').addEventListener('click', closeCart);

/* ============================================================
   REVIEW SUBMISSION WIDGET
   ============================================================ */
let rfRating = 0;
const rfStars = document.querySelectorAll('.rf-star');

rfStars.forEach(star => {
  star.addEventListener('mouseenter', () => {
    const val = parseInt(star.dataset.val);
    rfStars.forEach(s => s.classList.toggle('lit', parseInt(s.dataset.val) <= val));
  });
  star.addEventListener('mouseleave', () => {
    rfStars.forEach(s => s.classList.toggle('lit', parseInt(s.dataset.val) <= rfRating));
  });
  star.addEventListener('click', () => {
    rfRating = parseInt(star.dataset.val);
    rfStars.forEach(s => s.classList.toggle('lit', parseInt(s.dataset.val) <= rfRating));
  });
});

function submitReview(e) {
  e.preventDefault();
  if (rfRating === 0) { alert('Please select a star rating.'); return; }

  const name = document.getElementById('rfName').value.trim();
  const pet  = document.getElementById('rfPet').value.trim();
  const text = document.getElementById('rfText').value.trim();
  const review = { name, pet, text, rating: rfRating, id: Date.now() };

  const saved = JSON.parse(localStorage.getItem('pupsmileReviews') || '[]');
  saved.unshift(review);
  localStorage.setItem('pupsmileReviews', JSON.stringify(saved));

  appendUserReview(review, true);

  document.getElementById('reviewForm').reset();
  rfRating = 0;
  rfStars.forEach(s => s.classList.remove('lit'));

  const success = document.getElementById('rfSuccess');
  const btn     = document.getElementById('reviewSubmitBtn');
  success.classList.add('show');
  btn.disabled = true;
  setTimeout(() => { success.classList.remove('show'); btn.disabled = false; }, 4000);
}

function appendUserReview(r, prepend) {
  const section = document.getElementById('userReviewsSection');
  const grid    = document.getElementById('userReviewsGrid');
  section.style.display = 'block';

  const stars = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating);
  const card  = document.createElement('div');
  card.className = 'review-text-card';
  card.innerHTML = `
    <div class="rtc-header">
      <div class="rtc-avatar">${r.name.charAt(0).toUpperCase()}</div>
      <div>
        <p class="rtc-name">${r.name}</p>
        <div class="rtc-stars">${stars}</div>
      </div>
    </div>
    ${r.pet ? `<p class="rtc-pet">${r.pet}</p>` : ''}
    <p>"${r.text}"</p>
  `;

  prepend && grid.firstChild ? grid.insertBefore(card, grid.firstChild) : grid.appendChild(card);
}

// Load any reviews saved in localStorage on page load
(function loadUserReviews() {
  const saved = JSON.parse(localStorage.getItem('pupsmileReviews') || '[]');
  if (saved.length) saved.forEach(r => appendUserReview(r, false));
})();

/* ============================================================
   REVIEWS PAGINATION — show 20 at a time, "Show more" button
   ============================================================ */
(function initReviewsPagination() {
  const grid = document.querySelector('.reviews-text-grid');
  if (!grid) return;

  const BATCH = 20;
  // Direct children are the cards (no stagger-item wrapper in this grid)
  const items = Array.from(grid.children);
  if (items.length <= BATCH) return;

  let shown = BATCH;

  // Hide everything beyond first batch
  items.slice(BATCH).forEach(item => { item.style.display = 'none'; });

  // Create button
  const wrap = document.createElement('div');
  wrap.className = 'reviews-show-more';
  const btn = document.createElement('button');
  btn.className = 'btn btn--outline';
  btn.textContent = `Show ${Math.min(BATCH, items.length - shown)} more reviews`;
  wrap.appendChild(btn);
  grid.insertAdjacentElement('afterend', wrap);

  btn.addEventListener('click', () => {
    const batch = items.slice(shown, shown + BATCH);
    batch.forEach(item => { item.style.display = ''; });
    shown += batch.length;
    const remaining = items.length - shown;
    if (remaining <= 0) {
      wrap.remove();
    } else {
      btn.textContent = `Show ${Math.min(BATCH, remaining)} more reviews`;
    }
  });
})();
