import { Notice } from '@imdaesomun/shared/types/notice';
import { fetchInstance } from './fetch';

async function fetchNotices(url: string): Promise<Notice[]> {
  const response = await fetch(url, fetchInstance.options);
  if (!response.ok) {
    throw new Error(`Failed to fetch notices from ${url}`);
  }
  const results = await response.json();
  return results.sort((a: Notice, b: Notice) => b.no - a.no);
}

export const getShNoticeList = () =>
  fetchNotices(`${fetchInstance.baseURL}/getShNotices`);
export const getGhNoticeList = () =>
  fetchNotices(`${fetchInstance.baseURL}/getGhNotices`);
export const getIhNotice = () =>
  fetchNotices(`${fetchInstance.baseURL}/getIhNotices`);
export const getBmcNoticeList = () =>
  fetchNotices(`${fetchInstance.baseURL}/getBmcNotices`);

export async function getNoticeById(id: string): Promise<Notice> {
  const response = await fetch(
    `${fetchInstance.baseURL}/getNoticeById?noticeId=${id}`,
    fetchInstance.options
  );
  if (!response.ok) {
    throw new Error('Failed to fetch notice');
  }
  return response.json();
}
