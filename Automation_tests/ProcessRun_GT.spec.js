import {test, expect} from '@playwright/test'; 
import 'dotenv/config';

const userName = process.env.USER_NAME;
const rightPassword = process.env.RIGHT_PASSWORD;

const processName = "MIS_BATCHLETTER"; 

    test.beforeEach(async ({page}) => {
        await page.goto('http://gt-preprod:8081/MOD/UI/LOGIN?RelayState=');
        await page.getByLabel('User Name').fill(userName);
        await page.getByLabel('Password').fill(rightPassword);
        await page.getByRole('button', {name: 'Login'}).click();
        await page.url('http://gt-preprod:8081/#');
        await expect(page).toHaveTitle('Gentrack Launch Pad - Ovo Energy - PREPROD');
    });

    test('Turn on/off process schedules', async ({page}) => {
        await page.locator('[id="GenUI\\.MenuControl_3_input"]').click();
        await page.keyboard.insertText("process");
        // Handler event is for keydown,keyup only. Search will not work without this.
        await page.keyboard.press("ArrowDown");
        await page.getByText("Process Schedule Configuration").click();
        await expect(page).toHaveTitle("Process Schedule Configuration - Ovo Energy - PREPROD");
        await page.locator('xpath=//html/body/div[3]/div[3]/div/div[1]/div/div[2]/div/div/div[2]/div/table/tbody/tr[1]/td[1]/div/input').click();
        await page.keyboard.insertText(processName); 
        await page.getByRole('button', {name: 'View grid'}).click(); 
        await page.getByText(processName).dblclick(); 
        await expect(page).toHaveTitle("Maintain Process Schedule - Ovo Energy - PREPROD"); 
        
        // TODO: If statement still not working as expected. Error - Timed out 5000ms waiting for expect(received).toBeVisible()
        // Call log:
        // - expect.toBeVisible with timeout 5000ms
        // - waiting for getByRole('cell', { name: 'Pause Flag' })  


        // To turn on process
        if (await expect(page.getByRole('cell', { name: 'Pause Flag' })).toBeVisible()) {
                // To turn on schedule use the below line
                await page.getByRole('link', { name: 'Schedule Run Status' }).click(); 
                await expect(page).toHaveTitle("Change Schedule Run Status - Ovo Energy - PREPROD"); 
                await page.locator('div').filter({ hasText: /^Reset schedule to run normally$/ }).click();
                await page.getByRole("button", { name: "Next" }).click();
                await expect(page).toHaveTitle("Maintain Process Schedule - Ovo Energy - PREPROD");
                } else if (await expect(page.getByRole('cell',{name:'Pause Flag'})).toBeHidden) {
                    console.log('Process Schedule already enabled');;
                    await expect(page).toHaveTitle("Maintain Process Schedule - Ovo Energy - PREPROD");
                    }   
        // // To turn off schedule use the below line
        // await page.getByText('Manually suspend schedule from running').click();
        // await page.getByRole("button", { name: "Next" }).click();
        // await expect(page).toHaveTitle("Maintain Process Schedule - Ovo Energy - PREPROD"); 
    });