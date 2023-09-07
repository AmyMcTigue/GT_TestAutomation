// Smoke test 2: Navigation
import { test, expect } from "@playwright/test";
import "dotenv/config";

const userName = process.env.USER_NAME;
const rightPassword = process.env.RIGHT_PASSWORD;

// Variables for customer search
const installtionIdentifer = "1023543607760";
const accountNumber = "8742471";
const consumerNumber = "10668442";

test.describe("All tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://gt-preprod:8081/MOD/UI/LOGIN?RelayState=");
    await page.getByLabel("User Name").fill(userName);
    await page.getByLabel("Password").fill(rightPassword);
    await page.getByRole("button", { name: "Login" }).click();
    await page.url('http://gt-preprod:8081/#');
    await expect(page).toHaveTitle("Gentrack Launch Pad - Ovo Energy - PREPROD");
  });

  test("Navigation - File", async ({ page }) => {
    // Navigate to error events page and check the title
    await page.locator('[id="GenUI\\.MenuControl_3_input"]').click();
    await page.keyboard.insertText("Error");
    //Handler event is for keydown,keyup only. Search will not work without this.
    await page.keyboard.press("ArrowDown");
    await page.getByText("View Error Events").click();
    await expect(page).toHaveTitle("Error Events - Ovo Energy - PREPROD");
  });

  test("Navigation - Run IFM Process", async ({ page }) => {
    // Navigate to File Interface Manager
    await page.locator('[id="GenUI\\.MenuControl_3_input"]');
    await page.keyboard.insertText("File");
    //Handler event is for keydown,keyup only. Search will not work without this.
    await page.keyboard.press("ArrowDown");
    await page.getByText("File Interface Manager").click();
    await expect(page).toHaveTitle("Interface File Manager - Ovo Energy - PREPROD");
    // Run Load process
    await page.getByText("B1UKMKT|LOAD", { exact: true }).dblclick();
    await page.getByRole("button", { name: "Next" }).click();
  });

  test.only("Navigation - Customer Search", async ({ page }) => {
    // Search with Account Number
    await page.getByText("Customer Search").click();
    await expect(page).toHaveTitle("Search for a Customer entity - Ovo Energy - PREPROD");
    await page.getByRole("button", { name: "Next" }).click();
    //the text fields are dynamic and difficult to identify o9n the DOM 😢 - 
    //need to figure out how to search where the numerical value is variable within the id
    await page.locator('id="GenUI\.PromptControl_3_prompts_0_body"').fill(accountNumber);
    await page.getByRole("button", { name: "Next" }).click();
  });
});



