import { $ } from '@wdio/globals'
import Page from './page.js';


class CheckoutCompletePage extends Page {
    /**
     * define selectors using getter methods
     */

    get backHomeButton () {
        return $('button[data-test="back-to-products"]');
    }

    /**
     * a method to encapsulate automation code to interact with the page
     * e.g. to checkout
     */

    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open('checkout-complete.html');
    }
}

export default new CheckoutCompletePage();