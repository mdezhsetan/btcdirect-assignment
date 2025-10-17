import test from '@playwright/test';
import { LandingPage } from '../pages/landingPage';
import { Locale } from './test-data/locale.data';
import { Tag } from '../tags/tags';

test(
  'verify core elements visibility on landing page',
  { tag: [Tag.Smoke] },
  async ({ page }) => {
    const landingPage = new LandingPage(page, Locale.En);

    await test.step('visit landing page', async () => {
      await landingPage.visit();
      await landingPage.acceptCookies();
    });
    await test.step('expect core elements visibility', async () => {
      await landingPage.expectCoreElementsAreVisible();
    });
  },
);
