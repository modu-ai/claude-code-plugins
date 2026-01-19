import { baseURL } from 'config/api';

export const get = async <T>(url: string, token?: string): Promise<T> => {
  const res = await fetch(`${baseURL}${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  return res.json();
};

export const post = async <TResponse, TBody = unknown>(
  url: string,
  body: TBody,
  token?: string
): Promise<TResponse> => {
  const res = await fetch(`${baseURL}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });

  return res.json();
};
