export type JsonValue = unknown;

export interface FetchInstance {
  get<T = unknown>(path: string, init?: RequestInit): Promise<T>;
  delete<T = unknown>(path: string, init?: RequestInit): Promise<T>;
  post<T = unknown>(
    path: string,
    data?: JsonValue,
    init?: RequestInit
  ): Promise<T>;
  patch<T = unknown>(
    path: string,
    data?: JsonValue,
    init?: RequestInit
  ): Promise<T>;
  raw(path: string, init?: RequestInit): Promise<Response>;
}
