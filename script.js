document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Reveal Animations on Scroll
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.95; // increased slightly to show earlier
        
        revealElements.forEach(el => {
            const boxTop = el.getBoundingClientRect().top;
            if (boxTop < triggerBottom) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    
    // Initial check with a slight delay to ensure rendering is complete
    setTimeout(revealOnScroll, 100);

    // Smooth Scrolling for Links
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

    // Handle Contact Form (Simulation)
    const contactForm = document.getElementById('homeContactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            if (btn) {
                const originalText = btn.innerHTML;
                
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                btn.disabled = true;

                setTimeout(() => {
                    btn.innerHTML = '<i class="fas fa-check-circle"></i> Sent Successfully!';
                    btn.classList.replace('btn-primary-gradient', 'btn-success');
                    contactForm.reset();
                    
                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.classList.replace('btn-success', 'btn-primary-gradient');
                        btn.disabled = false;
                    }, 3000);
                }, 2000);
            }
        });
    }
});
