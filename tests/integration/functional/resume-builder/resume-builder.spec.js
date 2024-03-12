const { test, expect } = require("@playwright/test");
const {fillResume} = require('../../utils/resume-builder-fill-resume');

test("Проверка возможности генерации резюме без ввода (score: 1)", async ({ page }) => {
  await page.goto("/");

  const generateResumeButton = await page.getByTestId("generate-resume")
  await expect(generateResumeButton).toBeVisible();
  await expect(generateResumeButton).toBeDisabled();
  await generateResumeButton.click({force: true});
  await expect(generateResumeButton).toBeVisible();
  await expect(page.getByTestId('back-button')).toBeHidden();
});

test("Генерация резюме только с ФИО (score: 1)", async ({ page }) => {
  await page.goto("/");

  const nameInput = await page.getByTestId("personal-info").nth(0);
  await expect(nameInput).toBeVisible();
  await nameInput.fill('Данилов Дмитрий Евгеньевич');

  const generateResumeButton = await page.getByTestId("generate-resume");
  await expect(generateResumeButton).toBeVisible();
  await expect(generateResumeButton).toBeEnabled();
  await generateResumeButton.click();
  await expect(generateResumeButton).toBeHidden();
  const backButton = await page.getByTestId('back-button');
  await expect(backButton).toBeVisible();

  const resume = await page.getByTestId('resume-main-content');

  await expect(resume).toBeVisible();

  await expect(resume.getByText("ФИО", {exact: true})).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).first()).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).last()).toBeVisible();
  await expect(resume.getByText("Личные данные", {exact: true})).toBeVisible();

  await backButton.click();

  await nameInput.fill('Василий Дмитриевич Богданов');

  await expect(generateResumeButton).toBeVisible();
  await expect(generateResumeButton).toBeEnabled();
  await generateResumeButton.click();
  await expect(generateResumeButton).toBeHidden();
  await expect(backButton).toBeVisible();

  await expect(resume.getByText("ФИО", {exact: true})).toBeVisible();
  await expect(resume.getByText("Василий Дмитриевич Богданов", {exact: true}).first()).toBeVisible();
  await expect(resume.getByText("Василий Дмитриевич Богданов", {exact: true}).last()).toBeVisible();
  await expect(resume.getByText("Личные данные", {exact: true})).toBeVisible();

  await backButton.click();

  await nameInput.fill('');

  await expect(generateResumeButton).toBeVisible();
  await expect(generateResumeButton).toBeDisabled();
  await generateResumeButton.click({force: true});
  await expect(generateResumeButton).toBeVisible();
  await expect(page.getByTestId('back-button')).toBeHidden();
});

test("Генерация резюме с датой рождения (score: 1)", async ({ page }) => {
  await page.goto("/");

  const nameInput = await page.getByTestId("personal-info").nth(0);
  await expect(nameInput).toBeVisible();
  await nameInput.fill('Данилов Дмитрий Евгеньевич');

  const dateInput = await page.getByTestId("personal-info").nth(1);
  await expect(dateInput).toBeVisible();
  await dateInput.fill('2020-02-04');

  const generateResumeButton = await page.getByTestId("generate-resume");
  await expect(generateResumeButton).toBeVisible();
  await expect(generateResumeButton).toBeEnabled();
  await generateResumeButton.click();
  await expect(generateResumeButton).toBeHidden();
  const backButton = await page.getByTestId('back-button');
  await expect(backButton).toBeVisible();

  const resume = await page.getByTestId('resume-main-content');

  await expect(resume).toBeVisible();

  await expect(resume.getByText("ФИО", {exact: true})).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).first()).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).last()).toBeVisible();
  await expect(resume.getByText("Личные данные", {exact: true})).toBeVisible();

  await expect(resume.getByText("Дата рождения", {exact: true})).toBeVisible();
  await expect(resume.getByText("04.02.2020", {exact: true})).toBeVisible();

  await backButton.click();

  await dateInput.fill('2000-03-05');

  await expect(generateResumeButton).toBeVisible();
  await expect(generateResumeButton).toBeEnabled();
  await generateResumeButton.click();
  await expect(generateResumeButton).toBeHidden();
  await expect(backButton).toBeVisible();

  await expect(resume.getByText("ФИО", {exact: true})).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).first()).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).last()).toBeVisible();
  await expect(resume.getByText("Личные данные", {exact: true})).toBeVisible();

  await expect(resume.getByText("Дата рождения", {exact: true})).toBeVisible();
  await expect(resume.getByText("05.03.2000", {exact: true})).toBeVisible();

  await backButton.click();

  await nameInput.fill('');

  await expect(generateResumeButton).toBeVisible();
  await expect(generateResumeButton).toBeDisabled();
  await generateResumeButton.click({force: true});
  await expect(generateResumeButton).toBeVisible();
  await expect(page.getByTestId('back-button')).toBeHidden();
});

test("Генерация резюме с городом (score: 1)", async ({ page }) => {
  await page.goto("/");

  const nameInput = await page.getByTestId("personal-info").nth(0);
  await expect(nameInput).toBeVisible();
  await nameInput.fill('Данилов Дмитрий Евгеньевич');

  const placeInput = await page.getByTestId("personal-info").nth(2);
  await expect(placeInput).toBeVisible();
  await placeInput.fill('Петрозаводск');

  const generateResumeButton = await page.getByTestId("generate-resume");
  await expect(generateResumeButton).toBeVisible();
  await expect(generateResumeButton).toBeEnabled();
  await generateResumeButton.click();
  await expect(generateResumeButton).toBeHidden();
  const backButton = await page.getByTestId('back-button');
  await expect(backButton).toBeVisible();

  const resume = await page.getByTestId('resume-main-content');

  await expect(resume).toBeVisible();

  await expect(resume.getByText("ФИО", {exact: true})).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).first()).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).last()).toBeVisible();
  await expect(resume.getByText("Личные данные", {exact: true})).toBeVisible();

  await expect(resume.getByText("Город", {exact: true})).toBeVisible();
  await expect(resume.getByText("Петрозаводск", {exact: true})).toBeVisible();

  await backButton.click();

  await placeInput.fill('Москва');

  await expect(generateResumeButton).toBeVisible();
  await expect(generateResumeButton).toBeEnabled();
  await generateResumeButton.click();
  await expect(generateResumeButton).toBeHidden();
  await expect(backButton).toBeVisible();

  await expect(resume.getByText("ФИО", {exact: true})).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).first()).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).last()).toBeVisible();
  await expect(resume.getByText("Личные данные", {exact: true})).toBeVisible();

  await expect(resume.getByText("Город", {exact: true})).toBeVisible();
  await expect(resume.getByText("Москва", {exact: true})).toBeVisible();

  await backButton.click();

  await placeInput.fill('');

  await expect(generateResumeButton).toBeVisible();
  await expect(generateResumeButton).toBeEnabled();
  await generateResumeButton.click();
  await expect(generateResumeButton).toBeHidden();
  await expect(backButton).toBeVisible();

  await expect(resume.getByText("ФИО", {exact: true})).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).first()).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).last()).toBeVisible();
  await expect(resume.getByText("Личные данные", {exact: true})).toBeVisible();

  await expect(resume.getByText("Город", {exact: true})).toBeHidden();

  await backButton.click();

  await nameInput.fill('');

  await expect(generateResumeButton).toBeVisible();
  await expect(generateResumeButton).toBeDisabled();
  await generateResumeButton.click({force: true});
  await expect(generateResumeButton).toBeVisible();
  await expect(page.getByTestId('back-button')).toBeHidden();
});

test("Генерация резюме с номером телефона (score: 1)", async ({ page }) => {
  await page.goto("/");

  const nameInput = await page.getByTestId("personal-info").nth(0);
  await expect(nameInput).toBeVisible();
  await nameInput.fill('Данилов Дмитрий Евгеньевич');

  const phoneInput = await page.getByTestId("personal-info").nth(3);
  await expect(phoneInput).toBeVisible();
  await phoneInput.fill('+7 (965) 228-34-56');

  const generateResumeButton = await page.getByTestId("generate-resume");
  await expect(generateResumeButton).toBeVisible();
  await expect(generateResumeButton).toBeEnabled();
  await generateResumeButton.click();
  await expect(generateResumeButton).toBeHidden();
  const backButton = await page.getByTestId('back-button');
  await expect(backButton).toBeVisible();

  const resume = await page.getByTestId('resume-main-content');

  await expect(resume).toBeVisible();

  await expect(resume.getByText("ФИО", {exact: true})).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).first()).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).last()).toBeVisible();
  await expect(resume.getByText("Личные данные", {exact: true})).toBeVisible();

  await expect(resume.getByText("Номер телефона", {exact: true})).toBeVisible();
  await expect(resume.getByText("+7 (965) 228-34-56", {exact: true})).toBeVisible();

  await backButton.click();

  await phoneInput.fill('+7 (334) 123-34-11');

  await expect(generateResumeButton).toBeVisible();
  await expect(generateResumeButton).toBeEnabled();
  await generateResumeButton.click();
  await expect(generateResumeButton).toBeHidden();
  await expect(backButton).toBeVisible();

  await expect(resume.getByText("ФИО", {exact: true})).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).first()).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).last()).toBeVisible();
  await expect(resume.getByText("Личные данные", {exact: true})).toBeVisible();

  await expect(resume.getByText("Номер телефона", {exact: true})).toBeVisible();
  await expect(resume.getByText("+7 (334) 123-34-11", {exact: true})).toBeVisible();

  await backButton.click();

  await phoneInput.fill('');

  await expect(generateResumeButton).toBeVisible();
  await expect(generateResumeButton).toBeEnabled();
  await generateResumeButton.click();
  await expect(generateResumeButton).toBeHidden();
  await expect(backButton).toBeVisible();

  await expect(resume.getByText("ФИО", {exact: true})).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).first()).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).last()).toBeVisible();
  await expect(resume.getByText("Личные данные", {exact: true})).toBeVisible();

  await expect(resume.getByText("Номер телефона", {exact: true})).toBeHidden();

  await backButton.click();

  await nameInput.fill('');

  await expect(generateResumeButton).toBeVisible();
  await expect(generateResumeButton).toBeDisabled();
  await generateResumeButton.click({force: true});
  await expect(generateResumeButton).toBeVisible();
  await expect(page.getByTestId('back-button')).toBeHidden();
});

