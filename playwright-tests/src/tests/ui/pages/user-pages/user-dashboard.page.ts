import { Page, Locator, expect } from '@playwright/test';

export class UserDashboardPage {
  readonly page: Page;

  // Headings
  readonly welcomeTitle: Locator;

  // Accounts section
  readonly accountsSectionTitle: Locator;
  readonly refreshAccountsButton: Locator;
  readonly accountItems: Locator;
  readonly noAccountsMessage: Locator;

  // Transaction & card toggles
  readonly showTransactionButtons: Locator;
  readonly showCardButtons: Locator;

  // Transaction history
  readonly transactionHistoryTitle: Locator;
  readonly transactionItems: Locator;

  // Cards
  readonly cardItems: Locator;
  readonly noCardsMessage: Locator;

  // Transfer funds
  readonly transferSectionTitle: Locator;
  readonly fromAccountSelect: Locator;
  readonly toAccountInput: Locator;
  readonly amountInput: Locator;
  readonly transferButton: Locator;
  readonly transferStatusMessage: Locator;

  // Logout
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Headings
    this.welcomeTitle = page.locator('h2.welcome');
    this.accountsSectionTitle = page.getByRole('heading', { name: 'Your Accounts' });
    this.transferSectionTitle = page.getByRole('heading', { name: 'Transfer Funds' });

    // Accounts
    this.refreshAccountsButton = page.getByRole('button', { name: 'Refresh' });
    this.accountItems = page.locator('ul > li');
    this.noAccountsMessage = page.getByText('No accounts found.');

    // Toggles
    this.showTransactionButtons = page.locator('button', { hasText: /Show Transactions|Hide Transactions/ });
    this.showCardButtons = page.locator('button', { hasText: /Show Cards|Hide Cards/ });

    // Transactions
    this.transactionHistoryTitle = page.locator('h4', { hasText: 'Transaction History' });
    this.transactionItems = page.locator('.transaction-list li');

    // Cards
    this.cardItems = page.locator('.transaction-list li');
    this.noCardsMessage = page.getByText(/No cards found for this account/i);

    // Transfer
    this.fromAccountSelect = page.locator('select[name="from"]');
    this.toAccountInput = page.locator('input[name="to"]');
    this.amountInput = page.locator('input[name="amount"]');
    this.transferButton = page.getByRole('button', { name: 'Transfer' });
    this.transferStatusMessage = page.locator('p', { hasText: /success|failed|completed/i });

    // Logout
    this.logoutButton = page.getByRole('button', { name: 'Logout' });
  }

  /**
   * Assert that user dashboard is usable
   * Verifies critical actions are available
   */
  async assertUserDashboardUsable() {
    await expect(this.welcomeTitle).toBeVisible();
    await expect(this.refreshAccountsButton).toBeVisible();
    await expect(this.transferSectionTitle).toBeVisible();
    await expect(this.logoutButton).toBeVisible();
  }

  /**
   * Assert that user dashboard is fully loaded
   * Intended for regression validation
   */
  async assertUserDashboardFullyLoaded() {
    await this.assertUserDashboardUsable();
    await expect(this.accountsSectionTitle).toBeVisible();
  }

  /**
   * Refresh user accounts list
   */
  async refreshAccounts() {
    await this.refreshAccountsButton.click();
  }

  /**
   * Assert that at least one account is visible
   */
  async assertAccountsPresent() {
    await expect(this.accountItems.first()).toBeVisible();
  }

  /**
   * Toggle transaction history for first account
   */
  async toggleTransactionsForFirstAccount() {
    await this.showTransactionButtons.first().click();
  }

  /**
   * Assert that transaction history is visible
   */
  async assertTransactionHistoryVisible() {
    await expect(this.transactionHistoryTitle).toBeVisible();
    await expect(this.transactionItems.first()).toBeVisible();
  }

  /**
   * Toggle card list for first account
   */
  async toggleCardsForFirstAccount() {
    await this.showCardButtons.first().click();
  }

  /**
   * Assert that cards are visible or empty state shown
   */
  async assertCardsVisibleOrEmpty() {
    await expect(this.cardItems.first().or(this.noCardsMessage)).toBeVisible();
  }

  /**
   * Transfer funds between accounts
   *
   * @param fromAccountId - Source account ID
   * @param toAccountId - Destination account ID
   * @param amount - Amount to transfer
   */
  async transferFunds(fromAccountId: string, toAccountId: string, amount: number) {
    await this.fromAccountSelect.selectOption(fromAccountId);
    await this.toAccountInput.fill(toAccountId);
    await this.amountInput.fill(String(amount));
    await this.transferButton.click();
  }

  /**
   * Assert that transfer status message is visible
   */
  async assertTransferStatusVisible() {
    await expect(this.transferStatusMessage).toBeVisible();
  }

  /**
   * Logout from user dashboard
   */
  async logout() {
    await this.logoutButton.click();
  }
}
