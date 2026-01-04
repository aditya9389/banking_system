import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;

  // Navbar
  readonly appTitle: Locator;

  // Hero section
  readonly heroTitle: Locator;
  readonly heroDescription: Locator;
  readonly loginButton: Locator;

  // Features section
  readonly secureAuthFeature: Locator;
  readonly accountManagementFeature: Locator;
  readonly scalableArchitectureFeature: Locator;

  constructor(page: Page) {
    this.page = page;

    // Navbar
    this.appTitle = page.getByRole('heading', {
      name: 'Microservices Based Banking System',
    });

    // Hero section
    this.heroTitle = page.getByRole('heading', {
      name: 'Secure & Scalable Banking System',
    });
    this.heroDescription = page.getByText(
      'Manage your accounts with advanced security and a seamless experience.'
    );
    this.loginButton = page.getByRole('button', { name: 'Login' });

    // Features section
    this.secureAuthFeature = page.getByRole('heading', {
      name: 'Secure Authentication',
    });
    this.accountManagementFeature = page.getByRole('heading', {
      name: 'Account Management',
    });
    this.scalableArchitectureFeature = page.getByRole('heading', {
      name: 'Scalable Architecture',
    });
  }

  /**
   * Navigate to home page
   */
  async navigate() {
    await this.page.goto('/');
  }

  /**
   * Navigate from home page to login page
   */
  async navigateToLogin() {
    await this.loginButton.click();
  }

  /**
   * Assert that home page is usable
   * Verifies only critical element required for user flow
   */
  async assertHomePageUsable() {
    await expect(this.loginButton).toBeVisible();
  }

  /**
   * Assert that home page is fully loaded
   * Verifies all major UI sections
   * Intended for full regression or scheduled checks
   */
  async assertHomePageFullyLoaded() {
    await expect(this.appTitle).toBeVisible();

    await expect(this.heroTitle).toBeVisible();
    await expect(this.heroDescription).toBeVisible();
    await expect(this.loginButton).toBeVisible();

    await expect(this.secureAuthFeature).toBeVisible();
    await expect(this.accountManagementFeature).toBeVisible();
    await expect(this.scalableArchitectureFeature).toBeVisible();
  }
}
