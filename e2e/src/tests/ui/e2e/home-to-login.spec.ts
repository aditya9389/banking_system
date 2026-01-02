import { test } from '@playwright/test';
import { HomePage } from '../pages/common-pages/home.page';
import { LoginPage } from '../pages/common-pages/login.page';

test.describe('E2E | Home to Login', () => {
  test('user can navigate from home to login page', async ({ page }) => {
    const home = new HomePage(page);
    const login = new LoginPage(page);

    await home.navigate();
    await home.assertHomePageUsable();

    await home.navigateToLogin();
    await login.assertLoginPageUsable();
  });
});
