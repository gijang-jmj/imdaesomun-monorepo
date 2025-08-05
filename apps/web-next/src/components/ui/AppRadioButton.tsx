'use client';

interface AppRadioButtonProps {
  label: string;
  value: string | null;
  modelValue: string | null;
  count: number;
  onChangeAction: (value: string | null) => void;
}

export const AppRadioButton = ({
  label,
  value,
  modelValue,
  count,
  onChangeAction,
}: AppRadioButtonProps) => {
  const isSelected = modelValue === value;

  const handleClick = () => {
    onChangeAction(value);
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
