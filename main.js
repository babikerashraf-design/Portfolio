/* ==========================================================================
   Ashraf Babiker Portfolio — Bilingual Switcher & Interactive Utilities
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const siteNav = document.querySelector('.site-nav');

  if (mobileMenuBtn && siteNav) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
      siteNav.classList.toggle('active');
    });

    // Close menu when clicking nav links
    siteNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        siteNav.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Language Switcher Logic
  const langEnBtn = document.getElementById('lang-en');
  const langDeBtn = document.getElementById('lang-de');
  const htmlTag = document.documentElement;

  // Retrieve saved language preference if available
  const savedLang = localStorage.getItem('portfolio_lang') || 'en';
  setLanguage(savedLang);

  if (langEnBtn && langDeBtn) {
    langEnBtn.addEventListener('click', () => setLanguage('en'));
    langDeBtn.addEventListener('click', () => setLanguage('de'));
  }

  function setLanguage(lang) {
    htmlTag.setAttribute('lang', lang);
    htmlTag.setAttribute('data-lang', lang);

    if (lang === 'de') {
      langDeBtn.classList.add('active');
      langEnBtn.classList.remove('active');
    } else {
      langEnBtn.classList.add('active');
      langDeBtn.classList.remove('active');
    }

    // Translate all elements with data-en and data-de attributes
    const translatableElements = document.querySelectorAll('[data-en][data-de]');
    translatableElements.forEach(el => {
      const text = el.getAttribute(`data-${lang}`);
      if (text) {
        // If the element contains child HTML tags, use innerHTML, otherwise textContent
        if (el.children.length > 0 && el.tagName !== 'BUTTON' && el.tagName !== 'A') {
          // For complex inner structures if any
          el.textContent = text;
        } else {
          el.textContent = text;
        }
      }
    });

    // Update placeholders for inputs
    const inputsWithPlaceholder = document.querySelectorAll('input[placeholder], textarea[placeholder]');
    inputsWithPlaceholder.forEach(input => {
      if (lang === 'de') {
        if (input.id === 'name') input.placeholder = 'Max Mustermann';
        if (input.id === 'email') input.placeholder = 'max@beispiel.de';
        if (input.id === 'message') input.placeholder = 'Hallo Ashraf, wir haben eine Vakanz...';
      } else {
        if (input.id === 'name') input.placeholder = 'John Doe';
        if (input.id === 'email') input.placeholder = 'john@example.com';
        if (input.id === 'message') input.placeholder = 'Hello Ashraf, we have an opening...';
      }
    });

    localStorage.setItem('portfolio_lang', lang);
  }

  // Update Footer Year automatically
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});

// Contact Form Handling (Simulated feedback mechanism)
function handleFormSubmit(event) {
  event.preventDefault();
  const formFeedback = document.getElementById('form-feedback');
  const currentLang = document.documentElement.getAttribute('lang') || 'en';

  const successMessage = currentLang === 'de' 
    ? 'Vielen Dank für Ihre Nachricht! Ihre Anfrage wurde erfolgreich übermittelt. Ich werde mich zeitnah bei Ihnen melden.' 
    : 'Thank you for your message! Your inquiry has been sent successfully. I will get back to you shortly.';

  if (formFeedback) {
    formFeedback.textContent = successMessage;
    formFeedback.style.color = 'var(--color-success)';
  }

  event.target.reset();
}