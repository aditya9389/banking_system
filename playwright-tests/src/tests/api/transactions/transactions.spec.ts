import { test, expect } from '@playwright/test';
import { createApiContext } from '../core/apiClient';
import { getUserToken } from '../core/auth';
import { ENV } from '../core/env';
import { TransactionEndpoints } from './endpoints';

test('Transaction history returns 200 or 204', async () => {
  const token = await getUserToken();
  const api = await createApiContext(ENV.TRANSACTIONS_BASE_URL, token);

  const res = await api.get(TransactionEndpoints.HISTORY(1));
  expect([200, 204]).toContain(res.status());
});
