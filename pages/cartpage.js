import { BasePage } from "../common/basePage";
import { pageElement } from "../common/commonElements";

class cartPage extends BasePage{
    constructor(page){
        this.page = page;
    }

    cartButtons(item) {
        return {
            checkoutButton : this.getByDataTest("checkout"),
            continueButton : this.getByDataTest("continue-shopping"),
        }
    }

    pressContinueButton() {
        return this.cartButtons.continueButton.click();
    }

    pressCheckoutButton(){
        return this.cartButtons.checkoutButton.click();
    }

}