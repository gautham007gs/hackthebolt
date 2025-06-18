import React, { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'HackTheShell - Master Cybersecurity Skills',
  description = 'Learn cybersecurity through hands-on tutorials, labs, and expert-designed courses. Master penetration testing, network security, and ethical hacking.',
  keywords = 'cybersecurity, ethical hacking, penetration testing, network security, cyber education, infosec training',
  ogImage = '/og-image.jpg',
  canonical
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    const updateMetaTag = (name: string, content: string, attribute: string = 'name') => {
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('og:title', title, 'property');
    updateMetaTag('og:description', description, 'property');
    updateMetaTag('og:image', ogImage, 'property');
    updateMetaTag('og:type', 'website', 'property');
    updateMetaTag('twitter:card', 'summary_large_image', 'name');
    updateMetaTag('twitter:title', title, 'name');
    updateMetaTag('twitter:description', description, 'name');
    updateMetaTag('twitter:image', ogImage, 'name');

    // Update canonical URL if provided
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', canonical);
    }
  }, [title, description, keywords, ogImage, canonical]);

  return null;
};

export default SEOHead;