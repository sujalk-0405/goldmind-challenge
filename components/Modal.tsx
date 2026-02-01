import React from 'react';
import { Button } from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-midnight/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-gradient-to-br from-deep to-midnight border border-gold/30 rounded-2xl w-full max-w-lg p-6 shadow-2xl transform scale-100 transition-transform">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-heading font-bold text-gold">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="mb-6 text-gray-200">
          {children}
        </div>
        <div className="flex justify-end">
          <Button variant="secondary" onClick={onClose} className="py-2 px-4 text-sm">Close</Button>
        </div>
      </div>
    </div>
  );
};