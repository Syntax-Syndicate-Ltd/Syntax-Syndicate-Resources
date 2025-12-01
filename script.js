// JavaScript for Syntax Syndicate Landing Page

// DOM Elements
const loadingScreen = document.getElementById('loadingScreen');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');
const backToTopBtn = document.getElementById('backToTop');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelector('.nav-links');
const particlesContainer = document.getElementById('particles');
const roadmapGrid = document.querySelector('.roadmap-grid');

// Roadmap Data with Links
const roadmaps = [
    {
        id: 1,
        title: "Graphic Engineer Roadmap",
        description: "Master design tools, UI/UX principles, and visual communication for a career in graphic engineering.",
        icon: "fas fa-palette",
        level: "Intermediate",
        color: "#ff6b6b",
        link: "graphic_Engineer.html"
    },
    {
        id: 2,
        title: "DevOps Engineer Roadmap",
        description: "Learn CI/CD, cloud infrastructure, containerization, and automation for DevOps roles.",
        icon: "fas fa-server",
        level: "Advanced",
        color: "#48dbfb",
        link: "devops.html"
    },
    {
        id: 3,
        title: "Software Development Engineer (SDE) Roadmap",
        description: "Comprehensive path covering algorithms, system design, and full-stack development.",
        icon: "fas fa-laptop-code",
        level: "Beginner to Advanced",
        color: "#1dd1a1",
        link: "SDE.html"
    },
    {
        id: 4,
        title: "Web Development Roadmap",
        description: "From HTML/CSS basics to advanced JavaScript frameworks and modern web technologies.",
        icon: "fas fa-code",
        level: "Beginner",
        color: "#f368e0",
        link: "webdev.html"
    },
    {
        id: 5,
        title: "AI Architecture Roadmap",
        description: "Explore machine learning, neural networks, and AI system design for AI architect roles.",
        icon: "fas fa-brain",
        level: "Advanced",
        color: "#ff9f43",
        link: "Ai_Architecture.html"
    }
];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Simulate loading screen
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
    }, 1500);
    
    // Create particles
    createParticles();
    
    // Generate roadmap cards
    generateRoadmapCards();
    
    // Initialize animations
    initAnimations();
    
    // Initialize counters
    initCounters();
    
    // Set up mobile menu
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    // Set up theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Set up back to top button
    window.addEventListener('scroll', handleScroll);
    backToTopBtn.addEventListener('click', scrollToTop);
    
    // Set up smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // Handle nav link active state on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Add typing effect to loading text
    initTypingEffect();
});

// Create animated particles in background
function createParticles() {
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random size
        const size = Math.random() * 4 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random animation
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        particle.style.animation = `float ${duration}s infinite ease-in-out ${delay}s`;
        
        // Random opacity
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        
        // Random color based on theme
        const colors = ['#00d9ff', '#9d00ff', '#ff00aa'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.backgroundColor = color;
        
        particlesContainer.appendChild(particle);
    }
}

// Generate roadmap cards with links
function generateRoadmapCards() {
    roadmapGrid.innerHTML = '';
    
    roadmaps.forEach((roadmap, index) => {
        // Create card container
        const cardWrapper = document.createElement('a');
        cardWrapper.href = roadmap.link;
        cardWrapper.className = 'roadmap-card fade-in';
        cardWrapper.style.animationDelay = `${index * 0.1}s`;
        
        cardWrapper.innerHTML = `
            <div class="roadmap-icon">
                <i class="${roadmap.icon}"></i>
            </div>
            <h3 class="roadmap-title">${roadmap.title}</h3>
            <p class="roadmap-description">${roadmap.description}</p>
            <div class="roadmap-meta">
                <span class="roadmap-level">${roadmap.level}</span>
                <div class="roadmap-arrow">
                    <i class="fas fa-arrow-right"></i>
                </div>
            </div>
        `;
        
        roadmapGrid.appendChild(cardWrapper);
    });
}

