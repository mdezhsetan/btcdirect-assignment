import { expect, Locator, Page } from '@playwright/test';
import { Locale } from '../tests/test-data/locale.data';

export class LandingPage {
  private readonly signInButton: Locator;
  private readonly createAccountButton: Locator;
  private readonly acceptCookiesButton: Locator;
  private readonly youInvestInput: Locator;
  private readonly buyCoinButton: Locator;
  private readonly youWillReceiveInput: Locator;
  private readonly allCryptocurrencyPricesButton: Locator;

  constructor(
    private page: Page,
    private locale: Locale,
  ) {
    this.locale = locale;
    this.page = page;
    this.signInButton = this.page
      .getByRole('banner')
      .getByRole('link', { name: 'Sign In' });
    this.createAccountButton = this.page
      .getByRole('banner')
      .getByRole('link', { name: 'Create Account' });
    this.acceptCookiesButton = this.page.getByRole('button', {
      name: 'Accept',
    });
    this.youInvestInput = this.page.getByRole('spinbutton', {
      name: 'You invest:',
    });
    this.buyCoinButton = this.page
      .getByRole('main')
      .getByRole('link', { name: 'Buy Bitcoin', exact: true });
    this.youWillReceiveInput = this.page.getByRole('spinbutton', {
      name: 'You will receive:',
    });
    this.allCryptocurrencyPricesButton = this.page
      .getByRole('main')
      .getByRole('link', { name: 'All Cryptocurrency Prices' });
  }

  async visit() {
    await this.page.goto(`${process.env.LANDING_PAGE_BASE_URL}/${this.locale}`);
  }

  async expectLoggedIn(username: string) {
    await expect(this.page.locator('header.logged-in')).toContainText(username);
    await expect(this.signInButton).toBeHidden();
    await expect(this.createAccountButton).toBeHidden();
  }

  async expectLoggedOut() {
    await expect(this.signInButton).toBeVisible();
    await expect(this.createAccountButton).toBeVisible();
    await expect(this.page.locator('header.logged-in')).not.toBeVisible();
  }

  async clickSignInButton() {
    await this.signInButton.click();
  }

  async acceptCookies() {
    await this.acceptCookiesButton.click();
  }

  async expectCoreElementsAreVisible() {
    await expect(this.signInButton).toBeVisible();
    await expect(this.createAccountButton).toBeVisible();
    await expect(this.youInvestInput).toBeVisible();
    await expect(this.buyCoinButton).toBeVisible();
    await expect(this.youWillReceiveInput).toBeVisible();
    await expect(this.allCryptocurrencyPricesButton).toBeVisible();
  }
}
