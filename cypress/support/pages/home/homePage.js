/// <reference types="Cypress" />

export const HomePage = {

    getWelcomeText() {
        return cy.get('.css-y5314g');
    },

    getOnlineShopLink() {
        return cy.get('[data-cy="onlineshoplink"]');
    },

}