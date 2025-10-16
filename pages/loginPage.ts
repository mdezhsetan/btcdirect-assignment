import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly signInButton: Locator;
  private readonly invalidCredentialsErrorMessage: Locator;

  constructor(private page: Page) {
    this.page = page;
    this.emailInput = this.page.getByLabel('Email address');
    this.passwordInput = this.page.getByLabel('Password');
    this.signInButton = this.page.getByRole('button', { name: 'Sign in' });
    this.invalidCredentialsErrorMessage = this.page.getByText(
      'The combination of this e-mail address and password is not valid',
    );
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }

  async expectLoginFailedWithInvalidCredentials() {
    await this.expectUserIsOnLoginPage();
    await expect(this.invalidCredentialsErrorMessage).toBeVisible();
  }

  async expectUserIsOnLoginPage() {
    await expect(this.page).toHaveURL('https://my.btcdirect.eu/en-gb/login');
  }
}
