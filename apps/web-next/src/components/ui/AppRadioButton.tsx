import React from 'react';

type AppRadioButtonProps = {
  label: string;
  value: string | null;
  modelValue: string | null;
  count: number;
  onChange: (value: string | null) => void;
};

const AppRadioButton: React.FC<AppRadioButtonProps> = ({
  label,
  value,
  modelValue,
  count,
  onChange,
}) => {
  const isSelected = modelValue === value;

  const handleClick = () => {
    onChange(value);
  };

  return (
    <div
      className={`radio-button ${isSelected ? 'selected' : ''}`}
      onClick={handleClick}
    >
      <span>{label}</span>
      <span>{count}</span>
    </div>
  );
};

export default AppRadioButton;
