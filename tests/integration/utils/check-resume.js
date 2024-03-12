import {expect} from '@playwright/test';

export async function checkResume(page, resume) {
  await checkPersonalInfo(page, resume);
  await checkDescription(page, resume);
  await checkInterests(page, resume);
  await checkLanguages(page, resume);
  await checkJobs(page, resume);
  await checkEducations(page, resume);
  await checkCourses(page, resume);
}

async function checkPersonalInfo(page, resume) {
  await checkField(page, 'personal-info', resume.name, 0);
  await checkField(page, 'personal-info', resume.date, 1);
  await checkField(page, 'personal-info', resume.city, 2);
  await checkField(page, 'personal-info', resume.phone, 3);
  await checkField(page, 'personal-info', resume.email, 4);
}

async function checkDescription(page, resume) {
  await checkField(page, 'personal-description', resume.about);
}

async function checkInterests(page, resume) {
  const interests = resume.interests ? resume.interests : [''];

  const interestFields = await page.getByTestId('interest');
  await expect(interestFields).toHaveCount(interests.length);

  for (let i = 0; i < interests.length; i++) {
    await checkField(page, 'interest', interests[i], i);
  }
}

async function checkLanguages(page, resume) {
  const languages = resume.languages ? resume.languages : [{}];

  const languageNameFields = await page.getByTestId('language-name');
  await expect(languageNameFields).toHaveCount(languages.length);

  const languageLevelFields = await page.getByTestId('language-level');
  await expect(languageLevelFields).toHaveCount(languages.length);

  for (let i = 0; i < languages.length; i++) {
    await checkField(page, 'language-name', languages[i].language, i);
    await checkField(page, 'language-level', languages[i].level, i);
  }
}

async function checkJobs(page, resume) {
  const jobs = resume.job ? resume.job : [{}];

  const jobTitleFields = await page.getByTestId('job-title');
  await expect(jobTitleFields).toHaveCount(jobs.length);

  for (let i = 0; i < jobs.length; i++) {
    await checkField(page, 'job-title', jobs[i].title, i);
    await checkField(page, 'job-date-start', jobs[i].start, i);
    await checkField(page, 'job-date-end', jobs[i].end, i);
    await checkField(page, 'job-place', jobs[i].place, i);
    await checkField(page, 'job-description', jobs[i].description, i);
  }
}

async function checkEducations(page, resume) {
  const education = resume.education ? resume.education : [{}];

  const educationTitleFields = await page.getByTestId('education-title');
  await expect(educationTitleFields).toHaveCount(education.length);

  for (let i = 0; i < education.length; i++) {
    await checkField(page, 'education-title', education[i].title, i);
    await checkField(page, 'education-date-start', education[i].start, i);
    await checkField(page, 'education-date-end', education[i].end, i);
    await checkField(page, 'education-place', education[i].place, i);
    await checkField(page, 'education-description', education[i].description, i);
  }
}

async function checkCourses(page, resume) {
  const courses = resume.course ? resume.course : [{}];

  const coursesTitleFields = await page.getByTestId('course-title');
  await expect(coursesTitleFields).toHaveCount(courses.length);

  for (let i = 0; i < courses.length; i++) {
    await checkField(page, 'course-title', courses[i].title, i);
    await checkField(page, 'course-date-start', courses[i].start, i);
    await checkField(page, 'course-date-end', courses[i].end, i);
    await checkField(page, 'course-place', courses[i].place, i);
  }
}

async function checkField(page, testId, value = '', index = 0) {
  const input = await page.getByTestId(testId).nth(index);
  await expect(input).toBeVisible();
  await expect(input).toHaveValue(value);
}
