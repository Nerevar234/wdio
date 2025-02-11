import { browser, expect } from '@wdio/globals'
import InventoryPage from '../pageobjects/inventory.page.js'


describe('My inventory page', () => {
    it('should sort items correctly', async () => {
        let sortingTypes = ["Name (A to Z)", "Name (Z to A)", "Price (low to high)", "Price (high to low)"]
        for(let sortingType of sortingTypes) {
            await InventoryPage.sortBy(sortingType)
            if(sortingType.includes("Price")) {
                await expect(await InventoryPage.getItemsSortedBy(sortingType)).toEqual(await InventoryPage.getCurrentItemsPrices())
            }
            else {
            await expect(await InventoryPage.getItemsSortedBy(sortingType)).toEqual(await InventoryPage.getCurrentItemsNames())
            }
        }
    })

    it('should have valid social links', async () => {
        await InventoryPage.open()

        await InventoryPage.twitterLink.click()
        await browser.switchWindow('https://x.com/saucelabs?mx=2')
        await browser.switchWindow('https://www.saucedemo.com/inventory.html')

        await InventoryPage.facebookLink.click()
        await browser.switchWindow('https://www.facebook.com/saucelabs')
        await browser.switchWindow('https://www.saucedemo.com/inventory.html')

        await InventoryPage.linkedinLink.click()
        await browser.switchWindow('https://www.linkedin.com/company/sauce-labs/')
        await browser.switchWindow('https://www.saucedemo.com/inventory.html')
    })
})