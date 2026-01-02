import { Page, Locator, expect } from '@playwright/test';

export class ViewUsersPage {
  readonly page: Page;

  // Headings
  readonly pageTitle: Locator;
  readonly userDetailsTitle: Locator;

  // Search
  readonly searchInput: Locator;

  // List & states
  readonly usersList: Locator;
  readonly userItems: Locator;
  readonly noUsersMessage: Locator;
  readonly errorMessage: Locator;

  // User details
  readonly userIdValue: Locator;
  readonly usernameValue: Locator;
  readonly roleValue: Locator;
  readonly phoneNumberValue: Locator;
  readonly backToUsersButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Headings
    this.pageTitle = page.getByRole('heading', { name: 'View Users' });
    this.userDetailsTitle = page.getByRole('heading', { name: 'User Details' });

    // Search
    this.searchInput = page.locator('input[placeholder="Search for a user..."]');

    // List & states
    this.usersList = page.locator('.users-list ul');
    this.userItems = page.locator('.users-list li');
    this.noUsersMessage = page.getByText('No users found.');
    this.errorMessage = page.locator('.error');

    // User details
    this.userIdValue = page.getByText(/UserId:/);
    this.usernameValue = page.getByText(/Username:/);
    this.roleValue = page.getByText(/Role:/);
    this.phoneNumberValue = page.getByText(/Phone Number:/);
    this.backToUsersButton = page.getByRole('button', { name: 'Back to All Users' });
  }

  /**
   * Assert that View Users page is usable
   * Verifies search input and page title
   */
  async assertViewUsersPageUsable() {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.searchInput).toBeVisible();
  }

  /**
   * Assert that View Users page is fully loaded
   * Verifies search, list container and possible empty state
   * Intended for full regression validation
   */
  async assertViewUsersPageFullyLoaded() {
    await this.assertViewUsersPageUsable();
    await expect(this.usersList.or(this.noUsersMessage)).toBeVisible();
  }

  /**
   * Search for a user using username or partial text
   *
   * @param searchTerm - Username or partial text to search
   */
  async searchUser(searchTerm: string) {
    await this.searchInput.fill(searchTerm);
  }

  /**
   * Assert that at least one user is visible in the list
   */
  async assertUsersPresent() {
    await expect(this.userItems.first()).toBeVisible();
  }

  /**
   * Assert that no users are found
   */
  async assertNoUsersFound() {
    await expect(this.noUsersMessage).toBeVisible();
  }

  /**
   * Select a user from the list by username
   *
   * @param username - Username to select
   */
  async selectUserByUsername(username: string) {
    await this.page
      .locator('.users-list li', { hasText: username })
      .first()
      .click();
  }

  /**
   * Assert that user details view is visible
   */
  async assertUserDetailsVisible() {
    await expect(this.userDetailsTitle).toBeVisible();
    await expect(this.userIdValue).toBeVisible();
    await expect(this.usernameValue).toBeVisible();
    await expect(this.roleValue).toBeVisible();
    await expect(this.phoneNumberValue).toBeVisible();
  }

  /**
   * Navigate back to users list from user details view
   */
  async backToUsersList() {
    await this.backToUsersButton.click();
  }

  /**
   * Assert that error message is visible
   *
   * @param expectedMessage - Expected error message text
   */
  async assertErrorMessageVisible(expectedMessage: string) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText(expectedMessage);
  }
}
