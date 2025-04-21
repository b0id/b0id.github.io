import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// MetaHead component for managing social metadata/Open Graph tags
const MetaHead = ({ 
  title = "b0id.dev | A Digital Polymath Playground",
  description = "Exploring the intersections of nursing, electronics, engineering, and science through the lens of emergent behavior.",
  image = "/115111701.jpeg", // Default to your profile image
  url = "https://b0id-github-io.vercel.app",
  type = "website"
}) => {
  const location = useLocation();
  const currentUrl = `${url}${location.pathname}`;
  
  // Image URL must be absolute for social sharing
  const absoluteImageUrl = image.startsWith('http') 
    ? image 
    : `${url}${image.startsWith('/') ? '' : '/'}${image}`;


  useEffect(() => {
    // Update the document title
    document.title = title;
    
    // Find or create meta tags
    const updateMetaTag = (name, content) => {
      let meta = document.querySelector(`meta[name="${name}"]`) || 
                document.querySelector(`meta[property="${name}"]`);
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(name.includes('og:') ? 'property' : 'name', name);
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };
    updateMetaTag('og:image:width', '400');
    updateMetaTag('og:image:height', '400');
    // Standard meta tags
    updateMetaTag('description', description);
    
    // Open Graph meta tags
    updateMetaTag('og:title', title);
    updateMetaTag('og:description', description);
    updateMetaTag('og:image', absoluteImageUrl);
    updateMetaTag('og:url', currentUrl);
    updateMetaTag('og:type', type);
    
    // Twitter Card meta tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', absoluteImageUrl);
    
    // Cleanup function to remove any tags we might have added if component unmounts
    return () => {
      // No cleanup needed as we're just updating existing tags
    };
  }, [title, description, absoluteImageUrl, currentUrl, type]);

  // This component doesn't render anything
  return null;
};

export default MetaHead;