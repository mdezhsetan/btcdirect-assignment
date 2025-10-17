import test from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { LandingPage } from '../pages/landingPage';
import { Locale } from './test-data/locale.data';

test('verify non logged in user redirected to login', async ({ page }) => {
  const landingPage = new LandingPage(page, Locale.En);
  const loginPage = new LoginPage(page, Locale.En);

  await loginPage.visit('personal-information');
  await landingPage.acceptCookies();
  await loginPage.expectUserIsOnLoginPage();
});
