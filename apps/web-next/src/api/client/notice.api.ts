import { axiosInstance } from './axios';
import { noticeApi } from '@imdaesomun/shared/api/notice-api';

export const { saveNotice, deleteNotice, getNoticeSaved, getSavedNotices } =
  noticeApi(axiosInstance);
