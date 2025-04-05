document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('nav');
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      nav.classList.toggle('active');
    });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
        if (nav.classList.contains('active')) {
          nav.classList.remove('active');
        }
      }
    });
  });
  
  // Animate stats when in viewport (if applicable)
  const stats = document.querySelectorAll('.stat-number');
  if (stats.length > 0) {
    const animateStats = () => {
      stats.forEach(stat => {
        const statValue = parseFloat(stat.getAttribute('data-value'));
        const suffix = stat.getAttribute('data-suffix') || '';
        if (isElementInViewport(stat) && !stat.classList.contains('animated')) {
          animateValue(stat, 0, statValue, 1500, suffix);
          stat.classList.add('animated');
        }
      });
    };
    function isElementInViewport(el) {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }
    function animateValue(obj, start, end, duration, suffix) {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        obj.innerHTML = value + suffix;
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
    animateStats();
    window.addEventListener('scroll', animateStats);
  }
});
