document.addEventListener("DOMContentLoaded", function() {
    function updateContent() {
        if (!window.siteContent) return;

        const elements = document.querySelectorAll('[data-content-key]');
        elements.forEach(el => {
            const key = el.getAttribute('data-content-key');
            const keys = key.split('.');
            let value = window.siteContent;
            
            for (const k of keys) {
                if (value && value[k]) {
                    value = value[k];
                } else {
                    value = null;
                    break;
                }
            }

            if (value) {
                // If the element has children (like spans for animation), we might need a different strategy.
                // For now, we'll assume simple text replacement or innerHTML if needed.
                // However, the original site uses spans for letter spacing/animation in some places.
                // Let's try to preserve structure if possible, or just replace text if it's a leaf node.
                
            if (value) {
                if (el.getAttribute('data-type') === 'word-split') {
                    // Clear existing content
                    el.innerHTML = '';
                    // Create structure for each letter: <div class="text tal__text headline-5"><span class="text-block-wrap-div">L</span></div>
                    const letters = value.split('');
                    letters.forEach(letter => {
                        const div = document.createElement('div');
                        div.className = 'text tal__text headline-5';
                        const span = document.createElement('span');
                        span.className = 'text-block-wrap-div';
                        span.textContent = letter;
                        div.appendChild(span);
                        el.appendChild(div);
                    });
                } else if (el.children.length === 0 || el.querySelector('.text-block-wrap-div')) {
                     // It's likely a simple text container or one with the specific wrapper
                     const wrapper = el.querySelector('.text-block-wrap-div');
                     if (wrapper) {
                         wrapper.innerHTML = value;
                     } else {
                         el.innerHTML = value;
                     }
                }
            }
            }
        });
    }

    updateContent();
    
    // Expose update function for editor
    window.updateSiteContent = updateContent;
});
