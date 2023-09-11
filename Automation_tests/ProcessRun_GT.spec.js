import {test, expect} from '@playwright/test'; 
import 'dotenv/config';

const userName = process.env.USER_NAME;
const rightPassword = process.env.RIGHT_PASSWORD;

test.describe('All test. Login Group', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('http://gt-preprod:8081/MOD/UI/LOGIN?RelayState=');
        await page.getByLabel('User Name').fill(userName);
        await page.getByLabel('Password').fill(rightPassword);
        await page.getByRole('button', {name: 'Login'}).click();
        await page.url('http://gt-preprod:8081/#');
        await expect(page).toHaveTitle('Gentrack Launch Pad - Ovo Energy - PREPROD');
    });

    test('Turn on process schedules', async ({page}) => {
        await page.locator('[id="GenUI\\.MenuControl_3_input"]').click();
        await page.keyboard.insertText("process");
        //Handler event is for keydown,keyup only. Search will not work without this.
        await page.keyboard.press("ArrowDown");
        await page.getByText("Process Schedule Configuration").click();
        await expect(page).toHaveTitle("Process Schedule Configuration - Ovo Energy - PREPROD");
        await page.locator('xpath=//html/body/div[3]/div[3]/div/div[1]/div/div[2]/div/div/div[2]/div/table/tbody/tr[1]/td[1]/div/input').click();
        // TODO: Finish off test - add var to input schedule name etc 
    });

}); 