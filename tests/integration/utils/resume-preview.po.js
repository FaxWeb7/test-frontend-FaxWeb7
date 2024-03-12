import {expect} from '@playwright/test';

export async function checkPreviewVisible(page) {
  const preview = await page.getByTestId('resume-main-content');
  await expect(preview).toBeVisible();
}

export async function backToBuilder(page) {
  const backButton = await page.getByTestId('back-button');
  await backButton.click();
}

export async function save(page) {
  const saveButton = await page.getByTestId('save-button');
  await saveButton.click();
}


export async function getInterestsBlock(page) {
  return await getSectionByTitle(page, 'Интересы');
}

export async function getLanguagesBlock(page) {
  return await getSectionByTitle(page, 'Языки');
}

export async function getExperienceBlock(page) {
  return await getSectionByTitle(page, 'Опыт работы');
}

export async function getSectionByTitle(page, title) {
  const sections = page.getByTestId('resume-main-section');
  const count = await sections.count();

  for (let i = 0; i < count; i++) {
    const block = sections.nth(i);

    if (await blockHasText(page, block, title)) {
      return block;
    }
  }

  return null;
}

export async function blockHasText(page, block, text) {
  const innerBlock = block.and(page.locator(`:has-text("${text}")`));

  return await innerBlock.count() > 0;
}
