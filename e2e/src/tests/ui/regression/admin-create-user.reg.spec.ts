import { test } from '@playwright/test';
import users from '../../../fixtures/auth/users.json';

import { LoginPage } from '../pages/common-pages/login.page';
import { AdminDashboardPage } from '../pages/admin-pages/admin-dashboard.page';
import { CreateUserPage } from '../pages/admin-pages/create-user.page';
import { UniqueDataUtil } from '../../../utils/unique-data.util';

test.describe('REG | Admin Create User', () => {
  test('admin can create a new user', async ({ page }) => {
    const login = new LoginPage(page);
    const adminDashboard = new AdminDashboardPage(page);
    const createUserPage = new CreateUserPage(page);

    await page.goto('/login');
    await login.login(users.admin.username, users.admin.password);

    await adminDashboard.clickCreateUser();
    await createUserPage.assertCreateUserPageUsable();

    await createUserPage.createUser(
      UniqueDataUtil.username(),
      UniqueDataUtil.password(),
      'USER',
      UniqueDataUtil.phoneNumber()
    );

    await createUserPage.assertUserCreatedSuccessfully();
  });
});
