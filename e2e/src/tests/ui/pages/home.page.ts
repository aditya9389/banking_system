import { Page } from "@playwright/test";

export class HomePage{
    readonly page: Page;
    readonly loginButton;
    constructor(page:Page){
        this.page = page;
        this.loginButton = page.locator('text=Login');
    }
    async navigateToLogin(){
        await this.loginButton.click();
    }
}