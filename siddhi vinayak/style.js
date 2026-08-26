
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Navigation Scroll Effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Intersection Observer for Scroll Animations (The BMW Fade-in feel)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const scrollElements = document.querySelectorAll('[data-scroll]');
    scrollElements.forEach(el => observer.observe(el));

    // 3. Number Counter Animation for Stats
    const statsSection = document.querySelector('.stats-strip');
    let counted = false;

    const statsObserver = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting && !counted) {
            counted = true;
            document.querySelectorAll('.stat-item .number').forEach(num => {
                const target = +num.getAttribute('data-target');
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); 
                
                let current = 0;
                const updateCount = () => {
                    current += increment;
                    if(current < target) {
                        num.innerText = Math.ceil(current);
                        requestAnimationFrame(updateCount);
                    } else {
                        num.innerText = target + "+";
                    }
                };
                updateCount();
            });
        }
    }, { threshold: 0.5 });

    if(statsSection) statsObserver.observe(statsSection);
});