test("Генерация резюме c email (score: 1)", async ({ page }) => {
  await page.goto("/");

  const nameInput = await page.getByTestId("personal-info").nth(0);
  await expect(nameInput).toBeVisible();
  await nameInput.fill('Данилов Дмитрий Евгеньевич');

  const emailInput = await page.getByTestId("personal-info").nth(4);
  await expect(emailInput).toBeVisible();
  await emailInput.fill('RuNdUkHJ@gmail.com');

  const generateResumeButton = await page.getByTestId("generate-resume");
  await expect(generateResumeButton).toBeVisible();
  await expect(generateResumeButton).toBeEnabled();
  await generateResumeButton.click();
  await expect(generateResumeButton).toBeHidden();
  const backButton = await page.getByTestId('back-button');
  await expect(backButton).toBeVisible();

  const resume = await page.getByTestId('resume-main-content');

  await expect(resume).toBeVisible();

  await expect(resume.getByText("ФИО", {exact: true})).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).first()).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).last()).toBeVisible();
  await expect(resume.getByText("Личные данные", {exact: true})).toBeVisible();

  await expect(resume.getByText("Email", {exact: true})).toBeVisible();
  await expect(resume.getByText("RuNdUkHJ@gmail.com", {exact: true})).toBeVisible();

  await backButton.click();

  await emailInput.fill('Kripper2004@yandex.ru');

  await expect(generateResumeButton).toBeVisible();
  await expect(generateResumeButton).toBeEnabled();
  await generateResumeButton.click();
  await expect(generateResumeButton).toBeHidden();
  await expect(backButton).toBeVisible();

  await expect(resume.getByText("ФИО", {exact: true})).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).first()).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).last()).toBeVisible();
  await expect(resume.getByText("Личные данные", {exact: true})).toBeVisible();

  await expect(resume.getByText("Email", {exact: true})).toBeVisible();
  await expect(resume.getByText("Kripper2004@yandex.ru", {exact: true})).toBeVisible();

  await backButton.click();

  await emailInput.fill('');

  await expect(generateResumeButton).toBeVisible();
  await expect(generateResumeButton).toBeEnabled();
  await generateResumeButton.click();
  await expect(generateResumeButton).toBeHidden();
  await expect(backButton).toBeVisible();

  await expect(resume.getByText("ФИО", {exact: true})).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).first()).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).last()).toBeVisible();
  await expect(resume.getByText("Личные данные", {exact: true})).toBeVisible();

  await expect(resume.getByText("Email", {exact: true})).toBeHidden();

  await backButton.click();

  await nameInput.fill('');

  await expect(generateResumeButton).toBeVisible();
  await expect(generateResumeButton).toBeDisabled();
  await generateResumeButton.click({force: true});
  await expect(generateResumeButton).toBeVisible();
  await expect(page.getByTestId('back-button')).toBeHidden();
});

test("Проверка блока Личных данных (score: 10)", async ({ page }) => {
  await page.goto("/");

  const nameInput = await page.getByTestId("personal-info").nth(0);
  await expect(nameInput).toBeVisible();
  await nameInput.fill('Отто Фон Бисмарк');

  const input1 = await page.getByTestId("personal-info").nth(1);
  await expect(input1).toBeVisible();
  await input1.fill('1815-04-01');

  const input2 = await page.getByTestId("personal-info").nth(2);
  await expect(input2).toBeVisible();
  await input2.fill('Шенхаузен');

  const input3 = await page.getByTestId("personal-info").nth(3);
  await expect(input3).toBeVisible();
  await input3.fill('+7 (234) 228 18-15');

  const input4 = await page.getByTestId("personal-info").nth(4);
  await expect(input4).toBeVisible();
  await input4.fill('Kopengagen@gmail.com');

  const generateResumeButton = await page.getByTestId("generate-resume");
  await expect(generateResumeButton).toBeVisible();
  await expect(generateResumeButton).toBeEnabled();
  await generateResumeButton.click();
  await expect(generateResumeButton).toBeHidden();
  const backButton = await page.getByTestId('back-button');
  await expect(backButton).toBeVisible();

  const resume = await page.getByTestId('resume-main-content');

  await expect(resume).toBeVisible();

  await expect(resume.getByText("ФИО", {exact: true})).toBeVisible();
  await expect(resume.getByText("Отто Фон Бисмарк", {exact: true}).first()).toBeVisible();
  await expect(resume.getByText("Отто Фон Бисмарк", {exact: true}).last()).toBeVisible();
  await expect(resume.getByText("Личные данные", {exact: true})).toBeVisible();

  await expect(resume.getByText("Дата рождения", {exact: true})).toBeVisible();
  await expect(resume.getByText("01.04.1815", {exact: true})).toBeVisible();

  await expect(resume.getByText("Город", {exact: true})).toBeVisible();
  await expect(resume.getByText("Шенхаузен", {exact: true})).toBeVisible();

  await expect(resume.getByText("Номер телефона", {exact: true})).toBeVisible();
  await expect(resume.getByText("+7 (234) 228 18-15", {exact: true})).toBeVisible();

  await expect(resume.getByText("Email", {exact: true})).toBeVisible();
  await expect(resume.getByText("Kopengagen@gmail.com", {exact: true})).toBeVisible();

  await backButton.click();
  await generateResumeButton.click();

  await expect(resume.getByText("ФИО", {exact: true})).toBeVisible();
  await expect(resume.getByText("Отто Фон Бисмарк", {exact: true}).first()).toBeVisible();
  await expect(resume.getByText("Отто Фон Бисмарк", {exact: true}).last()).toBeVisible();
  await expect(resume.getByText("Личные данные", {exact: true})).toBeVisible();

  await expect(resume.getByText("Дата рождения", {exact: true})).toBeVisible();
  await expect(resume.getByText("01.04.1815", {exact: true})).toBeVisible();

  await expect(resume.getByText("Город", {exact: true})).toBeVisible();
  await expect(resume.getByText("Шенхаузен", {exact: true})).toBeVisible();

  await expect(resume.getByText("Номер телефона", {exact: true})).toBeVisible();
  await expect(resume.getByText("+7 (234) 228 18-15", {exact: true})).toBeVisible();

  await expect(resume.getByText("Email", {exact: true})).toBeVisible();
  await expect(resume.getByText("Kopengagen@gmail.com", {exact: true})).toBeVisible();
});

test("Генерация резюме c одним интересом (score: 1)", async ({ page }) => {
  await page.goto("/");

  const nameInput = await page.getByTestId("personal-info").nth(0);
  await expect(nameInput).toBeVisible();
  await nameInput.fill('Данилов Дмитрий Евгеньевич');

  const interestInput = await page.getByTestId("interest").first();
  await expect(interestInput).toBeVisible();
  await interestInput.fill('Занимаюсь спортом серьезным');

  const generateResumeButton = await page.getByTestId("generate-resume");
  await expect(generateResumeButton).toBeVisible();
  await expect(generateResumeButton).toBeEnabled();
  await generateResumeButton.click();
  await expect(generateResumeButton).toBeHidden();
  const backButton = await page.getByTestId('back-button');
  await expect(backButton).toBeVisible();

  const resume = await page.getByTestId('resume-main-content');

  await expect(resume).toBeVisible();

  await expect(resume.getByText("ФИО", {exact: true})).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).first()).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).last()).toBeVisible();
  await expect(resume.getByText("Личные данные", {exact: true})).toBeVisible();

  await expect(resume.getByText("Интересы", {exact: true})).toBeVisible();
  await expect(resume.getByText("Занимаюсь спортом серьезным", {exact: true})).toBeVisible();

  await backButton.click();

  await interestInput.fill('Спортивное программирование');

  await expect(generateResumeButton).toBeVisible();
  await expect(generateResumeButton).toBeEnabled();
  await generateResumeButton.click();
  await expect(generateResumeButton).toBeHidden();
  await expect(backButton).toBeVisible();

  await expect(resume.getByText("ФИО", {exact: true})).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).first()).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).last()).toBeVisible();
  await expect(resume.getByText("Личные данные", {exact: true})).toBeVisible();

  await expect(resume.getByText("Интересы", {exact: true})).toBeVisible();
  await expect(resume.getByText("Спортивное программирование", {exact: true})).toBeVisible();

  await backButton.click();

  await interestInput.fill('');

  await expect(generateResumeButton).toBeVisible();
  await expect(generateResumeButton).toBeEnabled();
  await generateResumeButton.click();
  await expect(generateResumeButton).toBeHidden();
  await expect(backButton).toBeVisible();

  await expect(resume.getByText("ФИО", {exact: true})).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).first()).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).last()).toBeVisible();
  await expect(resume.getByText("Личные данные", {exact: true})).toBeVisible();

  await expect(resume.getByText("Интересы", {exact: true})).toBeHidden();

  await backButton.click();

  await nameInput.fill('');

  await expect(generateResumeButton).toBeVisible();
  await expect(generateResumeButton).toBeDisabled();
  await generateResumeButton.click({force: true});
  await expect(generateResumeButton).toBeVisible();
  await expect(page.getByTestId('back-button')).toBeHidden();
});

