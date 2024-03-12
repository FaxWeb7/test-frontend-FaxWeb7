const {test, expect} = require('@playwright/test');
const {createResume} = require('../../utils/create-resume');
const {fullResume} = require('../../utils/test-data');
const {checkResume} = require('../../utils/check-resume');

test.beforeEach(async ({page}) => {
  await page.goto("/all");
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
  await createResume(page, 'JS разработчик', fullResume);
  await page.goto('/all');
});

test('Проверка наличия кнопки "Копировать" (score: 1)', async ({page}) => {
  const actionButton = await page.getByTestId('resume-actions');
  await actionButton.click();

  const copyButton = await page.getByTestId('resume-actions__copy');
  await expect(copyButton).toBeVisible();
});

test('Клик по кнопке "Копировать" открывает диалог с чекбоксами и двумя кнопками (score: 1)', async ({page}) => {
  const actionButton = await page.getByTestId('resume-actions');
  await actionButton.click();

  const copyButton = await page.getByTestId('resume-actions__copy');
  await copyButton.click();

  const modalCheckboxes = await page.getByTestId('copy-modal__checkbox');
  await expect(modalCheckboxes).toHaveCount(7);

  const modalCopyButton = await page.getByTestId('copy-modal__copy');
  await expect(modalCopyButton).toBeVisible();

  const modalCancelButton = await page.getByTestId('copy-modal__cancel');
  await expect(modalCancelButton).toBeVisible();
});

test('Клик по кнопке "Отмена" внутри диалога закрывает диалог (score: 1)', async ({page}) => {
  const actionButton = await page.getByTestId('resume-actions');
  await actionButton.click();

  const copyButton = await page.getByTestId('resume-actions__copy');
  await copyButton.click();

  const modalCancelButton = await page.getByTestId('copy-modal__cancel');
  await expect(modalCancelButton).toBeVisible();

  await modalCancelButton.click();

  await expect(modalCancelButton).toBeHidden();
});

test('Проверяем, что все категории могут быть скопированы (score: 13)', async ({page}) => {
  const actionButton = await page.getByTestId('resume-actions');
  await actionButton.click();

  const copyButton = await page.getByTestId('resume-actions__copy');
  await copyButton.click();

  const modalCheckboxes = await page.getByTestId('copy-modal__checkbox');

  for (let i = 0; i < 7; i++) {
    await modalCheckboxes.nth(i).click();
  }

  const modalCopyButton = await page.getByTestId('copy-modal__copy');
  await modalCopyButton.click();

  await checkResume(page, fullResume);
});

test('Проверяем, что копируются только выбранные категории (score: 4)', async ({page}) => {
  const actionButton = await page.getByTestId('resume-actions');
  await actionButton.click();

  const copyButton = await page.getByTestId('resume-actions__copy');
  await copyButton.click();

  const modalCheckboxes = await page.getByTestId('copy-modal__checkbox');

  for (let i = 0; i < 7; i += 2) {
    await modalCheckboxes.nth(i).click();
  }

  const modalCopyButton = await page.getByTestId('copy-modal__copy');
  await modalCopyButton.click();

  const fullResumeCopy = structuredClone(fullResume);
  delete fullResumeCopy.about;
  delete fullResumeCopy.languages;
  delete fullResumeCopy.education;
  await checkResume(page, fullResumeCopy);
});
