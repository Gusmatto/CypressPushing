/// <reference types="Cypress" />

export const LoginPage = {
    getLoginToggle() {
        return cy.get('[data-cy="registertoggle"]');
    },

    getUserInputField() {
        return cy.get('[data-cy="user"]')
    },

    getPasswordInputField() {
        return cy.get('[data-cy="pass"]');
    },

    getLoginButton() {
        return cy.get('[data-cy="submitForm"]');
    }
}