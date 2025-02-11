import { $ } from '@wdio/globals'
import Page from './page.js';


class CheckoutStepOnePage extends Page {
    /**
     * define selectors using getter methods
     */

    get firstNameInput () {
        return $('input[data-test="firstName"]');
    }

    get lastNameInput () {
        return $('input[data-test="lastName"]');
    }

    get postalCodeInput () {
        return $('input[data-test="postalCode"]');
    }

    get continueButton () {
        return $('input[data-test="continue"]');
    }

    /**
     * a method to encapsulate automation code to interact with the page
     * e.g. to checkout
     */

    async enterCheckoutInfo (firstName, lastName, postalCode) {
        await this.firstNameInput.setValue(firstName);
        await this.lastNameInput.setValue(lastName);
        await this.postalCodeInput.setValue(postalCode);
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open('checkout-step-one.html');
    }
}

export default new CheckoutStepOnePage();