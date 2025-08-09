import { axiosInstance } from '@/services/axios';
import { noticeApi } from '@imdaesomun/shared/api/notice-api';

export const {
  getShNoticeList,
  getGhNoticeList,
  getIhNoticeList,
  getBmcNoticeList,
  getNoticeById,
  saveNotice,
  deleteNotice,
  getNoticeSaved,
  getSavedNotices,
} = noticeApi(axiosInstance);
