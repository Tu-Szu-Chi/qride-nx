import React, { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLDivElement> & {
  theme?: 'primary' | 'light' | 'transparent';
};

const Button: React.FC<ButtonProps> = ({
  theme = 'primary',
  className,
  children,
  ...props
}) => {
  const baseClasses =
    'py-4 text-xl flex justify-center items-center w-full border-2 rounded-3xl';
  let themeClasses;
  switch (theme) {
    case 'primary': {
      themeClasses = 'bg-primary text-white';
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
