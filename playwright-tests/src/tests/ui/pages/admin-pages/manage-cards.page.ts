import { Page, Locator, expect } from '@playwright/test';

export class ManageCardsPage {
  readonly page: Page;

  // Headings
  readonly pageTitle: Locator;
  readonly searchSectionTitle: Locator;
  readonly existingCardsTitle: Locator;
  readonly createCardTitle: Locator;

  // Search
  readonly accountIdSearchInput: Locator;
  readonly searchButton: Locator;
  readonly noCardsMessage: Locator;

  // Cards list
  readonly cardsList: Locator;
  readonly cardItems: Locator;

  // Create card form
  readonly usernameInput: Locator;
  readonly accountIdInput: Locator;
  readonly cardTypeSelect: Locator;
  readonly limitOrBalanceInput: Locator;
  readonly createCardButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Headings
    this.pageTitle = page.getByRole('heading', { name: 'Card Management' });
    this.searchSectionTitle = page.getByRole('heading', { name: 'Search Cards by Account ID' });
    this.existingCardsTitle = page.getByRole('heading', { name: 'Existing Cards' });
    this.createCardTitle = page.getByRole('heading', { name: 'Create New Card' });

    // Search
    this.accountIdSearchInput = page.locator('input[placeholder="Enter Account ID"]');
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.noCardsMessage = page.getByText(/No cards found for Account ID/i);

    // Cards list
    this.cardsList = page.locator('ul');
    this.cardItems = page.locator('ul > li');

    // Create card form
    this.usernameInput = page.locator('input[name="username"]');
    this.accountIdInput = page.locator('input[name="accountId"]');
    this.cardTypeSelect = page.locator('select[name="cardType"]');
    this.limitOrBalanceInput = page.locator('input[name="limitOrBalance"]');
    this.createCardButton = page.getByRole('button', { name: 'Create Card' });
  }

  /**
   * Assert that Manage Cards page is usable
   * Verifies only critical elements required for card management
   */
  async assertManageCardsPageUsable() {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.accountIdSearchInput).toBeVisible();
    await expect(this.searchButton).toBeVisible();
    await expect(this.createCardButton).toBeVisible();
  }

  /**
   * Assert that Manage Cards page is fully loaded
   * Intended for full regression validation
   */
  async assertManageCardsPageFullyLoaded() {
    await this.assertManageCardsPageUsable();
    await expect(this.searchSectionTitle).toBeVisible();
    await expect(this.createCardTitle).toBeVisible();
  }

  /**
   * Search cards by Account ID
   *
   * @param accountId - Account ID to search cards for
   */
  async searchCardsByAccountId(accountId: number | string) {
    await this.accountIdSearchInput.fill(String(accountId));
    await this.searchButton.click();
  }

  /**
   * Assert that cards list is visible
   */
  async assertCardsPresent() {
    await expect(this.existingCardsTitle).toBeVisible();
    await expect(this.cardItems.first()).toBeVisible();
  }

  /**
   * Assert that no cards were found for searched Account ID
   */
  async assertNoCardsFound() {
    await expect(this.noCardsMessage).toBeVisible();
  }

  /**
   * Deactivate first active card in the list
   * Assumes at least one active card is present
   */
  async deactivateFirstActiveCard() {
    const deactivateButton = this.page.getByRole('button', { name: 'Deactivate' }).first();
    await expect(deactivateButton).toBeVisible();
    await deactivateButton.click();
  }

  /**
   * Fill Create Card form with provided data
   *
   * @param username - Username for which card is created
   * @param accountId - Account ID
   * @param cardType - Card type (CREDIT | DEBIT)
   * @param limitOrBalance - Credit limit or debit balance
   */
  async fillCreateCardForm(
    username: string,
    accountId: string | number,
    cardType: 'CREDIT' | 'DEBIT',
    limitOrBalance: number
  ) {
    await this.usernameInput.fill(username);
    await this.accountIdInput.fill(String(accountId));
    await this.cardTypeSelect.selectOption(cardType);
    await this.limitOrBalanceInput.fill(String(limitOrBalance));
  }

  /**
   * Submit Create Card form
   */
  async submitCreateCard() {
    await this.createCardButton.click();
  }

  /**
   * Create a new card using provided details
   *
   * @param username - Username
   * @param accountId - Account ID
   * @param cardType - Card type
   * @param limitOrBalance - Limit or balance
   */
  async createCard(
    username: string,
    accountId: string | number,
    cardType: 'CREDIT' | 'DEBIT',
    limitOrBalance: number
  ) {
    await this.fillCreateCardForm(username, accountId, cardType, limitOrBalance);
    await this.submitCreateCard();
  }
}
