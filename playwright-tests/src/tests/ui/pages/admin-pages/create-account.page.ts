import { Page, Locator, expect } from '@playwright/test';

export class CreateAccountPage {
  readonly page: Page;

  // Heading
  readonly pageTitle: Locator;

  // Inputs
  readonly initialDepositInput: Locator;
  readonly accountTypeSelect: Locator;
  readonly userIdInput: Locator;

  // Actions
  readonly createAccountButton: Locator;

  // Feedback message
  readonly resultMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // Heading
    this.pageTitle = page.getByRole('heading', { name: 'Create New Account' });

    // Inputs
    this.initialDepositInput = page.locator('input[name="balance"]');
    this.accountTypeSelect = page.locator('select[name="accountType"]');
    this.userIdInput = page.locator('input[name="userId"]');

    // Button
    this.createAccountButton = page.getByRole('button', { name: 'Create Account' });

    // Message (success / error)
    this.resultMessage = page.locator('.container p');
  }

  /**
   * Assert that Create Account page is usable
   * Verifies only critical elements required to create an account
   */
  async assertCreateAccountPageUsable() {
    await expect(this.initialDepositInput).toBeVisible();
    await expect(this.accountTypeSelect).toBeVisible();
    await expect(this.userIdInput).toBeVisible();
    await expect(this.createAccountButton).toBeVisible();
  }

  /**
   * Assert that Create Account page is fully loaded
   * Verifies heading and all form fields
   * Intended for full regression validation
   */
  async assertCreateAccountPageFullyLoaded() {
    await expect(this.pageTitle).toBeVisible();
    await this.assertCreateAccountPageUsable();
  }

  /**
   * Fill Create Account form with provided data
   *
   * @param initialDeposit - Initial deposit amount
   * @param accountType - Account type (SAVINGS | CURRENT)
   * @param userId - User ID for which account is created
   */
  async fillCreateAccountForm(
    initialDeposit: number,
    accountType: 'SAVINGS' | 'CURRENT',
    userId: string
  ) {
    await this.initialDepositInput.fill(String(initialDeposit));
    await this.accountTypeSelect.selectOption(accountType);
    await this.userIdInput.fill(userId);
  }

  /**
   * Submit Create Account form
   */
  async submitCreateAccount() {
    await this.createAccountButton.click();
  }

  /**
   * Create a new account using provided details
   * Combines form fill and submit actions
   *
   * @param initialDeposit - Initial deposit amount
   * @param accountType - Account type
   * @param userId - User ID
   */
  async createAccount(
    initialDeposit: number,
    accountType: 'SAVINGS' | 'CURRENT',
    userId: string
  ) {
    await this.fillCreateAccountForm(initialDeposit, accountType, userId);
    await this.submitCreateAccount();
  }

  /**
   * Assert that account creation was successful
   */
  async assertAccountCreatedSuccessfully() {
    await expect(this.resultMessage).toBeVisible();
    await expect(this.resultMessage).toHaveText('Account created successfully!');
  }
}
