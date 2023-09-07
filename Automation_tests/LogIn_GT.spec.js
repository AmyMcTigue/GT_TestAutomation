// Smoke test 1: Log in to GT 
import { test, expect } from "@playwright/test";
import 'dotenv/config';
 
const userName = process.env.USER_NAME;
const wrongPassword = process.env.WRONG_PASSWORD;
const rightPassword = process.env.RIGHT_PASSWORD;

test('GT Login Failure', async ({page}) => {
  await page.goto("http://gt-preprod:8081/MOD/UI/LOGIN?RelayState=");
  await page.getByLabel("User Name").fill(userName);
  await page.getByLabel("Password").fill(wrongPassword);
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page).toHaveTitle("Gentrack Velocity");
});

test('GT Login - Pass', async ({page}) => {
  await page.goto("http://gt-preprod:8081/MOD/UI/LOGIN?RelayState=");
  await page.getByLabel("User Name").fill(userName);
  await page.getByLabel("Password").fill(rightPassword);
  await page.getByRole("button", { name: "Login" }).click();
  await page.url('http://gt-preprod:8081/#');
  await expect(page).toHaveTitle("Gentrack Launch Pad - Ovo Energy - PREPROD");
});


