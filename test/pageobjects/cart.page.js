import Page from './page.js';


class CartPage extends Page {
    get checkoutButton () {
        return $('button[data-test="checkout"]');
    }

    removeButtonByItemName (name) {
        return $(`button[data-test="remove-${name}"]`);
    }

    async removeItemFromCartByItemName (name) {
        await this.removeButtonByItemName(name).click();
    }

    async clickCheckoutButton () {
        await this.checkoutButton.click();
    }

    open () {
        return super.open('cart.html');
    }
}

export default new CartPage();