import { expect, Locator, Page } from '@playwright/test';
import { Locale } from '../tests/test-data/locale.data';

export class LandingPage {
  private readonly header: Locator;
  private readonly userMenu: Locator;
  private readonly signInButton: Locator;
  private readonly createAccountButton: Locator;
  private readonly acceptCookiesButton: Locator;

  constructor(private page: Page) {
    this.page = page;
    this.header = this.page.locator('header');
    this.userMenu = this.page.locator('header.logged-in');
    this.signInButton = this.page
      .getByRole('banner')
      .getByRole('link', { name: 'Sign In' });
    this.createAccountButton = this.page
      .getByRole('banner')
      .getByRole('link', { name: 'Create Account' });
    this.acceptCookiesButton = this.page.getByRole('button', {
      name: 'Accept',
    });
  }

  async visit(locale: Locale) {
    await this.page.goto(`/${locale}`);
  }

  async expectLoggedIn(username: string) {
    await expect(this.userMenu).toBeVisible();
    await expect(this.userMenu).toContainText(username);
    await expect(this.signInButton).toBeHidden();
    await expect(this.createAccountButton).toBeHidden();
  }

  async expectLoggedOut() {
    await expect(this.signInButton).toBeVisible();
    await expect(this.createAccountButton).toBeVisible();
    await expect(this.userMenu).toBeHidden();
  }

  async clickSignInButton() {
    await this.signInButton.click();
  }

  async acceptCookies() {
    await this.acceptCookiesButton.click();
  }
}
