import { FetchInstance, JsonValue } from '@imdaesomun/shared/types/fetch';

interface FetchInstanceConfig {
  baseURL: string;
  defaultInit?: RequestInit;
}

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
const defaultInit: RequestInit = {
  headers: {
    'x-imdaesomun-api-key': process.env.X_IMDAESOMUN_API_KEY,
  },
  next: { revalidate: 300 },
};

function mergeNext(
  defaultNext: RequestInit['next'],
  override?: RequestInit['next']
): RequestInit['next'] | undefined {
  if (!defaultNext && !override) return undefined;
  return { ...defaultNext, ...override };
}

function createFetchInstance({
  baseURL,
  defaultInit,
}: FetchInstanceConfig): FetchInstance {
  async function raw(path: string, init?: RequestInit) {
    const url = path.startsWith('http') ? path : `${baseURL}${path}`;
    const mergedInit: RequestInit = {
      ...defaultInit,
      ...init,
      headers: {
        ...(defaultInit?.headers || {}),
        ...(init?.headers || {}),
      },
      next: mergeNext(defaultInit?.next, init?.next),
    };
    return fetch(url, mergedInit);
  }

  async function request<T>(
    method: string,
    path: string,
    dataOrInit?: JsonValue | RequestInit,
    maybeInit?: RequestInit
  ): Promise<T> {
    let data: JsonValue | undefined;
    let init: RequestInit | undefined;
    if (method === 'GET' || method === 'DELETE') {
      init = (dataOrInit as RequestInit) || maybeInit;
    } else {
      data = dataOrInit as JsonValue;
      init = maybeInit;
    }

    const headers: Record<string, string> = {
      ...((defaultInit?.headers as Record<string, string>) || {}),
      ...((init?.headers as Record<string, string>) || {}),
    };

    let body: BodyInit | null | undefined =
      init && 'body' in init
        ? ((init as RequestInit & { body?: BodyInit | null }).body ?? undefined)
        : undefined;
    if (data !== undefined) {
      if (!('Content-Type' in headers) && !('content-type' in headers)) {
        headers['Content-Type'] = 'application/json';
      }
      body = JSON.stringify(data);
    }

    const res = await raw(path, { ...init, method, headers, body });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`HTTP ${res.status} ${res.statusText} ${text}`);
    }
    if (res.status === 204) return undefined as T;
    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json'))
      return (await res.json()) as T;
    return (await res.text()) as unknown as T;
  }

  return {
    get: (p, i) => request('GET', p, i),
    delete: (p, i) => request('DELETE', p, i),
    post: (p, d, i) => request('POST', p, d, i),
    patch: (p, d, i) => request('PATCH', p, d, i),
    raw,
  };
}

const fetchInstance = createFetchInstance({ baseURL, defaultInit });

export { fetchInstance };
