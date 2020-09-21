import React from 'react';

interface SelectProps {
  label: string;
  id: string;
  name: string;
  emptyValueLabel?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string;
}

const Select: React.FC<SelectProps> = ({ 
  label,
  id,
  name,
  emptyValueLabel,
  children,
  onChange: changeEvent,
  value,
}) => {
  const hasEmptyValue = emptyValueLabel !== '';

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <select name={name} id={id} onChange={changeEvent} value={value}>
        {hasEmptyValue && <option value="">{emptyValueLabel}</option>}
        {children}
      </select>
    </div>
  );
};

export default Select;