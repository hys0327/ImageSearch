import { merge } from 'lodash';
import { getToken } from '@contexts/utils';

//  성재주임님이 만드는 api는 Authorization에서 bearer 붙이는 식으로 진행되어 갈 예정
// 이전에 이미 생성되어 있는 api가 많아서 우선 bearerInstance로 생성하여 진행
const bearerInstance = {
  baseUrl: process.env.NEXT_PUBLIC_REDAPI_BASE_URL,

  async fetch(resource: string, init: RequestInit) {
    const token = await getToken();
    const contentType =
      typeof init.body === 'string' ? { 'Content-Type': 'application/json' } : undefined;

    const requestInit = {
      headers: { ...contentType, 'Authorization': `Bearer ${token}` },
    };

    try {
      const response = await fetch(`${this.baseUrl}${resource}`, merge(requestInit, init));

      return await response.json();
    } catch (error: any) {
      console.log(`error => ${JSON.stringify(error)}`);
      return { result: null, errorMessage: error.message };
    }
  },

  async get<T = any>(resource: string, init: RequestInit = {}): Promise<T> {
    return this.fetch(resource, init);
  },
  async post<T = any>(resource: string, init: RequestInit = {}): Promise<T> {
    init.method = 'POST';
    return this.fetch(resource, init);
  },
  async delete<T = any>(resource: string, init: RequestInit = {}): Promise<T> {
    init.method = 'DELETE';
    return this.fetch(resource, init);
  },
  async put<T = any>(resource: string, init: RequestInit = {}): Promise<T> {
    init.method = 'PUT';
    return this.fetch(resource, init);
  },
  async patch<T = any>(resource: string, init: RequestInit = {}): Promise<T> {
    init.method = 'PATCH';
    return this.fetch(resource, init);
  },
};

export default bearerInstance;
