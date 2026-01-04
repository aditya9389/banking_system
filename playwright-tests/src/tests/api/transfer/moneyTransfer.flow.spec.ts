import { test, expect } from '@playwright/test';
import { createApiContext } from '../core/apiClient';
import { getAdminToken, getUserToken } from '../core/auth';
import { ENV } from '../core/env';
import { TransferEndpoints } from './endpoints';
import { TransferTestData } from './testData';

let fromAccountId: number;
let toAccountId: number;

test.beforeAll(async () => {
  const adminToken = await getAdminToken();
  const adminApi = await createApiContext(ENV.ACCOUNTS_BASE_URL, adminToken);

  // fetch existing accounts for seed_user
  const accountsRes = await adminApi.get(
    `/Account/getUserAccounts/seed_user`
  );
  expect(accountsRes.ok()).toBeTruthy();

  const existingAccounts = (await accountsRes.json()).accounts ?? [];

  // create accounts if fewer than 2
  while (existingAccounts.length < 2) {
    const createRes = await adminApi.post('/Account/createAccount', {
      data: {
        username: 'seed_user',
        balance: 1000,
        accountType: 'SAVINGS',
      },
    });
    expect(createRes.ok()).toBeTruthy();
    existingAccounts.push(await createRes.json());
  }

  fromAccountId = existingAccounts[0].id;
  toAccountId = existingAccounts[1].id;
});

test('Money transfer works end-to-end', async () => {
  const userToken = await getUserToken();
  const api = await createApiContext(ENV.ACCOUNTS_BASE_URL, userToken);

  const beforeRes = await api.get(
    TransferEndpoints.GET_MY_BALANCE(fromAccountId)
  );
  expect(beforeRes.ok()).toBeTruthy();

  const beforeText = await beforeRes.text();
  expect(beforeText.length).toBeGreaterThan(0);
  const beforeBalance = JSON.parse(beforeText).balance;

  const transferRes = await api.post(TransferEndpoints.TRANSFER_FUNDS, {
    data: {
      fromAccountId,
      toAccountId,
      amount: TransferTestData.AMOUNT,
    },
  });
  expect(transferRes.ok()).toBeTruthy();

  const afterRes = await api.get(
    TransferEndpoints.GET_MY_BALANCE(fromAccountId)
  );
  expect(afterRes.ok()).toBeTruthy();

  const afterText = await afterRes.text();
  expect(afterText.length).toBeGreaterThan(0);
  const afterBalance = JSON.parse(afterText).balance;

  expect(afterBalance).toBe(beforeBalance - TransferTestData.AMOUNT);
});
