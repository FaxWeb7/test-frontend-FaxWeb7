const {test, expect} = require('@playwright/test');
const {fillTitle, fillPersonalInfo} = require('../../utils/create-resume');
const {generateResume} = require('../../utils/resume-builder.po');
const {checkPreviewVisible, backToBuilder, save, getInterestsBlock, blockHasText} = require('../../utils/resume-preview.po');
const {openByName} = require('../../utils/all-resumes.po');

let addButton;
let removeButton;
let interests;

test.beforeEach(async ({page}) => {
  await page.goto('/');

  // Заполняем заголовок и имя, чтобы можно было открыть просмотр резюме
  await fillTitle(page, 'Frontend');
  await fillPersonalInfo(page, {name: 'Козлов Антон Николаевич'});

  addButton = await page.getByTestId('add-interest');
  removeButton = await page.getByTestId('remove-interest');
  interests = await page.getByTestId('interest');
});

test('По умолчанию видно пустое поле для одного интереса и кнопки добавления и удаления (score: 1)', async ({page}) => {
  await expect(interests).toHaveCount(1);
  await expect(interests.nth(0)).toHaveValue('');

  await expect(addButton).toHaveCount(1);
  await expect(addButton).toBeVisible();
  await expect(removeButton).toHaveCount(1);
  await expect(removeButton).toBeVisible();
});

test.describe('Генерация резюме без интересов', () => {
  test('Можно сгенерировать резюме без интересов (score: 1)', async ({page}) => {
    await generateResume(page);
    await checkPreviewVisible(page);
  });

  test('Если сгенерировать резюме без интересов, блок интересов в просмотре не будет показан (score: 2)', async ({page}) => {
    await generateResume(page);
    await checkPreviewVisible(page);

    await expect(page.getByText('Интересы', {exact: true})).toBeHidden();
  });
});

test.describe('Генерация резюме с одним интересом', () => {
    test.beforeEach(async ({page}) => {
      await interests.nth(0).fill('Machine Learning');
      await generateResume(page);
      await checkPreviewVisible(page);
    });

    test('Если сгенерировать резюме с одним интересом, блок интересов в просмотре показан и содержит информацию об этом интересе (score: 2)', async ({page}) => {
      const interests = await getInterestsBlock(page);
      expect(interests).not.toBeNull();
      await expect(interests).toBeVisible();
      expect(await blockHasText(page, interests, 'Machine Learning')).toBe(true);
    });

    test('Если вернуться к редактированию, поле ввода интереса снова заполнено (score: 2)', async ({page}) => {
      await backToBuilder(page);

      await expect(interests).toHaveCount(1);
      await expect(interests.nth(0)).toHaveValue('Machine Learning');
    });
});

test.describe('Добавление нескольких интересов', () => {
  test.beforeEach(async () => {
    await interests.nth(0).fill('Machine Learning');
    await addButton.click();
  });

  test('Можно добавить поле для дополнительного интереса (score: 1)', async () => {
    await expect(interests).toHaveCount(2);
  });

  test('Новое поле появляется ниже старого (score: 1)', async () => {
    await expect(interests.nth(0)).toHaveValue('Machine Learning');
    await expect(interests.nth(1)).toHaveValue('');
  });

  test('Можно снова удалить интерес (score: 1)', async () => {
    await removeButton.click();
    await expect(interests).toHaveCount(1);
  });

  test('Удаляются интересы снизу вверх (score: 1)', async () => {
    await removeButton.click();
    await expect(interests.nth(0)).toHaveValue('Machine Learning');
  });

  test.describe('Генерация резюме с несколькими интересами', () => {
    test.beforeEach(async ({page}) => {
      await interests.nth(1).fill('Digital Art');
      await generateResume(page);
      await checkPreviewVisible(page);
    });

    test('Если сгенерировать резюме с несколькими интересами, блок интересов в просмотре показан и содержит информацию об этих интересах (score: 2)', async ({page}) => {
      const interests = await getInterestsBlock(page);
      expect(interests).not.toBeNull();
      await expect(interests).toBeVisible();
      expect(await blockHasText(page, interests, 'Machine Learning')).toBe(true);
      expect(await blockHasText(page, interests, 'Digital Art')).toBe(true);
    });

    test('Если вернуться обратно к редактированию, поля интересов снова заполнены (score: 2)', async ({page}) => {
      await backToBuilder(page);

      await expect(interests).toHaveCount(2);
      await expect(interests.nth(0)).toHaveValue('Machine Learning');
      await expect(interests.nth(1)).toHaveValue('Digital Art');
    });

    test('Если вернуться обратно к редактированию, удалить интерес и перейти в просмотр, удаленный интерес отсутствует (score: 2)', async ({page}) => {
      await backToBuilder(page);
      await removeButton.click();
      await generateResume(page);

      const interests = await getInterestsBlock(page);
      expect(await blockHasText(page, interests, 'Machine Learning')).toBe(true);
      expect(await blockHasText(page, interests, 'Digital Art')).toBe(false);
    });

    test('Если сохранить резюме и снова вернуться к редактированию, поля интересов снова заполнены (score: 2)', async ({page}) => {
      await save(page);
      await openByName(page, 'Frontend');
      await backToBuilder(page);

      await expect(interests).toHaveCount(2);
      await expect(interests.nth(0)).toHaveValue('Machine Learning');
      await expect(interests.nth(1)).toHaveValue('Digital Art');
    });
  });
});