test("Генерация резюме c несколькими интересами (score: 4)", async ({ page }) => {
  await page.goto("/");

  const nameInput = await page.getByTestId("personal-info").nth(0);
  await expect(nameInput).toBeVisible();
  await nameInput.fill('Данилов Дмитрий Евгеньевич');

  const interestInput1 = await page.getByTestId("interest").nth(0);
  await expect(interestInput1).toBeVisible();
  await interestInput1.fill('Занимаюсь спортом серьезным');

  const addInterest = await page.getByTestId("add-interest");
  await expect(addInterest).toBeVisible();
  await expect(addInterest).toBeEnabled();
  await addInterest.click();

  const interestInput2 = await page.getByTestId("interest").nth(1);
  await expect(interestInput2).toBeVisible();
  await interestInput2.fill('Занимаюсь программированием');

  await addInterest.click();

  const interestInput3 = await page.getByTestId("interest").nth(2);
  await expect(interestInput3).toBeVisible();
  await interestInput3.fill('Люблю читать');

  const generateResumeButton = await page.getByTestId("generate-resume");
  await expect(generateResumeButton).toBeVisible();
  await expect(generateResumeButton).toBeEnabled();
  await generateResumeButton.click();
  await expect(generateResumeButton).toBeHidden();
  const backButton = await page.getByTestId('back-button');
  await expect(backButton).toBeVisible();

  const resume = await page.getByTestId('resume-main-content');

  await expect(resume).toBeVisible();

  await expect(resume.getByText("ФИО", {exact: true})).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).first()).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).last()).toBeVisible();
  await expect(resume.getByText("Личные данные", {exact: true})).toBeVisible();

  await expect(resume.getByText("Интересы", {exact: true})).toBeVisible();
  await expect(resume.getByText("Занимаюсь спортом серьезным", {exact: true})).toBeVisible();
  await expect(resume.getByText("Занимаюсь программированием", {exact: true})).toBeVisible();
  await expect(resume.getByText("Люблю читать", {exact: true})).toBeVisible();

  await backButton.click();

  await interestInput1.fill('');
  await interestInput2.fill('');

  await expect(generateResumeButton).toBeVisible();
  await expect(generateResumeButton).toBeEnabled();
  await generateResumeButton.click();
  await expect(generateResumeButton).toBeHidden();
  await expect(backButton).toBeVisible();

  await expect(resume.getByText("ФИО", {exact: true})).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).first()).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).last()).toBeVisible();
  await expect(resume.getByText("Личные данные", {exact: true})).toBeVisible();

  await expect(resume.getByText("Интересы", {exact: true})).toBeVisible();
  await expect(resume.getByText("Люблю читать", {exact: true})).toBeVisible();

  await backButton.click();

  await interestInput1.fill('Не понимаю что происходит');

  await expect(generateResumeButton).toBeVisible();
  await expect(generateResumeButton).toBeEnabled();
  await generateResumeButton.click();
  await expect(generateResumeButton).toBeHidden();
  await expect(backButton).toBeVisible();

  await expect(resume.getByText("ФИО", {exact: true})).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).first()).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).last()).toBeVisible();
  await expect(resume.getByText("Личные данные", {exact: true})).toBeVisible();

  await expect(resume.getByText("Интересы", {exact: true})).toBeVisible();
  await expect(resume.getByText("Люблю читать", {exact: true})).toBeVisible();
  await expect(resume.getByText("Не понимаю что происходит", {exact: true})).toBeVisible();

  await backButton.click();

  await interestInput1.fill('');
  await interestInput3.fill('');

  await expect(generateResumeButton).toBeVisible();
  await expect(generateResumeButton).toBeEnabled();
  await generateResumeButton.click();
  await expect(generateResumeButton).toBeHidden();
  await expect(backButton).toBeVisible();

  await expect(resume.getByText("ФИО", {exact: true})).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).first()).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).last()).toBeVisible();
  await expect(resume.getByText("Личные данные", {exact: true})).toBeVisible();

  await expect(resume.getByText("Интересы", {exact: true})).toBeHidden();

  await backButton.click();

  await nameInput.fill('');

  await expect(generateResumeButton).toBeVisible();
  await expect(generateResumeButton).toBeDisabled();
  await generateResumeButton.click({force: true});
  await expect(generateResumeButton).toBeVisible();
  await expect(page.getByTestId('back-button')).toBeHidden();
});

test("Проверка вкладки Интересов (score: 6)", async ({ page }) => {
  await page.goto("/");

  const nameInput = await page.getByTestId("personal-info").nth(0);
  await expect(nameInput).toBeVisible();
  await nameInput.fill('Данилов Дмитрий Евгеньевич');

  const interestInput1 = await page.getByTestId("interest").nth(0);
  await expect(interestInput1).toBeVisible();
  await interestInput1.fill('Хороший лидер');

  const addInterest = await page.getByTestId("add-interest");
  await expect(addInterest).toBeVisible();
  await expect(addInterest).toBeEnabled();
  await addInterest.click();

  const interestInput2 = await page.getByTestId("interest").nth(1);
  await expect(interestInput2).toBeVisible();
  await interestInput2.fill('Занимаюсь спортом');

  await addInterest.click();

  const interestInput3 = await page.getByTestId("interest").nth(2);
  await expect(interestInput3).toBeVisible();
  await interestInput3.fill('Строительные практики');

  await addInterest.click();

  const interestInput4 = await page.getByTestId("interest").nth(3);
  await expect(interestInput4).toBeVisible();
  await interestInput4.fill('Выпускал журналы');

  const generateResumeButton = await page.getByTestId("generate-resume");
  await expect(generateResumeButton).toBeVisible();
  await expect(generateResumeButton).toBeEnabled();
  await generateResumeButton.click();
  await expect(generateResumeButton).toBeHidden();
  const backButton = await page.getByTestId('back-button');
  await expect(backButton).toBeVisible();

  const resume = await page.getByTestId('resume-main-content');

  await expect(resume).toBeVisible();

  await expect(resume.getByText("ФИО", {exact: true})).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).first()).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).last()).toBeVisible();
  await expect(resume.getByText("Личные данные", {exact: true})).toBeVisible();

  await expect(resume.getByText("Интересы", {exact: true})).toBeVisible();
  await expect(resume.getByText("Хороший лидер", {exact: true})).toBeVisible();
  await expect(resume.getByText("Занимаюсь спортом", {exact: true})).toBeVisible();
  await expect(resume.getByText("Строительные практики", {exact: true})).toBeVisible();
  await expect(resume.getByText("Выпускал журналы", {exact: true})).toBeVisible();

  await backButton.click();
  await generateResumeButton.click();

  await expect(resume.getByText("ФИО", {exact: true})).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).first()).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).last()).toBeVisible();
  await expect(resume.getByText("Личные данные", {exact: true})).toBeVisible();

  await expect(resume.getByText("Интересы", {exact: true})).toBeVisible();
  await expect(resume.getByText("Хороший лидер", {exact: true})).toBeVisible();
  await expect(resume.getByText("Занимаюсь спортом", {exact: true})).toBeVisible();
  await expect(resume.getByText("Строительные практики", {exact: true})).toBeVisible();
  await expect(resume.getByText("Выпускал журналы", {exact: true})).toBeVisible();
});

