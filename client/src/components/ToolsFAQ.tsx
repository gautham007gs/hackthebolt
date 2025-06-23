import { FAQ, type FAQItem } from './FAQ';

export function ToolsFAQ({ className }: { className?: string }) {
  const toolsFAQs: FAQItem[] = [
    {
      id: 'tool-selection',
      question: 'How do I choose the right security tool for my needs?',
      answer: 'Consider your specific use case, technical expertise level, budget, and integration requirements. Start with our difficulty ratings and category filters to narrow down options that match your environment.',
    },
    {
      id: 'tool-setup',
      question: 'Are these tools safe to install and use?',
      answer: 'All featured tools are open-source projects that have been vetted by the security community. Always review installation instructions, check official repositories, and test in isolated environments first.',
    },
    {
      id: 'commercial-vs-free',
      question: 'Should I use free or commercial security tools?',
      answer: 'Free tools are excellent for learning and small-scale operations. Commercial tools often provide better support, enterprise features, and compliance certifications. Choose based on your organization\'s needs and budget.',
    },
    {
      id: 'tool-updates',
      question: 'How often should I update my security tools?',
      answer: 'Security tools should be updated regularly, ideally as soon as new versions are released. Set up automated updates where possible and subscribe to security advisories for critical tools.',
    }
  ];

  return (
    <FAQ 
      items={toolsFAQs} 
      title="Tools & Installation FAQ" 
      compact={true}
      className={className}
    />
  );
}

export function LabsFAQ({ className }: { className?: string }) {
  const labsFAQs: FAQItem[] = [
    {
      id: 'lab-difficulty',
      question: 'What do the difficulty levels mean?',
      answer: 'Beginner: Basic concepts, minimal prerequisites. Intermediate: Requires some security knowledge. Advanced: Complex scenarios requiring significant experience. Expert: Professional-level challenges.',
    },
    {
      id: 'lab-environment',
      question: 'Do I need special software to complete labs?',
      answer: 'Most labs can be completed with basic tools like web browsers, terminal access, and common penetration testing tools. Specific requirements are listed in each lab\'s prerequisites section.',
    },
    {
      id: 'lab-progress',
      question: 'Can I save my progress in labs?',
      answer: 'Yes, your progress is automatically saved as you complete sections. You can return anytime to continue where you left off. Completed labs remain accessible for review.',
    },
    {
      id: 'lab-certificates',
      question: 'Do I get certificates for completing labs?',
      answer: 'Yes, you earn digital certificates for completing lab series and achieving specific milestones. These can be shared on professional networks and included in your cybersecurity portfolio.',
    }
  ];

  return (
    <FAQ 
      items={labsFAQs} 
      title="Hands-on Labs FAQ" 
      compact={true}
      className={className}
    />
  );
}