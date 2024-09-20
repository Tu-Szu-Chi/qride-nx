import { Field, FieldAttributes } from 'formik';
import React from 'react';

type Option = {
  value: string | number,
  label?: string
}
interface Props extends FieldAttributes<any> {
  options: Option[];
  label: string;
  children?: React.ReactNode;
}

const DropdownField: React.FC<Props> = ({name, options, placeholder, label, children, className, ...rest}) => {
  return (
    <div>
      <Field
        as="select"
        id={name}
        name={name}
        className={`appearance-none focus:outline-none ${className}`}
        {...rest}
      >
        {placeholder && (
          <option value="" disabled selected hidden>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label ? option.label : option.value}
          </option>
        ))}
      </Field>
      {children}
    </div>
  );
};

export default DropdownField;
