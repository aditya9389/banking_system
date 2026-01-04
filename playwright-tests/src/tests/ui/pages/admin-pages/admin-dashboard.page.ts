import { Page, Locator, expect } from '@playwright/test';

export class AdminDashboardPage {
  readonly page: Page;

  // Headings
  readonly adminTitle: Locator;
  readonly adminSubtitle: Locator;

  // Action buttons
  readonly createUserButton: Locator;
  readonly createAccountButton: Locator;
  readonly viewUsersButton: Locator;
  readonly viewAccountsButton: Locator;
  readonly manageCardsButton: Locator;
  readonly viewTransactionsButton: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.adminTitle = page.getByRole('heading', { name: 'Welcome, Admin!' });
    this.adminSubtitle = page.getByText('Manage the banking system efficiently.');

    this.createUserButton = page.getByRole('button', { name: 'Create New User' });
    this.createAccountButton = page.getByRole('button', { name: 'Create New Account' });
    this.viewUsersButton = page.getByRole('button', { name: 'View Users' });
    this.viewAccountsButton = page.getByRole('button', { name: 'View Accounts' });
    this.manageCardsButton = page.getByRole('button', { name: 'Manage Cards' });
    this.viewTransactionsButton = page.getByRole('button', { name: 'View Transactions' });
    this.logoutButton = page.getByRole('button', { name: 'Logout' });
  }
  /**
   * Navigate to Admin Dashboard page
   */
  async goToDashboard() {
    await this.page.goto('/admin-dashboard');
  }

  /**
   * Assert that admin dashboard is usable
   * Verifies only critical elements required for admin actions
   */
  async assertAdminDashboardUsable() {
    await expect(this.createUserButton).toBeVisible();
    await expect(this.logoutButton).toBeVisible();
  }

  /**
   * Assert that admin dashboard is fully loaded
   * Verifies headings and all admin action buttons
   * Intended for full regression validation
   */
  async assertAdminDashboardLoaded() {  
    await expect(this.adminTitle).toBeVisible();
    await expect(this.adminSubtitle).toBeVisible();

    await expect(this.createUserButton).toBeVisible();
    await expect(this.createAccountButton).toBeVisible();
    await expect(this.viewUsersButton).toBeVisible();
    await expect(this.viewAccountsButton).toBeVisible();
    await expect(this.manageCardsButton).toBeVisible();
    await expect(this.viewTransactionsButton).toBeVisible();
    await expect(this.logoutButton).toBeVisible();
  }

  /**
   * Assert that logout button is visible and enabled
   */
  async assertLogoutVisible() {
    await expect(this.logoutButton).toBeVisible();
    await expect(this.logoutButton).toBeEnabled();
  }

  /**
   * Navigate to Create New User page
   */
  async clickCreateUser() {
    await this.createUserButton.click();
  }

  /**
   * Navigate to Create New Account page
   */
  async clickCreateAccount() {
    await this.createAccountButton.click();
  }

  /**
   * Navigate to View Users page
   */
  async clickViewUsers() {
    await this.viewUsersButton.click();
  }

  /**
   * Navigate to View Accounts page
   */
  async clickViewAccounts() {
    await this.viewAccountsButton.click();
  }

  /**
   * Navigate to Manage Cards page
   */
  async clickManageCards() {
    await this.manageCardsButton.click();
  }

  /**
   * Navigate to View Transactions page
   */
  async clickViewTransactions() {
    await this.viewTransactionsButton.click();
  }

  /**
   * Perform logout action from admin dashboard
   */
  async logout() {
    await this.logoutButton.click();
  }
}
