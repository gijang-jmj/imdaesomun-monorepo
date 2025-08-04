import axiosInstance from './axios';
import {
  createGetShNoticeList,
  createGetGhNoticeList,
  createGetIhNotice,
  createGetBmcNoticeList,
  createGetNoticeById,
} from '@imdaesomun/shared/api/notice-api';

// get notice list functions
export const getShNoticeList = createGetShNoticeList(axiosInstance);
export const getGhNoticeList = createGetGhNoticeList(axiosInstance);
export const getIhNotice = createGetIhNotice(axiosInstance);
export const getBmcNoticeList = createGetBmcNoticeList(axiosInstance);

// get notice detail by id function
export const getNoticeById = createGetNoticeById(axiosInstance);
