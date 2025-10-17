import { expect, Locator, Page } from '@playwright/test';
import { Locale } from '../tests/test-data/locale.data';

export class LoginPage {
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly signInButton: Locator;
  private readonly invalidCredentialsErrorMessage: Locator;
  private readonly loginPageUrlRegex: RegExp;

  constructor(
    private page: Page,
    private locale: Locale,
  ) {
    this.locale = locale;
    this.page = page;
    this.emailInput = this.page.getByLabel('Email address');
    this.passwordInput = this.page.getByLabel('Password');
    this.signInButton = this.page.getByRole('button', { name: 'Sign in' });
    this.invalidCredentialsErrorMessage = this.page.getByText(
      'The combination of this e-mail address and password is not valid',
    );
    this.loginPageUrlRegex = new RegExp(`/${this.locale}/login`);
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
    await expect(this.page).toHaveURL(this.loginPageUrlRegex);
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.signInButton).toBeVisible();
  }

  async visit(route: string) {
    await this.page.goto(`/${this.locale}/${route}`);
  }
}
