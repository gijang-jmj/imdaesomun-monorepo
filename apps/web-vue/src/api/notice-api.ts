import axiosInstance from '@/services/axios';
import {
  createGetShNoticeList,
  createGetGhNoticeList,
  createGetIhNotice,
  createGetBmcNoticeList,
  createGetNoticeById,
  createSaveNotice,
  createDeleteNotice,
  createGetNoticeSaved,
  createGetSavedNotices,
} from '@imdaesomun/shared/api/notice-api';

export const getShNoticeList = createGetShNoticeList(axiosInstance);
export const getGhNoticeList = createGetGhNoticeList(axiosInstance);
export const getIhNotice = createGetIhNotice(axiosInstance);
export const getBmcNoticeList = createGetBmcNoticeList(axiosInstance);
export const getNoticeById = createGetNoticeById(axiosInstance);
export const saveNotice = createSaveNotice(axiosInstance);
export const deleteNotice = createDeleteNotice(axiosInstance);
export const getNoticeSaved = createGetNoticeSaved(axiosInstance);
export const getSavedNotices = createGetSavedNotices(axiosInstance);
