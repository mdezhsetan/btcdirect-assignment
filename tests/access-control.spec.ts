import test from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { Locale } from './test-data/locale.data';
import { Tag } from '../tags/tags';

test(
  'verify non logged in user redirected to login',
  { tag: [Tag.Authentication] },
  async ({ page }) => {
    const loginPage = new LoginPage(page, Locale.En);

    await loginPage.visit('personal-information');
    await loginPage.expectUserIsOnLoginPage();
  },
);
