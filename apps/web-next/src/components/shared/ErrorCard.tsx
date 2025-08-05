import { IconError } from '../icons/IconError';
import { splitByNewline } from '@imdaesomun/shared/utils/format-util';

interface ErrorCardProps {
  className?: string;
  content?: string;
}

export const ErrorCard = ({ content, className }: ErrorCardProps) => {
  const lines = splitByNewline(
    content ?? '오류가 발생했어요\n잠시 후 다시 시도해주세요'
  );

  return (
    <div
      className={`flex flex-col items-center gap-2 rounded-xl bg-white p-4 shadow-sm ${className}`}
    >
      <IconError className="w-8 flex-shrink-0 text-red-400" />
      <div className="text-center">
        {lines.map((line, index) => (
          <p key={index} className="text-body text-gray-500">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
};
