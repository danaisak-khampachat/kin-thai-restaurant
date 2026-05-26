/* ===================================
   KIN THAI RESTAURANT - MAIN JS
   Navigation, interactions, animations
   =================================== */

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initHamburger();
    initMenuFilter();
    initContactForm();
    initScrollAnimations();
});

/* --- Navbar Scroll Effect --- */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar || navbar.classList.contains('navbar-dark')) return;

    function handleScroll() {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
}

/* --- Hamburger Menu --- */
function initHamburger() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close on link click
    navMenu.querySelectorAll('.nav-link, .nav-btn').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target) && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/* --- Menu Filter --- */
function initMenuFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const categories = document.querySelectorAll('.menu-category');
    if (filterBtns.length === 0) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;

            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Show/hide categories
            categories.forEach(cat => {
                if (filter === 'all' || cat.dataset.category === filter) {
                    cat.style.display = '';
                    cat.style.opacity = '0';
                    cat.style.transform = 'translateY(10px)';
                    requestAnimationFrame(() => {
                        cat.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                        cat.style.opacity = '1';
                        cat.style.transform = 'translateY(0)';
                    });
                } else {
                    cat.style.display = 'none';
                }
            });
        });
    });
}

/* --- Contact Form --- */
function initContactForm() {
    const form = document.getElementById('contact-form');
    const success = document.getElementById('form-success');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Basic validation
        const name = form.querySelector('#name');
        const email = form.querySelector('#email');
        const message = form.querySelector('#message');

        if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
            return;
        }

        // Simulate form submission (since this is a static site)
        // In production, integrate with a service like Formspree, EmailJS, or Netlify Forms
        const formData = {
            name: name.value.trim(),
            email: email.value.trim(),
            subject: form.querySelector('#subject').value,
            message: message.value.trim()
        };

        // Build mailto link as fallback
        const mailtoSubject = encodeURIComponent(`[Kin Thai] ${formData.subject} - from ${formData.name}`);
        const mailtoBody = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`);
        
        window.location.href = `mailto:kinthai.nantwich@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

        // Show success
        form.style.display = 'none';
        if (success) success.style.display = 'block';
    });
}

/* --- Scroll Animations --- */
function initScrollAnimations() {
    const elements = document.querySelectorAll(
        '.feature-card, .highlight-card, .menu-item, .value-card, .contact-card, .action-card'
    );

    if (elements.length === 0) return;

    // Add fade-in class
    elements.forEach(el => el.classList.add('fade-in'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    });

    elements.forEach(el => observer.observe(el));
}
