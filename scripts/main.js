// Scroll-triggered animations
document.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('.fade-in');

  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const sectionBottom = section.getBoundingClientRect().bottom;

    // If the section is in the viewport
    if (sectionTop < window.innerHeight * 0.8 && sectionBottom > 0) {
      section.classList.add('visible');
    } else {
      section.classList.remove('visible');
    }
  });
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();

    const targetId = anchor.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });
});

// Interactive Project Cards
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.querySelector('h3').style.color = '#007bff';
    card.querySelector('p').style.opacity = '1';
  });

  card.addEventListener('mouseleave', () => {
    card.querySelector('h3').style.color = '#222';
    card.querySelector('p').style.opacity = '0.8';
  });
});

// Dark Mode Toggle
const darkModeToggle = document.querySelector('.dark-mode-toggle');
const toggleIcon = document.querySelector('.toggle-icon');

// Check for saved user preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
  toggleIcon.textContent = '☀️'; // Sun icon for light mode
}

// Toggle Dark Mode
if (darkModeToggle) {
  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');

    // Save user preference
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

    // Update toggle icon
    toggleIcon.textContent = isDarkMode ? '☀️' : '🌙';
  });
}

// Animate Skill Progress Bars
const skillsSection = document.getElementById('skills');

if (skillsSection) {
  const skillProgressBars = document.querySelectorAll('.skill-progress');

  const animateProgressBars = () => {
    skillProgressBars.forEach(bar => {
      const progress = bar.getAttribute('data-progress');
      bar.style.width = `${progress}%`;
    });
  };

  const handleScroll = () => {
    const sectionTop = skillsSection.getBoundingClientRect().top;
    const sectionBottom = skillsSection.getBoundingClientRect().bottom;

    // If the section is in the viewport
    if (sectionTop < window.innerHeight * 0.8 && sectionBottom > 0) {
      animateProgressBars();
      window.removeEventListener('scroll', handleScroll); // Stop listening after animation
    }
  };

  window.addEventListener('scroll', handleScroll);
}

// Testimonials Carousel
const testimonialsCarousel = document.querySelector('.testimonials-carousel');
const testimonials = document.querySelectorAll('.testimonial');
const prevButton = document.querySelector('.carousel-prev');
const nextButton = document.querySelector('.carousel-next');

let currentIndex = 0;

const showTestimonial = (index) => {
  testimonials.forEach((testimonial, i) => {
    testimonial.style.transform = `translateX(${100 * (i - index)}%)`;
  });
};

prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex > 0) ? currentIndex - 1 : testimonials.length - 1;
  showTestimonial(currentIndex);
});

nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex < testimonials.length - 1) ? currentIndex + 1 : 0;
  showTestimonial(currentIndex);
});

// Initialize the first testimonial
showTestimonial(currentIndex);

// Contact Form Validation
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = contactForm.querySelector('input[type="text"]');
    const email = contactForm.querySelector('input[type="email"]');
    const message = contactForm.querySelector('textarea');

    let isValid = true;

    // Validate Name
    if (name.value.trim() === '') {
      isValid = false;
      name.classList.add('error');
    } else {
      name.classList.remove('error');
    }

    // Validate Email
    if (!validateEmail(email.value.trim())) {
      isValid = false;
      email.classList.add('error');
    } else {
      email.classList.remove('error');
    }

    // Validate Message
    if (message.value.trim() === '') {
      isValid = false;
      message.classList.add('error');
    } else {
      message.classList.remove('error');
    }

    // Submit Form if Valid
    if (isValid) {
      alert('Thank you for your message!');
      contactForm.reset();
    }
  });
}

// Email Validation Function
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}