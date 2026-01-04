export const CardEndpoints = {
  CREATE_CARD: '/card/createCard',
  GET_BY_USERNAME: (username: string) =>
    `/card/getCardsByUsername/${username}`,
  GET_BY_ACCOUNT: (accountId: number) =>
    `/card/getCardsByAccount/${accountId}`,
  DEACTIVATE: (cardId: number) => `/card/deactivateCard/${cardId}`,
  DELETE_ALL: (accountId: number) => `/card/deleteAllCards/${accountId}`,
};
