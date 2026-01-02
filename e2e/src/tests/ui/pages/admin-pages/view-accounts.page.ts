import { Page, Locator, expect } from '@playwright/test';

export class ViewAccountsPage {
  readonly page: Page;

  // Headings
  readonly pageTitle: Locator;
  readonly singleAccountTitle: Locator;
  readonly userAccountsTitle: Locator;

  // Search inputs
  readonly accountIdInput: Locator;
  readonly usernameInput: Locator;

  // Actions
  readonly searchByIdButton: Locator;
  readonly searchByUsernameButton: Locator;
  readonly resetButton: Locator;

  // Error
  readonly errorMessage: Locator;

  // Single account details
  readonly accountIdValue: Locator;
  readonly accountTypeValue: Locator;
  readonly balanceValue: Locator;
  readonly usernameValue: Locator;

  // Accounts table
  readonly accountsTable: Locator;
  readonly accountRows: Locator;

  constructor(page: Page) {
    this.page = page;

    // Headings (emoji ignored automatically by role)
    this.pageTitle = page.getByRole('heading', { name: /View Account Details/i });
    this.singleAccountTitle = page.getByRole('heading', { name: 'Account Details' });
    this.userAccountsTitle = page.getByRole('heading', { name: /User's Accounts/i });

    // Search inputs
    this.accountIdInput = page.locator('input[placeholder="Search by Account ID"]');
    this.usernameInput = page.locator('input[placeholder="Search by Username"]');

    // Buttons
    this.searchByIdButton = page.getByRole('button', { name: 'Search by ID' });
    this.searchByUsernameButton = page.getByRole('button', { name: 'Search by Username' });
    this.resetButton = page.getByRole('button', { name: 'Reset' });

    // Error
    this.errorMessage = page.locator('.error-message');

    // Single account fields
    this.accountIdValue = page.getByText(/Account ID:/);
    this.accountTypeValue = page.getByText(/Account Type:/);
    this.balanceValue = page.getByText(/Balance:/);
    this.usernameValue = page.getByText(/Username:/);

    // Accounts table
    this.accountsTable = page.locator('.accounts-list table');
    this.accountRows = page.locator('.accounts-list tbody tr');
  }

  /**
   * Assert that View Accounts page is usable
   * Verifies search inputs and actions
   */
  async assertViewAccountsPageUsable() {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.accountIdInput).toBeVisible();
    await expect(this.usernameInput).toBeVisible();
    await expect(this.searchByIdButton).toBeVisible();
    await expect(this.searchByUsernameButton).toBeVisible();
    await expect(this.resetButton).toBeVisible();
  }

  /**
   * Assert that View Accounts page is fully loaded
   * Intended for full regression validation
   */
  async assertViewAccountsPageFullyLoaded() {
    await this.assertViewAccountsPageUsable();
  }

  /**
   * Search account by Account ID
   *
   * @param accountId - Account ID to search
   */
  async searchAccountById(accountId: string | number) {
    await this.accountIdInput.fill(String(accountId));
    await this.searchByIdButton.click();
  }

  /**
   * Search accounts by username
   *
   * @param username - Username whose accounts should be fetched
   */
  async searchAccountsByUsername(username: string) {
    await this.usernameInput.fill(username);
    await this.searchByUsernameButton.click();
  }

  /**
   * Reset search inputs and results
   */
  async resetSearch() {
    await this.resetButton.click();
  }

  /**
   * Assert that single account details are visible
   */
  async assertSingleAccountDetailsVisible() {
    await expect(this.singleAccountTitle).toBeVisible();
    await expect(this.accountIdValue).toBeVisible();
    await expect(this.accountTypeValue).toBeVisible();
    await expect(this.balanceValue).toBeVisible();
    await expect(this.usernameValue).toBeVisible();
  }

  /**
   * Assert that user accounts table is visible
   */
  async assertUserAccountsTableVisible() {
    await expect(this.userAccountsTitle).toBeVisible();
    await expect(this.accountsTable).toBeVisible();
    await expect(this.accountRows.first()).toBeVisible();
  }
  /**
   * Get Account ID of the first account in the accounts table
   *
   * @returns Account ID as string
   */
  async getFirstAccountId(): Promise<string> {
    const firstRow = this.accountRows.first();
    const accountIdCell = firstRow.locator('td').first();
    return accountIdCell.textContent().then((text) => text?.trim() || '');
  }
  /**
 * Get all account IDs from the user accounts table
 *
 * @returns Array of Account IDs as strings
 */
  async getAllAccountIds(): Promise<string[]> {
    const count = await this.accountRows.count();
    const accountIds: string[] = [];

    for (let i = 0; i < count; i++) {
      const cell = this.accountRows.nth(i).locator('td').first();
      const text = (await cell.textContent())?.trim();
      if (text) {
        accountIds.push(text);
      }
    }

    return accountIds;
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
