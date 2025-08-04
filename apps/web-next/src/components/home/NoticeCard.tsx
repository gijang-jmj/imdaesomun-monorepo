import Link from 'next/link';
import { IconDate } from '@/components/icons/IconDate';
import { IconView } from '@/components/icons/IconView';
import { IconDepartment } from '@/components/icons/IconDepartment';
import {
  formatDate,
  formatNumberWithComma,
} from '@imdaesomun/shared/utils/format-util';
import { isNewNotice } from '@imdaesomun/shared/helpers/notice-helper';
import { AppRoute } from '@imdaesomun/shared/constants/app-route';

type NoticeCardProps = {
  id: string;
  title: string;
  date: number; // Timestamp in milliseconds
  views: number; // Number of views
  department: string;
};

export const NoticeCard = ({
  id,
  title,
  date,
  views,
  department,
}: NoticeCardProps) => {
  return (
    <Link
      href={{ pathname: AppRoute.NOTICE, query: { id } }}
      className="hover:bg-teal-500-10 flex cursor-pointer flex-col items-start gap-2 rounded-xl bg-white p-4 shadow-sm transition-colors"
    >
      {isNewNotice(date) && (
        <div className="bg-teal-500-10 rounded-xl px-1.5 py-0.5">
          <span className="text-label-bold text-teal-500">신규</span>
        </div>
      )}
      <span className="text-body-bold md:text-subtitle break-keep">
        {title}
      </span>
      <div className="flex flex-wrap gap-x-3">
        <div className="flex items-center gap-1">
          <IconDate className="w-4 text-gray-500" />
          <span className="text-label md:text-body text-gray-500">
            {formatDate(date)}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <IconView className="w-4 text-gray-500" />
          <span className="text-label md:text-body text-gray-500">
            {formatNumberWithComma(views)}
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
