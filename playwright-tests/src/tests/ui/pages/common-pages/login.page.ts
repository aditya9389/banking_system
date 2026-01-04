import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  // Headings
  readonly loginHeading: Locator;

  // Inputs
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;

  // Actions
  readonly loginButton: Locator;

  // Error
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // Heading
    this.loginHeading = page.getByRole('heading', { name: 'Login' });

    // Inputs
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');

    // Button
    this.loginButton = page.getByRole('button', { name: 'Login' });

    // Error message
    this.errorMessage = page.locator('.error-msg');
  }

  /**
   * Perform login action with provided credentials
   *
   * @param username - Username to login with
   * @param password - Password to login with
   */
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /**
   * Assert that login page is usable
   * Verifies only critical elements required for login flow
   */
  async assertLoginPageUsable() {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  /**
   * Assert that login page is fully loaded
   * Verifies heading, inputs and submit button
   * Intended for full regression validation
   */
  async assertLoginPageFullyLoaded() {
    await expect(this.loginHeading).toBeVisible();
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  /**
   * Assert that login error message is visible
   * Used for invalid credential scenarios
   */
  async assertLoginErrorVisible() {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText('Invalid username or password');
  }

  /**
   * Assert that login error message is not visible
   * Used to validate successful login flow
   */
  async assertLoginErrorNotVisible() {
    await expect(this.errorMessage).toBeHidden();
  }
}
