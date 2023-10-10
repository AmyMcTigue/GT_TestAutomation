import {test, expect} from '@playwright/test'; 
import 'dotenv/config';

const userName = process.env.USER_NAME;
const rightPassword = process.env.RIGHT_PASSWORD;

// Declare test variables 
const testAcc = ''; 
const priceChangeDate = '';

 /*   test.beforeAll(async ({page}) => {
        //Log in to GT preprod
        await page.goto('http://gt-preprod:8081/MOD/UI/LOGIN?RelayState=');
        await page.getByLabel('User Name').fill(userName);
        await page.getByLabel('Password').fill(rightPassword);
        await page.getByRole('button', {name: 'Login'}).click();
        await page.url('http://gt-preprod:8081/#');
        await expect(page).toHaveTitle('Gentrack Launch Pad - Ovo Energy - PREPROD');
    });
*/

    test('TAR9102 - Run', async ({page}) => {
       
          //Log in to GT preprod
          await page.goto('http://gt-preprod:8081/MOD/UI/LOGIN?RelayState=');
          await page.getByLabel('User Name').fill(userName);
          await page.getByLabel('Password').fill(rightPassword);
          await page.getByRole('button', {name: 'Login'}).click();
          await page.url('http://gt-preprod:8081/#');
          await expect(page).toHaveTitle('Gentrack Launch Pad - Ovo Energy - PREPROD');

        // Go to Process Overview  
        await page.locator('[id="GenUI\\.MenuControl_3_input"]').click();
        await page.keyboard.insertText("process");
        // Handler event is for keydown,keyup only. Search will not work without this.
        await page.keyboard.press("ArrowDown");
        await page.getByText("Process Overview").click();
        await expect(page).toHaveTitle("Process Overview - Ovo Energy - PREPROD");
        //await page.getByRole('cell', { name: 'Process Code' }).locator('div').click();
        await page.getByText("TAR9102").click();
    });

