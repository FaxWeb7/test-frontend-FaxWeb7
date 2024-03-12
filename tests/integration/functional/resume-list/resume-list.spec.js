const {test, expect} = require("@playwright/test");
const {createResume} = require('../../utils/create-resume');
const {resumeWithName, fullResume} = require('../../utils/test-data');

test.beforeEach(async ({page}) => {
  await page.goto("/");
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
});

test("Наличие страницы со списком (score: 1)", async ({page}) => {
  await page.goto("/all");

  const title = await page.getByText("Мои резюме");
  await expect(title).toBeVisible();
});

test("Наличие кнопки добавления резюме (score: 1)", async ({page}) => {
  await page.goto("/all");

  const addResumeButton = await page.getByTestId("add-resume");

  await expect(addResumeButton).toHaveText('+');
  await expect(addResumeButton).toHaveAttribute('title', 'Добавить');
});

test("Нажатие на кнопку добавления резюме ведет на форму (score: 1)", async ({page}) => {
  await page.goto("/all");

  const addResumeButton = await page.getByTestId("add-resume");
  await addResumeButton.click();

  const resumeForm = await page.getByTestId("resume-builder");
  await expect(resumeForm).toBeVisible();
});

test("Генерация резюме с названием (score: 1)", async ({page}) => {
  await page.goto("/");

  const nameInput = await page.getByTestId("personal-info").nth(0);
  await expect(nameInput).toBeVisible();
  await nameInput.fill('Данилов Дмитрий Евгеньевич');

  const resumeInput = await page.getByTestId("resume-title-field");
  await expect(resumeInput).toBeVisible();
  await resumeInput.fill('JS разработчик');

  const generateResumeButton = await page.getByTestId("generate-resume");
  await expect(generateResumeButton).toBeVisible();
  await expect(generateResumeButton).toBeEnabled();
  await generateResumeButton.click();
  await expect(generateResumeButton).toBeHidden();
  const backButton = await page.getByTestId('back-button');
  await expect(backButton).toBeVisible();

  const resume = await page.getByTestId('resume-main-content');

  await expect(resume).toBeVisible();

  await backButton.click();
  await expect(resumeInput).toHaveValue('JS разработчик');
  await resumeInput.fill('TS разработчик');
  await generateResumeButton.click();

  await backButton.click();
  await expect(resumeInput).toHaveValue('TS разработчик');
});

test('Проверка наличия кнопки "Действия" (score: 1)', async ({page}) => {
  await createResume(page, 'JS разработчик', resumeWithName);

  const actionButton = await page.getByTestId('resume-actions');
  const title = await actionButton.nth(0).getAttribute('title');
  await expect(title).toBe('Действия');
});

test('В списке должны выводиться названия резюме, от новых к старым (score: 1)', async ({page}) => {
  await createResume(page, 'JS', resumeWithName);
  await createResume(page, 'TS', resumeWithName);
  await createResume(page, 'C#', resumeWithName);

  const resumeTitles = await page.getByTestId('resume-title');
  await expect(resumeTitles).toContainText(['C#', 'TS', 'JS']);
});

test('Если не задано название резюме, то должна выводиться фамилия (score: 1)', async ({page}) => {
  await createResume(page, undefined, {name: 'Имя 1'});
  await createResume(page, undefined, {name: 'Имя 2'});

  const resumeTitles = await page.getByTestId('resume-title');
  await expect(resumeTitles).toContainText(['Имя 2', 'Имя 1']);
});

test('Кнопки действий должны появляться и исчезать при клике на "Действия" (score: 1)', async ({page}) => {
  await createResume(page, 'JS', resumeWithName);

  const actionButton = await page.getByTestId('resume-actions');
  await actionButton.click();

  let openButton = await page.getByTestId('resume-actions__open');
  let deleteButton = await page.getByTestId('resume-actions__delete');
  await expect(openButton).toBeVisible();
  await expect(deleteButton).toBeVisible();

  await actionButton.click();

  openButton = await page.getByTestId('resume-actions__open');
  deleteButton = await page.getByTestId('resume-actions__delete');
  await expect(openButton).toBeHidden();
  await expect(deleteButton).toBeHidden();
});

test('При открытии должно подтягиваться правильное резюме (score: 2)', async ({page}) => {
  await createResume(page, 'JS', {name: 'Более старое'});
  await createResume(page, 'TS', {name: 'Более новое'});

  const actionButton = await page.getByTestId('resume-actions').last();
  await actionButton.click();

  const openButton = await page.getByTestId('resume-actions__open').last();
  await openButton.click();

  const namesInResumeView = await page.getByText('Более старое');
  await expect(namesInResumeView).toHaveCount(2); // имя выводится 2 раза - в заголовке и в поле ФИО
});

test('При создании и сохранении нового резюме в списке появляется новый элемент (score: 1)', async ({page}) => {
  await createResume(page, 'JS', resumeWithName);

  const resumeItem = await page.getByTestId('resume-item');
  await expect(resumeItem).toHaveCount(1);
});

test('Проверка навигации на редактирование и сохранение готового резюме со страницы /all (score: 4)', async ({page}) => {
  await createResume(page, 'JS разработчик', fullResume);
  await createResume(page, 'C++ разработчик', {name: 'Обломов Александр Юрьевич'});
  await page.goto('/all');

  const actionButton = await page.getByTestId('resume-actions').last();
  await actionButton.click();

  const openButton = await page.getByTestId('resume-actions__open').last();
  await openButton.click();

  const backButton = await page.getByTestId('back-button');
  await expect(backButton).toBeVisible();
  await backButton.click();

  const nameInput = await page.getByTestId("personal-info").nth(0);
  await expect(nameInput).toBeVisible();
  await nameInput.fill('Данилов Дмитрий Евгеньевич');

  const generateResumeButton = await page.getByTestId("generate-resume");
  await expect(generateResumeButton).toBeVisible();
  await expect(generateResumeButton).toBeEnabled();
  await generateResumeButton.click();
  await expect(generateResumeButton).toBeHidden();

  const saveButton = await page.getByTestId('save-button');
  await expect(saveButton).toBeVisible();
  await saveButton.click();

  await expect(saveButton).toBeHidden();
  await expect(backButton).toBeHidden();

  const title = await page.getByText("Мои резюме");
  await expect(title).toBeVisible();

  await expect(page.getByText("C++ разработчик", {exact: true})).toBeVisible();
});
