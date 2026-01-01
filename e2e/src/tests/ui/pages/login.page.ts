import {Page} from '@playwright/test';
export class LoginPage{
    readonly page: Page;
    readonly usernameInput;
    readonly passwordInput;
    readonly loginButton;
    constructor(page:Page){
        this.page = page;
        this.usernameInput = page.locator('input[name="username"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.loginButton = page.locator('button[type="submit"]');
    }
    async login(username:string, password:string){
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}