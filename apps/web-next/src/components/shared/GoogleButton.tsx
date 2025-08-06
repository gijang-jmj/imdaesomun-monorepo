import { IconGoogle } from '../icons/IconGoogle';

interface GoogleButtonProps {
  onClick: () => void;
}

export const GoogleButton = ({ onClick }: GoogleButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-300 bg-white px-4 py-2 transition-colors hover:bg-gray-50"
    >
      <IconGoogle className="h-5 w-5" />
      <span className="text-body flex-1">Google 계정으로 시작하기</span>
    </button>
  );
};
