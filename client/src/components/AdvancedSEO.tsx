import React, { useEffect } from 'react';

interface AdvancedSEOProps {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  articleData?: {
    author: string;
    publishedTime: string;
    modifiedTime: string;
    section: string;
    tags: string[];
  };
  structuredData?: any;
  noIndex?: boolean;
}

const AdvancedSEO: React.FC<AdvancedSEOProps> = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage = '/images/og-default.jpg',
  ogType = 'website',
  articleData,
  structuredData,
  noIndex = false
}) => {
  useEffect(() => {
    // Set document title with proper length (50-60 chars optimal)
    const formattedTitle = title.length > 60 ? title.substring(0, 57) + '...' : title;
    document.title = formattedTitle;

    // Clean up existing meta tags
    const existingMetas = document.querySelectorAll('meta[data-dynamic="true"]');
    existingMetas.forEach(meta => meta.remove());

    // Clean up existing structured data
    const existingStructuredData = document.querySelectorAll('script[type="application/ld+json"]');
    existingStructuredData.forEach(script => script.remove());

    const head = document.head;

    // Basic meta tags
    const metaTags = [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
      { name: 'author', content: 'HackTheShell Team' },
      { name: 'robots', content: noIndex ? 'noindex,nofollow' : 'index,follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { name: 'theme-color', content: '#10b981' },
      
      // Open Graph tags
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: `${window.location.origin}${ogImage}` },
      { property: 'og:url', content: window.location.href },
      { property: 'og:type', content: ogType },
      { property: 'og:site_name', content: 'HackTheShell' },
      { property: 'og:locale', content: 'en_US' },
      
      // Twitter Card tags
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: `${window.location.origin}${ogImage}` },
      { name: 'twitter:creator', content: '@HackTheShell' },
      
      // Additional SEO tags
      { name: 'application-name', content: 'HackTheShell' },
      { name: 'apple-mobile-web-app-title', content: 'HackTheShell' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
      { name: 'format-detection', content: 'telephone=no' },
    ];

    // Add article-specific Open Graph tags
    if (articleData) {
      metaTags.push(
        { property: 'article:author', content: articleData.author },
        { property: 'article:published_time', content: articleData.publishedTime },
        { property: 'article:modified_time', content: articleData.modifiedTime },
        { property: 'article:section', content: articleData.section },
        ...articleData.tags.map(tag => ({ property: 'article:tag', content: tag }))
      );
    }

    // Create and append meta tags
    metaTags.forEach(({ name, property, content }) => {
      const meta = document.createElement('meta');
      if (name) meta.setAttribute('name', name);
      if (property) meta.setAttribute('property', property);
      meta.setAttribute('content', content);
      meta.setAttribute('data-dynamic', 'true');
      head.appendChild(meta);
    });

    // Add canonical URL
    if (canonicalUrl) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        head.appendChild(canonical);
      }
      canonical.setAttribute('href', canonicalUrl);
    }

    // Add structured data
    if (structuredData) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData);
      head.appendChild(script);
    }

    // Default structured data for the website
    const defaultStructuredData = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'HackTheShell',
      description: 'Master cybersecurity through hands-on tutorials, labs, and expert courses',
      url: window.location.origin,
      sameAs: [
        'https://github.com/hacktheshell',
        'https://twitter.com/hacktheshell',
        'https://linkedin.com/company/hacktheshell'
      ],
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${window.location.origin}/search?q={search_term_string}`
        },
        'query-input': 'required name=search_term_string'
      }
    };

    const defaultScript = document.createElement('script');
    defaultScript.type = 'application/ld+json';
    defaultScript.textContent = JSON.stringify(defaultStructuredData);
    head.appendChild(defaultScript);

    // Add breadcrumb structured data for non-home pages
    if (window.location.pathname !== '/') {
      const breadcrumbData = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: window.location.origin
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: title,
            item: window.location.href
          }
        ]
      };

      const breadcrumbScript = document.createElement('script');
      breadcrumbScript.type = 'application/ld+json';
      breadcrumbScript.textContent = JSON.stringify(breadcrumbData);
      head.appendChild(breadcrumbScript);
    }

    // Track page view for SEO analytics
    if (typeof window !== 'undefined') {
      // Send page view data to backend for SEO tracking
      fetch('/api/seo/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: window.location.href,
          title,
          description,
          keywords,
          referrer: document.referrer,
          userAgent: navigator.userAgent
        })
      }).catch(() => {}); // Silent fail for SEO tracking
    }

  }, [title, description, keywords, canonicalUrl, ogImage, ogType, articleData, structuredData, noIndex]);

  return null;
};

export default AdvancedSEO;