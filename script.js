/* =========================
   NAV MENU
========================= */
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

/* ===== SHOW MENU ===== */
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu');
  });
}

/* ===== HIDE MENU ===== */
if (navClose && navMenu) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
  });
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link');
const linkAction = () => {
  document.getElementById('nav-menu')?.classList.remove('show-menu');
};
navLink.forEach((n) => n.addEventListener('click', linkAction));



/* =========================
   HERO SLIDER
========================= */
let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let thumbnail = document.querySelectorAll('.thumbnail .item');

let countItem = items.length;
let itemActive = 0;

function showSlider() {
  const itemActiveOld = document.querySelector('.slider .list .item.active');
  const thumbnailActiveOld = document.querySelector('.thumbnail .item.active');

  itemActiveOld?.classList.remove('active');
  thumbnailActiveOld?.classList.remove('active');

  items[itemActive]?.classList.add('active');
  thumbnail[itemActive]?.classList.add('active');

  clearInterval(refreshInterval);
  refreshInterval = setInterval(() => next?.click(), 5000);
}

if (next) {
  next.onclick = function () {
    itemActive = itemActive + 1;
    if (itemActive >= countItem) itemActive = 0;
    showSlider();
  };
}

if (prev) {
  prev.onclick = function () {
    itemActive = itemActive - 1;
    if (itemActive < 0) itemActive = countItem - 1;
    showSlider();
  };
}

// auto run slider
let refreshInterval = setInterval(() => next?.click(), 3000);

// click thumbnail
thumbnail.forEach((thumb, index) => {
  thumb.addEventListener('click', () => {
    itemActive = index;
    showSlider();
  });
});



/* =========================
   SOCIAL BAR HIDE ON SCROLL
========================= */
const socialBar = document.querySelector('.social-bar');
const slider = document.querySelector('.slider');

if (socialBar && slider) {
  window.addEventListener('scroll', () => {
    const sliderBottom = slider.offsetTop + slider.offsetHeight;
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    if (scrollPosition > sliderBottom) socialBar.classList.add('hidden');
    else socialBar.classList.remove('hidden');
  });
}



/* =========================
   RESERVATION SCROLL ANIMATION
========================= */
const reservationSection = document.querySelector('.reservation-section');
const formElements = document.querySelectorAll('.reservation-form .form-group, .reserve-btn');

if (reservationSection) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          reservationSection.classList.add('show');

          formElements.forEach((el, index) => {
            el.style.transitionDelay = `${0.2 + index * 0.08}s`;
          });

          observer.unobserve(reservationSection);
        }
      });
    },
    { threshold: 0.25 }
  );

  observer.observe(reservationSection);
}

/* =========================
   RESERVATION SUCCESS MESSAGE
========================= */
const reservationForm = document.querySelector('.reservation-form');
const successMessage = document.getElementById('reservationSuccess');

if (reservationForm) {
  reservationForm.addEventListener('submit', function (e) {
    e.preventDefault();

    if (reservationForm.checkValidity()) {
      reservationForm.style.display = 'none';
      if (successMessage) successMessage.style.display = 'block';
    } else {
      reservationForm.reportValidity();
    }
  });
}



