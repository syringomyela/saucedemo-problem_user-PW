import { BasePage } from "../common/basePage";
import { loginCreds } from "../related_data/login_credentials";

class loginPage extends BasePage {
    constructor(page) {
        super(page);
        //this.page = page;
    }

    elementsOnPage() {
        return {
            username : this.getByDataTest('username'),
            password : this.getByDataTest('password'),
            loginButton : this.getByDataTest('login-button'),
        }
    }
    async fillCredentialsAndSubmit() {
        await this.elementsOnPage().username.fill(loginCreds.name[0]);
        await this.elementsOnPage().password.fill(loginCreds.password);
        await this.elementsOnPage().loginButton.click();
    }
}

export {loginPage}