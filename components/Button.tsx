import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'option';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseClasses = "transition-all duration-300 transform active:scale-95 font-heading font-bold";
  
  const variants = {
    primary: "bg-gold hover:bg-gold-light text-deep rounded-full shadow-lg shadow-gold/20 hover:shadow-gold/50 px-8 py-3 uppercase tracking-wider",
    secondary: "bg-transparent border-2 border-gold text-white hover:bg-gold hover:text-deep rounded-full px-8 py-3 uppercase tracking-wider",
    option: "bg-deep text-white hover:border-gold border border-transparent rounded-xl px-6 py-4 text-left shadow-md hover:shadow-gold/10 w-full relative overflow-hidden"
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${widthClass} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};