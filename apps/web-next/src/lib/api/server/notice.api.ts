import axiosInstance from './axios';
import {
  createGetShNoticeList,
  createGetGhNoticeList,
  createGetIhNotice,
  createGetBmcNoticeList,
  createGetNoticeById,
} from '@imdaesomun/shared/api/notice-api';

export const getShNoticeList = createGetShNoticeList(axiosInstance);
export const getGhNoticeList = createGetGhNoticeList(axiosInstance);
export const getIhNotice = createGetIhNotice(axiosInstance);
export const getBmcNoticeList = createGetBmcNoticeList(axiosInstance);
export const getNoticeById = createGetNoticeById(axiosInstance);
