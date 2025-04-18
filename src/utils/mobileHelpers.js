/**
 * Mobile Touch Event Helpers
 * Functions to help with mobile touch and scrolling issues
 */

/**
 * Enables touch events and fixes scrolling issues on mobile devices
 * Call this function when routing to a new page on mobile
 */
export const enableMobileTouchEvents = () => {
  // Ensure body and html are scrollable
  document.body.style.overflow = 'auto';
  document.body.style.height = 'auto';
  document.body.style.position = 'static';
  document.documentElement.style.overflow = 'auto';
  document.documentElement.style.height = 'auto';
  
  // Make sure all potential scrolling containers are accessible
  const scrollContainers = [
    '.content-area',
    '.page-container',
    '.main-layout',
    '.site-wrapper',
  ];
  
  scrollContainers.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      if (el) {
        el.style.overflow = 'visible';
        el.style.height = 'auto';
        el.style.position = 'relative';
        el.style.touchAction = 'auto';
        el.style.webkitOverflowScrolling = 'touch';
        el.style.pointerEvents = 'auto';
      }
    });
  });
  
  // Make sure all interactive elements are clickable/tappable
  const interactiveElements = document.querySelectorAll('a, button, input, [role="button"]');
  interactiveElements.forEach(el => {
    el.style.pointerEvents = 'auto';
    el.style.touchAction = 'auto';
    el.style.position = 'relative';
    el.style.zIndex = '10';
  });
  
  // Fix any specific problematic elements
  const qbertContainer = document.querySelector('.qbert-container.mobile');
  if (qbertContainer) {
    qbertContainer.style.touchAction = 'none';
    qbertContainer.style.position = 'relative';
  }
  
  // Add passive scrolling for better performance
  const preventDefaultOnTouchMove = (e) => {
    // Allow scrolling on scrollable elements
    const targetEl = e.target;
    const isScrollable = 
      targetEl.scrollHeight > targetEl.clientHeight ||
      targetEl.scrollWidth > targetEl.clientWidth;
      
    // Only prevent default if not scrollable
    if (!isScrollable) {
      e.preventDefault();
    }
  };
  
  // Clean up any existing listeners first
  document.removeEventListener('touchmove', preventDefaultOnTouchMove, { passive: false });
  
  // Add the event listener with passive: true for better performance
  document.addEventListener('touchmove', () => {}, { passive: true });
  
  // Fix iOS Safari 100vh issue
  const fixIOSHeight = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };
  
  fixIOSHeight();
  window.addEventListener('resize', fixIOSHeight);
  
  return () => {
    // Clean up function if needed
    window.removeEventListener('resize', fixIOSHeight);
  };
};

/**
 * Enables regular content scrolling and disables any other touch handlers
 * that might be interfering
 */
export const enableContentScrolling = () => {
  // Find the mobile content area
  const mobileContent = document.querySelector('.content-area.mobile');
  if (!mobileContent) return;
  
  // Enable scrolling
  mobileContent.style.overflow = 'auto';
  mobileContent.style.webkitOverflowScrolling = 'touch';
  mobileContent.style.touchAction = 'auto';
  mobileContent.style.pointerEvents = 'auto';
  
  // Make sure the page container is scrollable
  const pageContainer = mobileContent.querySelector('.page-container');
  if (pageContainer) {
    pageContainer.style.touchAction = 'auto';
    pageContainer.style.pointerEvents = 'auto';
  }
};

/**
 * Call this function on initial load and after any route changes
 */
export const setupMobileView = () => {
  if (window.innerWidth <= 768) {
    enableMobileTouchEvents();
    enableContentScrolling();
    
    // Re-apply after animations complete
    setTimeout(() => {
      enableMobileTouchEvents();
      enableContentScrolling();
    }, 300);
  }
};

export default {
  enableMobileTouchEvents,
  enableContentScrolling,
  setupMobileView
};