import { Page } from 'playwright';

class BasePage{
    constructor(page) {
        this.page = page; 
    }

    async goto() {
        await this.page.goto('/');
    }

  getElementBySelector(selector) {
    return this.page.locator(selector);
}

  getByDataTest(selector) {
  return this.page.locator(`[data-test="${selector}"]`)
}

  getElementByText (selector) {
    return this.page.getByText(selector)
}

  getElementByRole (selector) {
    return this.page.getByRole(selector);
}

  getElementByLabel (selector) {
    return this.page.getByLabel(selector);
} 

}

export { BasePage }