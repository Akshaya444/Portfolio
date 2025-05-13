// Enhanced navigation functionality
document.addEventListener('DOMContentLoaded', () => {
  // Elements cache
  const navToggle = document.querySelector("#menu-icon");
  const navMenu = document.querySelector(".navbar");
  const headerElement = document.querySelector("header");
  const allSections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll("header nav a");
  
  // Toggle mobile menu
  const toggleMobileNav = () => {
    navToggle.classList.toggle("bx-x");
    navMenu.classList.toggle("active");
  };
  
  navToggle.addEventListener('click', toggleMobileNav);
  
  // Active section detection and navbar highlight
  const handleScroll = () => {
    // Handle sticky header
    if (window.scrollY > 120) {
      headerElement.classList.add("sticky");
    } else {
      headerElement.classList.remove("sticky");
    }
    
    // Close menu on scroll
    if (navMenu.classList.contains("active")) {
      navToggle.classList.remove("bx-x");
      navMenu.classList.remove("active");
    }
    
    // Update active navigation based on scroll position
    updateActiveNav();
  };
  
  const updateActiveNav = () => {
    const scrollPos = window.scrollY + 200;
    
    allSections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        // Remove active class from all links
        navItems.forEach(link => link.classList.remove("active"));
        
        // Add active class to current section's link
        document.querySelector(`header nav a[href*="${sectionId}"]`)?.classList.add("active");
      }
    });
  };
  
  // Register scroll event listener
  window.addEventListener('scroll', handleScroll);
  
  // Initialize ScrollReveal with custom configuration
  const initializeScrollReveal = () => {
    const sr = ScrollReveal({
      origin: 'top',
      distance: '60px',
      duration: 2200,
      delay: 300,
      easing: 'cubic-bezier(0.5, 0, 0, 1)',
      reset: false
    });
    
    // Configure reveal animations for different elements
    sr.reveal('.home-content, .heading', { 
      origin: 'top',
      interval: 200
    });
    
    sr.reveal('.home-img, .services-container, .portfolio-box, .contact form', { 
      origin: 'bottom',
      interval: 300
    });
    
    sr.reveal('.home-content h1, .about-img', { 
      origin: 'left', 
      distance: '100px',
      delay: 500
    });
    
    sr.reveal('.home-content p, .about-content', { 
      origin: 'right',
      distance: '100px',
      delay: 600
    });
  };
  
  // Initialize typing effect
  const initializeTyped = () => {
    const options = {
      strings: [
        'Web Developer',
        'UI/UX Designer',
        'AI/ML Developer'
      ],
      typeSpeed: 80,
      backSpeed: 60,
      backDelay: 1500,
      loop: true,
      cursorChar: '|'
    };
    
    new Typed('.multiple-text', options);
  };
  
  // Enable smooth scrolling for all anchor links
  const enableSmoothScrolling = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Close mobile menu if open
        if (navMenu.classList.contains("active")) {
          toggleMobileNav();
        }
        
        // Smooth scroll to target
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: 'smooth'
          });
        }
      });
    });
  };
  
  // Add light/dark mode toggle functionality
  const setupThemeToggle = () => {
    // Create theme toggle button (commented out for now, can be enabled later)
    /*
    const themeToggle = document.createElement('div');
    themeToggle.innerHTML = '<i class="bx bx-moon"></i>';
    themeToggle.classList.add('theme-toggle');
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      const icon = themeToggle.querySelector('i');
      
      if (document.body.classList.contains('light-mode')) {
        icon.classList.replace('bx-moon', 'bx-sun');
      } else {
        icon.classList.replace('bx-sun', 'bx-moon');
      }
      
      // Save preference to localStorage
      localStorage.setItem('theme', 
        document.body.classList.contains('light-mode') ? 'light' : 'dark'
      );
    });
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.body.classList.add('light-mode');
      themeToggle.querySelector('i').classList.replace('bx-moon', 'bx-sun');
    }
    */
  };
  
  // Add subtle parallax effect to home section
  const initParallaxEffect = () => {
    const homeSection = document.querySelector('.home');
    
    if (homeSection) {
      window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const profileImg = document.querySelector('.home-img img');
        const headingText = document.querySelector('.home-content h1');
        
        if (profileImg && headingText) {
          profileImg.style.transform = `translate(${mouseX * 10}px, ${mouseY * 10}px)`;
          headingText.style.textShadow = `${mouseX * 5}px ${mouseY * 5}px 8px rgba(0, 0, 0, 0.2)`;
        }
      });
    }
  };
  
  // Initialize portfolio item click handlers for future lightbox functionality
  const setupPortfolioInteractions = () => {
    const portfolioItems = document.querySelectorAll('.portfolio-box');
    
    portfolioItems.forEach(item => {
      const link = item.querySelector('.portfolio-layer a');
      
      // Add data attributes for potential filtering functionality
      const category = item.querySelector('.portfolio-layer h4').textContent.toLowerCase();
      item.setAttribute('data-category', category);
      
      // Future enhancement point for lightbox or detailed view
      if (!link.getAttribute('href') || link.getAttribute('href') === '#') {
        item.addEventListener('click', (e) => {
          if (e.target !== link && !link.contains(e.target)) {
            // Could implement lightbox or modal here in the future
          }
        });
      }
    });
  };
  
  // Initialize everything
  initializeScrollReveal();
  initializeTyped();
  enableSmoothScrolling();
  //setupThemeToggle(); // Commented out for now
  //initParallaxEffect(); // Commented out for now
  //setupPortfolioInteractions(); // Commented out for now
  
  // First page load active nav check
  setTimeout(updateActiveNav, 100);
});