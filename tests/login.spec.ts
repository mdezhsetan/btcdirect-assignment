import test from '@playwright/test';
import { LandingPage } from '../pages/landingPage';
import { LoginPage } from '../pages/loginPage';
import { Locale } from './test-data/locale.data';
import { credentials } from './test-data/login.data';

test('successful login with valid credentials', async ({ page }) => {
  const landingPage = new LandingPage(page);
  const loginPage = new LoginPage(page);

  await landingPage.visit(Locale.En);
  await landingPage.acceptCookies();
  await landingPage.expectLoggedOut();
  await landingPage.clickSignInButton();
  await loginPage.login(credentials.valid.email, credentials.valid.password);
  await landingPage.expectLoggedIn(credentials.valid.username);
});
