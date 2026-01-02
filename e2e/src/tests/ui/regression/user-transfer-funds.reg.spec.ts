import { test,expect } from '@playwright/test';
import users from '../../../fixtures/auth/users.json';

import { LoginPage } from '../pages/common-pages/login.page';
import { AdminDashboardPage } from '../pages/admin-pages/admin-dashboard.page';
import { CreateAccountPage } from '../pages/admin-pages/create-account.page';
import { ViewAccountsPage } from '../pages/admin-pages/view-accounts.page';
import { UserDashboardPage } from '../pages/user-pages/user-dashboard.page';

test.describe('REG | User Transfer Funds', () => {
  test('user can transfer funds between two accounts', async ({ page }) => {
    const login = new LoginPage(page);
    const adminDashboard = new AdminDashboardPage(page);
    const createAccountPage = new CreateAccountPage(page);
    const viewAccountsPage = new ViewAccountsPage(page);
    const userDashboard = new UserDashboardPage(page);

    // -------------------------
    // Admin creates 2 accounts
    // -------------------------
    await page.goto('/login');
    await login.login(users.admin.username, users.admin.password);

    await adminDashboard.clickCreateAccount();
    await createAccountPage.createAccount(10000, 'SAVINGS', users.user.id);

    await adminDashboard.goToDashboard();
    await adminDashboard.clickCreateAccount();
    await createAccountPage.createAccount(5000, 'SAVINGS', users.user.id);

    // -------------------------
    // Discover account IDs
    // -------------------------
    await adminDashboard.goToDashboard();
    await adminDashboard.clickViewAccounts();
    await viewAccountsPage.assertViewAccountsPageUsable();

    await viewAccountsPage.searchAccountsByUsername(users.user.username);
    await viewAccountsPage.assertUserAccountsTableVisible();

    const accountIds = await viewAccountsPage.getAllAccountIds();
    expect(accountIds.length).toBeGreaterThanOrEqual(2);

    const fromAccountId = accountIds[0];
    const toAccountId = accountIds[1];

    // -------------------------
    // User transfers funds
    // -------------------------
    await adminDashboard.goToDashboard();
    await adminDashboard.logout();
    await login.login(users.user.username, users.user.password);

    await userDashboard.assertUserDashboardUsable();

    await userDashboard.transferFunds(
      fromAccountId,
      toAccountId,
      1000
    );

    await userDashboard.assertTransferStatusVisible();
  });
});