/* =========================
   SERVICES POPUP CAROUSEL
========================= */
const servicesData = {
  pool: {
    title: 'Свободно паркиране',
    text:
      'На разположение на гостите е свободно паркиране на място, разположено непосредствено до къщата.' +
      'Паркоместата са подходящи за семейства с деца, гости с повече багаж и хора, които пътуват с автомобил.\n\n' +
      'Локацията осигурява бърз и лесен достъп до входа и допринася за безпроблемен престой.' ,
    images: []
  },

  bbq: {
    title: 'Напълно оборудвана кухня',
    text:
      'Кухнята е напълно оборудвана и подходяща както за кратък, така и за по-дълъг престой. ' +
      'На разположение са печка с фурна, котлони,хладилник, ' +
      'кафе машина, тостер и електрическа кана.\n\n' +
      'Осигурени са всички необходими кухненски съдове и прибори, както и маса за хранене. ' +
      'Кухнята е идеална за приготвяне на домашна закуска, обяд или вечеря в уютна обстановка.',
    images: ['images/kitchen-extras.webp', 'images/kitchen2.webp', 'images/kitchen.webp']
  },

  bikes: {
    title: 'Комфортна баня',
    text:
      'Банята е модерно оборудвана и включва душ, кърпи, чехли, сешоар и тоалетни принадлежности. ' +
      'Всичко необходимо за пълноценен и спокоен престой е осигурено.',
    images: ['images/bathroom.webp', 'images/bathroom2.webp', 'images/bathroom3.jpeg']
  },

  horses: {
    title: 'Всекидневна и кът за отдих',
    text:
      'Всекидневната предлага просторна и комфортна зона за почивка и събиране на семейството или приятели. ' +
      'Оборудвана е с удобен диван, маса за хранене и плоскоекранен телевизор с кабелни канали.\n\n' +
      'Това е идеалното място за спокойни вечери, гледане на телевизия или просто релакс след активен ден.',
    images: ['images/living-room.webp', 'images/table-photo.webp', 'images/table-with-mouse.webp']
  },

  wifi: {
    title: 'Wi-Fi, климатизация и удобства',
    text:
      'В цялата къща е осигурен безплатен Wi-Fi, подходящ както за ежедневно ползване, така и за работа от разстояние. ' +
      'Сигналът е стабилен и достъпен във всички помещения.\n\n' +
      'За комфорт през всички сезони са осигурени климатизация и отопление. ' +
      'Допълнителните удобства включват мрежи против комари, контакт до леглото. \n\n' +
      'Имотът е подходящ за непушачи и гости, търсещи спокойна и уютна атмосфера.',
    images: []
  },

  views: {
    title: 'Тераса, барбекю и планински гледки',
    text:
      'На разположение е просторен двор с градина, външни мебели и кът за хранене на открито. ' +
      'Гостите могат да използват барбекю и да се насладят на приятни моменти на чист въздух.\n\n' +
      'Терасата и балконите предлагат красива гледка към планината и зеленината, ' +
      'подходящи за сутрешно кафе или вечерна напитка в спокойна обстановка.',
    images: ['images/flowers.webp', 'images/horse-riding3.webp']
  },

  bedrooms2: {
    title: '2 отделни спални',
    text:
      'Къщата разполага с две отделни спални, което осигурява повече лично пространство и комфорт за гостите. ' +
      'Подходящо решение за семейства, приятели или двойки, които предпочитат самостоятелни помещения.\n\n' +
      'Спалните са тихи и уютни, обзаведени с удобни легла и място за багаж, ' +
      'осигурявайки спокойна и пълноценна почивка по време на престоя.',
    images: [
      'images/bedroom-photo.webp',
      'images/bedroom-branding.webp',
      'images/kingsize-bedroom.webp',
      'images/kingsize-bedroom2.webp'
    ]
  }
};

const serviceCards = document.querySelectorAll('.service-card');
const serviceModal = document.getElementById('serviceModal');
const serviceModalTitle = serviceModal?.querySelector('.service-modal__title');
const serviceModalText = serviceModal?.querySelector('.service-modal__text');
const serviceModalImg = serviceModal?.querySelector('.service-modal__image');

const serviceCarousel = serviceModal?.querySelector('.service-modal__carousel');
const servicePrevBtn = document.getElementById('servicePrev');
const serviceNextBtn = document.getElementById('serviceNext');

const serviceModalClose = document.getElementById('serviceModalClose');
const serviceModalOverlay = serviceModal?.querySelector('.service-modal__overlay');

let currentServiceKey = null;
let currentServiceIndex = 0;

function updateServiceImage() {
  if (!currentServiceKey || !serviceModalImg) return;
  const data = servicesData[currentServiceKey];
  if (!data) return;

  const imgs = data.images;
  if (!imgs || !imgs.length) return;

  serviceModalImg.src = imgs[currentServiceIndex];
  serviceModalImg.alt = data.title;
}

function openServiceModal(key) {
  const data = servicesData[key];
  if (!data || !serviceModal || !serviceModalTitle || !serviceModalText) return;

  currentServiceKey = key;
  currentServiceIndex = 0;

  serviceModalTitle.textContent = data.title;
  serviceModalText.textContent = data.text;

  const hasImages = Array.isArray(data.images) && data.images.length > 0;

  if (serviceCarousel) serviceCarousel.style.display = hasImages ? '' : 'none';

  if (!hasImages && serviceModalImg) {
    serviceModalImg.removeAttribute('src');
    serviceModalImg.alt = '';
  }

  if (hasImages) updateServiceImage();

  serviceModal.classList.add('open');
}

function closeServiceModal() {
  if (!serviceModal) return;
  serviceModal.classList.remove('open');
  currentServiceKey = null;
  currentServiceIndex = 0;
}

serviceCards.forEach((card) => {
  card.addEventListener('click', () => openServiceModal(card.dataset.service));
});

servicePrevBtn?.addEventListener('click', (e) => {
  e.stopPropagation();
  if (!currentServiceKey) return;

  const imgs = servicesData[currentServiceKey].images || [];
  if (!imgs.length) return;

  currentServiceIndex = (currentServiceIndex - 1 + imgs.length) % imgs.length;
  updateServiceImage();
});

serviceNextBtn?.addEventListener('click', (e) => {
  e.stopPropagation();
  if (!currentServiceKey) return;

  const imgs = servicesData[currentServiceKey].images || [];
  if (!imgs.length) return;

  currentServiceIndex = (currentServiceIndex + 1) % imgs.length;
  updateServiceImage();
});

