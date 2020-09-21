import React from 'react';

interface InputProps {
  label: string;
  id: string;
  name: string;
  type: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

const Input: React.FC<InputProps> = ({ 
  label,
  id,
  name,
  type,
  children,
  onChange: changeEvent,
  value,
}) => (
  <div className="field">
    <label htmlFor={id}>{label}</label>
    <input 
      type={type}
      name={name}
      id={id}
      onChange={changeEvent}
      value={value}
    />
  </div>
);

export default Input;