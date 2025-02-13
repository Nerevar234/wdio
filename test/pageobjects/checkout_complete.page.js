import Page from './page.js';


class CheckoutCompletePage extends Page {
    get backHomeButton () {
        return $('button[data-test="back-to-products"]');
    }

    async clickBackHomeButton () {
        await this.backHomeButton.click();
    }

    open () {
        return super.open('checkout-complete.html');
    }
}

export default new CheckoutCompletePage();