// ===================================
// Preloader
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    const content = document.getElementById('content');
    
    // Show preloader for 2.5 seconds
    setTimeout(() => {
        preloader.classList.add('is-loaded');
        content.classList.add('is-active');
        
        // Remove preloader from DOM after fade out
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 2500);
});

// ===================================
// Intersection Observer for Scroll Animations
// ===================================
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // Optionally unobserve after animation
            // observer.unobserve(entry.target);
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

// Observe all elements with fade-in class
const fadeElements = document.querySelectorAll('.fade-in');
fadeElements.forEach(element => {
    observer.observe(element);
});

// ===================================
// Smooth Scroll Behavior
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===================================
// Parallax Effect for Sections
// ===================================
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.section');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5;
        const yPos = -(scrolled * speed);
        
        // Apply subtle parallax to alternating sections
        if (index % 2 === 0) {
            element.style.backgroundPositionY = `${yPos * 0.3}px`;
        }
    });
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// ===================================
// Letter Animation Enhancement
// ===================================
const titleLetters = document.querySelectorAll('.title-letter');
titleLetters.forEach((letter, index) => {
    letter.style.animationDelay = `${index * 0.1}s`;
});

// ===================================
// Red Room Curtain Effect (Optional Enhancement)
// ===================================
function createCurtainEffect() {
    const cover = document.querySelector('.cover');
    if (!cover) return;
    
    // Add subtle wave animation to background
    let hue = 0;
    setInterval(() => {
        hue = (hue + 0.5) % 360;
        // Subtle color shift effect
        const redVariation = Math.sin(hue * Math.PI / 180) * 10;
        cover.style.filter = `hue-rotate(${redVariation}deg)`;
    }, 100);
}

// Uncomment to enable curtain effect
// createCurtainEffect();

// ===================================
// Console Easter Egg
// ===================================
console.log('%c Welcome to the Red Room ', 'background: #000; color: #ff0000; font-size: 20px; padding: 10px;');
console.log('%c "Through the darkness of future past, the magician longs to see..." ', 'color: #ff0000; font-style: italic;');

// ===================================
// Responsive Text Sizing
// ===================================
function adjustTextSizes() {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    
    // Adjust letter spacing based on viewport
    const titleAnimation = document.querySelector('.title-animation');
    if (titleAnimation && vw < 768) {
        titleAnimation.style.letterSpacing = '0.1em';
    }
}

window.addEventListener('resize', adjustTextSizes);
adjustTextSizes();

// ===================================
// Scroll Progress Indicator (Optional)
// ===================================
function updateScrollProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    // You can use this to show a progress bar if desired
    // document.getElementById('progressBar').style.width = scrolled + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// ===================================
// Image Lazy Loading Enhancement
// ===================================
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ===================================
// Performance Optimization
// ===================================
// Debounce function for scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll-heavy functions
const debouncedParallax = debounce(updateParallax, 10);
window.addEventListener('scroll', debouncedParallax);
