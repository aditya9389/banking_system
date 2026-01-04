import { request, APIRequestContext } from '@playwright/test';

export async function createApiContext(
  baseURL: string,
  token?: string
): Promise<APIRequestContext> {
  return await request.newContext({
    baseURL,
    extraHTTPHeaders: token
      ? {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      : {
          'Content-Type': 'application/json',
        },
  });
}
