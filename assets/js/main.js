'use strict';

/* ==========================================================
   DOM ELEMENTS
========================================================== */

const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');
const header = document.getElementById('header');
const scrollUpButton = document.getElementById('scroll-up');
const sections = document.querySelectorAll('section[id]');

/* ==========================================================
   NAVIGATION MENU
========================================================== */

/**
 * Opens the mobile navigation menu
 */
const openMenu = () => {
    if (navMenu) navMenu.classList.add('nav__menu--active');
};

/**
 * Closes the mobile navigation menu
 */
const closeMenu = () => {
    if (navMenu) navMenu.classList.remove('nav__menu--active');
};

/* Toggle menu (mobile) */
if (navToggle) {
    navToggle.addEventListener('click', openMenu);
}

/* Close menu via close button */
if (navClose) {
    navClose.addEventListener('click', closeMenu);
}

/* Close menu when clicking any navigation link */
navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

/* Close menu when pressing Escape key (accessibility improvement) */
document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && navMenu?.classList.contains('nav__menu--active')) {
        closeMenu();
    }
});


/* ==========================================================
   SWIPER INITIALIZATION
========================================================== */

/**
 * Initialize Swiper only if the container exists.
 * Prevents JS errors if the component is removed.
 */
if (document.querySelector('.favorite__swiper')) {
    new Swiper('.favorite__swiper', {
        loop: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        grabCursor: true,

        breakpoints: {
            768: {
                slidesPerView: 3,
            },
        },

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
}


/* ==========================================================
   SCROLL EVENTS (Single Optimized Listener)
========================================================== */

/**
 * Handles all scroll-related UI updates:
 * - Header blur effect
 * - Scroll-up button visibility
 * - Active navigation link highlighting
 */
const handleScroll = () => {
    const scrollY = window.scrollY;

    /* -------------------------------
       1. Header Blur Effect
    -------------------------------- */
    if (header) {
        scrollY >= 50
            ? header.classList.add('blur-header')
            : header.classList.remove('blur-header');
    }

    /* -------------------------------
       2. Scroll-Up Button Visibility
    -------------------------------- */
    if (scrollUpButton) {
        scrollY >= 150
            ? scrollUpButton.classList.add('show-scrollup')
            : scrollUpButton.classList.remove('show-scrollup');
    }

    /* -------------------------------
       3. Active Navigation Link
    -------------------------------- */
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100; // Offset for fixed header
        const sectionId = section.id;

        const navLink = document.querySelector(
            `.nav__menu a[href="#${sectionId}"]`
        );

        if (!navLink) return;

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink.classList.add('active-link');
        } else {
            navLink.classList.remove('active-link');
        }
    });
};

/* Attach a single scroll listener for performance */
window.addEventListener('scroll', handleScroll);


/* ==========================================================
   SCROLL REVEAL (ANIMATION)
========================================================== */
// Prevent errors if ScrollReveal is not loaded
if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({
        origin: 'top',
        distance: '60px',
        duration: 2500,
        delay: 400,
        reset: true, // Enable if you want animations on every scroll
    });

    // Default reveal elements
    const defaultReveal = [
        '.home__social',
        '.favorite__container',
        '.sponsor__container',
        '.footer',
    ];

    sr.reveal(defaultReveal.join(', '));

    // Custom origin reveals
    const customReveals = [
        { selector: '.home__title span:nth-child(1)', options: { origin: 'left', opacity: 1 } },
        { selector: '.home__title span:nth-child(3)', options: { origin: 'right', opacity: 1 } },
        { selector: '.home__tooltip, .home__button, .model__button', options: { origin: 'bottom' } },
        { selector: '.about__data', options: { origin: 'left' } },
        { selector: '.about__img, .model__tooltip', options: { origin: 'right' } },
    ];

    customReveals.forEach(({ selector, options }) => {
        sr.reveal(selector, options);
    });
}
