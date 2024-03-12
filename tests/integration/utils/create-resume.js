const {expect} = require('@playwright/test');

export async function createResume(page, title, resume) {
  await page.goto('/');

  await fillPersonalInfo(page, resume);
  await fillDescription(page, resume);
  await fillInterests(page, resume);
  await fillLanguages(page, resume);
  await fillJobs(page, resume);
  await fillEducations(page, resume);
  await fillCourses(page, resume);

  if (title) {
    await fillTitle(page, title);
  }

  const generateResumeButton = await page.getByTestId('generate-resume');
  await expect(generateResumeButton).toBeVisible();
  await expect(generateResumeButton).toBeEnabled();
  await generateResumeButton.click();
  await expect(generateResumeButton).toBeHidden();
  const saveButton = await page.getByTestId('save-button');
  await expect(saveButton).toBeVisible();
  await saveButton.click();
}

export async function fillTitle(page, title) {
  const resumeInput = await page.getByTestId('resume-title-field');
  await expect(resumeInput).toBeVisible();
  await resumeInput.fill(title);
}

export async function fillPersonalInfo(page, resume) {
  await fillField(page, 'personal-info', resume.name, 0);
  await fillField(page, 'personal-info', resume.date, 1);
  await fillField(page, 'personal-info', resume.city, 2);
  await fillField(page, 'personal-info', resume.phone, 3);
  await fillField(page, 'personal-info', resume.email, 4);
}

async function fillDescription(page, resume) {
  await fillField(page, 'personal-description', resume.about);
}

async function fillInterests(page, resume) {
  if (!resume.interests?.length) {
    return;
  }

  const addInterestButton = await page.getByTestId('add-interest');

  for (let i = 0; i < resume.interests.length - 1; i++) {
    await addInterestButton.click();
  }

  for (let i = 0; i < resume.interests.length; i++) {
    await fillField(page, 'interest', resume.interests[i], i);
  }
}

async function fillLanguages(page, resume) {
  if (!resume.languages?.length) {
    return;
  }

  const addLanguageButton = await page.getByTestId('add-language');

  for (let i = 0; i < resume.languages.length - 1; i++) {
    await addLanguageButton.click();
  }

  for (let i = 0; i < resume.interests.length; i++) {
    await fillField(page, 'language-name', resume.languages[i].language, i);
    await fillField(page, 'language-level', resume.languages[i].level, i);
  }
}

async function fillJobs(page, resume) {
  if (!resume.job?.length) {
    return;
  }

  await fillField(page, 'job-title', resume.job[0].title);
  await fillField(page, 'job-date-start', resume.job[0].start);
  await fillField(page, 'job-date-end', resume.job[0].end);
  await fillField(page, 'job-place', resume.job[0].place);
  await fillField(page, 'job-description', resume.job[0].description);
}

async function fillEducations(page, resume) {
  if (!resume.education?.length) {
    return;
  }

  await fillField(page, 'education-title', resume.education[0].title);
  await fillField(page, 'education-date-start', resume.education[0].start);
  await fillField(page, 'education-date-end', resume.education[0].end);
  await fillField(page, 'education-place', resume.education[0].place);
  await fillField(page, 'education-description', resume.education[0].description);
}

async function fillCourses(page, resume) {
  if (!resume.course?.length) {
    return;
  }

  const addCourseButton = await page.getByTestId('add-course');

  for (let i = 0; i < resume.course.length - 1; i++) {
    await addCourseButton.click();
  }

  for (let i = 0; i < resume.course.length; i++) {
    await fillField(page, 'course-title', resume.course[i].title, i);
    await fillField(page, 'course-date-start', resume.course[i].start, i);
    await fillField(page, 'course-date-end', resume.course[i].end, i);
    await fillField(page, 'course-place', resume.course[i].place, i);
  }
}

async function fillField(page, testId, value, index = 0) {
  if (!value) {
    return;
  }

  const input = await page.getByTestId(testId).nth(index);
  await expect(input).toBeVisible();
  await input.fill(value);
}
