// Main JavaScript file for the portfolio website

document.addEventListener("DOMContentLoaded", function () {
  // Initialize all functionality
  initNavbarScroll();
  initSmoothScroll();
  initBackToTop();
  initContactForm();
  initAnimations();
  initCardHovers();
});

// Navbar scroll effect
function initNavbarScroll() {
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      navbar.classList.add("navbar-scrolled");
    } else {
      navbar.classList.remove("navbar-scrolled");
    }
  });
}

// Smooth scrolling for navigation links
function initSmoothScroll() {
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });

        // Close mobile menu if open
        const navbarCollapse = document.querySelector(".navbar-collapse");
        if (navbarCollapse.classList.contains("show")) {
          const navbarToggler = document.querySelector(".navbar-toggler");
          navbarToggler.click();
        }
      }
    });
  });
}

// Back to top button
function initBackToTop() {
  const backToTopButton = document.getElementById("backToTop");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 500) {
      backToTopButton.style.display = "flex";
    } else {
      backToTopButton.style.display = "none";
    }
  });

  backToTopButton.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Contact form enhancements
function initContactForm() {
  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;

    contactForm.addEventListener("submit", function (e) {
      // Add loading state
      submitButton.disabled = true;
      submitButton.innerHTML =
        '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
      submitButton.classList.add("loading");

      // Form will submit normally, but we show loading state
      setTimeout(() => {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.innerHTML = originalText;
          submitButton.classList.remove("loading");
        }
      }, 3000);
    });

    // Form validation enhancement
    const inputs = contactForm.querySelectorAll("input, textarea");
    inputs.forEach((input) => {
      input.addEventListener("blur", function () {
        validateField(this);
      });

      input.addEventListener("input", function () {
        if (this.classList.contains("is-invalid")) {
          validateField(this);
        }
      });
    });
  }
}

// Field validation
function validateField(field) {
  const value = field.value.trim();

  // Remove previous validation classes
  field.classList.remove("is-valid", "is-invalid");

  if (field.hasAttribute("required") && !value) {
    field.classList.add("is-invalid");
    return false;
  }

  if (field.type === "email" && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      field.classList.add("is-invalid");
      return false;
    }
  }

  if (value) {
    field.classList.add("is-valid");
  }

  return true;
}

// Initialize scroll animations
function initAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const elementsToAnimate = document.querySelectorAll(
    ".card, .hero-content > *, .team-card, .service-card, .portfolio-card"
  );
  elementsToAnimate.forEach((element) => {
    observer.observe(element);
  });
}

// Enhanced card hover effects
function initCardHovers() {
  const cards = document.querySelectorAll(
    ".card-hover, .team-card, .service-card, .portfolio-card"
  );

  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });
}

// Navbar active link highlight
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

// Update active nav link on scroll
window.addEventListener("scroll", updateActiveNavLink);

// Parallax effect for hero section
function initParallax() {
  const hero = document.querySelector(".hero-section");

  if (hero) {
    window.addEventListener("scroll", function () {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;

      hero.style.transform = `translateY(${rate}px)`;
    });
  }
}

// Initialize parallax on larger screens
if (window.innerWidth > 768) {
  initParallax();
}

// Typing effect for hero title
function initTypingEffect() {
  const heroTitle = document.querySelector(".hero-section h1");

  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = "";

    let i = 0;
    const typeInterval = setInterval(() => {
      heroTitle.textContent += text.charAt(i);
      i++;

      if (i > text.length) {
        clearInterval(typeInterval);
      }
    }, 50);
  }
}

// Initialize typing effect after a delay
setTimeout(initTypingEffect, 500);

// Handle form submission success/error messages
function handleFlashMessages() {
  const alerts = document.querySelectorAll(".alert");

  alerts.forEach((alert) => {
    // Auto-dismiss alerts after 5 seconds
    setTimeout(() => {
      const closeBtn = alert.querySelector(".btn-close");
      if (closeBtn) {
        closeBtn.click();
      }
    }, 5000);
  });
}

// Initialize flash message handling
handleFlashMessages();

// Lazy loading for images (if any are added later)
function initLazyLoading() {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        observer.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// Initialize lazy loading
initLazyLoading();

// Performance optimization: debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function () {
  updateActiveNavLink();
}, 10);

window.addEventListener("scroll", debouncedScrollHandler);
