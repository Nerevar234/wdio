import { $ } from '@wdio/globals'
import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class InventoryPage extends Page {
    /**
     * define selectors using getter methods
     */
    get shoppingCart () {
        return $('a[data-test="shopping-cart-link"]');
    }

    get productsLabel () {
        return $('span[data-test="title"]');
    }

    get burgerButton () {
        return $('#react-burger-menu-btn');
    }

    get logoutLink () {
        return $('#logout_sidebar_link');
    }

    get shoppingCartBadge () {
        return $('span[data-test="shopping-cart-badge"]');
    }

    get sortingSelector () {
        return $('.product_sort_container');
    }

    get allItemsPrices () {
        return $$('div[data-test="inventory-item-price"]');
    }

    get allItemsNames () {
        return $$('div[data-test="inventory-item-name"]');
    }

    get twitterLink () {
        return $("a[data-test='social-twitter']");
    }

    get facebookLink () {
        return $("a[data-test='social-facebook']");
    }

    get linkedinLink () {
        return $("a[data-test='social-linkedin']");
    }

    addToCartButtonByItemName (name) {
        return $(`button[data-test="add-to-cart-${name}"]`);
    }

    removeButtonByItemName (name) {
        return $(`button[data-test="remove-${name}"]`);
    }

    async sortBy (name) {
        await this.sortingSelector.selectByVisibleText(name);
    }

    async addItemToCartByItemName (name) {
        await this.addToCartButtonByItemName(name).click();
    }

    async getCurrentItemsPrices () {
        let itemPrices = [];
        for (let item of await this.allItemsPrices) {
            let text = await item.getText();
            itemPrices.push(text);
            }
        return itemPrices;
    }

    async getCurrentItemsNames () {
        const itemNamesSelectors = await this.allItemsNames;
        let itemNames = [];
        for (let item of itemNamesSelectors) {
            let text = await item.getText();
            itemNames.push(text);
            }
        return itemNames;
    }

    async getItemsSortedBy (sortingType) {
        let itemPrices = [];
        let itemNames = [];

        if(sortingType === "Name (A to Z)" || sortingType === "Name (Z to A)") {
            itemNames = await this.getCurrentItemsNames();
        }
        else {
            itemPrices = await this.getCurrentItemsPrices();
        }
    
    switch(sortingType) {
        case "Name (A to Z)":
            return itemNames.sort();

        case "Name (Z to A)":
            return itemNames.sort().reverse();

        case "Price (low to high)":
            return itemPrices.sort((a,b) => parseFloat(a.replace("$","")) - parseFloat(b.replace("$","")));

        case "Price (high to low)":
            return itemPrices.sort((a,b) => parseFloat(b.replace("$","")) - parseFloat(a.replace("$","")));
        }
    }

    async removeItemFromCartByItemName (name) {
        await this.removeButtonByItemName(name).click();
    }

    async openShoppingCart () {
        await this.shoppingCart.click();
    }

    async logout () {
        await this.burgerButton.click();
        await this.logoutLink.click();
    }

    open () {
        return super.open('inventory.html');
    }
}

export default new InventoryPage();
