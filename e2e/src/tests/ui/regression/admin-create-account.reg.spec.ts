import { test } from '@playwright/test';
import users from '../../../fixtures/auth/users.json';

import { LoginPage } from '../pages/common-pages/login.page';
import { AdminDashboardPage } from '../pages/admin-pages/admin-dashboard.page';
import { CreateAccountPage } from '../pages/admin-pages/create-account.page';

test.describe('REG | Admin Create Account', () => {
  test('admin can create an account for an existing user', async ({ page }) => {
    const login = new LoginPage(page);
    const adminDashboard = new AdminDashboardPage(page);
    const createAccountPage = new CreateAccountPage(page);

    // ---- Login as admin
    await page.goto('/login');
    await login.login(users.admin.username, users.admin.password);

    // ---- Navigate to Create Account
    await adminDashboard.clickCreateAccount();
    await createAccountPage.assertCreateAccountPageUsable();

    // ---- Create account for seeded user
    await createAccountPage.createAccount(
      5000,          
      'SAVINGS',     
      users.user.id  
    );

    // ---- Assert success
    await createAccountPage.assertAccountCreatedSuccessfully();
  });
});
