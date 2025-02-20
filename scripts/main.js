document.addEventListener('DOMContentLoaded', function () {
  // Fade-In Animation Using IntersectionObserver
  const fadeInElements = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        entry.target.style.transitionDelay = `${index * 0.2}s`; // Staggered effect
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  fadeInElements.forEach(element => observer.observe(element));

  // Interactive Project Cards
  document.querySelectorAll('.project-card').forEach(card => {
    const title = card.querySelector('h3');
    const paragraph = card.querySelector('p');

    card.addEventListener('mouseenter', () => {
      if (title) title.style.color = '#007bff';
      if (paragraph) paragraph.style.opacity = '1';
    });

    card.addEventListener('mouseleave', () => {
      if (title) title.style.color = '#222';
      if (paragraph) paragraph.style.opacity = '0.8';
    });
  });

  // Dark Mode Toggle
  const darkModeToggle = document.querySelector('.dark-mode-toggle');
  const toggleIcon = document.querySelector('.toggle-icon');

  if (darkModeToggle && toggleIcon) {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark-mode');
      toggleIcon.textContent = '☀️'; // Sun icon for light mode
    }

    darkModeToggle.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark-mode');
      const isDarkMode = document.documentElement.classList.contains('dark-mode');
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
      toggleIcon.textContent = isDarkMode ? '☀️' : '🌙';
    });
  }

  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const targetElement = document.querySelector(anchor.getAttribute('href'));
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Skill Progress Bars Animation
  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          skillBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = `${progress}%`;
          });
          skillObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    skillObserver.observe(skillsSection);
  }

  // Testimonials Carousel
  const carousel = document.querySelector('.testimonials-carousel');
  const testimonials = document.querySelectorAll('.testimonial');
  const prevButton = document.querySelector('.carousel-prev');
  const nextButton = document.querySelector('.carousel-next');

  let currentIndex = 0;

  if (carousel && prevButton && nextButton && testimonials.length > 0) {
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

    showTestimonial(currentIndex);
  }

  // Contact Form Validation
  const contactForm = document.querySelector('.contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = contactForm.querySelector('input[type="text"]');
      const email = contactForm.querySelector('input[type="email"]');
      const message = contactForm.querySelector('textarea');

      let isValid = true;

      if (name.value.trim() === '') {
        isValid = false;
        name.classList.add('error');
      } else {
        name.classList.remove('error');
      }

      if (!validateEmail(email.value.trim())) {
        isValid = false;
        email.classList.add('error');
      } else {
        email.classList.remove('error');
      }

      if (message.value.trim() === '') {
        isValid = false;
        message.classList.add('error');
      } else {
        message.classList.remove('error');
      }

      if (isValid) {
        alert('Thank you for your message!');
        contactForm.reset();
      }
    });
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
});
