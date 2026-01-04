export const AccountsEndpoints = {
  LOGIN: '/User/userLogin',

  CREATE_USER: '/User/createUser',
  GET_USERS: '/User/getUsers',
  GET_USER: (username: string) => `/User/getUser/${username}`,
  DELETE_USER: (username: string) => `/User/deleteUser/${username}`,

  CREATE_ACCOUNT: '/Account/createAccount',
  GET_MY_ACCOUNTS: '/Account/getMyAccounts',
  GET_USER_ACCOUNTS: (username: string) =>
    `/Account/getUserAccounts/${username}`,
  GET_MY_BALANCE: (accountId: number) =>
    `/Account/getMyAccountBalance/${accountId}`,
  GET_USER_BALANCE: (accountId: number) =>
    `/Account/getUserAccountBalance/${accountId}`,
  DELETE_ACCOUNT: (accountId: number) =>
    `/Account/deleteAccount/${accountId}`,

  TRANSFER_FUNDS: '/Account/transferFunds',
};
