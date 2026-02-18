// Navigation scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('mainNav');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        }
    });
});

// Back to top button
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Appointment form submission
const appointmentForm = document.getElementById('appointmentForm');

if (appointmentForm) {
    appointmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(this);
        
        // Create success message
        const successMessage = document.createElement('div');
        successMessage.className = 'alert alert-success mt-3';
        successMessage.style.cssText = `
            padding: 1.5rem;
            border-radius: 10px;
            background: #d4edda;
            border: 1px solid #c3e6cb;
            color: #155724;
            animation: fadeInUp 0.5s ease;
        `;
        successMessage.innerHTML = `
            <i class="fas fa-check-circle me-2"></i>
            <strong>Success!</strong> Your appointment request has been submitted. 
            We'll contact you within 24 hours to confirm your appointment.
        `;
        
        // Show success message
        this.appendChild(successMessage);
        
        // Reset form
        this.reset();
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successMessage.style.animation = 'fadeOut 0.5s ease';
            setTimeout(() => {
                successMessage.remove();
            }, 500);
        }, 5000);
    });
}

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        
        // Create success notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 30px;
            background: #05bfdb;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
            z-index: 9999;
            animation: slideInRight 0.5s ease;
        `;
        notification.innerHTML = `
            <i class="fas fa-check-circle me-2"></i>
            Successfully subscribed to our newsletter!
        `;
        
        document.body.appendChild(notification);
        
        // Reset form
        this.reset();
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 3000);
    });
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .doctor-card, .contact-card, .feature-item').forEach(element => {
    element.style.opacity = '0';
    observer.observe(element);
});

// Counter animation for statistics
const counters = document.querySelectorAll('.stat-number');
const speed = 200;

const countUp = (counter) => {
    const target = counter.textContent.replace(/[^0-9]/g, '');
    const count = +counter.getAttribute('data-count') || 0;
    const increment = target / speed;

    if (count < target) {
        counter.setAttribute('data-count', Math.ceil(count + increment));
        counter.textContent = Math.ceil(count + increment) + (counter.textContent.includes('+') ? '+' : '');
        setTimeout(() => countUp(counter), 1);
    } else {
        counter.textContent = target + (counter.textContent.includes('+') ? '+' : '');
    }
};

const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            countUp(counter);
            statsObserver.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => {
    statsObserver.observe(counter);
});

// Form validation styling
const formInputs = document.querySelectorAll('.form-control');

formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value.trim() !== '') {
            this.style.borderColor = '#05bfdb';
        } else if (this.hasAttribute('required')) {
            this.style.borderColor = '#ef4444';
        }
    });
    
    input.addEventListener('focus', function() {
        this.style.borderColor = '#05bfdb';
    });
});

// Service card hover effect enhancement
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Doctor card social icons animation
const doctorCards = document.querySelectorAll('.doctor-card');

doctorCards.forEach(card => {
    const socialLinks = card.querySelectorAll('.doctor-social a');
    
    card.addEventListener('mouseenter', function() {
        socialLinks.forEach((link, index) => {
            setTimeout(() => {
                link.style.transform = 'translateY(-3px)';
            }, index * 50);
        });
    });
    
    card.addEventListener('mouseleave', function() {
        socialLinks.forEach(link => {
            link.style.transform = 'translateY(0)';
        });
    });
});

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.scrollY;
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection && scrolled < window.innerHeight) {
        heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Mobile menu close on click outside
document.addEventListener('click', function(event) {
    const navbar = document.querySelector('.navbar-collapse');
    const toggler = document.querySelector('.navbar-toggler');
    
    if (navbar && navbar.classList.contains('show')) {
        if (!navbar.contains(event.target) && !toggler.contains(event.target)) {
            navbar.classList.remove('show');
        }
    }
});

// Initialize tooltips if Bootstrap is loaded
if (typeof bootstrap !== 'undefined') {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

console.log('MEDINOVA Hospital Website - All scripts loaded successfully!');