import test from '@playwright/test';
import { LandingPage } from '../pages/landingPage';
import { LoginPage } from '../pages/loginPage';
import { Locale } from './test-data/locale.data';
import { credentials } from './test-data/login.data';

test('successful login with valid credentials', async ({ page }) => {
  const landingPage = new LandingPage(page);
  const loginPage = new LoginPage(page);

  await test.step('navigate to login page', async () => {
    await landingPage.visit(Locale.En);
    await landingPage.acceptCookies();
    await landingPage.expectLoggedOut();
    await landingPage.clickSignInButton();
  });

  await test.step('login with valid credentials', async () => {
    await loginPage.login(credentials.valid.email, credentials.valid.password);
    await landingPage.expectLoggedIn(credentials.valid.username);
  });
});

test('failed login with invalid password', async ({ page }) => {
  const landingPage = new LandingPage(page);
  const loginPage = new LoginPage(page);

  await test.step('navigate to login page', async () => {
    await landingPage.visit(Locale.En);
    await landingPage.acceptCookies();
    await landingPage.expectLoggedOut();
    await landingPage.clickSignInButton();
  });
  await test.step('login with valid email and invalid password', async () => {
    await loginPage.login(
      credentials.invalid.email,
      credentials.invalid.password,
    );
    await loginPage.expectLoginFailedWithInvalidCredentials();
  });
});

test('failed login with unregistered email', async ({ page }) => {
  const landingPage = new LandingPage(page);
  const loginPage = new LoginPage(page);

  await test.step('navigate to login page', async () => {
    await landingPage.visit(Locale.En);
    await landingPage.acceptCookies();
    await landingPage.expectLoggedOut();
    await landingPage.clickSignInButton();
  });
  await test.step('login with unregistered email', async () => {
    await loginPage.login(
      credentials.unregistered.email,
      credentials.unregistered.password,
    );
    await loginPage.expectLoginFailedWithInvalidCredentials();
  });
});
