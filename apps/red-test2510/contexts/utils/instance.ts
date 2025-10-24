import { merge } from 'lodash';
import { getToken } from '@contexts/utils';

const instance = {
  // baseUrl: process.env.NEXT_PUBLIC_REDAPI_BASE_URL,
  baseUrl: "https://api.redprinting.net",

  async fetch(resource: string, init: RequestInit) {
    const token = await getToken();
    const contentType =
      typeof init.body === 'string' ? { 'Content-Type': 'application/json' } : undefined;

    const requestInit = {
      headers: { ...contentType, 'Authorization': token },
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

export default instance;
