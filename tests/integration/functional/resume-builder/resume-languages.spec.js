const {test, expect} = require('@playwright/test');
const {fillTitle, fillPersonalInfo} = require('../../utils/create-resume');
const {generateResume} = require('../../utils/resume-builder.po');
const {checkPreviewVisible, backToBuilder, save, getLanguagesBlock, blockHasText} = require('../../utils/resume-preview.po');
const {openByName} = require('../../utils/all-resumes.po');

let addButton;
let removeButton;
let languageNames;
let languageLevels;

test.beforeEach(async ({page}) => {
  await page.goto('/');

  // Заполняем заголовок и имя, чтобы можно было открыть просмотр резюме
  await fillTitle(page, 'Frontend');
  await fillPersonalInfo(page, {name: 'Козлов Антон Николаевич'});

  addButton = await page.getByTestId('add-language');
  removeButton = await page.getByTestId('remove-language');
  languageNames = await page.getByTestId('language-name');
  languageLevels = await page.getByTestId('language-level');
});

test('По умолчанию видны пустые поля для одного языка и кнопки добавления и удаления (score: 1)', async () => {
  await expect(languageNames).toHaveCount(1);
  await expect(languageLevels).toHaveCount(1);

  await expect(languageNames.nth(0)).toHaveValue('');
  await expect(languageLevels.nth(0)).toHaveValue('');

  await expect(addButton).toHaveCount(1);
  await expect(addButton).toBeVisible();
  await expect(removeButton).toHaveCount(1);
  await expect(removeButton).toBeVisible();
});

test.describe('Генерация резюме без языков', () => {
  test('Можно сгенерировать резюме без языков (score: 1)', async ({page}) => {
    await generateResume(page);
    await checkPreviewVisible(page);
  });

  test('Если сгенерировать резюме без языков, блок языков в просмотре не будет показан (score: 2)', async ({page}) => {
    await generateResume(page);
    await checkPreviewVisible(page);

    const languages = await getLanguagesBlock(page);
    await expect(languages).toBeNull();
  });
});

test.describe('Генерация резюме с одним языком', () => {
  test.describe('Генерация одного полностью заполненного языка', () => {
    test.beforeEach(async ({page}) => {
      await languageNames.nth(0).fill('Английский');
      await languageLevels.nth(0).fill('C1');
      await generateResume(page);
      await checkPreviewVisible(page);
    });

    test('Если сгенерировать резюме с одним языком, блок языков в просмотре показан и содержит информацию об этом языке (score: 2)', async ({page}) => {
      const languages = await getLanguagesBlock(page);
      await expect(languages).not.toBeNull();
      await expect(languages).toBeVisible();
      expect(await blockHasText(page, languages, 'Английский')).toBe(true);
      expect(await blockHasText(page, languages, 'C1')).toBe(true);
    });

    test('Если вернуться к редактированию, поля ввода языка снова заполнены (score: 2)', async ({page}) => {
      await backToBuilder(page);

      await expect(languageNames).toHaveCount(1);
      await expect(languageLevels).toHaveCount(1);
      await expect(languageNames.nth(0)).toHaveValue('Английский');
      await expect(languageLevels.nth(0)).toHaveValue('C1');
    });
  });

  test.describe('Название языка не задано', () => {
    test.beforeEach(async ({page}) => {
      await languageLevels.nth(0).fill('C1');
      await generateResume(page);
      await checkPreviewVisible(page);
    });

    test('Если название языка не задано, то блок с языками не показан (score: 2)', async ({page}) => {
      const languages = await getLanguagesBlock(page);
      await expect(languages).toBeNull();
    });

    test('Если название языка не задано, но уровень задан, и возвращаемся обратно к редактированию, то уровень предзаполнен в форме (score: 5)', async ({page}) => {
      await backToBuilder(page);

      await expect(languageNames).toHaveCount(1);
      await expect(languageLevels).toHaveCount(1);
      await expect(languageNames.nth(0)).toHaveValue('');
      await expect(languageLevels.nth(0)).toHaveValue('C1');
    });
  });

  test('Если уровень владения языком не задан, то блок с языками не показан (score: 2)', async ({page}) => {
    await languageNames.nth(0).fill('Английский');
    await generateResume(page);
    await checkPreviewVisible(page);

    const languages = await getLanguagesBlock(page);
    await expect(languages).toBeNull();
  });
});

