import { test } from '@playwright/test';
import users from '../../../fixtures/auth/users.json';

import { LoginPage } from '../pages/common-pages/login.page';
import { UserDashboardPage } from '../pages/user-pages/user-dashboard.page';

test.describe('E2E | User Accounts Visibility', () => {
  test('user can view accounts section', async ({ page }) => {
    const login = new LoginPage(page);
    const dashboard = new UserDashboardPage(page);

    await page.goto('/login');
    await login.login(users.user.username, users.user.password);

    await dashboard.assertUserDashboardUsable();
    await dashboard.refreshAccounts();
  });
});
