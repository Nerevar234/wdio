import { browser, expect } from '@wdio/globals'
import CartPage from '../pageobjects/cart.page.js'
import InventoryPage from '../pageobjects/inventory.page.js'
import CheckoutStepOnePage from '../pageobjects/checkout_step_one.page.js'
import CheckoutStepTwoPage from '../pageobjects/checkout_step_two.page.js'
import CheckoutCompletePage from '../pageobjects/checkout_complete.page.js'

describe('My checkout', () => {
    it('should checkout', async () => {
        await InventoryPage.addItemToCartByItemName('sauce-labs-backpack')
        await InventoryPage.openShoppingCart()

        await CartPage.checkoutButton.click()

        await CheckoutStepOnePage.enterCheckoutInfo('John', 'Doe', '12345')
        await CheckoutStepOnePage.continueButton.click()

        await expect(CheckoutStepTwoPage.itemByName('Sauce Labs Backpack')).toBeDisplayed()
        await expect(await CheckoutStepTwoPage.getAllItemsPricesSum()).toEqual(await CheckoutStepTwoPage.getSubtotalPrice())
        await CheckoutStepTwoPage.finishButton.click()

        await CheckoutCompletePage.backHomeButton.click()
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')
    })

    it('should NOT checkout with empty cart', async () => {
        await InventoryPage.open()
        await InventoryPage.openShoppingCart()

        await CartPage.checkoutButton.click()

        await expect(browser).not.toHaveUrl('https://www.saucedemo.com/checkout-step-one.html')
    })
})