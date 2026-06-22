document.addEventListener('DOMContentLoaded', () => {

  // =====================
  // Fade-in: Intersection Observer
  // =====================
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length) {
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    fadeEls.forEach((el) => fadeObserver.observe(el));
  }

  // Stagger delay for empathy list items
  const empathyItems = document.querySelectorAll('.s-empathy__item');
  empathyItems.forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.1}s`;
  });

  // =====================
  // FAQ Accordion
  // =====================
  const faqTriggers = document.querySelectorAll('.faq-trigger');
  faqTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const answer = trigger.nextElementSibling;
      const isOpen = trigger.classList.contains('is-open');

      faqTriggers.forEach((t) => {
        t.classList.remove('is-open');
        t.setAttribute('aria-expanded', 'false');
        const a = t.nextElementSibling;
        if (a && a.classList.contains('faq-answer')) {
          a.classList.remove('is-open');
        }
      });

      if (!isOpen) {
        trigger.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
        answer.classList.add('is-open');
      }
    });
  });

  // =====================
  // Ingredient Accordion
  // =====================
  const accordionBtns = document.querySelectorAll('.accordion-btn');
  accordionBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const isOpen = btn.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      btn.nextElementSibling.classList.toggle('is-open');
    });
  });

  // =====================
  // Fixed Footer CTA
  // =====================
  const fixedCta = document.querySelector('.fixed-cta');
  const fvSection = document.querySelector('.s-fv');
  const finalCta = document.querySelector('.s-cta');

  if (!fixedCta || !fvSection) return;

  let fvPassed = false;
  let ctaVisible = false;

  const fvObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      fvPassed = !entry.isIntersecting;
      updateFixedCta();
    });
  }, { threshold: 0.05 });

  const ctaObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      ctaVisible = entry.isIntersecting;
      updateFixedCta();
    });
  }, { threshold: 0.1 });

  function updateFixedCta() {
    if (fvPassed && !ctaVisible) {
      fixedCta.classList.add('is-visible');
    } else {
      fixedCta.classList.remove('is-visible');
    }
  }

  fvObserver.observe(fvSection);
  if (finalCta) ctaObserver.observe(finalCta);

});