test.describe('Добавление нескольких языков', () => {
  test.beforeEach(async ({page}) => {
    await languageNames.nth(0).fill('Английский');
    await languageLevels.nth(0).fill('C1');
    await addButton.click();
  });

  test('Можно добавить поля для дополнительного языка (score: 1)', async () => {
    await expect(languageNames).toHaveCount(2);
    await expect(languageLevels).toHaveCount(2);
  });

  test('Новые поля появляются ниже старых (score: 1)', async () => {
    await expect(languageNames.nth(0)).toHaveValue('Английский');
    await expect(languageLevels.nth(0)).toHaveValue('C1');
    await expect(languageNames.nth(1)).toHaveValue('');
    await expect(languageLevels.nth(1)).toHaveValue('');
  });

  test('Можно снова удалить язык (score: 1)', async () => {
    await removeButton.click();
    await expect(languageNames).toHaveCount(1);
    await expect(languageLevels).toHaveCount(1);
  });

  test('Удаляются языки снизу вверх (score: 1)', async () => {
    await removeButton.click();
    await expect(languageNames.nth(0)).toHaveValue('Английский');
    await expect(languageLevels.nth(0)).toHaveValue('C1');
  });

  test.describe('Генерация резюме с несколькими языками', () => {
    test.beforeEach(async ({page}) => {
      await languageNames.nth(1).fill('Французский');
      await languageLevels.nth(1).fill('B2');
      await generateResume(page);
      await checkPreviewVisible(page);
    });

    test('Если сгенерировать резюме с несколькими языками, блок языков в просмотре показан и содержит информацию об этих языках (score: 2)', async ({page}) => {
      const languages = await getLanguagesBlock(page);
      await expect(languages).not.toBeNull();
      await expect(languages).toBeVisible();
      expect(await blockHasText(page, languages, 'Английский')).toBe(true);
      expect(await blockHasText(page, languages, 'C1')).toBe(true);
      expect(await blockHasText(page, languages, 'Французский')).toBe(true);
      expect(await blockHasText(page, languages, 'B2')).toBe(true);
    });

    test('Если вернуться обратно к редактированию, поля языков снова заполнены (score: 2)', async ({page}) => {
      await backToBuilder(page);

      await expect(languageNames).toHaveCount(2);
      await expect(languageLevels).toHaveCount(2);
      await expect(languageNames.nth(0)).toHaveValue('Английский');
      await expect(languageLevels.nth(0)).toHaveValue('C1');
      await expect(languageNames.nth(1)).toHaveValue('Французский');
      await expect(languageLevels.nth(1)).toHaveValue('B2');
    });

    test('Если вернуться обратно к редактированию, удалить язык и перейти в просмотр, удаленный язык отсутствует (score: 2)', async ({page}) => {
      await backToBuilder(page);
      await removeButton.click();
      await generateResume(page);

      const languages = await getLanguagesBlock(page);
      await expect(languages).not.toBeNull();
      await expect(languages).toBeVisible();
      expect(await blockHasText(page, languages, 'Английский')).toBe(true);
      expect(await blockHasText(page, languages, 'C1')).toBe(true);
      expect(await blockHasText(page, languages, 'Французский')).toBe(false);
      expect(await blockHasText(page, languages, 'B2')).toBe(false);
    });

    test('Если сохранить резюме и снова вернуться к редактированию, поля языков снова заполнены (score: 5)', async ({page}) => {
      await save(page);
      await openByName(page, 'Frontend');
      await backToBuilder(page);

      await expect(languageNames).toHaveCount(2);
      await expect(languageLevels).toHaveCount(2);
      await expect(languageNames.nth(0)).toHaveValue('Английский');
      await expect(languageLevels.nth(0)).toHaveValue('C1');
      await expect(languageNames.nth(1)).toHaveValue('Французский');
      await expect(languageLevels.nth(1)).toHaveValue('B2');
    });
  });
});
