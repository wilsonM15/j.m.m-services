/* ============================================================
   main.js — JMoura Portfolio
   ============================================================ */

/* ---------- Dropdown / Navigation ---------- */
const dropdownBtn  = document.getElementById('btn');
const dropdownMenu = document.getElementById('dropdown');

const toggleDropdown = () => {
    const isOpen = dropdownMenu.classList.toggle('show');
    dropdownBtn.setAttribute('aria-expanded', isOpen);
};

dropdownBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleDropdown();
});

// Close dropdown when clicking outside
document.documentElement.addEventListener('click', () => {
    if (dropdownMenu.classList.contains('show')) {
        toggleDropdown();
    }
});

// Close dropdown when a nav link is clicked
dropdownMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (dropdownMenu.classList.contains('show')) toggleDropdown();
    });
});


/* ---------- Carousel ---------- */
const viewport = document.querySelector('.carousel__viewport');
const prevBtn  = document.getElementById('prev-btn');
const nextBtn  = document.getElementById('next-btn');

if (viewport && prevBtn && nextBtn) {
    const slideWidth = () => {
        const slide = viewport.querySelector('.carousel__slide');
        return slide ? slide.offsetWidth + parseInt(getComputedStyle(slide).marginRight || 0) : 300;
    };

    nextBtn.addEventListener('click', () => {
        viewport.scrollBy({ left: slideWidth(), behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
        viewport.scrollBy({ left: -slideWidth(), behavior: 'smooth' });
    });

    // Hide/show arrows based on scroll position
    const updateArrows = () => {
        prevBtn.style.opacity = viewport.scrollLeft <= 10 ? '0.3' : '1';
        nextBtn.style.opacity =
            viewport.scrollLeft + viewport.clientWidth >= viewport.scrollWidth - 10
                ? '0.3' : '1';
    };

    viewport.addEventListener('scroll', updateArrows, { passive: true });
    updateArrows();
}


/* ---------- Active nav link on scroll ---------- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.dropdown a');

const highlightNav = () => {
    let current = '';
    sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 120) current = sec.getAttribute('id');
    });
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
};

window.addEventListener('scroll', highlightNav, { passive: true });


/* ---------- Scroll Reveal ---------- */
if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({ distance: '60px', duration: 1800, delay: 200, reset: false });

    sr.reveal('.about-text, .wood-work, .gold-work, .restauration', { origin: 'left' });
    sr.reveal('.touches-work, .assembly-work, .about-tagline',       { origin: 'right' });
    sr.reveal('.heading',                                              { origin: 'top' });
    sr.reveal('.carousel, .footer, .contact-form',                    { origin: 'bottom' });
    sr.reveal('.work-title h1',                                        { origin: 'top', delay: 100 });
}