test("Генерация резюме c одним языком (score: 1)", async ({ page }) => {
  await page.goto("/");

  const nameInput = await page.getByTestId("personal-info").nth(0);
  await expect(nameInput).toBeVisible();
  await nameInput.fill('Данилов Дмитрий Евгеньевич');

  const languageNameInput = await page.getByTestId("language-name").nth(0);
  await expect(languageNameInput).toBeVisible();
  await languageNameInput.fill('Английский');

  const languageLevelInput = await page.getByTestId("language-level").nth(0);
  await expect(languageLevelInput).toBeVisible();

  const generateResumeButton = await page.getByTestId("generate-resume");
  await expect(generateResumeButton).toBeVisible();
  await expect(generateResumeButton).toBeEnabled();
  await generateResumeButton.click();
  await expect(generateResumeButton).toBeHidden();
  const backButton = await page.getByTestId('back-button');
  await expect(backButton).toBeVisible();

  const resume = await page.getByTestId('resume-main-content');

  await expect(resume).toBeVisible();

  await expect(resume.getByText("ФИО", {exact: true})).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).first()).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).last()).toBeVisible();
  await expect(resume.getByText("Личные данные", {exact: true})).toBeVisible();

  await expect(resume.getByText("Языки", {exact: true})).toBeHidden();

  await backButton.click();

  await languageNameInput.fill('');
  await languageLevelInput.fill('B2');

  await expect(generateResumeButton).toBeVisible();
  await expect(generateResumeButton).toBeEnabled();
  await generateResumeButton.click();
  await expect(generateResumeButton).toBeHidden();
  await expect(backButton).toBeVisible();

  await expect(resume.getByText("ФИО", {exact: true})).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).first()).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).last()).toBeVisible();
  await expect(resume.getByText("Личные данные", {exact: true})).toBeVisible();

  await expect(resume.getByText("Языки", {exact: true})).toBeHidden();

  await backButton.click();

  await languageNameInput.fill('Английский');
  await languageLevelInput.fill('C1');

  await expect(generateResumeButton).toBeVisible();
  await expect(generateResumeButton).toBeEnabled();
  await generateResumeButton.click();
  await expect(generateResumeButton).toBeHidden();
  await expect(backButton).toBeVisible();

  await expect(resume.getByText("ФИО", {exact: true})).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).first()).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).last()).toBeVisible();
  await expect(resume.getByText("Личные данные", {exact: true})).toBeVisible();

  await expect(resume.getByText("Языки", {exact: true})).toBeVisible();
  await expect(resume.getByText("Английский", {exact: true})).toBeVisible();
  await expect(resume.getByText("C1", {exact: true})).toBeVisible();

  await backButton.click();

  await nameInput.fill('');

  await expect(generateResumeButton).toBeVisible();
  await expect(generateResumeButton).toBeDisabled();
  await generateResumeButton.click({force: true});
  await expect(generateResumeButton).toBeVisible();
  await expect(page.getByTestId('back-button')).toBeHidden();
});

test("Генерация резюме с несколькими языками (score: 4)", async ({ page }) => {
  await page.goto("/");

  const nameInput = await page.getByTestId("personal-info").nth(0);
  await expect(nameInput).toBeVisible();
  await nameInput.fill('Данилов Дмитрий Евгеньевич');

  const languageNameInput = await page.getByTestId("language-name").nth(0);
  await expect(languageNameInput).toBeVisible();
  await languageNameInput.fill('Английский');

  const languageLevelInput = await page.getByTestId("language-level").nth(0);
  await expect(languageLevelInput).toBeVisible();
  await languageLevelInput.fill('С1');

  const addLanguage = await page.getByTestId("add-language");
  await expect(addLanguage).toBeVisible();
  await addLanguage.click();

  const languageNameInput2 = await page.getByTestId("language-name").nth(1);
  await expect(languageNameInput2).toBeVisible();
  await languageNameInput2.fill('Испанский');

  const languageLevelInput2 = await page.getByTestId("language-level").nth(1);
  await expect(languageLevelInput2).toBeVisible();
  await languageLevelInput2.fill('B2');

  const generateResumeButton = await page.getByTestId("generate-resume");
  await expect(generateResumeButton).toBeVisible();
  await expect(generateResumeButton).toBeEnabled();
  await generateResumeButton.click();
  await expect(generateResumeButton).toBeHidden();
  const backButton = await page.getByTestId('back-button');
  await expect(backButton).toBeVisible();

  const resume = await page.getByTestId('resume-main-content');

  await expect(resume).toBeVisible();

  await expect(resume.getByText("ФИО", {exact: true})).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).first()).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).last()).toBeVisible();
  await expect(resume.getByText("Личные данные", {exact: true})).toBeVisible();

  await expect(resume.getByText("Языки", {exact: true})).toBeVisible();
  await expect(resume.getByText("Английский", {exact: true})).toBeVisible();
  await expect(resume.getByText("С1", {exact: true})).toBeVisible();
  await expect(resume.getByText("Испанский", {exact: true})).toBeVisible();
  await expect(resume.getByText("B2", {exact: true})).toBeVisible();

  await backButton.click();

  await languageNameInput.fill('');
  await languageLevelInput2.fill('');

  await expect(generateResumeButton).toBeVisible();
  await expect(generateResumeButton).toBeEnabled();
  await generateResumeButton.click();
  await expect(generateResumeButton).toBeHidden();
  await expect(backButton).toBeVisible();

  await expect(resume.getByText("ФИО", {exact: true})).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).first()).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).last()).toBeVisible();
  await expect(resume.getByText("Личные данные", {exact: true})).toBeVisible();

  await expect(resume.getByText("Языки", {exact: true})).toBeHidden();

  await backButton.click();

  await languageNameInput.fill('Английский');
  await languageLevelInput.fill('C1');

  await expect(generateResumeButton).toBeVisible();
  await expect(generateResumeButton).toBeEnabled();
  await generateResumeButton.click();
  await expect(generateResumeButton).toBeHidden();
  await expect(backButton).toBeVisible();

  await expect(resume.getByText("ФИО", {exact: true})).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).first()).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).last()).toBeVisible();
  await expect(resume.getByText("Личные данные", {exact: true})).toBeVisible();

  await expect(resume.getByText("Языки", {exact: true})).toBeVisible();
  await expect(resume.getByText("Английский", {exact: true})).toBeVisible();
  await expect(resume.getByText("C1", {exact: true})).toBeVisible();

  await backButton.click();

  await nameInput.fill('');

  await expect(generateResumeButton).toBeVisible();
  await expect(generateResumeButton).toBeDisabled();
  await generateResumeButton.click({force: true});
  await expect(generateResumeButton).toBeVisible();
  await expect(page.getByTestId('back-button')).toBeHidden();
});

test("Генерация основного описания (score: 2)", async ({ page }) => {
  await page.goto("/");

  const nameInput = await page.getByTestId("personal-info").nth(0);
  await expect(nameInput).toBeVisible();
  await nameInput.fill('Данилов Дмитрий Евгеньевич');

  const personalDescriptionArea = await page.getByTestId("personal-description").nth(0);
  await expect(personalDescriptionArea).toBeVisible();
  await personalDescriptionArea.fill('В целом достаточно сильный разработчик, я бы даже сказал умный, вообще умен не по годам. Подниму ваш проект, удалю все легаси, и все коммиты будут маленькими по 15 строк кода.');

  const generateResumeButton = await page.getByTestId("generate-resume");
  await expect(generateResumeButton).toBeVisible();
  await expect(generateResumeButton).toBeEnabled();
  await generateResumeButton.click();
  await expect(generateResumeButton).toBeHidden();
  const backButton = await page.getByTestId('back-button');
  await expect(backButton).toBeVisible();

  const resume = await page.getByTestId('resume-main-content');

  await expect(resume).toBeVisible();

  await expect(resume.getByText("ФИО", {exact: true})).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).first()).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).last()).toBeVisible();
  await expect(resume.getByText("Личные данные", {exact: true})).toBeVisible();

  await expect(resume.getByText("В целом достаточно сильный разработчик, я бы даже сказал умный, вообще умен не по годам. Подниму ваш проект, удалю все легаси, и все коммиты будут маленькими по 15 строк кода.", {exact: true})).toBeVisible();

  await backButton.click();

  await nameInput.fill('');

  await expect(generateResumeButton).toBeVisible();
  await expect(generateResumeButton).toBeDisabled();
  await generateResumeButton.click({force: true});
  await expect(generateResumeButton).toBeVisible();
  await expect(page.getByTestId('back-button')).toBeHidden();
});

