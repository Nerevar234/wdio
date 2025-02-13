import loginPage from '../pageobjects/login.page.js'
import inventoryPage from '../pageobjects/inventory.page.js'


describe('My Auth tests', () => {
    it('should login with valid credentials', async () => {
        await loginPage.open()

        await loginPage.login('standard_user', 'secret_sauce')
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')
        await expect(inventoryPage.shoppingCart).toBeDisplayed()
        await expect(inventoryPage.productsLabel).toBeDisplayed()
    })

    it('should not login with invalid password', async () => {
        await loginPage.open()
    
        await loginPage.login('standard_user', 'invalid_password')
        await expect(loginPage.errorMessage).toBeDisplayed()
        await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service')
    })
    
    it('should not login with invalid login', async () => {
        await loginPage.open()
    
        await loginPage.login('invalid_user', 'secret_sauce')
        await expect(loginPage.errorMessage).toBeDisplayed()
        await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service')
     })
    
    it('should logout', async () => {
        await inventoryPage.open()
    
        await inventoryPage.logout()
        await expect(browser).toHaveUrl("https://www.saucedemo.com/")
        await expect(loginPage.inputUsername).toBeDisplayed()
        await expect(loginPage.inputPassword).toBeDisplayed()
    
        await expect(loginPage.inputUsername).toHaveText('')
        await expect(loginPage.inputPassword).toHaveText('')
    })
})