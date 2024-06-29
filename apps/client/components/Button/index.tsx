import React, { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLDivElement> & {
    theme?: 'primary' | 'light'
}


const Button: React.FC<ButtonProps> = ({ theme = 'primary', className, children, ...props }) => {
    const baseClasses = "py-4 text-xl flex justify-center items-center w-full rounded-md border-2";
    const themeClasses = theme === 'primary' 
      ? "bg-primary text-white" 
      : "bg-white border-primary text-primary";
    return <div className={`${themeClasses} ${baseClasses}  ${className}`} {...props}>
        {children}
    </div>
}

export default Button