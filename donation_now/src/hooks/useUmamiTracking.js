import { useEffect } from 'react';

// Umami Custom Event Tracking Hook
export default function useUmamiTracking() {
    useEffect(() => {
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
                        window.umami.track('scroll-depth', { depth: `${depth}%` });
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
                window.umami.track('time-on-page', { 
                    seconds: timeOnPage / 1000,
                    minutes: Math.round(timeOnPage / 60000)
                });
            }
        }
        
        // Track button clicks
        function handleClick(e) {
            const target = e.target.closest('a, button');
            if (!target) return;
            
            const text = target.textContent?.trim().toLowerCase() || '';
            const href = target.getAttribute('href');
            
            // Track donation-related clicks
            if (text.includes('donate') || text.includes('empower') || text.includes('support') || target.tagName === 'GIVEBUTTER-WIDGET') {
                if (window.umami) {
                    window.umami.track('button-click', { 
                        button: target.textContent?.trim() || 'Donation Widget',
                        url: href || window.location.pathname
                    });
                }
            }
            
            // Track navigation clicks
            if (target.tagName === 'A' && href) {
                if (href.includes('v7') || text.includes('back')) {
                    if (window.umami) {
                        window.umami.track('button-click', { 
                            button: 'Navigation: ' + text,
                            url: href
                        });
                    }
                }
            }
        }
        
        // Scroll tracking (debounced)
        let scrollTimeout;
        function handleScroll() {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(trackScrollDepth, 100);
        }
        
        // Initialize
        window.addEventListener('scroll', handleScroll);
        document.addEventListener('click', handleClick);
        const timeTracker = setInterval(trackTimeOnPage, timeInterval);
        
        // Track when user leaves
        function handleBeforeUnload() {
            if (window.umami && timeOnPage > 0) {
                window.umami.track('session-end', { 
                    totalSeconds: Math.round(timeOnPage / 1000)
                });
            }
        }
        window.addEventListener('beforeunload', handleBeforeUnload);
        
        // Cleanup
        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('click', handleClick);
            window.removeEventListener('beforeunload', handleBeforeUnload);
            clearInterval(timeTracker);
        };
    }, []);
}