test("Генерация одной работы (score: 2)", async ({ page }) => {
  await page.goto("/");

  const nameInput = await page.getByTestId("personal-info").nth(0);
  await expect(nameInput).toBeVisible();
  await nameInput.fill('Данилов Дмитрий Евгеньевич');

  const jobTitle = await page.getByTestId("job-title").nth(0);
  await expect(jobTitle).toBeVisible();
  await jobTitle.fill('Angular разработчик');

  const generateResumeButton = await page.getByTestId("generate-resume");
  await expect(generateResumeButton).toBeVisible();
  await expect(generateResumeButton).toBeEnabled();
  await generateResumeButton.click();
  await expect(generateResumeButton).toBeHidden();
  const backButton = await page.getByTestId('back-button');
  await expect(backButton).toBeVisible();

  const resume = await page.getByTestId('resume-main-content');

  await expect(resume).toBeVisible();

  await expect(resume.getByText("ФИО", {exact: true})).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).first()).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).last()).toBeVisible();
  await expect(resume.getByText("Личные данные", {exact: true})).toBeVisible();

  await expect(resume.getByText("Опыт работы", {exact: true})).toBeVisible();
  await expect(resume.getByText("Angular разработчик", {exact: true})).toBeVisible();

  await backButton.click();

  await jobTitle.fill('');

  await generateResumeButton.click();

  await expect(resume.getByText("ФИО", {exact: true})).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).first()).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).last()).toBeVisible();
  await expect(resume.getByText("Личные данные", {exact: true})).toBeVisible();

  await expect(resume.getByText("Опыт работы", {exact: true})).toBeHidden();

  await backButton.click();

  await jobTitle.fill('Angular разработчик');

  const jobDateStart = await page.getByTestId("job-date-start").nth(0);
  await expect(jobDateStart).toBeVisible();
  await jobDateStart.fill('2020-02-04');

  await generateResumeButton.click();

  await expect(resume.getByText("ФИО", {exact: true})).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).first()).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).last()).toBeVisible();
  await expect(resume.getByText("Личные данные", {exact: true})).toBeVisible();

  await expect(resume.getByText("Опыт работы", {exact: true})).toBeVisible();
  await expect(resume.getByText("Angular разработчик", {exact: true})).toBeVisible();
  await expect(resume.getByText("февраль 2020 г. — наст. время", {exact: true})).toBeVisible();

  await backButton.click();

  const jobDateEnd = await page.getByTestId("job-date-end").nth(0);
  await expect(jobDateEnd).toBeVisible();
  await jobDateEnd.fill('2020-08-02');

  await generateResumeButton.click();

  await expect(resume.getByText("ФИО", {exact: true})).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).first()).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).last()).toBeVisible();
  await expect(resume.getByText("Личные данные", {exact: true})).toBeVisible();

  await expect(resume.getByText("Опыт работы", {exact: true})).toBeVisible();
  await expect(resume.getByText("Angular разработчик", {exact: true})).toBeVisible();
  await expect(resume.getByText("февраль 2020 г. — август 2020 г.", {exact: true})).toBeVisible();

  await backButton.click();

  await jobDateStart.fill('');

  await generateResumeButton.click();

  await expect(resume.getByText("ФИО", {exact: true})).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).first()).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).last()).toBeVisible();
  await expect(resume.getByText("Личные данные", {exact: true})).toBeVisible();

  await expect(resume.getByText("Опыт работы", {exact: true})).toBeVisible();
  await expect(resume.getByText("Angular разработчик", {exact: true})).toBeVisible();
  await expect(resume.getByText("август 2020 г.")).toBeHidden();

  await backButton.click();

  await jobDateStart.fill('2020-02-04');

  const jobPlace = await page.getByTestId("job-place").nth(0);
  await expect(jobPlace).toBeVisible();
  await jobPlace.fill('Тинькофф Центр Разработки, Ижевск');

  await generateResumeButton.click();

  await expect(resume.getByText("ФИО", {exact: true})).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).first()).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).last()).toBeVisible();
  await expect(resume.getByText("Личные данные", {exact: true})).toBeVisible();

  await expect(resume.getByText("Опыт работы", {exact: true})).toBeVisible();
  await expect(resume.getByText("Angular разработчик", {exact: true})).toBeVisible();
  await expect(resume.getByText("февраль 2020 г. — август 2020 г.", {exact: true})).toBeVisible();
  await expect(resume.getByText("Тинькофф Центр Разработки, Ижевск", {exact: true})).toBeVisible();

  await backButton.click();

  const jobDescription = await page.getByTestId("job-description").nth(0);
  await expect(jobDescription).toBeVisible();
  await jobDescription.fill('Придумывал аналитические решения и разрабатывал веб-сайты для улучшения опыта пользователей.');

  await generateResumeButton.click();

  await expect(resume.getByText("ФИО", {exact: true})).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).first()).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).last()).toBeVisible();
  await expect(resume.getByText("Личные данные", {exact: true})).toBeVisible();

  await expect(resume.getByText("Опыт работы", {exact: true})).toBeVisible();
  await expect(resume.getByText("Angular разработчик", {exact: true})).toBeVisible();
  await expect(resume.getByText("февраль 2020 г. — август 2020 г.", {exact: true})).toBeVisible();
  await expect(resume.getByText("Тинькофф Центр Разработки, Ижевск", {exact: true})).toBeVisible();
  await expect(resume.getByText("Придумывал аналитические решения и разрабатывал веб-сайты для улучшения опыта пользователей.", {exact: true})).toBeVisible();

  await backButton.click();

  await jobTitle.fill('');

  await generateResumeButton.click();

  await expect(resume.getByText("ФИО", {exact: true})).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).first()).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).last()).toBeVisible();
  await expect(resume.getByText("Личные данные", {exact: true})).toBeVisible();

  await expect(resume.getByText("Опыт работы", {exact: true})).toBeHidden();
  await expect(resume.getByText("февраль 2020 г. — август 2020 г.", {exact: true})).toBeHidden();
  await expect(resume.getByText("Тинькофф Центр Разработки, Ижевск", {exact: true})).toBeHidden();
  await expect(resume.getByText("Придумывал аналитические решения и разрабатывал веб-сайты для улучшения опыта пользователей.", {exact: true})).toBeHidden();

  await backButton.click();

  await nameInput.fill('');

  await expect(generateResumeButton).toBeVisible();
  await expect(generateResumeButton).toBeDisabled();
  await generateResumeButton.click({force: true});
  await expect(generateResumeButton).toBeVisible();
  await expect(page.getByTestId('back-button')).toBeHidden();
});

test("Генерация одного обучения (score: 2)", async ({ page }) => {
  await page.goto("/");

  const nameInput = await page.getByTestId("personal-info").nth(0);
  await expect(nameInput).toBeVisible();
  await nameInput.fill('Данилов Дмитрий Евгеньевич');

  const educationTitle = await page.getByTestId("education-title").nth(0);
  await expect(educationTitle).toBeVisible();
  await educationTitle.fill('Бакалавриат');

  const generateResumeButton = await page.getByTestId("generate-resume");
  await expect(generateResumeButton).toBeVisible();
  await expect(generateResumeButton).toBeEnabled();
  await generateResumeButton.click();
  await expect(generateResumeButton).toBeHidden();
  const backButton = await page.getByTestId('back-button');
  await expect(backButton).toBeVisible();

  const resume = await page.getByTestId('resume-main-content');

  await expect(resume).toBeVisible();

  await expect(resume.getByText("ФИО", {exact: true})).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).first()).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).last()).toBeVisible();
  await expect(resume.getByText("Личные данные", {exact: true})).toBeVisible();

  await expect(resume.getByText("Образование и квалификация", {exact: true})).toBeVisible();
  await expect(resume.getByText("Бакалавриат", {exact: true})).toBeVisible();

  await backButton.click();

  await educationTitle.fill('');

  await generateResumeButton.click();

  await expect(resume.getByText("ФИО", {exact: true})).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).first()).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).last()).toBeVisible();
  await expect(resume.getByText("Личные данные", {exact: true})).toBeVisible();

  await expect(resume.getByText("Образование и квалификация", {exact: true})).toBeHidden();

  await backButton.click();

  await educationTitle.fill('Бакалавриат');

  const educationDateStart = await page.getByTestId("education-date-start").nth(0);
  await expect(educationDateStart).toBeVisible();
  await educationDateStart.fill('2020-02-04');

  await generateResumeButton.click();

  await expect(resume.getByText("ФИО", {exact: true})).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).first()).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).last()).toBeVisible();
  await expect(resume.getByText("Личные данные", {exact: true})).toBeVisible();

  await expect(resume.getByText("Образование и квалификация", {exact: true})).toBeVisible();
  await expect(resume.getByText("Бакалавриат", {exact: true})).toBeVisible();
  await expect(resume.getByText("февраль 2020 г. — наст. время", {exact: true})).toBeVisible();

  await backButton.click();

  const educationDateEnd = await page.getByTestId("education-date-end").nth(0);
  await expect(educationDateEnd).toBeVisible();
  await educationDateEnd.fill('2020-08-02');

  await generateResumeButton.click();

  await expect(resume.getByText("ФИО", {exact: true})).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).first()).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).last()).toBeVisible();
  await expect(resume.getByText("Личные данные", {exact: true})).toBeVisible();

  await expect(resume.getByText("Образование и квалификация", {exact: true})).toBeVisible();
  await expect(resume.getByText("Бакалавриат", {exact: true})).toBeVisible();
  await expect(resume.getByText("февраль 2020 г. — август 2020 г.", {exact: true})).toBeVisible();

  await backButton.click();

  await educationDateStart.fill('');

  await generateResumeButton.click();

  await expect(resume.getByText("ФИО", {exact: true})).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).first()).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).last()).toBeVisible();
  await expect(resume.getByText("Личные данные", {exact: true})).toBeVisible();

  await expect(resume.getByText("Образование и квалификация", {exact: true})).toBeVisible();
  await expect(resume.getByText("Бакалавриат", {exact: true})).toBeVisible();
  await expect(resume.getByText("август 2020 г.")).toBeHidden();

  await backButton.click();

  await educationDateStart.fill('2020-02-04');

  const educationPlace = await page.getByTestId("education-place").nth(0);
  await expect(educationPlace).toBeVisible();
  await educationPlace.fill('Уральский федеральный университет, Екатеринбург');

  await generateResumeButton.click();

  await expect(resume.getByText("ФИО", {exact: true})).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).first()).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).last()).toBeVisible();
  await expect(resume.getByText("Личные данные", {exact: true})).toBeVisible();

  await expect(resume.getByText("Образование и квалификация", {exact: true})).toBeVisible();
  await expect(resume.getByText("Бакалавриат", {exact: true})).toBeVisible();
  await expect(resume.getByText("февраль 2020 г. — август 2020 г.", {exact: true})).toBeVisible();
  await expect(resume.getByText("Уральский федеральный университет, Екатеринбург", {exact: true})).toBeVisible();

  await backButton.click();

  const educationDescription = await page.getByTestId("education-description").nth(0);
  await expect(educationDescription).toBeVisible();
  await educationDescription.fill('Направление: МОАИС.');

  await generateResumeButton.click();

  await expect(resume.getByText("ФИО", {exact: true})).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).first()).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).last()).toBeVisible();
  await expect(resume.getByText("Личные данные", {exact: true})).toBeVisible();

  await expect(resume.getByText("Образование и квалификация", {exact: true})).toBeVisible();
  await expect(resume.getByText("Бакалавриат", {exact: true})).toBeVisible();
  await expect(resume.getByText("февраль 2020 г. — август 2020 г.", {exact: true})).toBeVisible();
  await expect(resume.getByText("Уральский федеральный университет, Екатеринбург", {exact: true})).toBeVisible();
  await expect(resume.getByText("Направление: МОАИС.", {exact: true})).toBeVisible();

  await backButton.click();

  await educationTitle.fill('');

  await generateResumeButton.click();

  await expect(resume.getByText("ФИО", {exact: true})).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).first()).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).last()).toBeVisible();
  await expect(resume.getByText("Личные данные", {exact: true})).toBeVisible();

  await expect(resume.getByText("Образование и квалификация", {exact: true})).toBeHidden();
  await expect(resume.getByText("февраль 2020 г. — август 2020 г.", {exact: true})).toBeHidden();
  await expect(resume.getByText("Уральский федеральный университет, Екатеринбург", {exact: true})).toBeHidden();
  await expect(resume.getByText("Направление: МОАИС.", {exact: true})).toBeHidden();

  await backButton.click();

  await nameInput.fill('');

  await expect(generateResumeButton).toBeVisible();
  await expect(generateResumeButton).toBeDisabled();
  await generateResumeButton.click({force: true});
  await expect(generateResumeButton).toBeVisible();
  await expect(page.getByTestId('back-button')).toBeHidden();
});

