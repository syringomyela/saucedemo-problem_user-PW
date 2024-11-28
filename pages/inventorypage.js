import { BasePage } from "../common/basePage";
import { itemsData } from "../related_data/itemsinfo";

class inventoryPage extends BasePage {
  constructor(page) {
    super(page);
  }

  getSortoutMenu() {
    return this.getByDataTest("product-sort-container");
  }
    
  itemElementLocators (index) {
      const locator = this.page.locator(`.inventory_item:nth-child(${index + 1})`);
      return {
        nameLocator : locator.locator('.inventory_item_name'),
        descriptionLocator : locator.locator('.inventory_item_desc'),
        imageLocator : locator.locator('.inventory_item_img img'),
        buttonLocator : locator.locator('button.btn_inventory'),
        priceLocator : locator.locator('.inventory_item_price'),
      }
    }

    async getText(locator) {
      return await locator.innerText();
    }

    async getAttribute(locator,attribute){
      return await locator.getAttribute(attribute);
    }


    async getItemContent(index) {
      const locators = this.itemElementLocators(index);
      const buttonAttribute = await this.getAttribute(locators.buttonLocator, 'data-test');

      return {
        itemName : await this.getText(locators.nameLocator),
        description : await this.getText(locators.descriptionLocator),
        imageSource : await this.getAttribute(locators.imageLocator, 'src'),
        addToCartButton: buttonAttribute,
        removeButton : buttonAttribute.replace('add-to-cart','remove'),
        price : await this.getText(locators.priceLocator),
      };
    }

    async sortoutOptionValues() {
      return ["az", "za", "lohi", "hilo"];
    }

    async itemsNamesList() {
      return await this.page.$$eval(".inventory_item_name", (items) =>
        items.map((item) => item.innerText)
      );
    }
  
    async itemsPricesList() {
      return await this.page.$$eval(".inventory_item_price", (prices) =>
        prices.map((price) => parseFloat(price.innerText.replace("$", "")))
      );
    }

    async isItemsContentMatch() {
      const comparisonResults = [];
      for (let i = 0; i < Object.keys(itemsData).length; i++) {
        const actualContent = await this.getItemContent(i);
        console.log(actualContent);
        const formattedName = actualContent.itemName.toLowerCase().replace(/\s+/g, '-');
        const expectedContent = itemsData[formattedName];
        comparisonResults.push(JSON.stringify(actualContent) === JSON.stringify(expectedContent));
      }
      return comparisonResults;
    }

    async clickAllAddButtons() {
      const addButtons = await this.page.$$('[data-test*="add-to-cart"]'); //Omnissiah bless you, Sirgay
      for (let element in addButtons) {
          await addButtons[element].click();
      }
      const removeButtons = await this.page.$$('[data-test*="remove"]')
      return await removeButtons.length;
  }

    async expectedSorting() {
    const defaultItemsOrder = await this.itemsNamesList();
    const defaultPricesOrder = await this.itemsPricesList();
    return {
      az: [...defaultItemsOrder].sort(),
      za: [...defaultItemsOrder].sort().reverse(),
      lohi: [...defaultPricesOrder].sort((a, b) => a - b),
      hilo: [...defaultPricesOrder].sort((a, b) => b - a),
    };
    }

    async performSortings(sortOption) {

    await this.getSortoutMenu().selectOption(sortOption);
    const expectedSortedValues = await this.expectedSorting();
    const expectedItemsOrder = expectedSortedValues[sortOption];
    const actualItemsOrder = /a.*z|z.*a/i.test(sortOption) ? await this.itemsNamesList() : await this.itemsPricesList();
    return JSON.stringify(actualItemsOrder) === JSON.stringify(expectedItemsOrder);
    }
}

export { inventoryPage };