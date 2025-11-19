document.addEventListener('DOMContentLoaded', function() {
    // Check for edit mode
    const urlParams = new URLSearchParams(window.location.search);
    const isEditMode = urlParams.get('edit') === 'true';

    if (!isEditMode) return;

    // Inject CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'editor.css';
    document.head.appendChild(link);

    // Create Editor UI
    const overlay = document.createElement('div');
    overlay.id = 'site-editor-overlay';
    
    const toggle = document.createElement('button');
    toggle.className = 'editor-toggle';
    toggle.innerHTML = '✎';
    toggle.onclick = () => overlay.classList.toggle('active');
    document.body.appendChild(toggle);

    // Build Form
    function buildForm() {
        let html = '<h2>Content Editor <button class="editor-btn-close" style="width:auto; padding: 5px 10px; font-size: 12px;">Close</button></h2>';
        
        if (!window.siteContent) {
            html += '<p>Error: siteContent not found.</p>';
            overlay.innerHTML = html;
            return;
        }

        for (const [sectionKey, sectionData] of Object.entries(window.siteContent)) {
            html += `<div class="editor-group"><h3>${sectionKey.replace('_', ' ')}</h3>`;
            
            for (const [fieldKey, value] of Object.entries(sectionData)) {
                const inputId = `${sectionKey}.${fieldKey}`;
                const label = fieldKey.replace('_', ' ');
                
                html += `<div class="editor-field">
                    <label>${label}</label>`;
                
                if (value.length > 50) {
                    html += `<textarea data-key="${inputId}">${value}</textarea>`;
                } else {
                    html += `<input type="text" data-key="${inputId}" value="${value}">`;
                }
                
                html += `</div>`;
            }
            html += `</div>`;
        }

        html += `<div class="editor-actions">
            <button class="editor-btn editor-btn-save">Export JSON</button>
        </div>`;

        overlay.innerHTML = html;
        document.body.appendChild(overlay);

        // Event Listeners
        overlay.querySelector('.editor-btn-close').onclick = () => overlay.classList.remove('active');
        
        overlay.querySelector('.editor-btn-save').onclick = () => {
            const json = JSON.stringify(window.siteContent, null, 4);
            navigator.clipboard.writeText(json).then(() => {
                alert('JSON copied to clipboard! Paste it into site-data.js');
            });
            console.log(json);
        };

        // Live Update
        overlay.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', (e) => {
                const keyPath = e.target.getAttribute('data-key').split('.');
                const section = keyPath[0];
                const field = keyPath[1];
                
                if (window.siteContent[section]) {
                    window.siteContent[section][field] = e.target.value;
                    if (window.updateSiteContent) {
                        window.updateSiteContent();
                    }
                }
            });
        });
    }

    buildForm();
});
