import type { AxiosInstance } from 'axios';
import { Notice, NoticePagination } from '../types/notice';

export const createGetShNoticeList =
  (axiosInstance: AxiosInstance) => async (): Promise<Notice[]> => {
    const response = await axiosInstance.get<Notice[]>('/getShNotices');
    const results = response.data;

    // no 필드를 기준으로 내림차순 정렬
    const notices = results.sort((a, b) => b.no - a.no);

    return notices;
  };

export const createGetGhNoticeList =
  (axiosInstance: AxiosInstance) => async (): Promise<Notice[]> => {
    const response = await axiosInstance.get<Notice[]>('/getGhNotices');
    const results = response.data;

    // no 필드를 기준으로 내림차순 정렬
    const notices = results.sort((a, b) => b.no - a.no);

    return notices;
  };

export const createGetIhNotice =
  (axiosInstance: AxiosInstance) => async (): Promise<Notice[]> => {
    const response = await axiosInstance.get<Notice[]>('/getIhNotices');
    const results = response.data;

    // no 필드를 기준으로 내림차순 정렬
    const notices = results.sort((a, b) => b.no - a.no);

    return notices;
  };

export const createGetBmcNoticeList =
  (axiosInstance: AxiosInstance) => async (): Promise<Notice[]> => {
    const response = await axiosInstance.get<Notice[]>('/getBmcNotices');
    const results = response.data;

    // no 필드를 기준으로 내림차순 정렬
    const notices = results.sort((a, b) => b.no - a.no);

    return notices;
  };

export const createGetNoticeById =
  (axiosInstance: AxiosInstance) =>
  async (id: string): Promise<Notice> => {
    const response = await axiosInstance.get<Notice>(`/getNoticeById`, {
      params: { noticeId: id },
    });
    const notice = response.data;

    return notice;
  };

export const createSaveNotice =
  (axiosInstance: AxiosInstance) =>
  async (noticeId: string, userId: string): Promise<void> => {
    await axiosInstance.post('/saveNotice', { noticeId, userId });
  };

export const createDeleteNotice =
  (axiosInstance: AxiosInstance) =>
  async (noticeId: string, userId: string): Promise<void> => {
    await axiosInstance.post('/deleteNotice', { noticeId, userId });
  };

export const createGetNoticeSaved =
  (axiosInstance: AxiosInstance) =>
  async (noticeId: string, userId: string): Promise<boolean> => {
    const response = await axiosInstance.get('/getNoticeSaved', {
      params: { noticeId, userId },
    });

    return response.data.saved as boolean;
  };

export const createGetSavedNotices =
  (axiosInstance: AxiosInstance) =>
  async ({
    userId,
    offset,
    limit,
    corporation,
  }: {
    userId: string;
    offset: number;
    limit?: number;
    corporation?: string;
  }): Promise<NoticePagination> => {
    const response = await axiosInstance.get<NoticePagination>(
      '/getSavedNotices',
      {
        params: {
          userId,
          offset,
          limit,
          corporation,
        },
      }
    );

    return response.data;
  };
