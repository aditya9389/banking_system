import { test, expect } from '@playwright/test';
import users from '../../../fixtures/auth/users.json';

import { LoginPage } from '../pages/common-pages/login.page';
import { AdminDashboardPage } from '../pages/admin-pages/admin-dashboard.page';

test.describe('E2E | Logout', () => {
  test('admin logout clears session', async ({ page }) => {
    const login = new LoginPage(page);
    const admin = new AdminDashboardPage(page);

    await page.goto('/login');
    await login.login(users.admin.username, users.admin.password);
    await admin.assertAdminDashboardUsable();

    await admin.logout();
    await expect(page).toHaveURL(/login|home/);
  });
});
