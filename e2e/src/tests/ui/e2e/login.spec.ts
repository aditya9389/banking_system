import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { HomePage } from '../pages/home.page';
import loginData from '../../../fixtures/loginData.json';
test.describe('Login E2E Tests', () => {
    test('should login successfully with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const homePage = new HomePage(page);
        await page.goto('/');
        await homePage.navigateToLogin();
        await loginPage.login(loginData.username, loginData.password);
        await expect(page.locator("button[class='logout-button']")).toBeVisible();
    });
});
