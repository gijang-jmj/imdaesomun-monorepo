import type { Notice, NoticePagination } from '../types/notice';
import { createHttpClient, type HttpInstance } from './common';
import { sortNotices } from '../helpers/notice-helper';

interface NoticeApi {
  /**
   * 서울주택도시공사 공고 리스트 조회
   */
  getShNoticeList(): Promise<Notice[]>;
  /**
   * 경기주택도시공사 공고 리스트 조회
   */
  getGhNoticeList(): Promise<Notice[]>;
  /**
   * 인천도시공사 공고 리스트 조회
   */
  getIhNoticeList(): Promise<Notice[]>;
  /**
   * 부산도시공사 공고 리스트 조회
   */
  getBmcNoticeList(): Promise<Notice[]>;
  /**
   * 공고 상세 조회
   */
  getNoticeById(id: string): Promise<Notice>;
  /**
   * 저장된 공고 추가
   */
  saveNotice(noticeId: string, userId: string): Promise<void>;
  /**
   * 저장된 공고 삭제
   */
  deleteNotice(noticeId: string, userId: string): Promise<void>;
  /**
   * 공고 저장 여부 조회
   */
  getNoticeSaved(noticeId: string, userId: string): Promise<boolean>;
  /**
   * 공고 저장 목록 조회
   */
  getSavedNotices(params: {
    userId: string;
    offset: number;
    limit?: number;
    corporation?: string;
  }): Promise<NoticePagination>;
}

export const noticeApi = (httpInstance: HttpInstance): NoticeApi => {
  const { get, post } = createHttpClient(httpInstance);

  return {
    async getShNoticeList() {
      const result = await get<Notice[]>('/getShNotices');
      return sortNotices(result);
    },
    async getGhNoticeList() {
      const result = await get<Notice[]>('/getGhNotices');
      return sortNotices(result);
    },
    async getIhNoticeList() {
      const result = await get<Notice[]>('/getIhNotices');
      return sortNotices(result);
    },
    async getBmcNoticeList() {
      const result = await get<Notice[]>('/getBmcNotices');
      return sortNotices(result);
    },
    async getNoticeById(id: string) {
      return await get<Notice>(`/getNoticeById`, { noticeId: id });
    },
    async saveNotice(noticeId: string, userId: string) {
      await post('/saveNotice', { noticeId, userId });
    },
    async deleteNotice(noticeId: string, userId: string) {
      await post('/deleteNotice', { noticeId, userId });
    },
    async getNoticeSaved(noticeId: string, userId: string) {
      const results = await get<{ saved: boolean }>(`/getNoticeSaved`, {
        noticeId,
        userId,
      });
      return results.saved;
    },
    async getSavedNotices({ userId, offset, limit, corporation }) {
      return await get<NoticePagination>('/getSavedNotices', {
        userId,
        offset,
        limit,
        corporation,
      });
    },
  };
};
