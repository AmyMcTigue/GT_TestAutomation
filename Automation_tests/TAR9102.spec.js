import {test, expect} from '@playwright/test'; 
import 'dotenv/config';

const userName = process.env.USER_NAME;
const rightPassword = process.env.RIGHT_PASSWORD;

// Declare test variables 
const testAccount = `2107842`; 
const streamFormat = (`"`+testAccount+`"`);
const streamDetails = `ISELECT CONSUMER WITH QCACCT = ${streamFormat}`;
 
test('TAR9102 - Run', async ({page}) => {
       
    //Log in to GT preprod
          await page.goto('http://gt-preprod:8081/MOD/UI/LOGIN?RelayState=');
          await page.getByLabel('User Name').fill(userName);
          await page.getByLabel('Password').fill(rightPassword);
          await page.getByRole('button', {name: 'Login'}).click();
          await page.url('http://gt-preprod:8081/#');
          await expect(page).toHaveTitle('Gentrack Launch Pad - Ovo Energy - PREPROD');

    // Design Process 
        await page.goto('http://gt-preprod:8081/#REPORTOVERVIEW.SCR??132367836/REPORT.SCR?REPORT=TAR9102?143887791'); 
        await expect(page).toHaveTitle("Process Configuration - Ovo Energy - PREPROD");
        await page.getByRole('link', { name: 'Maintain Process' }).click(); 
        await expect(page).toHaveTitle("Maintain Process - Ovo Energy - PREPROD");
        await page.locator('xpath=//html/body/div[3]/div[3]/div/div[1]/div[3]/div[2]/div[1]/div/table/tbody/tr[3]/td[1]/div/textarea').fill('');
        await page.locator('xpath=//html/body/div[3]/div[3]/div/div[1]/div[3]/div[2]/div[1]/div/table/tbody/tr[3]/td[1]/div/textarea').fill(streamDetails);
        await page.getByRole("button", { name: "Next" }).click();
        await page.waitForTimeout(3000); // waits for 3 seconds

    // Refresh Cache 
    
        // TODO: figure out why js function will not work here (possibly need to use page.evaluate??)
        // const refresh = function() {
        //     await page.goto('http://gt-preprod:8081/#REFRESH.WIZ??1146948'); 
        //     await expect(page).toHaveTitle("Refresh Programs and Parameters - Ovo Energy - PREPROD");
        //     await page.locator('xpath=//html/body/div[3]/div[3]/div/div[1]/div/div[2]/div[1]/div/table/tbody/tr[1]/td[2]/span[1]/div/input').click(); 
        //     await page.getByRole("button", { name: "Next" }).click();
        //     await page.waitForTimeout(3000); // waits for 3 seconds
        // };
        // refresh();    

        await page.goto('http://gt-preprod:8081/#REFRESH.WIZ??1146948'); 
        await expect(page).toHaveTitle("Refresh Programs and Parameters - Ovo Energy - PREPROD");
        await page.locator('xpath=//html/body/div[3]/div[3]/div/div[1]/div/div[2]/div[1]/div/table/tbody/tr[1]/td[2]/span[1]/div/input').click(); 
        await page.getByRole("button", { name: "Next" }).click();
        await page.waitForTimeout(3000); // waits for 3 seconds

    // Run Process 
        // await page.getByRole("button", { name: "Run" });
        await page.goto('http://gt-preprod:8081/#REPORTOVERVIEW.SCR??153921761/TAR9102.PROCESS?TAR9102=TAR9102%3ADEFAULT?153920552')
            await expect(page).toHaveTitle("Overdue Consumer Contract Report - Ovo Energy - PREPROD"); 
            await page.getByRole('link', { name: 'Run Process' }).click(); 
            await expect(page).toHaveTitle("Run Process - Ovo Energy - PREPROD");
            await page.getByRole("button", { name: "Next" }).click();
            await page.waitForTimeout(10000); // waits for 10 seconds
            await expect(page).toHaveTitle(" - Ovo Energy - PREPROD");

           
    // TODO: Split into two tests that should be run sequentally to reduce the testing time 
    // Go to Customer account 
        await page.goto('http://gt-preprod:8081/#')
        await page.locator("xpath=//html/body/div[3]/div[3]/div/div[1]/div[1]/div[2]/div[1]/div/table/tbody/tr[1]/td[1]/div/input").fill(testAccount);
        await page.getByRole("button", { name: "Next" }).click();
        // Xpath for first row in the search results - click to select
        await page.locator("xpath=//html/body/div[3]/div[3]/div/div[1]/div/div[2]/div[1]/div/div[4]/table/tbody/tr/td[1]/span").click(); // Click on the first row
        await page.keyboard.press("ArrowUp");
        await page.keyboard.press("Enter");
    });

