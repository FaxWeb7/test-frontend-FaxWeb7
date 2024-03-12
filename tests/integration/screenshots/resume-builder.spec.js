const {test, expect} = require('@playwright/test');
const {fillResume} = require('../utils/resume-builder-fill-resume');

test("Проверка блока Личных данных (скриншот) (score: 1)", async ({ page }) => {
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

  const element = await page.getByTestId('resume-main-section').nth(0);

  await expect(element).toHaveScreenshot(`resume-main-section-personal-info.png`);
});

test("Проверка вкладки Интересов (скриншот) (score: 1)", async ({ page }) => {
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

  const element = await page.getByTestId('resume-main-section').nth(1);

  await expect(element).toHaveScreenshot(`resume-main-section-interests.png`);
});

test("Генерация резюме с несколькими языками (скриншот) (score: 1)", async ({ page }) => {
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

  const element = await page.getByTestId('resume-main-section').nth(1);

  await expect(element).toHaveScreenshot(`resume-main-section-languages.png`);
});

test("Генерация основного описания (скриншот) (score: 1)", async ({ page }) => {
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

  const element = await page.getByTestId('resume-main-section').nth(1);

  await expect(element).toHaveScreenshot(`resume-main-section-personal-description.png`);
});

test("Генерация нескольких работ (скриншот) (score: 4)", async ({ page }) => {
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

  const addJob = await page.getByTestId("add-job");
  await expect(addJob).toBeVisible();
  await addJob.click();

  const jobTitle1 = await page.getByTestId("job-title").nth(1);
  await expect(jobTitle1).toBeVisible();
  await jobTitle1.fill('С++ разработчик');

  const jobDateStart1 = await page.getByTestId("job-date-start").nth(1);
  await expect(jobDateStart1).toBeVisible();
  await jobDateStart1.fill('2020-09-02');

  const jobPlace1 = await page.getByTestId("job-place").nth(1);
  await expect(jobPlace1).toBeVisible();
  await jobPlace1.fill('ООО Рога и Копыта, Москва');

  const jobDescription1 = await page.getByTestId("job-description").nth(1);
  await expect(jobDescription1).toBeVisible();
  await jobDescription1.fill('Писал компилятор под js, который позволял ускорить билд приложений.');

  await generateResumeButton.click();

  await expect(resume.getByText("ФИО", {exact: true})).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).first()).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).last()).toBeVisible();
  await expect(resume.getByText("Личные данные", {exact: true})).toBeVisible();

  await expect(resume.getByText("Опыт работы", {exact: true})).toBeVisible();
  await expect(resume.getByText("С++ разработчик", {exact: true})).toBeVisible();
  await expect(resume.getByText("сентябрь 2020 г. — наст. время", {exact: true})).toBeVisible();
  await expect(resume.getByText("ООО Рога и Копыта, Москва", {exact: true})).toBeVisible();
  await expect(resume.getByText("Писал компилятор под js, который позволял ускорить билд приложений.", {exact: true})).toBeVisible();

  await expect(resume.getByText("Angular разработчик", {exact: true})).toBeVisible();
  await expect(resume.getByText("февраль 2020 г. — август 2020 г.", {exact: true})).toBeVisible();
  await expect(resume.getByText("Тинькофф Центр Разработки, Ижевск", {exact: true})).toBeVisible();
  await expect(resume.getByText("Придумывал аналитические решения и разрабатывал веб-сайты для улучшения опыта пользователей.", {exact: true})).toBeVisible();

  const element = await page.getByTestId('resume-main-section').nth(2);

  await expect(element).toHaveScreenshot(`resume-main-section-jobs.png`);
});

