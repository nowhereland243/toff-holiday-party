document.addEventListener('DOMContentLoaded', () => {
    // Loader
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 1000); // Artificial delay for effect

    // Custom Cursor
    const cursor = document.createElement('div');
    cursor.classList.add('cursor-dot');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Hover effects for cursor
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
            cursor.style.backgroundColor = 'transparent';
            cursor.style.border = '1px solid white';
        });
        link.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.backgroundColor = 'white';
            cursor.style.border = 'none';
        });
    });
});
