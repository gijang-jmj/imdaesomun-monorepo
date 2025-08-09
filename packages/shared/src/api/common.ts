import type { AxiosInstance } from 'axios';
import type { FetchInstance } from '../types/fetch';
import { buildQueryString, isAxiosInstance } from '../utils/api-util';

export type HttpInstance = AxiosInstance | FetchInstance;

export function createHttpClient(http: HttpInstance) {
  async function get<
    T,
    P extends Record<string, unknown> = Record<string, unknown>,
  >(url: string, params?: P): Promise<T> {
    if (isAxiosInstance(http)) {
      const res = await http.get<T>(url, params ? { params } : undefined);
      return res.data as T;
    }
    const qs = buildQueryString(params);
    return (await (http as FetchInstance).get<T>(`${url}${qs}`)) as T;
  }

  async function post<T = unknown, D = unknown>(
    url: string,
    data?: D
  ): Promise<T> {
    if (isAxiosInstance(http)) {
      const res = await http.post<T>(url, data);
      return res.data as T;
    }
    return (await (http as FetchInstance).post<T>(url, data as unknown)) as T;
  }

  return { get, post };
}
