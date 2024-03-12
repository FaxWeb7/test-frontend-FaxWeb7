const {test, expect} = require('@playwright/test');
const {createResume} = require('../../utils/create-resume');
const {resumeWithName} = require('../../utils/test-data');

test.beforeEach(async ({page}) => {
  await page.goto('/all');
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
});

test('Кнопка "Удалить выбранные" не видна на пустой странице (score: 1)', async ({page}) => {
  const title = await page.getByText('Мои резюме');
  await expect(title).toBeVisible();

  const deleteResumesButton = await page.getByTestId('delete-resumes');
  await expect(deleteResumesButton).toBeHidden();
});

test('Кнопка "Удалить выбранные" не видна, если резюме не выбраны (score: 1)', async ({page}) => {
  await createResume(page, 'Developer', resumeWithName);

  const title = await page.getByText('Мои резюме');
  await expect(title).toBeVisible();

  const deleteResumesButton = await page.getByTestId('delete-resumes');
  await expect(deleteResumesButton).toBeHidden();
});

test.describe('Выбрано одно резюме', async () => {
  test.beforeEach(async ({page}) => {
    await createResume(page, 'Developer1', resumeWithName);
    await createResume(page, 'Developer2', resumeWithName);
    await createResume(page, 'Developer3', resumeWithName);

    const title = await page.getByText('Мои резюме');
    await expect(title).toBeVisible();

    await selectResumeByName(page, 'Developer2');
  });

  test('Кнопка "Удалить выбранные" появляется, если выбрано одно резюме (score: 1)', async ({page}) => {
    const deleteResumesButton = await page.getByTestId('delete-resumes');
    await expect(deleteResumesButton).toBeVisible();
  });

  test.describe('Удаляем одно резюме', async () => {
    test.beforeEach(async ({page}) => {
      const deleteResumesButton = await page.getByTestId('delete-resumes');
      await expect(deleteResumesButton).toBeVisible();
      await deleteResumesButton.click();
    });

    test('Кнопка "Удалить выбранные" удаляет одно выбранное резюме (score: 1)', async ({page}) => {
      const resumeTitles = await page.getByTestId('resume-title');

      await compareResumeList(resumeTitles, ['Developer1', 'Developer3']);
    });

    test('После удаления сохранился верный порядок резюме (score: 1)', async ({page}) => {
      const resumeTitles = await page.getByTestId('resume-title');

      await compareResumeListInOrder(resumeTitles, ['Developer3', 'Developer1']);
    });

    test('Удаленное резюме не появляется после перезагрузки страницы (score: 1)', async ({page}) => {
      await page.goto('/all');

      const resumeTitles = await page.getByTestId('resume-title');

      await compareResumeList(resumeTitles, ['Developer1', 'Developer3']);
    });

    test('После удаления выбранного резюме кнопка "Удалить выбранные" скрывается (score: 1)', async ({page}) => {
      const deleteResumesButton = await page.getByTestId('delete-resumes');
      await expect(deleteResumesButton).toBeHidden();
    });
  });
});

test.describe('Выбрано несколько резюме', () => {
  test.beforeEach(async ({page}) => {
    await createResume(page, 'Developer1', resumeWithName);
    await createResume(page, 'Developer2', resumeWithName);
    await createResume(page, 'Developer3', resumeWithName);
    await createResume(page, 'Developer4', resumeWithName);

    await selectResumeByName(page, 'Developer1');
    await selectResumeByName(page, 'Developer3');
  });

  test('Кнопка "Удалить выбранные" видна, если выбрано больше одного резюме (score: 1)', async ({page}) => {
    const deleteResumesButton = await page.getByTestId('delete-resumes');
    await expect(deleteResumesButton).toBeVisible();
  });

  test.describe('Удаляем несколько резюме', async () => {
    test.beforeEach(async ({page}) => {
      const deleteResumesButton = await page.getByTestId('delete-resumes');
      await deleteResumesButton.click();
    });

    test('Кнопка "Удалить выбранные" удаляет все выбранные резюме (score: 1)', async ({page}) => {
      const resumeTitles = await page.getByTestId('resume-title');

      await compareResumeList(resumeTitles, ['Developer2', 'Developer4']);
    });

    test('После удаления сохранился верный порядок резюме (score: 1)', async ({page}) => {
      const resumeTitles = await page.getByTestId('resume-title');

      await compareResumeListInOrder(resumeTitles, ['Developer4', 'Developer2']);
    });

    test('Удаленные резюме не появляются после перезагрузки страницы (score: 1)', async ({page}) => {
      await page.goto('/all');

      const resumeTitles = await page.getByTestId('resume-title');

      await compareResumeList(resumeTitles, ['Developer2', 'Developer4']);
    });
  });
});

async function selectResumeByName(page, resumeToDelete) {
  const resumeTitles = await page.getByTestId('resume-title');
  const count = await resumeTitles.count();

  // ищем резюме по названию, чтобы тест не падал, если участник не сделал правильную сортировку
  for (let i = 0; i < count; i++) {
    if (await resumeTitles.nth(i).textContent() === resumeToDelete) {
      const resumeCheckbox = await page.getByTestId('resume-checkbox').nth(i);
      await expect(resumeCheckbox).toBeVisible();
      await resumeCheckbox.click();
      return;
    }
  }

  // в списке вообще нет резюме, которое мы хотели удалить
  await test.fail();
}

test('Продвинутый тест на удаление резюме, переход в оставшееся и возврат в список (score: 8)', async ({page}) => {
  await createResume(page, 'JS', {name: 'Более старое'});
  await createResume(page, 'C#', {name: 'Середина'});
  await createResume(page, 'TS', {name: 'Более новое'});

  const actionButtons = await page.getByTestId('resume-actions');
  const deleteButtons = await page.getByTestId('resume-actions__delete');

  await actionButtons.first().click();
  await deleteButtons.first().click();

  await actionButtons.last().click();
  await deleteButtons.last().click();

  await expect(actionButtons).toHaveCount(1); // удалили два - остался один элемент
  await actionButtons.first().click();
  const openButton = await page.getByTestId('resume-actions__open');
  await openButton.click();

  const saveButton = await page.getByTestId('save-button');
  await saveButton.click();

  const resumeTitle = await page.getByTestId('resume-title');
  await expect(resumeTitle).toHaveText('C#'); // переоткрыли страницу списка - должен остаться один, неудаленный
});

async function compareResumeList(resumeTitles, expectedResumeTitles) {
  await expect(resumeTitles).toHaveCount(expectedResumeTitles.length);

  const resumes = [];
  for (let i = 0; i < expectedResumeTitles.length; i++) {
    resumes.push(await resumeTitles.nth(i).textContent());
  }

  expect(resumes).toEqual(expect.arrayContaining(expectedResumeTitles));
}

async function compareResumeListInOrder(resumeTitles, expectedResumeTitles) {
  for (let i = 0; i < expectedResumeTitles.length; i++) {
    await expect(resumeTitles.nth(i)).toHaveText(expectedResumeTitles[i]);
  }
}
