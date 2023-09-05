// Smoke test 2: Navigation 
import { test, expect } from "@playwright/test";
import 'dotenv/config';
 
const userName = process.env.USER_NAME;
const rightPassword = process.env.RIGHT_PASSWORD;

test('Navigation - File', async ({page}) => {
    await page.goto("http://gt-preprod:8081/MOD/UI/LOGIN?RelayState=");
    await page.getByLabel("User Name").fill(userName);
    await page.getByLabel("Password").fill(rightPassword);
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page).toHaveTitle("Gentrack Launch Pad - Ovo Energy - PREPROD");
    await page.locator('[id="GenUI\\.MenuControl_3_input"]').fill("err");
    await page.waitForTimeout(1000); 
    await page.waitForSelector('text="View Error Events"');
    await page.click('text="View Error Events"');
    await expect(page).toHaveTitle("Error Events - Ovo Energy - PREPROD");
  })
  