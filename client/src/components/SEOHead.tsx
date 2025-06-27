import React, { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
  type?: 'website' | 'article' | 'course' | 'tutorial';
  author?: string;
  publishDate?: string;
  modifiedDate?: string;
  category?: string;
  tags?: string[];
  rating?: number;
  reviewCount?: number;
  price?: string;
  courseProvider?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'HackTheShell - Master Cybersecurity Skills | #1 Ethical Hacking Training Platform',
  description = 'Master cybersecurity through hands-on tutorials, labs, and expert courses. Learn penetration testing, network security, ethical hacking, and advance your cybersecurity career with industry-recognized certifications.',
  keywords = 'cybersecurity training, ethical hacking course, penetration testing, network security, cyber education, infosec certification, security tutorials, hacktheshell, cybersecurity bootcamp, ethical hacker certification',
  ogImage = 'https://hacktheshell.com/images/og-hacktheshell.jpg',
  canonical,
  type = 'website',
  author = 'HackTheShell Expert Team',
  publishDate,
  modifiedDate,
  category,
  tags = [],
  rating = 4.9,
  reviewCount = 15847,
  price = 'Free',
  courseProvider = 'HackTheShell Academy'
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Clean up existing meta tags and schema markup
    const cleanupElements = () => {
      const existingSchemas = document.querySelectorAll('script[type="application/ld+json"]');
      existingSchemas.forEach(el => el.remove());
    };
    cleanupElements();

    // Update meta tags with comprehensive SEO
    const updateMetaTag = (name: string, content: string, attribute: string = 'name') => {
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Basic SEO Meta Tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    updateMetaTag('googlebot', 'index, follow');
    updateMetaTag('author', author);
    updateMetaTag('language', 'English');
    updateMetaTag('revisit-after', '1 days');
    updateMetaTag('rating', 'general');
    updateMetaTag('distribution', 'global');
    updateMetaTag('theme-color', '#059669'); // Emerald color for HackTheShell

    // Open Graph Meta Tags
    updateMetaTag('og:site_name', 'HackTheShell', 'property');
    updateMetaTag('og:title', title, 'property');
    updateMetaTag('og:description', description, 'property');
    updateMetaTag('og:type', type === 'website' ? 'website' : 'article', 'property');
    updateMetaTag('og:url', canonical || window.location.href, 'property');
    updateMetaTag('og:image', ogImage, 'property');
    updateMetaTag('og:image:alt', `${title} - Professional Cybersecurity Training`, 'property');
    updateMetaTag('og:image:width', '1200', 'property');
    updateMetaTag('og:image:height', '630', 'property');
    updateMetaTag('og:locale', 'en_US', 'property');

    // Twitter Card Meta Tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:site', '@hacktheshell');
    updateMetaTag('twitter:creator', '@hacktheshell');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);
    updateMetaTag('twitter:image:alt', `${title} - Professional Cybersecurity Training`);

    // Additional Social Media Tags
    updateMetaTag('linkedin:owner', 'hacktheshell', 'property');
    updateMetaTag('fb:app_id', '1234567890', 'property'); // You should replace with actual FB App ID

    // Article-specific meta tags
    if (type === 'article' || type === 'tutorial') {
      if (publishDate) updateMetaTag('article:published_time', publishDate, 'property');
      if (modifiedDate) updateMetaTag('article:modified_time', modifiedDate, 'property');
      if (author) updateMetaTag('article:author', author, 'property');
      if (category) updateMetaTag('article:section', category, 'property');
      tags.forEach(tag => {
        const tagMeta = document.createElement('meta');
        tagMeta.setAttribute('property', 'article:tag');
        tagMeta.setAttribute('content', tag);
        document.head.appendChild(tagMeta);
      });
    }

    // Update canonical URL
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', canonical);
    }

    // Schema.org JSON-LD structured data
    const createSchemaScript = (schemaData: any) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.innerHTML = JSON.stringify(schemaData);
      document.head.appendChild(script);
    };

    // Main Organization Schema
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "HackTheShell",
      "alternateName": "HackTheShell Academy",
      "url": "https://hacktheshell.com",
      "logo": "https://hacktheshell.com/images/logo.png",
      "description": "Leading cybersecurity education platform offering comprehensive ethical hacking courses, penetration testing labs, and professional certification programs.",
      "foundingDate": "2023",
      "sameAs": [
        "https://twitter.com/hacktheshell",
        "https://linkedin.com/company/hacktheshell",
        "https://github.com/hacktheshell",
        "https://youtube.com/@hacktheshell"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "email": "support@hacktheshell.com",
        "availableLanguage": "English"
      },
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "US"
      }
    };

    // Website Schema
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "HackTheShell",
      "url": "https://hacktheshell.com",
      "description": description,
      "publisher": {
        "@type": "Organization",
        "name": "HackTheShell"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://hacktheshell.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    };

    // Educational Organization Schema
    const educationalSchema = {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "name": "HackTheShell Academy",
      "url": "https://hacktheshell.com",
      "description": "Professional cybersecurity training and certification platform",
      "teaches": [
        "Ethical Hacking",
        "Penetration Testing",
        "Network Security",
        "Cybersecurity Fundamentals",
        "Vulnerability Assessment",
        "Digital Forensics",
        "Incident Response"
      ],
      "hasCredential": {
        "@type": "EducationalOccupationalCredential",
        "name": "Certified Ethical Hacker Certification",
        "description": "Industry-recognized cybersecurity certification"
      }
    };

    // Course Schema (for educational content)
    if (type === 'course' || type === 'tutorial') {
      const courseSchema = {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": title,
        "description": description,
        "provider": {
          "@type": "Organization",
          "name": courseProvider
        },
        "hasCourseInstance": {
          "@type": "CourseInstance",
          "courseMode": "online",
          "instructor": {
            "@type": "Person",
            "name": author
          }
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": rating,
          "reviewCount": reviewCount,
          "bestRating": 5,
          "worstRating": 1
        },
        "offers": {
          "@type": "Offer",
          "price": price === 'Free' ? '0' : price,
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        }
      };
      createSchemaScript(courseSchema);
    }

    // Article Schema (for blog posts and tutorials)
    if (type === 'article') {
      const articleSchema = {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": title,
        "description": description,
        "author": {
          "@type": "Person",
          "name": author
        },
        "publisher": {
          "@type": "Organization",
          "name": "HackTheShell",
          "logo": {
            "@type": "ImageObject",
            "url": "https://hacktheshell.com/images/logo.png"
          }
        },
        "datePublished": publishDate,
        "dateModified": modifiedDate || publishDate,
        "mainEntityOfPage": canonical || window.location.href,
        "image": ogImage,
        "keywords": keywords
      };
      createSchemaScript(articleSchema);
    }

    // FAQ Schema for FAQ pages
    if (title.toLowerCase().includes('faq') || window.location.pathname.includes('faq')) {
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is HackTheShell?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "HackTheShell is a comprehensive cybersecurity education platform offering hands-on tutorials, labs, and certification courses for ethical hacking and penetration testing."
            }
          },
          {
            "@type": "Question",
            "name": "Are the courses suitable for beginners?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we offer content for all skill levels, from complete beginners to advanced security professionals. Each course is clearly marked with its difficulty level."
            }
          },
          {
            "@type": "Question",
            "name": "Do you provide certificates?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we offer industry-recognized certificates of completion for our comprehensive courses and learning paths."
            }
          }
        ]
      };
      createSchemaScript(faqSchema);
    }

    // Create all schemas
    createSchemaScript(organizationSchema);
    createSchemaScript(websiteSchema);
    createSchemaScript(educationalSchema);

    // Additional SEO tracking
    fetch('/api/seo/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: window.location.href,
        title,
        description,
        timestamp: new Date().toISOString()
      })
    }).catch(() => {}); // Silent fail for tracking

  }, [title, description, keywords, ogImage, canonical, type, author, publishDate, modifiedDate, category, tags, rating, reviewCount, price, courseProvider]);

  return null;
};

export default SEOHead;