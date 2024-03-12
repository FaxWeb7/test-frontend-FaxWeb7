const { expect } = require("@playwright/test");

export async function fillResume(page) {
    await page.goto("/");

    const nameInput = await page.getByTestId("personal-info").nth(0);
    await expect(nameInput).toBeVisible();
    await nameInput.fill('Данилов Дмитрий Евгеньевич');

    const input1 = await page.getByTestId("personal-info").nth(1);
    await expect(input1).toBeVisible();
    await input1.fill('1986-05-05');

    const input2 = await page.getByTestId("personal-info").nth(2);
    await expect(input2).toBeVisible();
    await input2.fill('Ижевск');

    const input3 = await page.getByTestId("personal-info").nth(3);
    await expect(input3).toBeVisible();
    await input3.fill('+7 (234) 228 18-15');

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
    await interestInput3.fill('Строительные практики');

    await addInterest.click();

    const interestInput4 = await page.getByTestId("interest").nth(3);
    await expect(interestInput4).toBeVisible();
    await interestInput4.fill('Выпускал журналы');

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

    const personalDescriptionArea = await page.getByTestId("personal-description").nth(0);
    await expect(personalDescriptionArea).toBeVisible();
    await personalDescriptionArea.fill('В целом достаточно сильный разработчик, я бы даже сказал умный, вообще умен не по годам. Подниму ваш проект, удалю все легаси, и все коммиты будут маленькими по 15 строк кода.');

    const jobTitle = await page.getByTestId("job-title").nth(0);
    await expect(jobTitle).toBeVisible();
    await jobTitle.fill('Angular разработчик');

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
    await jobDescription.fill('Придумывал аналитические решения и разрабатывал веб-сайты для улучшения опыта пользователей.');

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
    await educationPlace.fill('Уральский федеральный университет, Екатеринбург');

    const educationDescription = await page.getByTestId("education-description").nth(0);
    await expect(educationDescription).toBeVisible();
    await educationDescription.fill('Направление: МОАИС.');

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

    const courseTitle = await page.getByTestId("course-title").nth(0);
    await expect(courseTitle).toBeVisible();
    await courseTitle.fill('Основы JavaScript, HTML, CSS');

    const courseDateStart = await page.getByTestId("course-date-start").nth(0);
    await expect(courseDateStart).toBeVisible();
    await courseDateStart.fill('2020-02-04');

    const courseDateEnd = await page.getByTestId("course-date-end").nth(0);
    await expect(courseDateEnd).toBeVisible();
    await courseDateEnd.fill('2020-08-02');

    const coursePlace = await page.getByTestId("course-place").nth(0);
    await expect(coursePlace).toBeVisible();
    await coursePlace.fill('ЦУ');

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

    const generateResumeButton = await page.getByTestId("generate-resume");
    await expect(generateResumeButton).toBeVisible();
    await expect(generateResumeButton).toBeEnabled();
    await generateResumeButton.click();
    await expect(generateResumeButton).toBeHidden();
    const backButton = await page.getByTestId('back-button');
    await expect(backButton).toBeVisible();
}
