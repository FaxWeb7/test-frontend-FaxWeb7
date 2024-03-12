const {expect} = require('@playwright/test');

export async function generateResume(page) {
  const generateResumeButton = await page.getByTestId('generate-resume');
  await expect(generateResumeButton).toBeVisible();
  await expect(generateResumeButton).toBeEnabled();
  await generateResumeButton.click();
}
