import { IconInfo } from '@/components/icons/IconInfo';

interface InfoCardProps {
  className?: string;
  content: string;
}

export const InfoCard = ({ content, className }: InfoCardProps) => {
  return (
    <div
      className={`flex items-center gap-2 rounded-xl bg-white p-4 shadow-sm ${className}`}
    >
      <IconInfo className="w-5 flex-shrink-0 text-teal-500" />
      <span className="text-label md:text-body text-gray-500">{content}</span>
    </div>
  );
};
