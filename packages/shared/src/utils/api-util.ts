import type { AxiosInstance } from 'axios';

/**
 * Axios 인스턴스 여부 확인
 * @param inst 확인할 인스턴스
 * @returns Axios 인스턴스인 경우 true, 그렇지 않으면 false
 */
export const isAxiosInstance = (inst: unknown): inst is AxiosInstance =>
  !!inst &&
  typeof (inst as AxiosInstance).get === 'function' &&
  !!(inst as AxiosInstance).interceptors;

/**
 * URL 쿼리 문자열 생성
 * @param params 쿼리 파라미터
 * @returns 쿼리 문자열
 */
export const buildQueryString = (params?: Record<string, unknown>): string => {
  if (!params) return '';
  const usp = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue;
    usp.append(key, String(value));
  }
  const qs = usp.toString();
  return qs ? `?${qs}` : '';
};
