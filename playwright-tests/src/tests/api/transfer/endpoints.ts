export const TransferEndpoints = {
  GET_USER_ACCOUNTS_ADMIN: (username: string) =>
    `/Account/getUserAccounts/${username}`,

  CREATE_ACCOUNT: '/Account/createAccount',

  GET_MY_BALANCE: (accountId: number) =>
    `/Account/getMyAccountBalance/${accountId}`,

  TRANSFER_FUNDS: '/Account/transferFunds',
};
