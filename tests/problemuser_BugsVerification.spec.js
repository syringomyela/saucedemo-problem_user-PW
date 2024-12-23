import { test } from '../common/fixtures';
import { expect } from '../common/fixtures';



test('Login as problem_user, check descending sorting by price, verify items order', async({loginPage, inventoryPage}) => {
    const sortingResult = await inventoryPage.performSortings('hilo');
    expect(sortingResult).toBeTruthy();
})

test('Login as problem_user, verify items cards content on the inventory page', async({loginPage, inventoryPage}) => {
    const result = await inventoryPage.isItemsContentMatch();
    console.log('Result of comparison items content on the page, from first to last: ', result);
    const isItemsMatch = result.every(result => result === true);
    expect(isItemsMatch).toBeTruthy();
})

test('Login as problem_user, verify functionality for Add To Cart and Remove buttons for all elements on the inventory page', async({loginPage, inventoryPage}) => {
    const buttonsCount = await inventoryPage.clickAllAddButtons();
    expect(buttonsCount).toBe(6); 
})