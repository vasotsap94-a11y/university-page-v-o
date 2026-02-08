// ===========================
// Smooth Scrolling for Navigation
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===========================
// Program Filtering (Academics Page)
// ===========================
if (document.querySelector('.programs-layout')) {
    const searchInput = document.getElementById('searchInput');
    const degreeFilters = document.querySelectorAll('.degree-filter');
    const deptFilters = document.querySelectorAll('.dept-filter');
    const modeFilters = document.querySelectorAll('.mode-filter');
    const programCards = document.querySelectorAll('.program-card-detailed');

    function filterPrograms() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const selectedDegrees = Array.from(degreeFilters)
            .filter(cb => cb.checked)
            .map(cb => cb.value);
        const selectedDepts = Array.from(deptFilters)
            .filter(cb => cb.checked)
            .map(cb => cb.value);
        const selectedModes = Array.from(modeFilters)
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        programCards.forEach(card => {
            const degree = card.getAttribute('data-degree');
            const dept = card.getAttribute('data-dept');
            const mode = card.getAttribute('data-mode');
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('.program-description').textContent.toLowerCase();

            const matchesDegree = selectedDegrees.length === 0 || selectedDegrees.includes(degree);
            const matchesDept = selectedDepts.length === 0 || selectedDepts.includes(dept);
            const matchesMode = selectedModes.length === 0 || selectedModes.includes(mode);
            const matchesSearch = searchTerm === '' || title.includes(searchTerm) || description.includes(searchTerm);

            if (matchesDegree && matchesDept && matchesMode && matchesSearch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', filterPrograms);
    }
    
    degreeFilters.forEach(filter => filter.addEventListener('change', filterPrograms));
    deptFilters.forEach(filter => filter.addEventListener('change', filterPrograms));
    modeFilters.forEach(filter => filter.addEventListener('change', filterPrograms));
}

// Clear Filters Function
function clearFilters() {
    const searchInput = document.getElementById('searchInput');
    const allFilters = document.querySelectorAll('.filter-checkbox input[type="checkbox"]');
    
    if (searchInput) {
        searchInput.value = '';
    }
    
    allFilters.forEach(filter => {
        filter.checked = true;
    });
    
    // Re-show all cards
    const programCards = document.querySelectorAll('.program-card-detailed');
    programCards.forEach(card => {
        card.style.display = 'block';
    });
}

// ===========================
// Contact Form Handling
// ===========================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // In a real application, you would send this data to a server
        console.log('Form submitted:', formData);
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
}

// ===========================
// Navbar Scroll Effect
// ===========================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});

// ===========================
// Animate Elements on Scroll
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards and sections
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.program-card, .news-card, .step-card, .financial-card, .contact-card, .program-card-detailed'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ===========================
// Mobile Menu Toggle (for future enhancement)
// ===========================
// This can be implemented if you add a hamburger menu for mobile
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// ===========================
// Form Validation Enhancement
// ===========================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

if (contactForm) {
    const emailInput = document.getElementById('email');
    
    emailInput.addEventListener('blur', function() {
        if (this.value && !validateEmail(this.value)) {
            this.style.borderColor = '#ef4444';
            if (!this.nextElementSibling || !this.nextElementSibling.classList.contains('error-message')) {
                const errorMsg = document.createElement('span');
                errorMsg.className = 'error-message';
                errorMsg.style.color = '#ef4444';
                errorMsg.style.fontSize = '0.875rem';
                errorMsg.style.marginTop = '0.25rem';
                errorMsg.textContent = 'Please enter a valid email address';
                this.parentElement.appendChild(errorMsg);
            }
        } else {
            this.style.borderColor = '#e2e8f0';
            const errorMsg = this.parentElement.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.remove();
            }
        }
    });
}

// ===========================
// Lazy Loading for Images (if images are added)
// ===========================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===========================
// Console Welcome Message
// ===========================
console.log('%c🎓 University Web Presence', 'color: #0ea5e9; font-size: 20px; font-weight: bold;');
console.log('%cEmpowering minds, shaping futures.', 'color: #64748b; font-size: 14px;');
