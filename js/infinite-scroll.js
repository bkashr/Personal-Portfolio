document.addEventListener('DOMContentLoaded', () => {
    // Progress bar
    const progressBar = document.querySelector('.progress-bar');
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = `${scrolled}%`;
    });

    // Fade in animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });

    // Cursor elements
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.custom-cursor-dot');

    // Cursor movement
    document.addEventListener('mousemove', (e) => {
        // Add requestAnimationFrame for smooth movement
        requestAnimationFrame(() => {
            // Main cursor follows with slight delay
            cursor.style.transform = `translate(${e.clientX - 15}px, ${e.clientY - 15}px)`;
            // Dot follows cursor exactly
            cursorDot.style.transform = `translate(${e.clientX - 2}px, ${e.clientY - 2}px)`;
        });
    });

    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .work-item, .brutalist-link');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });

    // Hide cursor when it leaves the window
    document.addEventListener('mouseleave', () => {
        cursor.style.display = 'none';
        cursorDot.style.display = 'none';
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.display = 'block';
        cursorDot.style.display = 'block';
    });

    // Dynamic tagline
    const taglines = [
        "Building data-driven solutions",
        "Crafting user experiences",
        "Analyzing patterns",
        "Creating insights"
    ];
    
    const tagText = document.querySelector('.tag-text');
    let currentTag = 0;
    let currentChar = 0;
    let isDeleting = false;
    
    function typeTag() {
        const current = taglines[currentTag];
        
        if (isDeleting) {
            tagText.textContent = current.substring(0, currentChar--);
        } else {
            tagText.textContent = current.substring(0, currentChar++);
        }
        
        if (!isDeleting && currentChar === current.length) {
            isDeleting = true;
            setTimeout(typeTag, 2000);
            return;
        }
        
        if (isDeleting && currentChar === 0) {
            isDeleting = false;
            currentTag = (currentTag + 1) % taglines.length;
        }
        
        const speed = isDeleting ? 50 : 100;
        setTimeout(typeTag, speed);
    }
    
    typeTag();

    // Scroll progress
    const scrollLine = document.querySelector('.scroll-line');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = scrolled / maxScroll;
        
        scrollLine.style.transform = `scaleY(${scrollPercent})`;
    });
}); 