// Helper functions for mobile interactions

export const enableMobileTouchEvents = () => {
  // Only run on mobile
  if (window.innerWidth > 768) return;
  
  // Add passive touch listeners to enable scrolling
  document.addEventListener('touchstart', () => {}, { passive: true });
  document.addEventListener('touchmove', () => {}, { passive: true });
  
  // Find mobile content area and ensure it's tappable
  const mobileContentArea = document.querySelector('.content-area.mobile');
  if (mobileContentArea) {
    mobileContentArea.style.touchAction = 'auto';
    mobileContentArea.style.overflowY = 'auto';
    mobileContentArea.style.webkitOverflowScrolling = 'touch';
  }
};