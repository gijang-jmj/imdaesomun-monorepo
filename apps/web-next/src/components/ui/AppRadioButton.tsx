'use client';

interface AppRadioButtonProps {
  label: string;
  value: string | null;
  groupValue: string | null;
  count: number;
  onChangeAction: (value: string | null) => void;
}

export const AppRadioButton = ({
  label,
  value,
  groupValue,
  count,
  onChangeAction,
}: AppRadioButtonProps) => {
  const isSelected = groupValue === value;

  const handleClick = () => {
    onChangeAction(value);
  };

  return (
    <button
      onClick={handleClick}
      className={`text-label-bold shrink-0 cursor-pointer rounded-full px-3 py-1 ${isSelected ? 'bg-teal-500-10 text-teal-500' : 'bg-gray-500-10 text-gray-500 hover:bg-gray-300'}`}
    >
      {label} {count}
    </button>
  );
};