test("Генерация одного курса (score: 2)", async ({ page }) => {
  await page.goto("/");

  const nameInput = await page.getByTestId("personal-info").nth(0);
  await expect(nameInput).toBeVisible();
  await nameInput.fill('Данилов Дмитрий Евгеньевич');

  const courseTitle = await page.getByTestId("course-title").nth(0);
  await expect(courseTitle).toBeVisible();
  await courseTitle.fill('Основы JavaScript, HTML, CSS');

  const generateResumeButton = await page.getByTestId("generate-resume");
  await expect(generateResumeButton).toBeVisible();
  await expect(generateResumeButton).toBeEnabled();
  await generateResumeButton.click();
  await expect(generateResumeButton).toBeHidden();
  const backButton = await page.getByTestId('back-button');
  await expect(backButton).toBeVisible();

  const resume = await page.getByTestId('resume-main-content');

  await expect(resume).toBeVisible();

  await expect(resume.getByText("ФИО", {exact: true})).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).first()).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).last()).toBeVisible();
  await expect(resume.getByText("Личные данные", {exact: true})).toBeVisible();

  await expect(resume.getByText("Курсы", {exact: true})).toBeVisible();
  await expect(resume.getByText("Основы JavaScript, HTML, CSS", {exact: true})).toBeVisible();

  await backButton.click();

  await courseTitle.fill('');

  await generateResumeButton.click();

  await expect(resume.getByText("ФИО", {exact: true})).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).first()).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).last()).toBeVisible();
  await expect(resume.getByText("Личные данные", {exact: true})).toBeVisible();

  await expect(resume.getByText("Курсы", {exact: true})).toBeHidden();

  await backButton.click();

  await courseTitle.fill('Основы JavaScript, HTML, CSS');

  const courseDateStart = await page.getByTestId("course-date-start").nth(0);
  await expect(courseDateStart).toBeVisible();
  await courseDateStart.fill('2020-02-04');

  await generateResumeButton.click();

  await expect(resume.getByText("ФИО", {exact: true})).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).first()).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).last()).toBeVisible();
  await expect(resume.getByText("Личные данные", {exact: true})).toBeVisible();

  await expect(resume.getByText("Курсы", {exact: true})).toBeVisible();
  await expect(resume.getByText("Основы JavaScript, HTML, CSS", {exact: true})).toBeVisible();
  await expect(resume.getByText("февраль 2020 г. — наст. время", {exact: true})).toBeVisible();

  await backButton.click();

  const courseDateEnd = await page.getByTestId("course-date-end").nth(0);
  await expect(courseDateEnd).toBeVisible();
  await courseDateEnd.fill('2020-08-02');

  await generateResumeButton.click();

  await expect(resume.getByText("ФИО", {exact: true})).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).first()).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).last()).toBeVisible();
  await expect(resume.getByText("Личные данные", {exact: true})).toBeVisible();

  await expect(resume.getByText("Курсы", {exact: true})).toBeVisible();
  await expect(resume.getByText("Основы JavaScript, HTML, CSS", {exact: true})).toBeVisible();
  await expect(resume.getByText("февраль 2020 г. — август 2020 г.", {exact: true})).toBeVisible();

  await backButton.click();

  await courseDateStart.fill('');

  await generateResumeButton.click();

  await expect(resume.getByText("ФИО", {exact: true})).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).first()).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).last()).toBeVisible();
  await expect(resume.getByText("Личные данные", {exact: true})).toBeVisible();

  await expect(resume.getByText("Курсы", {exact: true})).toBeVisible();
  await expect(resume.getByText("Основы JavaScript, HTML, CSS", {exact: true})).toBeVisible();
  await expect(resume.getByText("август 2020 г.")).toBeHidden();

  await backButton.click();

  await courseDateStart.fill('2020-02-04');

  const coursePlace = await page.getByTestId("course-place").nth(0);
  await expect(coursePlace).toBeVisible();
  await coursePlace.fill('ЦУ');

  await generateResumeButton.click();

  await expect(resume.getByText("ФИО", {exact: true})).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).first()).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).last()).toBeVisible();
  await expect(resume.getByText("Личные данные", {exact: true})).toBeVisible();

  await expect(resume.getByText("Курсы", {exact: true})).toBeVisible();
  await expect(resume.getByText("Основы JavaScript, HTML, CSS", {exact: true})).toBeVisible();
  await expect(resume.getByText("февраль 2020 г. — август 2020 г.", {exact: true})).toBeVisible();
  await expect(resume.getByText("ЦУ", {exact: true})).toBeVisible();

  await backButton.click();

  await courseTitle.fill('');

  await generateResumeButton.click();

  await expect(resume.getByText("ФИО", {exact: true})).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).first()).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).last()).toBeVisible();
  await expect(resume.getByText("Личные данные", {exact: true})).toBeVisible();

  await expect(resume.getByText("Курсы", {exact: true})).toBeHidden();
  await expect(resume.getByText("февраль 2020 г. — август 2020 г.", {exact: true})).toBeHidden();
  await expect(resume.getByText("ЦУ", {exact: true})).toBeHidden();

  await backButton.click();

  await nameInput.fill('');

  await expect(generateResumeButton).toBeVisible();
  await expect(generateResumeButton).toBeDisabled();
  await generateResumeButton.click({force: true});
  await expect(generateResumeButton).toBeVisible();
  await expect(page.getByTestId('back-button')).toBeHidden();
});

