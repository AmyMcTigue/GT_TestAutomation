// Smoke test 2: Navigation
import { test, expect } from "@playwright/test";
import "dotenv/config";

const userName = process.env.USER_NAME;
const rightPassword = process.env.RIGHT_PASSWORD;

test("Navigation - File", async ({ page }) => {
  // Log In to preprod
  await page.goto("http://gt-preprod:8081/MOD/UI/LOGIN?RelayState=");
  await page.getByLabel("User Name").fill(userName);
  await page.getByLabel("Password").fill(rightPassword);
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page).toHaveTitle("Gentrack Launch Pad - Ovo Energy - PREPROD");
  // Navigate to error events page and check the title
  await page.locator('[id="GenUI\\.MenuControl_3_input"]').click();
  await page.keyboard.insertText('Error');
  //Handler event is for keydown,keyup only. Search will not work without this.
  await page.keyboard.press('ArrowDown');
  await page.getByText("View Error Events").click();
  await expect(page).toHaveTitle("Error Events - Ovo Energy - PREPROD");
});


test('Navigation - Run IFM Process', async ({ page }) => {
  // Log in to preprod
  await page.goto("http://gt-preprod:8081/MOD/UI/LOGIN?RelayState=");
  await page.getByLabel("User Name").fill(userName);
  await page.getByLabel("Password").fill(rightPassword);
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveTitle("Gentrack Launch Pad - Ovo Energy - PREPROD");
  // Navigate to File Interface Manager
  await page.locator('[id="GenUI\\.MenuControl_3_input"]');
  await page.keyboard.insertText('File');
  //Handler event is for keydown,keyup only. Search will not work without this.
  await page.keyboard.press('ArrowDown');
  await page.getByText('File Interface Manager').click();
  await expect(page).toHaveTitle("Interface File Manager - Ovo Energy - PREPROD")
  // Run Load process
  await page.getByText('B1UKMKT|LOAD', { exact: true }).dblclick();
  await page.getByRole('button', { name: 'Next' }).click();
});
