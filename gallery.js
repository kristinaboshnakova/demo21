// ================= NAV MENU (works on both pages) =================
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => navMenu.classList.add('show-menu'));
}

if (navClose && navMenu) {
  navClose.addEventListener('click', () => navMenu.classList.remove('show-menu'));
}

// ✅ Ако сме в gallery-index.html: #section -> index.html#section
const onGalleryPage =
  window.location.pathname.toLowerCase().includes('gallery-index.html');

document.querySelectorAll('.nav__link').forEach((link) => {
  const href = link.getAttribute('href') || '';

  if (onGalleryPage && href.startsWith('#')) {
    link.setAttribute('href', `index.html${href}`);
  }

  // затваря менюто след клик (мобилен)
  link.addEventListener('click', () => navMenu?.classList.remove('show-menu'));
});




/* =========================
   GALLERY-INDEX LIGHTBOX
========================= */

const gImages = document.querySelectorAll('.g-img');
const lb = document.getElementById('lb');
const lbImg = document.getElementById('lbImg');
const lbPrev = document.getElementById('lbPrev');
const lbNext = document.getElementById('lbNext');
const lbX = document.getElementById('lbX');

if (gImages.length && lb) {
  let currentIndex = 0;

  function openLB(index) {
    currentIndex = index;
    lbImg.src = gImages[currentIndex].src;
    lb.classList.add('open');
  }

  function closeLB() {
    lb.classList.remove('open');
    lbImg.src = '';
  }

  function nextImg() {
    currentIndex = (currentIndex + 1) % gImages.length;
    lbImg.src = gImages[currentIndex].src;
  }

  function prevImg() {
    currentIndex = (currentIndex - 1 + gImages.length) % gImages.length;
    lbImg.src = gImages[currentIndex].src;
  }

  gImages.forEach((img, index) => {
    img.addEventListener('click', () => openLB(index));
  });

  lbNext.addEventListener('click', nextImg);
  lbPrev.addEventListener('click', prevImg);
  lbX.addEventListener('click', closeLB);

  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLB();
    if (e.key === 'ArrowRight') nextImg();
    if (e.key === 'ArrowLeft') prevImg();
  });

  lb.addEventListener('click', (e) => {
    if (e.target === lb) closeLB();
  });
}


///footer back to top//
const scrollTopBtn = document.getElementById("scrollTopBtn");
if (scrollTopBtn) {
scrollTopBtn.addEventListener("click", () => {
window.scrollTo({ top: 0, behavior: "smooth" });
});
}
