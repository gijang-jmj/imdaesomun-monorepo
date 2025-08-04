import axiosInstance from './axios';
import {
  createSaveNotice,
  createDeleteNotice,
  createGetNoticeSaved,
  createGetSavedNotices,
} from '@imdaesomun/shared/api/notice-api';

export const saveNotice = createSaveNotice(axiosInstance);
export const deleteNotice = createDeleteNotice(axiosInstance);
export const getNoticeSaved = createGetNoticeSaved(axiosInstance);
export const getSavedNotices = createGetSavedNotices(axiosInstance);
