import React from 'react';

interface ArticleData {
  headline: string;
  description: string;
  author: {
    name: string;
    type?: string;
  };
  publisher: {
    name: string;
    logo?: string;
  };
  datePublished: string;
  dateModified?: string;
  image?: string;
  url: string;
  mainEntityOfPage?: string;
  articleSection?: string;
  wordCount?: number;
  keywords?: string[];
}

interface OrganizationData {
  name: string;
  url: string;
  logo?: string;
  description?: string;
  sameAs?: string[];
  contactPoint?: {
    telephone?: string;
    contactType?: string;
    email?: string;
  };
}

interface WebsiteData {
  name: string;
  url: string;
  description?: string;
  publisher?: {
    name: string;
    logo?: string;
  };
}

interface CourseData {
  name: string;
  description: string;
  provider: {
    name: string;
    url?: string;
  };
  courseCode?: string;
  educationalLevel?: string;
  teaches?: string[];
  timeRequired?: string;
  totalTime?: string;
  coursePrerequisites?: string[];
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
  };
}

interface FAQData {
  questions: Array<{
    question: string;
    answer: string;
  }>;
}

interface SEOStructuredDataProps {
  type: 'article' | 'organization' | 'website' | 'course' | 'faq';
  data: ArticleData | OrganizationData | WebsiteData | CourseData | FAQData;
}

const SEOStructuredData: React.FC<SEOStructuredDataProps> = ({ type, data }) => {
  const generateStructuredData = () => {
    const baseContext = "https://schema.org";
    
    switch (type) {
      case 'article':
        const articleData = data as ArticleData;
        return {
          "@context": baseContext,
          "@type": "Article",
          "headline": articleData.headline,
          "description": articleData.description,
          "image": articleData.image,
          "author": {
            "@type": articleData.author.type || "Person",
            "name": articleData.author.name
          },
          "publisher": {
            "@type": "Organization",
            "name": articleData.publisher.name,
            "logo": articleData.publisher.logo ? {
              "@type": "ImageObject",
              "url": articleData.publisher.logo
            } : undefined
          },
          "datePublished": articleData.datePublished,
          "dateModified": articleData.dateModified || articleData.datePublished,
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": articleData.mainEntityOfPage || articleData.url
          },
          "url": articleData.url,
          "articleSection": articleData.articleSection,
          "wordCount": articleData.wordCount,
          "keywords": articleData.keywords?.join(", ")
        };

      case 'organization':
        const orgData = data as OrganizationData;
        return {
          "@context": baseContext,
          "@type": "Organization",
          "name": orgData.name,
          "url": orgData.url,
          "logo": orgData.logo,
          "description": orgData.description,
          "sameAs": orgData.sameAs,
          "contactPoint": orgData.contactPoint ? {
            "@type": "ContactPoint",
            "telephone": orgData.contactPoint.telephone,
            "contactType": orgData.contactPoint.contactType,
            "email": orgData.contactPoint.email
          } : undefined
        };

      case 'website':
        const websiteData = data as WebsiteData;
        return {
          "@context": baseContext,
          "@type": "WebSite",
          "name": websiteData.name,
          "url": websiteData.url,
          "description": websiteData.description,
          "publisher": websiteData.publisher ? {
            "@type": "Organization",
            "name": websiteData.publisher.name,
            "logo": websiteData.publisher.logo
          } : undefined,
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": `${websiteData.url}/search?q={search_term_string}`
            },
            "query-input": "required name=search_term_string"
          }
        };

      case 'course':
        const courseData = data as CourseData;
        return {
          "@context": baseContext,
          "@type": "Course",
          "name": courseData.name,
          "description": courseData.description,
          "provider": {
            "@type": "Organization",
            "name": courseData.provider.name,
            "url": courseData.provider.url
          },
          "courseCode": courseData.courseCode,
          "educationalLevel": courseData.educationalLevel,
          "teaches": courseData.teaches,
          "timeRequired": courseData.timeRequired,
          "totalTime": courseData.totalTime,
          "coursePrerequisites": courseData.coursePrerequisites,
          "aggregateRating": courseData.aggregateRating ? {
            "@type": "AggregateRating",
            "ratingValue": courseData.aggregateRating.ratingValue,
            "reviewCount": courseData.aggregateRating.reviewCount
          } : undefined
        };

      case 'faq':
        const faqData = data as FAQData;
        return {
          "@context": baseContext,
          "@type": "FAQPage",
          "mainEntity": faqData.questions.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": item.answer
            }
          }))
        };

      default:
        return null;
    }
  };

  const structuredData = generateStructuredData();

  if (!structuredData) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2)
      }}
    />
  );
};

export default SEOStructuredData;