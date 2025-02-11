import { browser, expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import InventoryPage from '../pageobjects/inventory.page.js'


describe('My Auth tests', () => {
    it('should login with valid credentials', async () => {
        await LoginPage.open()

        await LoginPage.login('standard_user', 'secret_sauce')
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')
        await expect(InventoryPage.shoppingCart).toBeDisplayed()
        await expect(InventoryPage.productsLabel).toBeDisplayed()
    })

    it('should not login with invalid password', async () => {
        await LoginPage.open()
    
        await LoginPage.login('standard_user', 'invalid_password')
        await expect(LoginPage.errorMessage).toBeDisplayed()
        await expect(LoginPage.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service')
    })
    
    it('should not login with invalid login', async () => {
        await LoginPage.open()
    
        await LoginPage.login('invalid_user', 'secret_sauce')
        await expect(LoginPage.errorMessage).toBeDisplayed()
        await expect(LoginPage.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service')
     })
    
    it('should logout', async () => {
        await InventoryPage.open()
    
        await InventoryPage.logout()
        await expect(browser).toHaveUrl("https://www.saucedemo.com/")
        await expect(LoginPage.inputUsername).toBeDisplayed()
        await expect(LoginPage.inputPassword).toBeDisplayed()
    
        await expect(LoginPage.inputUsername).toHaveText('')
        await expect(LoginPage.inputPassword).toHaveText('')
    })
})