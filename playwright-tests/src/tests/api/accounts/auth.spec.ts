import { test, expect } from '@playwright/test';
import { createApiContext } from '../core/apiClient';
import { ENV } from '../core/env';
import { AccountsEndpoints } from './endpoints';

test('User login succeeds with valid credentials', async () => {
  const api = await createApiContext(ENV.ACCOUNTS_BASE_URL);

  const res = await api.post(AccountsEndpoints.LOGIN, {
    data: {
      username: 'admin',
      password: 'admin123',
    },
  });

  expect(res.ok()).toBeTruthy();
  const body = await res.json();
  expect(body.token).toBeDefined();
});
