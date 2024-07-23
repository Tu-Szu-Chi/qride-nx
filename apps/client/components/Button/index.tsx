import React, { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLDivElement> & {
  theme?: 'primary' | 'light' | 'transparent' | 'dark';
};

const Button: React.FC<ButtonProps> = ({
  theme = 'primary',
  className,
  children,
  ...props
}) => {
  const baseClasses =
    'py-4 text-xl flex justify-center items-center border-2 rounded-3xl';
  let themeClasses;
  switch (theme) {
    case 'primary': {
      themeClasses = 'bg-primary text-white border-primary';
      break;
    }
    case 'dark': {
      themeClasses = 'bg-primary-500 text-white border-primary-500';
      break;
    }
    case 'light': {
      themeClasses = 'bg-white border-primary text-primary';
      break;
    }
    case 'transparent': {
      themeClasses = 'border-none';
      break;
    }
  }

  return (
    <div className={`${themeClasses} ${baseClasses}  ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Button;
