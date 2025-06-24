import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

interface FAQProps {
  items: FAQItem[];
  title?: string;
  compact?: boolean;
  className?: string;
}

export function FAQ({ items = [], title = "Frequently Asked Questions", compact = false, className }: FAQProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  if (!items || items.length === 0) return null;

  return (
    <div className={cn(
      "space-y-4",
      compact ? "max-w-md" : "max-w-2xl",
      className
    )}>
      <div className="flex items-center gap-2 mb-4">
        <HelpCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
        <h3 className={cn(
          "font-semibold text-gray-900 dark:text-gray-100",
          compact ? "text-lg" : "text-xl"
        )}>
          {title}
        </h3>
      </div>
      
      <div className="space-y-2">
        {items.map((item) => (
          <Card key={item.id} className="border border-gray-200 dark:border-gray-700 shadow-sm">
            <CardContent className="p-0">
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              >
                <div className="flex items-center justify-between">
                  <span className={cn(
                    "font-medium text-gray-900 dark:text-gray-100",
                    compact ? "text-sm" : "text-base"
                  )}>
                    {item.question}
                  </span>
                  {openItems.has(item.id) ? (
                    <ChevronUp className="h-4 w-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                  )}
                </div>
              </button>
              
              {openItems.has(item.id) && (
                <div className="px-4 pb-4">
                  <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
                    <p className={cn(
                      "text-gray-600 dark:text-gray-300 leading-relaxed",
                      compact ? "text-sm" : "text-base"
                    )}>
                      {item.answer}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Create a standalone FAQ component with default data
const DefaultFAQ = () => {
  const defaultFAQs: FAQItem[] = [
    {
      id: '1',
      question: 'How often is the content updated?',
      answer: 'We update our cybersecurity content weekly to reflect the latest threats, vulnerabilities, and security practices in the industry.',
      category: 'General'
    },
    {
      id: '2', 
      question: 'Are the tutorials suitable for beginners?',
      answer: 'Yes! We offer content for all skill levels, from complete beginners to advanced security professionals. Each tutorial is clearly marked with its difficulty level.',
      category: 'Learning'
    },
    {
      id: '3',
      question: 'Do you provide certificates?',
      answer: 'Yes, we offer certificates of completion for our comprehensive courses and learning paths. These are recognized by industry professionals.',
      category: 'Certification'
    },
    {
      id: '4',
      question: 'Can I practice what I learn?',
      answer: 'Absolutely! We provide hands-on labs, virtual environments, and CTF challenges where you can safely practice your skills.',
      category: 'Practice'
    },
    {
      id: '5',
      question: 'Is there community support?',
      answer: 'Yes, we have an active community forum where you can ask questions, share knowledge, and collaborate with other learners and experts.',
      category: 'Community'
    }
  ];

  return <FAQ items={defaultFAQs} title="Frequently Asked Questions" />;
};

export default DefaultFAQ;

// Blog-specific FAQ component with cybersecurity focus
export function BlogFAQ({ className }: { className?: string }) {
  const blogFAQs: FAQItem[] = [
    {
      id: 'security-basics',
      question: 'What are the essential cybersecurity practices for beginners?',
      answer: 'Start with strong, unique passwords, enable two-factor authentication, keep software updated, use reputable antivirus software, and be cautious with email attachments and links.',
    },
    {
      id: 'learn-ethical-hacking',
      question: 'How can I start learning ethical hacking safely?',
      answer: 'Begin with dedicated learning platforms like HackTheBox, TryHackMe, or our labs. Always practice on authorized systems, obtain proper certifications, and follow responsible disclosure principles.',
    },
    {
      id: 'career-cybersecurity',
      question: 'What career paths are available in cybersecurity?',
      answer: 'Popular paths include penetration testing, security analysis, incident response, security architecture, compliance, and cybersecurity consulting. Each requires different skills and certifications.',
    },
    {
      id: 'stay-updated',
      question: 'How do I stay updated with the latest security threats?',
      answer: 'Follow reputable security blogs, subscribe to threat intelligence feeds, join cybersecurity communities, attend conferences, and practice regularly on platforms like our labs.',
    }
  ];

  return (
    <FAQ 
      items={blogFAQs} 
      title="Security Learning FAQ" 
      compact={true}
      className={className}
    />
  );
}