import { noticeApi } from '@imdaesomun/shared/api/notice-api';
import { fetchInstance } from './fetch';

export const {
  getShNoticeList,
  getGhNoticeList,
  getIhNoticeList,
  getBmcNoticeList,
  getNoticeById,
} = noticeApi(fetchInstance);
