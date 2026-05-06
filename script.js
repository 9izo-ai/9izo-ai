// ============================================
// SMOOTH SCROLLING AND NAVIGATION
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href') !== '#') {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ============================================
// MODEL CARD INTERACTIONS
// ============================================

const modelCards = document.querySelectorAll('.model-card');

modelCards.forEach(card => {
    card.addEventListener('click', function() {
        // Add click animation
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);

        // Optional: Log which model was clicked
        const modelName = this.querySelector('h3').textContent;
        console.log('Clicked on:', modelName);
    });

    // Add hover effect
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// ============================================
// CTA BUTTON INTERACTIONS
// ============================================

document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', function() {
        console.log('CTA Button clicked');
    });
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================

const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.background = 'rgba(10, 14, 39, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(16, 185, 129, 0.1)';
    } else {
        navbar.style.background = 'rgba(10, 14, 39, 0.95)';
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// ============================================
// FEATURE CARDS ANIMATION ON SCROLL
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .model-card').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// ============================================
// RESPONSIVE NAVBAR TOGGLE
// ============================================

// Check if there's a mobile menu (can be added in future)
const checkMobileMenu = () => {
    const width = window.innerWidth;
    if (width < 768) {
        // Mobile adjustments
        console.log('Mobile view');
    } else {
        // Desktop adjustments
        console.log('Desktop view');
    }
};

window.addEventListener('resize', checkMobileMenu);
checkMobileMenu();

// ============================================
// PAGE LOAD ANIMATIONS
// ============================================

window.addEventListener('load', () => {
    // Animate hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'fadeInUp 0.8s ease-out';
    }

    // Animate logo
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.style.animation = 'fadeInUp 0.6s ease-out';
    }
});

// ============================================
// BUTTON HOVER EFFECTS
// ============================================

const buttons = document.querySelectorAll('.btn');

buttons.forEach(btn => {
    btn.addEventListener('mousedown', function() {
        this.style.transform = this.style.transform ? 
            this.style.transform.replace('translateY(-3px)', 'translateY(0px)') : 
            'translateY(0px)';
    });

    btn.addEventListener('mouseup', function() {
        this.style.transform = '';
    });

    btn.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// ============================================
// CONSOLE WELCOME MESSAGE
// ============================================

console.log('%c🚀 Welcome to AI Fiesta!', 'font-size: 20px; color: #10b981; font-weight: bold;');
console.log('%cClick "Start Now" to begin exploring multiple AI models!', 'font-size: 14px; color: #06d6d0;');
