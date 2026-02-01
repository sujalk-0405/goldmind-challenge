import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-midnight border-t border-gold/20 py-8 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} All rights reserved by GMC made by Sujal.
        </p>
        <div className="flex justify-center gap-6 mt-4">
          <a href="#" className="text-gray-500 hover:text-gold transition-colors text-sm">GitHub</a>
          <a href="#" className="text-gray-500 hover:text-gold transition-colors text-sm">About This Project</a>
        </div>
      </div>
    </footer>
  );
};