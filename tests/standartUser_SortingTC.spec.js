// @ts-check
//const { test, expect } = require('@playwright/test');
import { test } from '../common/fixtures';
import { expect } from '../common/fixtures';

test('Positive scenario: login as standard_user, check descending sorting by price, verify items order', async({loginPage, inventoryPage}) => {
    const sortingResult = await inventoryPage.performSortings('hilo');
    expect(sortingResult).toBeTruthy();
})
