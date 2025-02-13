import inventoryPage from '../pageobjects/inventory.page.js'


describe('My inventory page', () => {
    it('should sort items correctly', async () => {
        let sortingTypes = ["Name (A to Z)", "Name (Z to A)", "Price (low to high)", "Price (high to low)"]
        for(let sortingType of sortingTypes) {
            await inventoryPage.sortBy(sortingType)
            if(sortingType.includes("Price")) {
                await expect(await inventoryPage.getItemsSortedBy(sortingType)).toEqual(await inventoryPage.getCurrentItemsPrices())
            }
            else {
            await expect(await inventoryPage.getItemsSortedBy(sortingType)).toEqual(await inventoryPage.getCurrentItemsNames())
            }
        }
    })

    it('should have valid social links', async () => {
        await inventoryPage.open()

        await inventoryPage.clickTwitterLink()
        await browser.switchWindow('https://x.com/saucelabs?mx=2')
        await browser.switchWindow('https://www.saucedemo.com/inventory.html')

        await inventoryPage.clickFacebookLink()
        await browser.switchWindow('https://www.facebook.com/saucelabs')
        await browser.switchWindow('https://www.saucedemo.com/inventory.html')

        await inventoryPage.clickLinkedinLink()
        await browser.switchWindow('https://www.linkedin.com/company/sauce-labs/')
        await browser.switchWindow('https://www.saucedemo.com/inventory.html')
    })
})