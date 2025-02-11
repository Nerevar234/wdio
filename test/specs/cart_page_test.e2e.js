import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import InventoryPage from '../pageobjects/inventory.page.js'
import CartPage from '../pageobjects/cart.page.js'


describe('My shopping cart', () => {
    it('should save its state after logout', async () => {
            await InventoryPage.addItemToCartByItemName('sauce-labs-backpack')
            await expect(InventoryPage.shoppingCartBadge).toHaveText("1")
    
            await InventoryPage.addItemToCartByItemName('sauce-labs-bolt-t-shirt')
            await expect(InventoryPage.shoppingCartBadge).toHaveText("2")
    
            await InventoryPage.addItemToCartByItemName('sauce-labs-onesie')
            await expect(InventoryPage.shoppingCartBadge).toHaveText("3")
    
            await InventoryPage.logout()
    
            await LoginPage.login('standard_user', 'secret_sauce')
            await expect(InventoryPage.shoppingCartBadge).toHaveText("3")
    
            await InventoryPage.openShoppingCart()
    
            await CartPage.removeItemFromCartByItemName('sauce-labs-backpack')
            await CartPage.removeItemFromCartByItemName('sauce-labs-bolt-t-shirt')
            await CartPage.removeItemFromCartByItemName('sauce-labs-onesie')
    
        })
})