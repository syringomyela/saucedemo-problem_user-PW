import { BasePage } from "../common/basePage";

class inventoryPage extends BasePage {
  constructor(page) {
    super(page);
  }

  getSortoutMenu() {
    return this.getByDataTest("product-sort-container");
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
    // const comparisonResults = [];
    // const sortingOptionValues = await this.sortoutOptionValues();
    // for (let i = 0; i < sortingOptionValues.length; i++) {
    //   const sortingOptionValue = sortingOptionValues[i];
    //   await this.getSortoutMenu().selectOption(sortingOptionValue);
    //   const actualItemsOrder =
    //     i < 2 ? await this.itemsNamesList() : await this.itemsPricesList();
    //   const expectedSortedValues = await this.expectedSorting();
    //   const expectedItemsOrder = expectedSortedValues[sortingOptionValue];
    //   comparisonResults[i] =
    //     JSON.stringify(actualItemsOrder) === JSON.stringify(expectedItemsOrder);
    // }
    // return comparisonResults;