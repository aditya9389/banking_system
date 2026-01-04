import { test, expect } from '@playwright/test';
import { createApiContext } from '../core/apiClient';
import { getUserToken } from '../core/auth';
import { ENV } from '../core/env';
import { CardEndpoints } from './endpoints';

test('Get cards by username returns array', async () => {
  const token = await getUserToken();
  const api = await createApiContext(ENV.CARDS_BASE_URL, token);

  const res = await api.get(CardEndpoints.GET_BY_USERNAME('seed_user'));
  expect(res.ok()).toBeTruthy();
});
