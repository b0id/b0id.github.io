// Helper functions for mobile interactions

export const enableMobileTouchEvents = () => {
  // Force all content to be clickable
  const makeElementsClickable = () => {
    // Target specific elements that need to be clickable
    const elementsToFix = [
      '.content-area.mobile',
      '.page-container',
      '.content-section',
      'a', 'button', 'input', 'textarea', 'select'
    ];
    
    // Apply click-friendly styles to all target elements
    elementsToFix.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        el.style.pointerEvents = 'auto';
        el.style.cursor = 'auto';
        el.style.touchAction = 'auto';
        el.style.userSelect = 'auto';
      });
    });
    
    // Fix the main content area specifically
    const mobileContent = document.querySelector('.content-area.mobile');
    if (mobileContent) {
      mobileContent.style.pointerEvents = 'auto';
      mobileContent.style.zIndex = '10';
      mobileContent.style.position = 'relative';
      mobileContent.style.overflowY = 'auto';
      mobileContent.style.touchAction = 'auto';
      mobileContent.style.webkitOverflowScrolling = 'touch';
      mobileContent.style.height = 'auto';
      
      // Add direct event listener
      mobileContent.addEventListener('touchstart', e => {
        e.stopPropagation();
      }, { passive: true });
    }
    
    // Make sure footer is visible
    const footer = document.querySelector('.site-footer');
    if (footer) {
      footer.style.display = 'block';
      footer.style.visibility = 'visible';
      footer.style.position = 'relative';
      footer.style.zIndex = '50';
    }
  };
  
  // Run fix immediately and after a delay to ensure it applies after DOM updates
  makeElementsClickable();
  setTimeout(makeElementsClickable, 500);
  
  // Also run after scroll/touch events
  document.addEventListener('touchstart', () => {
    setTimeout(makeElementsClickable, 100);
  }, { passive: true });
  
  document.addEventListener('scroll', () => {
    setTimeout(makeElementsClickable, 100);
  }, { passive: true });
  
  // Force enable scrolling on body
  document.body.style.overflow = 'auto';
  document.body.style.height = 'auto';
  document.documentElement.style.overflow = 'auto';
  document.documentElement.style.height = 'auto';
};