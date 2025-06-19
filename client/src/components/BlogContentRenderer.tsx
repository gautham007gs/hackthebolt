import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface BlogContentRendererProps {
  content: {
    title: string;
    sections: {
      heading: string;
      level: number;
      content: string;
      subsections?: {
        heading: string;
        content: string;
        points?: string[];
      }[];
      points?: string[];
    }[];
  };
}

const BlogContentRenderer: React.FC<BlogContentRendererProps> = ({ content }) => {
  const { isDark } = useTheme();

  const getHeadingClass = (level: number) => {
    const baseClasses = `font-bold leading-tight mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`;
    switch (level) {
      case 1:
        return `text-4xl lg:text-5xl ${baseClasses}`;
      case 2:
        return `text-3xl lg:text-4xl ${baseClasses} mt-12`;
      case 3:
        return `text-2xl lg:text-3xl ${baseClasses} mt-10`;
      case 4:
        return `text-xl lg:text-2xl ${baseClasses} mt-8`;
      default:
        return `text-lg lg:text-xl ${baseClasses} mt-6`;
    }
  };

  const renderParagraph = (text: string) => (
    <p className={`text-lg leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
      {text}
    </p>
  );

  const renderPoints = (points: string[]) => (
    <ul className={`space-y-3 mb-8 ml-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
      {points.map((point, index) => (
        <li key={index} className="flex items-start space-x-3">
          <span className={`inline-block w-2 h-2 rounded-full mt-3 flex-shrink-0 ${
            isDark ? 'bg-emerald-400' : 'bg-emerald-600'
          }`}></span>
          <span className="text-lg leading-relaxed">{point}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <article className="blog-content max-w-none prose-lg w-full overflow-hidden">
      <div className="space-y-8 break-words">
        {content.sections.map((section, sectionIndex) => (
          <section key={sectionIndex} className="scroll-mt-20" id={section.heading.toLowerCase().replace(/\s+/g, '-')}>
            {section.heading && (
              <h2 className={getHeadingClass(section.level)}>
                {section.heading}
              </h2>
            )}
            
            {section.content && renderParagraph(section.content)}
            
            {section.points && renderPoints(section.points)}
            
            {section.subsections && (
              <div className="space-y-8 ml-4">
                {section.subsections.map((subsection, subIndex) => (
                  <div key={subIndex} className="scroll-mt-20" id={subsection.heading.toLowerCase().replace(/\s+/g, '-')}>
                    <h3 className={getHeadingClass(4)}>
                      {subsection.heading}
                    </h3>
                    {subsection.content && renderParagraph(subsection.content)}
                    {subsection.points && renderPoints(subsection.points)}
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
    </article>
  );
};

export default BlogContentRenderer;