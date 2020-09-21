import React from 'react';

interface FieldsetProps {
  legend: string;
  sublegend?: string;
}

const Fieldset: React.FC<FieldsetProps> = ({ legend, sublegend, children }) => (
  <fieldset>
    <legend>
      <h2>{legend}</h2>
      <span>{sublegend}</span>
    </legend>
    {children}
  </fieldset>
);

export default Fieldset;