import { useState } from 'react';

interface Toast {
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = (options: Toast) => {
    console.log(`Toast: ${options.title}${options.description ? ` - ${options.description}` : ''}`);
    setToasts(prev => [...prev, options]);
    
    // Auto-remove toast after 3 seconds
    setTimeout(() => {
      setToasts(prev => prev.slice(1));
    }, 3000);
  };

  return { toast };
}