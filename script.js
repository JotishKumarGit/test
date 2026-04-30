// Sticky Header on Scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.padding = '10px 0';
        header.style.background = 'rgba(5, 5, 5, 0.95)';
        header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.5)';
    } else {
        header.style.padding = '15px 0';
        header.style.background = 'rgba(10, 10, 10, 0.8)';
        header.style.boxShadow = 'none';
    }
});

// Counter Animation for Stats
const stats = document.querySelectorAll('.stat-item h2');
const speed = 200;

const animateStats = () => {
    stats.forEach(counter => {
        const updateCount = () => {
            const target = +counter.innerText.replace(/[^0-9]/g, '');
            const count = +counter.getAttribute('data-count') || 0;
            const inc = target / speed;

            if (count < target) {
                const newCount = Math.ceil(count + inc);
                counter.setAttribute('data-count', newCount);
                // Preserve the suffix (+ or k or %)
                const suffix = counter.innerText.match(/[+k%]/) ? counter.innerText.match(/[+k%]/)[0] : '';
                counter.innerText = newCount + suffix;
                setTimeout(updateCount, 1);
            } else {
                // Ensure it ends exactly on target
                const suffix = counter.innerText.match(/[+k%]/) ? counter.innerText.match(/[+k%]/)[0] : '';
                counter.innerText = target + suffix;
            }
        };

        // Trigger when in view (simple implementation)
        if (counter.getBoundingClientRect().top < window.innerHeight) {
            updateCount();
        }
    });
};

// Intersection Observer for animations and stats
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('stats')) {
                animateStats();
            }
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section, .card').forEach(section => {
    observer.observe(section);
});

// Form Submission handling (Prevent default for demo)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! Our trade experts will contact you shortly.');
        contactForm.reset();
    });
}
