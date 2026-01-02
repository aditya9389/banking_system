import { test } from '@playwright/test';
import users from '../../../fixtures/auth/users.json';

import { LoginPage } from '../pages/common-pages/login.page';
import { AdminDashboardPage } from '../pages/admin-pages/admin-dashboard.page';
import { ViewUsersPage } from '../pages/admin-pages/view-users.page';
import { ViewAccountsPage } from '../pages/admin-pages/view-accounts.page';

test.describe('E2E | Admin Navigation', () => {
    test('admin can access core admin pages', async ({ page }) => {
        const login = new LoginPage(page);
        const admin = new AdminDashboardPage(page);

        await page.goto('/login');
        await login.login(users.admin.username, users.admin.password);
        await admin.assertAdminDashboardUsable();

        await admin.clickViewUsers();
        const viewUsers = new ViewUsersPage(page);
        await viewUsers.assertViewUsersPageUsable();

        await page.goto('/admin-dashboard');
        await admin.assertAdminDashboardUsable();

        await admin.clickViewAccounts();
        const viewAccounts = new ViewAccountsPage(page);
        await viewAccounts.assertViewAccountsPageUsable();
    });
});
