import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  steps: number[];
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, steps }) => {
  return (
    <div className="flex items-center">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className={`
            flex items-center justify-center
            w-10 h-10 rounded-full border-2
            ${index + 1 == currentStep ? 'border-primary text-primary bg-white' : 'bg-white text-gray-300 border border-gray-300'}
            font-bold text-xl
          `}>
            {index + 1}
          </div>
          {index < steps.length - 1 && (
            <div className="flex-grow h-px bg-gray-300 mx-2"></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepIndicator;