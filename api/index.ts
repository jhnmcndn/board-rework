import { serverConfig } from '@/server';
import { ErrorData, RootResponse } from '@/types/app';
import { API_ENDPOINT, APP_ROUTE } from '@/types/enums';
import { headers } from './headers';

export type RequestParams = {
  route: APP_ROUTE;
  endpoint: API_ENDPOINT;
  body?: unknown;
  tags: API_ENDPOINT;
  otherHeaders?: HeadersInit;
};

export const errorRootResponse = {
  code: 500,
  data: { message: 'Server error' },
  hasNext: false,
  msg: '',
  otherData: '',
  total: 0,
} satisfies RootResponse;

export const request = async <T>({
  route,
  endpoint,
  body,
  tags,
  otherHeaders,
}: RequestParams): Promise<T | Partial<RootResponse<ErrorData>>> => {
  const domain = serverConfig.domain;
  const method = 'POST';
  const response = await fetch(`${domain}${route}${endpoint}`, {
    headers: {
      ...(await headers()),
      ...otherHeaders,
    },
    method,
    body: JSON.stringify(body),
    next: {
      tags: [tags],
    },
  });
  if (!response.ok) return errorRootResponse;
  const data = await response.json();
  return data as T;
};

export const getIp = async (): Promise<string> => {
  const response = await fetch('https://api.ipify.org?format=json');
  if (!response.ok) return '';
  const data = (await response.json()) as { ip: string };
  if (window !== undefined) {
    localStorage.setItem('externalIp', data.ip);
  }
  return data.ip;
};
