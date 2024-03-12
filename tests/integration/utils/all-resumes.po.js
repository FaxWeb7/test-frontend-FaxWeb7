const {test} = require('@playwright/test');

export async function openByName(page, resumeName) {
  const resumeTitles = await page.getByTestId('resume-title');
  const count = await resumeTitles.count();

  // ищем резюме по названию, чтобы тест не падал, если участник не сделал правильную сортировку
  for (let i = 0; i < count; i++) {
    if (await resumeTitles.nth(i).textContent() === resumeName) {
      const actionButtons = await page.getByTestId('resume-actions').nth(i);
      await actionButtons.click();

      const openButton = await page.getByTestId('resume-actions__open');
      await openButton.click();
      return;
    }
  }

  // в списке нет такого резюме
  await test.fail();
}
