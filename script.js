document.addEventListener('DOMContentLoaded', function() {
    // Type writer effect
    const typeWriterText = document.querySelector('.typewriter-text');
    const phrases = ["Software Developer", "DevOps Enthusiast", "Blogger"];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeDelay = 200;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typeWriterText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeDelay = 100;
        } else {
            typeWriterText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeDelay = 200;
        }
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typeDelay = 1000; // Delay before starting to delete
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeDelay = 500; // Delay before typing next phrase
        }
        
        setTimeout(typeEffect, typeDelay);
    }
    
    // Start the typewriter effect
    typeEffect();
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburg');
    const dropdown = document.querySelector('.dropdown');
    const cancelBtn = document.querySelector('.cancel');
    const dropdownLinks = document.querySelectorAll('.dropdown .links a');
    
    hamburger.addEventListener('click', function() {
        dropdown.classList.add('active');
    });
    
    cancelBtn.addEventListener('click', function() {
        dropdown.classList.remove('active');
    });
    
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function() {
            dropdown.classList.remove('active');
        });
    });
    
    // Navbar background change on scroll
    const navbar = document.querySelector('nav');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Section animations on scroll
        showSections();
    });
    
    // Project filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else if (card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Scroll reveal animation for sections
    function showSections() {
        const sections = document.querySelectorAll('.section-hidden');
        const triggerBottom = window.innerHeight * 0.8;
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            
            if (sectionTop < triggerBottom) {
                section.classList.add('section-show');
            }
        });
    }
    
    // Initial call to show sections that are already in view
    showSections();
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav .links a, .dropdown .links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });
    
    // Form handling with validation
    const contactForm = document.querySelector('.contact-form');
    
   if (contactForm) {const contactForm = document.querySelector('.contact-form');
        const submitBtn = contactForm.querySelector('.send-btn');
        
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();  // Prevent default form submission
        
            const isValid = contactForm.checkValidity();  // Validate the form
            if (isValid) {
                // Simulate form submission
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
                submitBtn.disabled = true;
                
                // Submit the form
                contactForm.submit();
                
                setTimeout(() => {
                    submitBtn.innerHTML = '<span>Message Sent!</span> <i class="fas fa-check"></i>';
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    }, 2000);
                }, 1500);
            }
        });
    }
    
    function highlightInvalid(input) {
        input.style.borderColor = '#ff3860';
    }
    
    function removeHighlight(input) {
        input.style.borderColor = '#ddd';
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Add animations to skill bars
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkills() {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.width = width;
                bar.style.transition = 'width 1s ease-in-out';
            }, 500);
        });
    }
    
    // Initialize AOS animations
    let aboutSection = document.getElementById('about');
    let observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                observer.unobserve(entry.target);
            }
        });
    });
    
    if (aboutSection) {
        observer.observe(aboutSection);
    }
});
