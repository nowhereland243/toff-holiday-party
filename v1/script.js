document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible if you only want it to animate once
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in-scroll');
    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // Parallax Effect
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const parallaxImages = document.querySelectorAll('.full-width-image img');
        
        parallaxImages.forEach(img => {
            const parent = img.parentElement;
            const parentTop = parent.offsetTop;
            const parentHeight = parent.offsetHeight;
            const windowHeight = window.innerHeight;
            
            // Only animate if in view
            if (scrolled + windowHeight > parentTop && scrolled < parentTop + parentHeight) {
                const speed = 0.2;
                const yPos = (scrolled - parentTop) * speed;
                img.style.transform = `translateY(${yPos}px)`;
            }
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Hide scroll indicator on scroll
    const scrollIndicator = document.querySelector('.scroll-indicator');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
        
        lastScroll = currentScroll;
    });
});
