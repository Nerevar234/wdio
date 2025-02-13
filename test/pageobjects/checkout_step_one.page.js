import Page from './page.js';
import { faker } from '@faker-js/faker';

class CheckoutStepOnePage extends Page {
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

    async clickContinueButton () {
        await this.continueButton.click();
    }

    async enterCheckoutInfo () {
        await this.firstNameInput.setValue(faker.person.firstName());
        await this.lastNameInput.setValue(faker.person.lastName());
        await this.postalCodeInput.setValue(faker.location.zipCode());
    }

    open () {
        return super.open('checkout-step-one.html');
    }
}

export default new CheckoutStepOnePage();