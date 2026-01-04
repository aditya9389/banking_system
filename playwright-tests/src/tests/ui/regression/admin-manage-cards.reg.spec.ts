import { test } from '@playwright/test';
import users from '../../../fixtures/auth/users.json';

import { LoginPage } from '../pages/common-pages/login.page';
import { AdminDashboardPage } from '../pages/admin-pages/admin-dashboard.page';
import { CreateAccountPage } from '../pages/admin-pages/create-account.page';
import { ViewAccountsPage } from '../pages/admin-pages/view-accounts.page';
import { ManageCardsPage } from '../pages/admin-pages/manage-cards.page';

test.describe('REG | Admin Manage Cards', () => {
  test('admin can create and deactivate a card', async ({ page }) => {
    const login = new LoginPage(page);
    const adminDashboard = new AdminDashboardPage(page);
    const createAccountPage = new CreateAccountPage(page);
    const viewAccountsPage = new ViewAccountsPage(page);
    const manageCardsPage = new ManageCardsPage(page);

    // ---- Login
    await page.goto('/login');
    await login.login(users.admin.username, users.admin.password);

    // ---- Create account
    await adminDashboard.clickCreateAccount();
    await createAccountPage.assertCreateAccountPageUsable();

    await createAccountPage.createAccount(
      5000,
      'SAVINGS',
      users.user.id
    );

    // ---- Discover account ID (explicit search)
    await adminDashboard.goToDashboard();
    await adminDashboard.clickViewAccounts();
    await viewAccountsPage.assertViewAccountsPageUsable();

    await viewAccountsPage.searchAccountsByUsername(users.user.username);
    await viewAccountsPage.assertUserAccountsTableVisible();

    const accountId = await viewAccountsPage.getFirstAccountId();

    // ---- Manage cards
    await adminDashboard.goToDashboard();
    await adminDashboard.clickManageCards();
    await manageCardsPage.assertManageCardsPageUsable();

    await manageCardsPage.searchCardsByAccountId(accountId);

    await manageCardsPage.createCard(
      users.user.username,
      accountId,
      'DEBIT',
      10000
    );
    await manageCardsPage.deactivateFirstActiveCard();
  });
});
