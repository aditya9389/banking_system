import { Page, Locator, expect } from '@playwright/test';

export class ViewTransactionsPage {
  readonly page: Page;

  // Headings
  readonly pageTitle: Locator;
  readonly transactionsTitle: Locator;

  // Search
  readonly accountIdInput: Locator;
  readonly searchButton: Locator;

  // Error
  readonly errorMessage: Locator;

  // Transactions table
  readonly transactionsTable: Locator;
  readonly transactionRows: Locator;

  constructor(page: Page) {
    this.page = page;

    // Headings (emoji-safe)
    this.pageTitle = page.getByRole('heading', {
      name: /Admin - View Transaction History/i,
    });
    this.transactionsTitle = page.getByRole('heading', {
      name: 'Transaction History',
    });

    // Search
    this.accountIdInput = page.locator('input#accountId');
    this.searchButton = page.getByRole('button', { name: 'Search' });

    // Error
    this.errorMessage = page.locator('.error-message');

    // Table
    this.transactionsTable = page.locator('.transactions-table table');
    this.transactionRows = page.locator('.transactions-table tbody tr');
  }

  /**
   * Assert that View Transactions page is usable
   * Verifies search input and action
   */
  async assertViewTransactionsPageUsable() {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.accountIdInput).toBeVisible();
    await expect(this.searchButton).toBeVisible();
  }

  /**
   * Assert that View Transactions page is fully loaded
   * Intended for full regression validation
   */
  async assertViewTransactionsPageFullyLoaded() {
    await this.assertViewTransactionsPageUsable();
  }

  /**
   * Search transactions by Account ID
   *
   * @param accountId - Account ID whose transactions should be fetched
   */
  async searchTransactionsByAccountId(accountId: number | string) {
    await this.accountIdInput.fill(String(accountId));
    await this.searchButton.click();
  }

  /**
   * Assert that transactions table is visible
   * Verifies at least one transaction row is present
   */
  async assertTransactionsPresent() {
    await expect(this.transactionsTitle).toBeVisible();
    await expect(this.transactionsTable).toBeVisible();
    await expect(this.transactionRows.first()).toBeVisible();
  }

  /**
   * Assert that error message is visible
   *
   * @param expectedMessage - Expected error message
   */
  async assertErrorMessageVisible(expectedMessage: string) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText(expectedMessage);
  }
}
