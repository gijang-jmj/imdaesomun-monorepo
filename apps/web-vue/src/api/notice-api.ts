import axiosInstance from '@/services/axios';
import {
  getShNoticeList as getShNoticeListShared,
  getGhNoticeList as getGhNoticeListShared,
  getIhNotice as getIhNoticeShared,
  getBmcNoticeList as getBmcNoticeListShared,
  getNoticeById as getNoticeByIdShared,
  saveNotice as saveNoticeShared,
  deleteNotice as deleteNoticeShared,
  getNoticeSaved as getNoticeSavedShared,
  getSavedNotices as getSavedNoticesShared,
} from '@imdaesomun/shared/api/notice-api';

export const getShNoticeList = getShNoticeListShared(axiosInstance);
export const getGhNoticeList = getGhNoticeListShared(axiosInstance);
export const getIhNotice = getIhNoticeShared(axiosInstance);
export const getBmcNoticeList = getBmcNoticeListShared(axiosInstance);
export const getNoticeById = getNoticeByIdShared(axiosInstance);
export const saveNotice = saveNoticeShared(axiosInstance);
export const deleteNotice = deleteNoticeShared(axiosInstance);
export const getNoticeSaved = getNoticeSavedShared(axiosInstance);
export const getSavedNotices = getSavedNoticesShared(axiosInstance);