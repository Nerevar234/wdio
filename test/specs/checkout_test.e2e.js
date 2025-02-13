import cartPage from '../pageobjects/cart.page.js'
import inventoryPage from '../pageobjects/inventory.page.js'
import checkoutStepOnePage from '../pageobjects/checkout_step_one.page.js'
import checkoutStepTwoPage from '../pageobjects/checkout_step_two.page.js'
import checkoutCompletePage from '../pageobjects/checkout_complete.page.js'

describe('My checkout', () => {
    it('should checkout', async () => {
        await inventoryPage.addItemToCartByItemName('sauce-labs-backpack')
        await inventoryPage.openShoppingCart()

        await cartPage.clickCheckoutButton()

        await checkoutStepOnePage.enterCheckoutInfo()
        await checkoutStepOnePage.clickContinueButton()

        await expect(checkoutStepTwoPage.itemByName('Sauce Labs Backpack')).toBeDisplayed()
        await expect(await checkoutStepTwoPage.getAllItemsPricesSum()).toEqual(await checkoutStepTwoPage.getSubtotalPrice())
        await checkoutStepTwoPage.clickFinishButton()

        await checkoutCompletePage.clickBackHomeButton()
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')
    })

    it('should NOT checkout with empty cart', async () => {
        await inventoryPage.open()
        await inventoryPage.openShoppingCart()

        await cartPage.clickCheckoutButton()

        await expect(browser).not.toHaveUrl('https://www.saucedemo.com/checkout-step-one.html')
    })
})