test("Генерация всего резюме (score: 16)", async ({ page }) => {
  await fillResume(page);

  const resume = await page.getByTestId('resume-main-content');
  await expect(resume).toBeVisible();

  await expect(resume.getByText("ФИО", {exact: true})).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).first()).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).last()).toBeVisible();
  await expect(resume.getByText("Личные данные", {exact: true})).toBeVisible();

  await expect(resume.getByText("Дата рождения", {exact: true})).toBeVisible();
  await expect(resume.getByText("05.05.1986", {exact: true})).toBeVisible();

  await expect(resume.getByText("Город", {exact: true})).toBeVisible();
  await expect(resume.getByText("Ижевск", {exact: true})).toBeVisible();

  await expect(resume.getByText("Номер телефона", {exact: true})).toBeVisible();
  await expect(resume.getByText("+7 (234) 228 18-15", {exact: true})).toBeVisible();

  await expect(resume.getByText("Email", {exact: true})).toBeVisible();
  await expect(resume.getByText("beautifulfly@yandex.ru", {exact: true})).toBeVisible();

  await expect(resume.getByText("Интересы", {exact: true})).toBeVisible();
  await expect(resume.getByText("Хороший лидер", {exact: true})).toBeVisible();
  await expect(resume.getByText("Занимаюсь спортом", {exact: true})).toBeVisible();
  await expect(resume.getByText("Строительные практики", {exact: true})).toBeVisible();
  await expect(resume.getByText("Выпускал журналы", {exact: true})).toBeVisible();

  await expect(resume.getByText("Языки", {exact: true})).toBeVisible();
  await expect(resume.getByText("Английский", {exact: true})).toBeVisible();
  await expect(resume.getByText("С1", {exact: true})).toBeVisible();
  await expect(resume.getByText("Испанский", {exact: true})).toBeVisible();
  await expect(resume.getByText("B2", {exact: true})).toBeVisible();

  await expect(resume.getByText("В целом достаточно сильный разработчик, я бы даже сказал умный, вообще умен не по годам. Подниму ваш проект, удалю все легаси, и все коммиты будут маленькими по 15 строк кода.", {exact: true})).toBeVisible();

  await expect(resume.getByText("Опыт работы", {exact: true})).toBeVisible();
  await expect(resume.getByText("С++ разработчик", {exact: true})).toBeVisible();
  await expect(resume.getByText("сентябрь 2020 г. — наст. время", {exact: true}).nth(0)).toBeVisible();
  await expect(resume.getByText("ООО Рога и Копыта, Москва", {exact: true})).toBeVisible();
  await expect(resume.getByText("Писал компилятор под js, который позволял ускорить билд приложений.", {exact: true})).toBeVisible();

  await expect(resume.getByText("Angular разработчик", {exact: true})).toBeVisible();
  await expect(resume.getByText("февраль 2020 г. — август 2020 г.", {exact: true}).nth(0)).toBeVisible();
  await expect(resume.getByText("Тинькофф Центр Разработки, Ижевск", {exact: true})).toBeVisible();
  await expect(resume.getByText("Придумывал аналитические решения и разрабатывал веб-сайты для улучшения опыта пользователей.", {exact: true})).toBeVisible();

  await expect(resume.getByText("Образование и квалификация", {exact: true})).toBeVisible();
  await expect(resume.getByText("Магистратура", {exact: true})).toBeVisible();
  await expect(resume.getByText("сентябрь 2020 г. — наст. время", {exact: true}).nth(1)).toBeVisible();
  await expect(resume.getByText("ЦУ, Москва", {exact: true})).toBeVisible();
  await expect(resume.getByText("Дизайн и разработка ПО", {exact: true})).toBeVisible();

  await expect(resume.getByText("Бакалавриат", {exact: true})).toBeVisible();
  await expect(resume.getByText("февраль 2020 г. — август 2020 г.", {exact: true}).nth(1)).toBeVisible();
  await expect(resume.getByText("Уральский федеральный университет, Екатеринбург", {exact: true})).toBeVisible();
  await expect(resume.getByText("Направление: МОАИС.", {exact: true})).toBeVisible();

  await expect(resume.getByText("Курсы", {exact: true})).toBeVisible();
  await expect(resume.getByText("Разработка на C++", {exact: true})).toBeVisible();
  await expect(resume.getByText("январь 2019 г. — январь 2020 г.", {exact: true})).toBeVisible();
  await expect(resume.getByText("Образование для Всех", {exact: true})).toBeVisible();

  await expect(resume.getByText("Основы JavaScript, HTML, CSS", {exact: true})).toBeVisible();
  await expect(resume.getByText("февраль 2020 г. — август 2020 г.", {exact: true}).nth(2)).toBeVisible();
  await expect(resume.getByText("ЦУ", {exact: true})).toBeVisible();

  await expect(resume.getByText("Школа промышленной разработки", {exact: true})).toBeVisible();
  await expect(resume.getByText("январь 2021 г. — май 2021 г.", {exact: true})).toBeVisible();
  await expect(resume.getByText("Известная компания", {exact: true})).toBeVisible();
});

