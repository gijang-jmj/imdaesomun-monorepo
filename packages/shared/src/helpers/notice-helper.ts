import { isToday } from 'date-fns';
import { NoticeCorporationTypeKor } from '../constants/notice';
import type { Notice } from '../types/notice';

export const sortNotices = (results: Notice[]): Notice[] => {
  return results.sort((a, b) => b.no - a.no);
};

export const isNewNotice = (timestamp: number): boolean => {
  return isToday(new Date(timestamp));
};

export const getNoticeCorporationTypeKor = (type: string): string => {
  switch (type) {
    case 'sh':
      return NoticeCorporationTypeKor.sh;
    case 'gh':
      return NoticeCorporationTypeKor.gh;
    case 'ih':
      return NoticeCorporationTypeKor.ih;
    case 'bmc':
      return NoticeCorporationTypeKor.bmc;
    default:
      return '알 수 없는 기관';
  }
};

export const getNoticeCorporationBgColor = (type: string): string => {
  switch (type) {
    case 'sh':
      return 'bg-sh';
    case 'gh':
      return 'bg-gh';
    case 'ih':
      return 'bg-ih';
    case 'bmc':
      return 'bg-bmc';
    default:
      return 'bg-gray-500';
  }
};
