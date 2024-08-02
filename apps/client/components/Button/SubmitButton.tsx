import React, { ButtonHTMLAttributes } from 'react';

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLDivElement> {
  isLoading?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ isLoading, ...props }) => {
  return (
    <div onClick={props.onClick} className={`
     rounded-full bg-white p-2 
     ${props.className}
     ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}
    `}>
      {isLoading ? (
        <div className="w-8 h-8 border-4 border-primary border-t-white rounded-full animate-spin"></div>
      ) : (
        <img
          src="assets/arrow_right.svg"
          alt="submit"
          className="w-8 h-8"
        />
      )}
    </div>
  );
};

export default SubmitButton;