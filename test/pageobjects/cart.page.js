import { $ } from '@wdio/globals'
import Page from './page.js';


class CartPage extends Page {
    /**
     * define selectors using getter methods
     */

    get checkoutButton () {
        return $('button[data-test="checkout"]');
    }
    removeButtonByItemName (name) {
        return $(`button[data-test="remove-${name}"]`);
    }

    /**
     * a method to encapsulate automation code to interact with the page
     * e.g. to checkout
     */

    async removeItemFromCartByItemName (name) {
        await this.removeButtonByItemName(name).click();
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open('cart.html');
    }
}

export default new CartPage();