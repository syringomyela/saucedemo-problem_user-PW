import { test as baseTest, expect} from   '@playwright/test';
import { loginPage } from '../pages/loginpage';
import { inventoryPage } from '../pages/inventorypage';

    export const test = baseTest.extend({
        loginPage: async ({page}, use) =>{
            const enterPage = new loginPage(page);
            await enterPage.goto();
            await enterPage.fillCredentialsAndSubmit();
            await use(enterPage);
        },

        inventoryPage: async ({page}, use) =>{
            const invntoryPage = new inventoryPage(page);
            await use(invntoryPage)
        }

    });
    export { expect };