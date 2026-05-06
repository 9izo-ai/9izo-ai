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
// SEARCH BAR
// ============================================

// FIX 1: Store all cards OUTSIDE the function so they are never lost
// even when removed from the DOM.
let allCards = [];

// FIX 2: Wait for DOM to fully load before touching any elements.
// This fixes the crash caused by <script> in <head> running too early.
document.addEventListener('DOMContentLoaded', function () {
    allCards = Array.from(document.querySelectorAll(".feature-card"));

    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.addEventListener("input", searchTools);
    }
});

function searchTools() {
    let input = document.getElementById("searchInput").value.toLowerCase().trim();
    let grid = document.querySelector('.features-grid');
    if (!grid) return;

    // Remove any existing "not found" message
    const existingMsg = document.getElementById("search-not-found-msg");
    if (existingMsg) existingMsg.remove();

    if (input === "") {
        // Restore all cards in original order
        allCards.forEach(card => {
            card.style.display = "block";
            grid.appendChild(card);
        });
        return;
    }

    // FIX 3: Strip the number prefix ("1. ", "42. " etc.) before matching
    // so typing "c" correctly finds "ChatGPT", "Claude", "Canva AI" etc.
    let matching = allCards.filter(card => {
        let rawTitle = card.querySelector("h3").innerText.toLowerCase();
        let cleanTitle = rawTitle.replace(/^\d+\.\s*/, '').trim();
        return cleanTitle.startsWith(input);
    });

    // Detach all cards cleanly (don't use innerHTML="" — that destroys references)
    allCards.forEach(card => {
        card.style.display = "none";
        if (card.parentNode === grid) {
            grid.removeChild(card);
        }
    });

    if (matching.length > 0) {
        // Show only matching cards, placed at the top
        matching.forEach(card => {
            card.style.display = "block";
            grid.appendChild(card);
        });
    } else {
        // Show friendly "not found" message
        const notFoundMsg = document.createElement("div");
        notFoundMsg.id = "search-not-found-msg";
        notFoundMsg.style.cssText = `
            width: 100%;
            grid-column: 1 / -1;
            text-align: center;
            padding: 48px 24px;
            background: rgba(16, 185, 129, 0.05);
            border: 1px dashed rgba(16, 185, 129, 0.35);
            border-radius: 16px;
            margin: 20px 0;
        `;
        notFoundMsg.innerHTML = `
            <div style="font-size:52px;margin-bottom:16px;">😔</div>
            <h3 style="font-size:20px;font-weight:700;color:#10b981;margin-bottom:10px;">
                Sorry, this AI is not present in the portal.
            </h3>
            <p style="font-size:15px;color:#94a3b8;margin-bottom:24px;max-width:480px;margin-left:auto;margin-right:auto;line-height:1.7;">
                We are working on it and will add it in a few days.<br>
                Fill the form below and we'll notify you when it's live!
            </p>
            <a href="#contact-form"
               style="display:inline-block;background:linear-gradient(135deg,#10b981,#06d6d0);color:#0a0e27;padding:12px 30px;border-radius:8px;font-size:14px;font-weight:700;text-decoration:none;"
               onmouseover="this.style.opacity='0.82'"
               onmouseout="this.style.opacity='1'">
                📋 Fill the Form
            </a>
        `;
        grid.appendChild(notFoundMsg);
    }
}

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
