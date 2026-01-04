export const TransferEndpoints = {
  TRANSFER_FUNDS: '/Account/transferFunds',
  GET_MY_ACCOUNTS: '/Account/getMyAccounts',
  GET_MY_BALANCE: (accountId: number) =>
    `/Account/getMyAccountBalance/${accountId}`,
};