serviceModalClose?.addEventListener('click', closeServiceModal);
serviceModalOverlay?.addEventListener('click', closeServiceModal);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && serviceModal?.classList.contains('open')) {
    closeServiceModal();
  }
});



/* =========================
   PRICES SECTION SCROLL EFFECT
========================= */
const pricesSection = document.getElementById('prices');
const priceCards = document.querySelectorAll('.price-card');

if (pricesSection && priceCards.length) {
  const pricesObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          priceCards.forEach((card, index) => {
            setTimeout(() => card.classList.add('is-visible'), index * 120);
          });
          pricesObserver.unobserve(pricesSection);
        }
      });
    },
    { threshold: 0.25 }
  );

  pricesObserver.observe(pricesSection);
}



/* =========================
   GALLERY CAROUSEL & LIGHTBOX
========================= */
const galleryItems = document.querySelectorAll('.gallery__item');
const galleryPrev = document.getElementById('galleryPrev');
const galleryNext = document.getElementById('galleryNext');
const galleryDotsContainer = document.getElementById('galleryDots');

const lightbox = document.getElementById('galleryLightbox');
const lightboxImg = document.getElementById('galleryLightboxImg');
const lightboxCaption = document.getElementById('galleryLightboxCaption');
const lightboxClose = document.getElementById('galleryLightboxClose');
const lightboxOverlay = lightbox?.querySelector('.gallery-lightbox__overlay');

let galleryIndex = 0;
let galleryDots = [];

if (galleryItems.length && galleryDotsContainer) {
  galleryItems.forEach((_, idx) => {
    const dot = document.createElement('button');
    dot.classList.add('gallery__dot');
    if (idx === 0) dot.classList.add('active');
    dot.dataset.index = idx;
    galleryDotsContainer.appendChild(dot);
    galleryDots.push(dot);
  });
}

function updateGallery() {
  galleryItems.forEach((item, idx) => item.classList.toggle('active', idx === galleryIndex));
  galleryDots.forEach((dot, idx) => dot.classList.toggle('active', idx === galleryIndex));
}

function nextGallery() {
  if (!galleryItems.length) return;
  galleryIndex = (galleryIndex + 1) % galleryItems.length;
  updateGallery();
}

function prevGallery() {
  if (!galleryItems.length) return;
  galleryIndex = (galleryIndex - 1 + galleryItems.length) % galleryItems.length;
  updateGallery();
}

galleryNext?.addEventListener('click', nextGallery);
galleryPrev?.addEventListener('click', prevGallery);

galleryDots.forEach((dot) => {
  dot.addEventListener('click', () => {
    galleryIndex = Number(dot.dataset.index);
    updateGallery();
  });
});

// AUTO
let galleryAuto = null;
if (galleryItems.length > 1) galleryAuto = setInterval(nextGallery, 5000);

function stopGalleryAuto() {
  if (galleryAuto) {
    clearInterval(galleryAuto);
    galleryAuto = null;
  }
}

galleryNext?.addEventListener('click', stopGalleryAuto);
galleryPrev?.addEventListener('click', stopGalleryAuto);
galleryDots.forEach((dot) => dot.addEventListener('click', stopGalleryAuto));

// LIGHTBOX
function openLightbox(imgEl) {
  if (!lightbox || !lightboxImg || !lightboxCaption) return;
  lightboxImg.src = imgEl.src;
  lightboxCaption.textContent = imgEl.alt || '';
  lightbox.classList.add('open');
  lightboxImg.classList.remove('zoomed');
}

function closeLightbox() {
  lightbox?.classList.remove('open');
}

galleryItems.forEach((item) => {
  const img = item.querySelector('img');
  if (!img) return;
  img.addEventListener('click', () => openLightbox(img));
});

lightboxClose?.addEventListener('click', closeLightbox);
lightboxOverlay?.addEventListener('click', closeLightbox);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox?.classList.contains('open')) closeLightbox();
});

lightboxImg?.addEventListener('click', () => {
  lightboxImg.classList.toggle('zoomed');
});



/* =========================
   FOOTER BUTTON TO TOP
========================= */
const scrollTopBtn = document.getElementById("scrollTopBtn");
scrollTopBtn?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});



/* =========================
   ABOUT SECTION CAROUSEL
========================= */
const aboutSlides = [
  { src: 'images/festivals1.webp', caption: 'Семейна овцевъдна ферма "Стара Планина- Камберови"', link: '#festival' },
  { src: 'images/pametnik (1).webp', caption: 'Паметникът на Христо Ботев в Калофер.', link: '#botev' },
  { src: 'images/peak-botev.webp', caption: 'Връх Ботев – най-високият връх в Стара планина', link: '#botev' },
  { src: 'images/city-view.webp', caption: 'Градски разходки и планински гледки', link: '#kalofer' }
];

