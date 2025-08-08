import { useState } from 'react';

interface Toast {
  title: string;
  description: string;
  variant?: 'default' | 'destructive';
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = ({ title, description, variant = 'default' }: Toast) => {
    setToasts(prev => [...prev, { title, description, variant }]);
  };

  return { toast, toasts };
} 