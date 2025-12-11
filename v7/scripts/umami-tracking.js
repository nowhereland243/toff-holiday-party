// Umami Custom Event Tracking
// Tracks scroll depth, time on page, and button clicks

(function() {
    'use strict';
    
    // Track scroll depth
    const scrollDepths = [25, 50, 75, 100];
    const trackedDepths = new Set();
    
    function trackScrollDepth() {
        const scrollPercent = Math.round(
            (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        );
        
        scrollDepths.forEach(depth => {
            if (scrollPercent >= depth && !trackedDepths.has(depth)) {
                trackedDepths.add(depth);
                if (window.umami) {
                    umami.track('scroll-depth', { depth: `${depth}%` });
                }
            }
        });
    }
    
    // Track time on page (every 30 seconds)
    let timeOnPage = 0;
    const timeInterval = 30000; // 30 seconds
    
    function trackTimeOnPage() {
        timeOnPage += timeInterval;
        if (window.umami) {
            umami.track('time-on-page', { 
                seconds: timeOnPage / 1000,
                minutes: Math.round(timeOnPage / 60000)
            });
        }
    }
    
    // Track button clicks
    function trackButtonClick(buttonName, buttonUrl) {
        if (window.umami) {
            umami.track('button-click', { 
                button: buttonName,
                url: buttonUrl || window.location.pathname
            });
        }
    }
    
    // Initialize tracking
    function init() {
        // Scroll tracking (debounced)
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(trackScrollDepth, 100);
        });
        
        // Time tracking
        setInterval(trackTimeOnPage, timeInterval);
        
        // Track donate button clicks
        document.addEventListener('click', function(e) {
            const target = e.target.closest('a, button');
            if (!target) return;
            
            const text = target.textContent.trim().toLowerCase();
            const href = target.getAttribute('href');
            
            // Track donation-related clicks
            if (text.includes('donate') || text.includes('empower') || text.includes('support')) {
                trackButtonClick(target.textContent.trim(), href);
            }
            
            // Track navigation clicks
            if (target.tagName === 'A' && href) {
                if (href.includes('donatenow') || href.includes('givebutter')) {
                    trackButtonClick('Navigation: ' + text, href);
                }
            }
        });
        
        // Track when user leaves (send final time)
        window.addEventListener('beforeunload', function() {
            if (window.umami && timeOnPage > 0) {
                umami.track('session-end', { 
                    totalSeconds: Math.round(timeOnPage / 1000)
                });
            }
        });
    }
    
    // Wait for Umami to load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
