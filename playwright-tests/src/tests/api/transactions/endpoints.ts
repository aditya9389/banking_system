export const TransactionEndpoints = {
  FROM: (accountId: number) => `/transactions/from/${accountId}`,
  TO: (accountId: number) => `/transactions/to/${accountId}`,
  HISTORY: (accountId: number) =>
    `/transactions/getTransactionHistory/${accountId}`,
};
