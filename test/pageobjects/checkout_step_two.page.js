import { $ } from '@wdio/globals'
import Page from './page.js';


class CheckoutStepTwoPage extends Page {
    /**
     * define selectors using getter methods
     */

    get finishButton () {
        return $('button[data-test="finish"]');
    }

    get subtotalSum () {
        return $('div[data-test="subtotal-label"]');
    }

    itemByName (name) {
        return $(`//div[@data-test="inventory-item-name" and text()="${name}"]`);
    }

    getAllItemsPrices () {
        return $$('div[data-test="inventory-item-price"]');
    }

    /**
     * a method to encapsulate automation code to interact with the page
     * e.g. to checkout
     */

    async getAllItemsPricesSum () {
        let itemPriceLocators = await this.getAllItemsPrices();
        let itemPrices = [];
        for (let item of itemPriceLocators) {
            let priceText = await item.getText();
            let price = parseFloat(priceText.replace('$', ''));
            itemPrices.push(price);
            }
        return itemPrices.reduce((acc, num) => acc + num, 0);
    }

    async getSubtotalPrice () {
        let subtotalPriceElement = this.subtotalSum;
        let priceText = await subtotalPriceElement.getText();
        return parseFloat(priceText.replace('Item total: $', ''));
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open('checkout-step-two.html');
    }
}

export default new CheckoutStepTwoPage();