test("Генерация всего резюме (повышенная сложность) (score: 24)", async ({ page }) => {
  await page.goto("/");

  const nameInput = await page.getByTestId("personal-info").nth(0);
  await expect(nameInput).toBeVisible();
  await nameInput.fill('Данилов Дмитрий Евгеньевич');

  const input4 = await page.getByTestId("personal-info").nth(4);
  await expect(input4).toBeVisible();
  await input4.fill('beautifulfly@yandex.ru');

  const interestInput1 = await page.getByTestId("interest").nth(0);
  await expect(interestInput1).toBeVisible();
  await interestInput1.fill('Хороший лидер');

  const addInterest = await page.getByTestId("add-interest");
  await expect(addInterest).toBeVisible();
  await expect(addInterest).toBeEnabled();
  await addInterest.click();

  const interestInput2 = await page.getByTestId("interest").nth(1);
  await expect(interestInput2).toBeVisible();
  await interestInput2.fill('Занимаюсь спортом');

  await addInterest.click();

  const interestInput3 = await page.getByTestId("interest").nth(2);
  await expect(interestInput3).toBeVisible();
  await interestInput3.fill('Выпускал журналы');

  const removeInterest = await page.getByTestId("remove-interest");
  await expect(removeInterest).toBeVisible();

  await removeInterest.click();

  await addInterest.click();

  const interestInput4 = await page.getByTestId("interest").nth(2);
  await expect(interestInput4).toBeVisible();
  await interestInput4.fill('Запуск стартапов');

  const languageNameInput = await page.getByTestId("language-name").nth(0);
  await expect(languageNameInput).toBeVisible();
  await languageNameInput.fill('Английский');

  const addLanguage = await page.getByTestId("add-language");
  await expect(addLanguage).toBeVisible();
  await addLanguage.click();

  const languageLevelInput2 = await page.getByTestId("language-level").nth(1);
  await expect(languageLevelInput2).toBeVisible();
  await languageLevelInput2.fill('B2');

  await addLanguage.click();

  const languageNameInput3 = await page.getByTestId("language-name").nth(2);
  await expect(languageNameInput3).toBeVisible();
  await languageNameInput3.fill('Русский');

  const languageLevelInput3 = await page.getByTestId("language-level").nth(2);
  await expect(languageLevelInput3).toBeVisible();
  await languageLevelInput3.fill('Хороший');

  const removeLanguage = await page.getByTestId("remove-language");
  await expect(removeLanguage).toBeVisible();

  await removeLanguage.click();

  await addLanguage.click();

  const languageNameInput4 = await page.getByTestId("language-name").nth(2);
  await expect(languageNameInput4).toBeVisible();
  await languageNameInput4.fill('Русский');

  const languageLevelInput4 = await page.getByTestId("language-level").nth(2);
  await expect(languageLevelInput4).toBeVisible();
  await languageLevelInput4.fill('Родной');

  const personalDescriptionArea = await page.getByTestId("personal-description").nth(0);
  await expect(personalDescriptionArea).toBeVisible();
  await personalDescriptionArea.fill('Фронт, мое призвание, с карты Тинькофф платинум я купил 30 серверов и запустил 30 сайтов, которые я сверстал сам');

  const jobTitle = await page.getByTestId("job-title").nth(0);
  await expect(jobTitle).toBeVisible();
  await jobTitle.fill('Angular-разработчик');

  const jobDateStart = await page.getByTestId("job-date-start").nth(0);
  await expect(jobDateStart).toBeVisible();
  await jobDateStart.fill('2020-02-04');

  const jobDateEnd = await page.getByTestId("job-date-end").nth(0);
  await expect(jobDateEnd).toBeVisible();
  await jobDateEnd.fill('2020-08-02');

  const jobPlace = await page.getByTestId("job-place").nth(0);
  await expect(jobPlace).toBeVisible();
  await jobPlace.fill('Тинькофф Центр Разработки, Ижевск');

  const jobDescription = await page.getByTestId("job-description").nth(0);
  await expect(jobDescription).toBeVisible();
  await jobDescription.fill('Придумывал аналитические решения');

  const addJob = await page.getByTestId("add-job");
  await expect(addJob).toBeVisible();
  await addJob.click();

  const jobTitle1 = await page.getByTestId("job-title").nth(1);
  await expect(jobTitle1).toBeVisible();
  await jobTitle1.fill('С++-разработчик');

  const jobDateStart1 = await page.getByTestId("job-date-start").nth(1);
  await expect(jobDateStart1).toBeVisible();
  await jobDateStart1.fill('2020-09-02');

  const jobPlace1 = await page.getByTestId("job-place").nth(1);
  await expect(jobPlace1).toBeVisible();
  await jobPlace1.fill('ЦУ, Москва');

  const jobDescription1 = await page.getByTestId("job-description").nth(1);
  await expect(jobDescription1).toBeVisible();
  await jobDescription1.fill('Писал компилятор под js под названием Интегральный предел, переводил php в go');

  const removeJob = await page.getByTestId("remove-job");
  await expect(removeJob).toBeVisible();

  await removeJob.click();
  await addJob.click();

  const jobTitle2 = await page.getByTestId("job-title").nth(1);
  await expect(jobTitle2).toBeVisible();
  await jobTitle2.fill('Строитель 5 разряда');

  const jobDateStart2 = await page.getByTestId("job-date-start").nth(1);
  await expect(jobDateStart2).toBeVisible();
  await jobDateStart2.fill('2020-10-07');

  const jobDateEnd2 = await page.getByTestId("job-date-end").nth(1);
  await expect(jobDateEnd2).toBeVisible();
  await jobDateEnd2.fill('2020-12-09');

  const jobPlace2 = await page.getByTestId("job-place").nth(1);
  await expect(jobPlace2).toBeVisible();
  await jobPlace2.fill('Самарский завод, Самара');

  const jobDescription2 = await page.getByTestId("job-description").nth(1);
  await expect(jobDescription2).toBeVisible();
  await jobDescription2.fill('Проектировал стулья');

  await addJob.click();

  const jobTitle3 = await page.getByTestId("job-title").nth(2);
  await expect(jobTitle3).toBeVisible();
  await jobTitle3.fill('Пекарь');

  await addJob.click();

  const jobTitle4 = await page.getByTestId("job-title").nth(3);
  await expect(jobTitle4).toBeVisible();
  await jobTitle4.fill('Ювелир');

  await addJob.click();

  const jobDateStart5 = await page.getByTestId("job-date-start").nth(4);
  await expect(jobDateStart5).toBeVisible();
  await jobDateStart5.fill('2020-10-07');

  const jobDateEnd5 = await page.getByTestId("job-date-end").nth(4);
  await expect(jobDateEnd5).toBeVisible();
  await jobDateEnd5.fill('2020-12-09');

  const jobPlace5 = await page.getByTestId("job-place").nth(4);
  await expect(jobPlace5).toBeVisible();
  await jobPlace5.fill('Сысертский завод, Сысерть');

  const jobDescription5 = await page.getByTestId("job-description").nth(4);
  await expect(jobDescription5).toBeVisible();
  await jobDescription5.fill('Собирал станки');

  const educationTitle = await page.getByTestId("education-title").nth(0);
  await expect(educationTitle).toBeVisible();
  await educationTitle.fill('Бакалавриат');

  const educationDateStart = await page.getByTestId("education-date-start").nth(0);
  await expect(educationDateStart).toBeVisible();
  await educationDateStart.fill('2020-02-04');

  const educationDateEnd = await page.getByTestId("education-date-end").nth(0);
  await expect(educationDateEnd).toBeVisible();
  await educationDateEnd.fill('2020-08-02');

  const educationPlace = await page.getByTestId("education-place").nth(0);
  await expect(educationPlace).toBeVisible();
  await educationPlace.fill('РАНХиГС, Санкт-Петербург');

  const educationDescription = await page.getByTestId("education-description").nth(0);
  await expect(educationDescription).toBeVisible();
  await educationDescription.fill('Направление: ФИИТ.');

  const addeducation = await page.getByTestId("add-education");
  await expect(addeducation).toBeVisible();
  await addeducation.click();

  const educationTitle1 = await page.getByTestId("education-title").nth(1);
  await expect(educationTitle1).toBeVisible();
  await educationTitle1.fill('Магистратура');

  const educationDateStart1 = await page.getByTestId("education-date-start").nth(1);
  await expect(educationDateStart1).toBeVisible();
  await educationDateStart1.fill('2020-09-02');

  const educationPlace1 = await page.getByTestId("education-place").nth(1);
  await expect(educationPlace1).toBeVisible();
  await educationPlace1.fill('МФТИ, Москва');

  const educationDescription1 = await page.getByTestId("education-description").nth(1);
  await expect(educationDescription1).toBeVisible();
  await educationDescription1.fill('Физ-тех школа, Жуковский, Райгородский здесь, Саватеев вел теорию игр');

  const removeEducation = await page.getByTestId("remove-education");
  await expect(removeEducation).toBeVisible();

  await removeEducation.click();

  const courseTitle1 = await page.getByTestId("course-title").nth(0);
  await expect(courseTitle1).toBeVisible();
  await courseTitle1.fill('Разработка на C++');

  const addcourse = await page.getByTestId("add-course");
  await expect(addcourse).toBeVisible();
  await addcourse.click();

  const courseTitle = await page.getByTestId("course-title").nth(1);
  await expect(courseTitle).toBeVisible();
  await courseTitle.fill('Основы JavaScript, HTML, CSS');

  const courseDateStart = await page.getByTestId("course-date-start").nth(1);
  await expect(courseDateStart).toBeVisible();
  await courseDateStart.fill('2020-03-04');

  const courseDateEnd = await page.getByTestId("course-date-end").nth(1);
  await expect(courseDateEnd).toBeVisible();
  await courseDateEnd.fill('2020-09-02');

  const coursePlace = await page.getByTestId("course-place").nth(1);
  await expect(coursePlace).toBeVisible();
  await coursePlace.fill('ЦУ');


  await addcourse.click();

  const courseTitle2 = await page.getByTestId("course-title").nth(2);
  await expect(courseTitle2).toBeVisible();
  await courseTitle2.fill('Школа промышленной разработки');

  const removeCourse = await page.getByTestId("remove-course");
  await expect(removeCourse).toBeVisible();

  await removeCourse.click();

  const generateResumeButton = await page.getByTestId("generate-resume");
  await expect(generateResumeButton).toBeVisible();
  await expect(generateResumeButton).toBeEnabled();
  await generateResumeButton.click();
  await expect(generateResumeButton).toBeHidden();
  const backButton = await page.getByTestId('back-button');
  await expect(backButton).toBeVisible();

  const resume = await page.getByTestId('resume-main-content');

  await expect(resume).toBeVisible();

  await expect(resume.getByText("ФИО", {exact: true})).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).first()).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).last()).toBeVisible();
  await expect(resume.getByText("Личные данные", {exact: true})).toBeVisible();

  await expect(resume.getByText("Email", {exact: true})).toBeVisible();
  await expect(resume.getByText("beautifulfly@yandex.ru", {exact: true})).toBeVisible();

  await expect(resume.getByText("Интересы", {exact: true})).toBeVisible();
  await expect(resume.getByText("Хороший лидер", {exact: true})).toBeVisible();
  await expect(resume.getByText("Запуск стартапов", {exact: true})).toBeVisible();

  await expect(resume.getByText("Русский", {exact: true})).toBeVisible();
  await expect(resume.getByText("Родной", {exact: true})).toBeVisible();

  await expect(resume.getByText("Фронт, мое призвание, с карты Тинькофф платинум я купил 30 серверов и запустил 30 сайтов, которые я сверстал сам", {exact: true})).toBeVisible();

  await expect(resume.getByText("Опыт работы", {exact: true})).toBeVisible();
  await expect(resume.getByText("Строитель 5 разряда", {exact: true})).toBeVisible();
  await expect(resume.getByText("октябрь 2020 г. — декабрь 2020 г.", {exact: true}).nth(0)).toBeVisible();
  await expect(resume.getByText("Самарский завод, Самара", {exact: true})).toBeVisible();
  await expect(resume.getByText("Проектировал стулья", {exact: true})).toBeVisible();

  await expect(resume.getByText("Angular-разработчик", {exact: true})).toBeVisible();
  await expect(resume.getByText("февраль 2020 г. — август 2020 г.", {exact: true}).nth(0)).toBeVisible();
  await expect(resume.getByText("Тинькофф Центр Разработки, Ижевск", {exact: true})).toBeVisible();
  await expect(resume.getByText("Придумывал аналитические решения", {exact: true})).toBeVisible();

  await expect(resume.getByText("Пекарь", {exact: true})).toBeVisible();
  await expect(resume.getByText("Ювелир", {exact: true})).toBeVisible();

  await expect(resume.getByText("Образование и квалификация", {exact: true})).toBeVisible();

  await expect(resume.getByText("Бакалавриат", {exact: true})).toBeVisible();
  await expect(resume.getByText("февраль 2020 г. — август 2020 г.", {exact: true}).nth(1)).toBeVisible();
  await expect(resume.getByText("Направление: ФИИТ.", {exact: true})).toBeVisible();
  await expect(resume.getByText("Направление: ФИИТ.", {exact: true})).toBeVisible();

  await expect(resume.getByText("Курсы", {exact: true})).toBeVisible();
  await expect(resume.getByText("Разработка на C++", {exact: true})).toBeVisible();

  await expect(resume.getByText("Основы JavaScript, HTML, CSS", {exact: true})).toBeVisible();
  await expect(resume.getByText("март 2020 г. — сентябрь 2020 г.", {exact: true})).toBeVisible();
  await expect(resume.getByText("ЦУ", {exact: true})).toBeVisible();
});
