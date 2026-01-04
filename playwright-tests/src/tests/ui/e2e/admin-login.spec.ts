import { test } from '@playwright/test';
import users from '../../../fixtures/auth/users.json';

import { HomePage } from '../pages/common-pages/home.page';
import { LoginPage } from '../pages/common-pages/login.page';
import { AdminDashboardPage } from '../pages/admin-pages/admin-dashboard.page';

test.describe('E2E | Admin Login', () => {
  test('admin can login successfully', async ({ page }) => {
    const home = new HomePage(page);
    const login = new LoginPage(page);
    const adminDashboard = new AdminDashboardPage(page);

    await home.navigate();
    await home.navigateToLogin();

    await login.login(users.admin.username, users.admin.password);
    await adminDashboard.assertAdminDashboardUsable();
  });
});