// Initialize animations on scroll
function initAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .zoom-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize counter animations
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        };
        
        // Start counter when in view
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCounter();
                observer.unobserve(counter);
            }
        });
        
        observer.observe(counter);
    });
}

// Toggle mobile menu
function toggleMobileMenu() {
    navLinks.classList.toggle('active');
    
    if (navLinks.classList.contains('active')) {
        mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
        mobileMenuBtn.style.color = 'var(--accent-primary)';
    } else {
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        mobileMenuBtn.style.color = '';
    }
}

// Toggle theme between dark and light
function toggleTheme() {
    document.body.classList.toggle('light-theme');
    
    if (document.body.classList.contains('light-theme')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        themeToggle.setAttribute('aria-label', 'Switch to dark theme');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        themeToggle.setAttribute('aria-label', 'Switch to light theme');
    }
    
    // Update particles for new theme
    updateParticlesForTheme();
}

// Update particles for current theme
function updateParticlesForTheme() {
    const particles = document.querySelectorAll('.particle');
    const isLightTheme = document.body.classList.contains('light-theme');
    
    particles.forEach(particle => {
        // Update particle colors based on theme
        const colors = isLightTheme 
            ? ['#0066ff', '#7700ff', '#ff0088'] 
            : ['#00d9ff', '#9d00ff', '#ff00aa'];
        
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.backgroundColor = color;
    });
}

// Handle scroll events
function handleScroll() {
    // Show/hide back to top button
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
    
    // Update navbar background on scroll
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
        
        if (document.body.classList.contains('light-theme')) {
            navbar.style.background = 'rgba(248, 250, 255, 0.95)';
        }
    } else {
        navbar.style.background = '';
        navbar.style.backdropFilter = '';
    }
}

// Update active nav link on scroll
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add parallax effect to floating shapes
window.addEventListener('scroll', function() {
    const shapes = document.querySelectorAll('.shape');
    const scrollPosition = window.scrollY;
    
    shapes.forEach((shape, index) => {
        const speed = 0.2 + (index * 0.1);
        const yPos = scrollPosition * speed;
        shape.style.transform = `translateY(${yPos}px) rotate(${index * 45}deg)`;
    });
});

// Add typing effect to loading text
function initTypingEffect() {
    const loadingText = document.querySelector('.loading-text');
    const dots = document.querySelector('.loading-dots');
    const text = "Initializing Syntax Syndicate";
    
    // Clear any existing text
    loadingText.textContent = '';
    
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            loadingText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            // Start dots animation after text is typed
            dots.style.display = 'inline-block';
        }
    }
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 300);
}

// Add hover effect to roadmap cards (using CSS instead of JS for smoother performance)
// Removed the problematic JS hover effect that was causing glitches

// Add click effect to roadmap cards
document.addEventListener('click', function(e) {
    if (e.target.closest('.roadmap-card')) {
        const card = e.target.closest('.roadmap-card');
        card.style.transform = 'translateY(-5px) scale(0.98)';
        
        // Reset after animation
        setTimeout(() => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        }, 150);
    }
});

// Initialize floating cards animation
function initFloatingCards() {
    const floatingCards = document.querySelectorAll('.floating-card');
    
    floatingCards.forEach((card, index) => {
        // Add random rotation to each card
        const rotation = (index * 30) - 45;
        card.style.transform = `rotate(${rotation}deg)`;
        
        // Add hover effect
        card.addEventListener('mouseenter', function() {
            this.style.transform = `rotate(0deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = `rotate(${rotation}deg) translateY(0)`;
        });
    });
}

// Initialize floating cards on load
window.addEventListener('load', initFloatingCards);

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const x = e.clientX - e.target.getBoundingClientRect().left;
        const y = e.clientY - e.target.getBoundingClientRect().top;
        
        const ripple = document.createElement('span');
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);