test("Генерация нескольких образований (скриншот) (score: 2)", async ({ page }) => {
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
  await educationPlace1.fill('ЦУ, Москва');

  const educationDescription1 = await page.getByTestId("education-description").nth(1);
  await expect(educationDescription1).toBeVisible();
  await educationDescription1.fill('Дизайн и разработка ПО');

  await generateResumeButton.click();

  await expect(resume.getByText("ФИО", {exact: true})).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).first()).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).last()).toBeVisible();
  await expect(resume.getByText("Личные данные", {exact: true})).toBeVisible();

  await expect(resume.getByText("Образование и квалификация", {exact: true})).toBeVisible();
  await expect(resume.getByText("Магистратура", {exact: true})).toBeVisible();
  await expect(resume.getByText("сентябрь 2020 г. — наст. время", {exact: true})).toBeVisible();
  await expect(resume.getByText("ЦУ, Москва", {exact: true})).toBeVisible();
  await expect(resume.getByText("Дизайн и разработка ПО", {exact: true})).toBeVisible();

  await expect(resume.getByText("Бакалавриат", {exact: true})).toBeVisible();
  await expect(resume.getByText("февраль 2020 г. — август 2020 г.", {exact: true})).toBeVisible();
  await expect(resume.getByText("Уральский федеральный университет, Екатеринбург", {exact: true})).toBeVisible();
  await expect(resume.getByText("Направление: МОАИС.", {exact: true})).toBeVisible();

  const element = await page.getByTestId('resume-main-section').nth(2);

  await expect(element).toHaveScreenshot(`resume-main-section-educations.png`);
});

test("Генерация нескольких курсов (скриншот) (score: 2)", async ({ page }) => {
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

  const addcourse = await page.getByTestId("add-course");
  await expect(addcourse).toBeVisible();
  await addcourse.click();

  const courseTitle1 = await page.getByTestId("course-title").nth(1);
  await expect(courseTitle1).toBeVisible();
  await courseTitle1.fill('Разработка на C++');

  const courseDateStart1 = await page.getByTestId("course-date-start").nth(1);
  await expect(courseDateStart1).toBeVisible();
  await courseDateStart1.fill('2019-01-02');

  const courseDateEnd1 = await page.getByTestId("course-date-end").nth(1);
  await expect(courseDateEnd1).toBeVisible();
  await courseDateEnd1.fill('2020-01-02');

  const coursePlace1 = await page.getByTestId("course-place").nth(1);
  await expect(coursePlace1).toBeVisible();
  await coursePlace1.fill('Образование для Всех');

  await addcourse.click();

  const courseTitle2 = await page.getByTestId("course-title").nth(2);
  await expect(courseTitle2).toBeVisible();
  await courseTitle2.fill('Школа промышленной разработки');

  const courseDateStart2 = await page.getByTestId("course-date-start").nth(2);
  await expect(courseDateStart2).toBeVisible();
  await courseDateStart2.fill('2021-01-02');

  const courseDateEnd2 = await page.getByTestId("course-date-end").nth(2);
  await expect(courseDateEnd2).toBeVisible();
  await courseDateEnd2.fill('2021-05-02');

  const coursePlace2 = await page.getByTestId("course-place").nth(2);
  await expect(coursePlace2).toBeVisible();
  await coursePlace2.fill('Известная компания');

  await generateResumeButton.click();

  await expect(resume.getByText("ФИО", {exact: true})).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).first()).toBeVisible();
  await expect(resume.getByText("Данилов Дмитрий Евгеньевич", {exact: true}).last()).toBeVisible();
  await expect(resume.getByText("Личные данные", {exact: true})).toBeVisible();

  await expect(resume.getByText("Курсы", {exact: true})).toBeVisible();
  await expect(resume.getByText("Разработка на C++", {exact: true})).toBeVisible();
  await expect(resume.getByText("январь 2019 г. — январь 2020 г.", {exact: true})).toBeVisible();
  await expect(resume.getByText("Образование для Всех", {exact: true})).toBeVisible();

  await expect(resume.getByText("Основы JavaScript, HTML, CSS", {exact: true})).toBeVisible();
  await expect(resume.getByText("февраль 2020 г. — август 2020 г.", {exact: true})).toBeVisible();
  await expect(resume.getByText("ЦУ", {exact: true})).toBeVisible();

  await expect(resume.getByText("Школа промышленной разработки", {exact: true})).toBeVisible();
  await expect(resume.getByText("январь 2021 г. — май 2021 г.", {exact: true})).toBeVisible();
  await expect(resume.getByText("Известная компания", {exact: true})).toBeVisible();

  const element = await page.getByTestId('resume-main-section').nth(2);

  await expect(element).toHaveScreenshot(`resume-main-section-courses.png`);
});

test("Генерация всего резюме (скриншот) (score: 2)", async ({ page }) => {
  await fillResume(page);

  const resume = await page.getByTestId('resume-main-content');
  await expect(resume).toBeVisible();

  await expect(resume).toHaveScreenshot(`resume-main-content-full.png`);
});
