// import { test, expect } from '@playwright/test';
// import { createApiContext } from '../core/apiClient';
// import { getAdminToken, getUserToken } from '../core/auth';
// import { ENV } from '../core/env';
// import { TransferEndpoints } from './endpoints';
// import { TransferTestData } from './testData';

// let fromAccountId: number;
// let toAccountId: number;

// test.beforeAll(async () => {
//   const adminToken = await getAdminToken();
//   const adminApi = await createApiContext(ENV.ACCOUNTS_BASE_URL, adminToken);

//   // ADMIN: fetch existing accounts
//   const res = await adminApi.get(
//     TransferEndpoints.GET_USER_ACCOUNTS_ADMIN('seed_user')
//   );
//   expect(res.ok()).toBeTruthy();

//   const accounts = (await res.json()).accounts ?? [];

//   // Ensure at least 2 accounts
//   while (accounts.length < 2) {
//     const createRes = await adminApi.post(
//       TransferEndpoints.CREATE_ACCOUNT,
//       {
//         data: {
//           username: 'seed_user',
//           balance: 1000,
//           accountType: 'SAVINGS',
//         },
//       }
//     );
//     expect(createRes.ok()).toBeTruthy();
//     accounts.push(await createRes.json());
//   }

//   fromAccountId = accounts[0].id;
//   toAccountId = accounts[1].id;
// });

// test('Money transfer works end-to-end', async () => {
//   const userToken = await getUserToken();
//   const api = await createApiContext(ENV.ACCOUNTS_BASE_URL, userToken);

//   const beforeRes = await api.get(
//     TransferEndpoints.GET_MY_BALANCE(fromAccountId)
//   );

//   if (beforeRes.status() === 403) {
//     throw new Error(
//       'USER forbidden from reading balance – wrong endpoint or ownership issue'
//     );
//   }

//   expect(beforeRes.ok()).toBeTruthy();
//   const beforeBalance = (await beforeRes.json()).balance;

//   const transferRes = await api.post(
//     TransferEndpoints.TRANSFER_FUNDS,
//     {
//       data: {
//         fromAccountId,
//         toAccountId,
//         amount: TransferTestData.AMOUNT,
//       },
//     }
//   );
//   expect(transferRes.ok()).toBeTruthy();

//   const afterRes = await api.get(
//     TransferEndpoints.GET_MY_BALANCE(fromAccountId)
//   );
//   expect(afterRes.ok()).toBeTruthy();

//   const afterBalance = (await afterRes.json()).balance;
//   expect(afterBalance).toBe(beforeBalance - TransferTestData.AMOUNT);
// });
