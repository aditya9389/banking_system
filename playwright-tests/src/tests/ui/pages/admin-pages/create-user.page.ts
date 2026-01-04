import { Page, Locator, expect } from '@playwright/test';

export class CreateUserPage {
  readonly page: Page;

  // Heading
  readonly pageTitle: Locator;

  // Inputs
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly roleSelect: Locator;
  readonly phoneNumberInput: Locator;

  // Actions
  readonly createUserButton: Locator;

  // Feedback message
  readonly resultMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // Heading
    this.pageTitle = page.getByRole('heading', { name: 'Create New User' });

    // Inputs
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.roleSelect = page.locator('select[name="role"]');
    this.phoneNumberInput = page.locator('input[name="phoneNumber"]');

    // Button
    this.createUserButton = page.getByRole('button', { name: 'Create User' });

    // Message (success / error)
    this.resultMessage = page.locator('.container p');
  }

  /**
   * Assert that Create User page is usable
   * Verifies only critical elements required to create a user
   */
  async assertCreateUserPageUsable() {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.roleSelect).toBeVisible();
    await expect(this.phoneNumberInput).toBeVisible();
    await expect(this.createUserButton).toBeVisible();
  }

  /**
   * Assert that Create User page is fully loaded
   * Verifies heading and all form fields
   * Intended for full regression validation
   */
  async assertCreateUserPageFullyLoaded() {
    await expect(this.pageTitle).toBeVisible();
    await this.assertCreateUserPageUsable();
  }

  /**
   * Fill Create User form with provided data
   *
   * @param username - Username of the new user
   * @param password - Password of the new user
   * @param role - Role of the new user (ADMIN | USER)
   * @param phoneNumber - Phone number of the new user
   */
  async fillCreateUserForm(
    username: string,
    password: string,
    role: 'ADMIN' | 'USER',
    phoneNumber: string
  ) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.roleSelect.selectOption(role);
    await this.phoneNumberInput.fill(phoneNumber);
  }

  /**
   * Submit Create User form
   */
  async submitCreateUser() {
    await this.createUserButton.click();
  }

  /**
   * Create a new user using provided details
   * Combines form fill and submit actions
   *
   * @param username - Username of the new user
   * @param password - Password of the new user
   * @param role - Role of the new user
   * @param phoneNumber - Phone number of the new user
   */
  async createUser(
    username: string,
    password: string,
    role: 'ADMIN' | 'USER',
    phoneNumber: string
  ) {
    await this.fillCreateUserForm(username, password, role, phoneNumber);
    await this.submitCreateUser();
  }

  /**
   * Assert that user creation was successful
   */
  async assertUserCreatedSuccessfully() {
    await expect(this.resultMessage).toBeVisible();
    await expect(this.resultMessage).toHaveText('User created successfully!');
  }
}