let aboutIndex = 0;

const aboutImg = document.querySelector('.about__car-img');
const aboutCaption = document.getElementById('aboutCarCaption');
const aboutMore = document.querySelector('.about__car-more'); // ✅ FIX

function updateAboutCarousel() {
  const slide = aboutSlides[aboutIndex];

  if (aboutImg) {
    aboutImg.src = slide.src;
    aboutImg.alt = slide.caption;
  }

  if (aboutCaption) aboutCaption.textContent = slide.caption;

  // ✅ FIX: "Виж повече" винаги да води към attractions
  if (aboutMore) aboutMore.href = '#attractions';
}

document.querySelector('.about__car-btn--next')?.addEventListener('click', () => {
  aboutIndex = (aboutIndex + 1) % aboutSlides.length;
  updateAboutCarousel();
});

document.querySelector('.about__car-btn--prev')?.addEventListener('click', () => {
  aboutIndex = (aboutIndex - 1 + aboutSlides.length) % aboutSlides.length;
  updateAboutCarousel();
});

updateAboutCarousel();



/* =========================
   REVIEWS SLIDER & LIGHTBOX
========================= */
const reviewsSection = document.querySelector('.reviews');

if (reviewsSection) {
  const reviewsItems = reviewsSection.querySelectorAll('.reviews__item');
  const reviewsPrev = document.getElementById('reviewsPrev');
  const reviewsNext = document.getElementById('reviewsNext');
  const reviewsDotsContainer = document.getElementById('reviewsDots');

  const reviewsLightbox = document.getElementById('reviewsLightbox');
  const reviewsLightboxImg = document.getElementById('reviewsLightboxImg');
  const reviewsLightboxCaption = document.getElementById('reviewsLightboxCaption');
  const reviewsLightboxClose = document.getElementById('reviewsLightboxClose');
  const reviewsLightboxOverlay = reviewsLightbox?.querySelector('.reviews-lightbox__overlay');

  let reviewsIndex = 0;
  let reviewsDots = [];

  if (reviewsItems.length && reviewsDotsContainer) {
    reviewsItems.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.classList.add('reviews__dot');
      if (idx === 0) dot.classList.add('active');
      dot.dataset.index = idx;
      reviewsDotsContainer.appendChild(dot);
      reviewsDots.push(dot);
    });
  }

  function updateReviews() {
    reviewsItems.forEach((item, idx) => item.classList.toggle('active', idx === reviewsIndex));
    reviewsDots.forEach((dot, idx) => dot.classList.toggle('active', idx === reviewsIndex));
  }

  function nextReviews() {
    if (!reviewsItems.length) return;
    reviewsIndex = (reviewsIndex + 1) % reviewsItems.length;
    updateReviews();
  }

  function prevReviews() {
    if (!reviewsItems.length) return;
    reviewsIndex = (reviewsIndex - 1 + reviewsItems.length) % reviewsItems.length;
    updateReviews();
  }

  reviewsNext?.addEventListener('click', nextReviews);
  reviewsPrev?.addEventListener('click', prevReviews);

  reviewsDots.forEach((dot) => {
    dot.addEventListener('click', () => {
      reviewsIndex = Number(dot.dataset.index);
      updateReviews();
      stopReviewsAuto();
    });
  });

  // AUTO
  let reviewsAuto = null;
  if (reviewsItems.length > 1) reviewsAuto = setInterval(nextReviews, 6000);

  function stopReviewsAuto() {
    if (reviewsAuto) {
      clearInterval(reviewsAuto);
      reviewsAuto = null;
    }
  }

  reviewsNext?.addEventListener('click', stopReviewsAuto);
  reviewsPrev?.addEventListener('click', stopReviewsAuto);

  // LIGHTBOX
  function openReviewsLightbox(imgEl) {
    if (!reviewsLightbox || !reviewsLightboxImg || !reviewsLightboxCaption) return;
    reviewsLightboxImg.src = imgEl.src;
    reviewsLightboxCaption.textContent = imgEl.alt || '';
    reviewsLightbox.classList.add('open');
    reviewsLightboxImg.classList.remove('zoomed');
  }

  function closeReviewsLightbox() {
    reviewsLightbox?.classList.remove('open');
  }

  reviewsItems.forEach((item) => {
    const img = item.querySelector('img');
    if (!img) return;
    img.addEventListener('click', () => openReviewsLightbox(img));
  });

  reviewsLightboxClose?.addEventListener('click', closeReviewsLightbox);
  reviewsLightboxOverlay?.addEventListener('click', closeReviewsLightbox);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && reviewsLightbox?.classList.contains('open')) closeReviewsLightbox();
  });

  reviewsLightboxImg?.addEventListener('click', () => {
    reviewsLightboxImg.classList.toggle('zoomed');
  });
}
