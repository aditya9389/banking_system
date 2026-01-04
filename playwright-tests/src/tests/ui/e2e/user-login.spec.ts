import { test } from '@playwright/test';
import users from '../../../fixtures/auth/users.json';

import { HomePage } from '../pages/common-pages/home.page';
import { LoginPage } from '../pages/common-pages/login.page';
import { UserDashboardPage } from '../pages/user-pages/user-dashboard.page';

test.describe('E2E | User Login', () => {
  test('user can login successfully', async ({ page }) => {
    const home = new HomePage(page);
    const login = new LoginPage(page);
    const dashboard = new UserDashboardPage(page);

    await home.navigate();
    await home.navigateToLogin();

    await login.login(users.user.username, users.user.password);
    await dashboard.assertUserDashboardUsable();
  });
});
