import loginPage from '../pageobjects/login.page.js'
import inventoryPage from '../pageobjects/inventory.page.js'
import cartPage from '../pageobjects/cart.page.js'


describe('My shopping cart', () => {
    it('should save its state after logout', async () => {
            await inventoryPage.addItemToCartByItemName('sauce-labs-backpack')
            await expect(inventoryPage.shoppingCartBadge).toHaveText("1")
    
            await inventoryPage.addItemToCartByItemName('sauce-labs-bolt-t-shirt')
            await expect(inventoryPage.shoppingCartBadge).toHaveText("2")
    
            await inventoryPage.addItemToCartByItemName('sauce-labs-onesie')
            await expect(inventoryPage.shoppingCartBadge).toHaveText("3")
    
            await inventoryPage.logout()
    
            await loginPage.login('standard_user', 'secret_sauce')
            await expect(inventoryPage.shoppingCartBadge).toHaveText("3")
    
            await inventoryPage.openShoppingCart()
    
            await cartPage.removeItemFromCartByItemName('sauce-labs-backpack')
            await cartPage.removeItemFromCartByItemName('sauce-labs-bolt-t-shirt')
            await cartPage.removeItemFromCartByItemName('sauce-labs-onesie')
    
        })
})