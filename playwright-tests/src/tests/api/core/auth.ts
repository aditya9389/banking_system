import { createApiContext } from './apiClient';
import { ENV } from './env';

let adminToken: string | null = null;
let userToken: string | null = null;

const LOGIN_ENDPOINT = '/User/userLogin';

async function login(username: string, password: string): Promise<string> {
  const api = await createApiContext(ENV.ACCOUNTS_BASE_URL);

  const res = await api.post(LOGIN_ENDPOINT, {
    data: { username, password },
  });

  if (!res.ok()) {
    throw new Error(`Login failed for ${username}`);
  }

  const body = await res.json();
  return body.token;
}

export async function getAdminToken(): Promise<string> {
  if (!adminToken) {
    adminToken = await login('admin', 'admin123');
  }
  return adminToken;
}

export async function getUserToken(): Promise<string> {
  if (!userToken) {
    userToken = await login('seed_user', 'user123');
  }
  return userToken;
}
