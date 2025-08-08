import Link from 'next/link';
import { AppRoute } from '@imdaesomun/shared/constants/app-route';
import {
  getNoticeCorporationBgColor,
  getNoticeCorporationTypeKor,
} from '@imdaesomun/shared/helpers/notice-helper';
import { formatDate } from '@imdaesomun/shared/utils/format-util';
import { IconDate } from '../icons/IconDate';
import { IconDepartment } from '../icons/IconDepartment';

interface SavedCardProps {
  id: string;
  title: string;
  date: number; // Timestamp in milliseconds
  department: string;
  corporation: string;
}

export const SavedCard = ({
  id,
  title,
  date,
  department,
  corporation,
}: SavedCardProps) => {
  const corporationBgColor = getNoticeCorporationBgColor(corporation);

  return (
    <Link
      href={{ pathname: `${AppRoute.NOTICE}/${id}` }}
      className="hover:bg-teal-500-10 flex cursor-pointer flex-col items-start justify-between gap-2 rounded-xl bg-white p-4 shadow-sm transition-colors"
    >
      <div className="flex flex-col items-start gap-1">
        <div
          className={`flex items-center justify-center rounded-xl px-2 py-1 ${corporationBgColor}`}
        >
          <span className="text-caption md:text-caption-bold text-white">
            {getNoticeCorporationTypeKor(corporation)}
          </span>
        </div>
        <span className="text-body-bold md:text-subtitle">{title}</span>
      </div>
      <div className="flex flex-wrap gap-x-3">
        <div className="flex items-center gap-1">
          <IconDate className="w-4 text-gray-500" />
          <span className="text-label md:text-body text-gray-500">
            {formatDate(date)}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <IconDepartment className="w-4 text-gray-500" />
          <span className="text-label md:text-body text-gray-500">
            {department}
          </span>
        </div>
      </div>
    </Link>
  );
};
