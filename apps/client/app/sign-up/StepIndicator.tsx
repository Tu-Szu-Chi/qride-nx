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
            w-6 h-6 rounded-full border-2 text-xs
            ${step < currentStep ? 'bg-primary ' : 'bg-white'}
            ${step <= currentStep ? 'border-primary text-primary ' : 'text-gray-300 border border-gray-300'}
            font-bold text-xl
          `}>
            {(step < currentStep) ? <img src='/assets/checked.svg' alt='Checked' /> : index + 1}
          </div>
          {step < steps.length && (
            <div className={`
              flex-grow h-1  
              ${step < currentStep ? 'bg-primary' : 'bg-gray-300'}
            `}></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepIndicator;