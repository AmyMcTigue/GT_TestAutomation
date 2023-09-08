// Smoke test 2: Navigation
import { test, expect } from "@playwright/test";
import "dotenv/config";

// .ENV variables for login 
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

  test("Navigation - Search Errors", async ({ page }) => {
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

  
  TODO:// Add before and after hooks for the test below 

  test("Navigation - Customer Account Search", async ({ page }) => {
    // Search with Account Number
    await page.getByText("Customer Search").click();
    await expect(page).toHaveTitle("Search for a Customer entity - Ovo Energy - PREPROD");
    await page.getByRole("button", { name: "Next" }).click();
    // Xpath for the account number search field 
    await page.locator('xpath=//html/body/div[3]/div[3]/div/div[1]/div[1]/div[2]/div[1]/div/table/tbody/tr[1]/td[1]/div/input').fill(accountNumber);
    await page.getByRole("button", { name: "Next" }).click();
    // Xpath for first row in the search results - click to select 
    await page.locator('xpath=//html/body/div[3]/div[3]/div/div[1]/div/div[2]/div[1]/div/div[4]/table/tbody/tr/td[1]/span').click(); // Click on the first row
    await page.keyboard.press("ArrowUp");
    await page.keyboard.press("Enter");
    // Assertion to confirm on the customer account page
    await expect(page.locator('xpath=//html/body/div[3]/div[3]/div/div[1]/div/div[1]/div/div[1]/span')).toHaveText('Customer Entities');
  });

  test.only('Navigation - Customer Search - Consumer Number', async ({ page }) => {
    // Search with Consumer Number
    await page.getByText("Customer Search").click();
    await expect(page).toHaveTitle("Search for a Customer entity - Ovo Energy - PREPROD");
    await page.getByRole("button", { name: "Next" }).click();
    // Xpath for the account number search field 
    await page.locator('xpath=//html/body/div[3]/div[3]/div/div[1]/div[3]/div[2]/div[1]/div/table/tbody/tr[1]/td[1]/div/input').fill(consumerNumber);
    await page.getByRole("button", { name: "Next" }).click();
    // Xpath for first row in the search results - click to select 
    await page.locator('xpath=//html/body/div[3]/div[3]/div/div[1]/div/div[2]/div[1]/div/div[4]/table/tbody/tr/td[1]/span').click(); // Click on the first row
    await page.keyboard.press("ArrowUp");
    await page.keyboard.press("Enter");
    // Assertion to confirm on the customer account page
    await expect(page.locator('xpath=//html/body/div[3]/div[3]/div/div[1]/div/div[1]/div/div[1]/span')).toHaveText('Customer Entities');
  }); 

  test('Navigation - Customer Search - Installation Identifier', async ({ page }) => {
    // Search with Identifer
    await page.getByText("Customer Search").click();
    await expect(page).toHaveTitle("Search for a Customer entity - Ovo Energy - PREPROD");
    await page.getByRole("button", { name: "Next" }).click();
    // Xpath for the account number search field 
    await page.locator('xpath=//html/body/div[3]/div[3]/div/div[1]/div[2]/div[2]/div[1]/div/table/tbody/tr[4]/td[1]/div/input').fill(installtionIdentifer);
    await page.getByRole("button", { name: "Next" }).click();
    // Xpath for first row in the search results - click to select 
    await page.locator('xpath=//html/body/div[3]/div[3]/div/div[1]/div/div[2]/div[1]/div/div[4]/table/tbody/tr/td[1]/span').click(); // Click on the first row
    await page.keyboard.press("ArrowUp");
    await page.keyboard.press("Enter");
    // Assertion to confirm on the customer account page
    await expect(page.locator('xpath=//html/body/div[3]/div[3]/div/div[1]/div/div[1]/div/div[1]/span')).toHaveText('Customer Entities');
  });
});


