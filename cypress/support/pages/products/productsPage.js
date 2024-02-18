/// <reference types="Cypress" />

export const ProductsPage = {

    getProductsTitle() {
        return cy.contains('Products');
    },

    getCreateProductModal() {
        return cy.contains('Create Product');
    },

    getCloseModalButton() {
        return cy.get('[id="closeModal"]');
    },

    getProductDeleteMessage() {
        return cy.contains('Are you sure you want to delete Zapatillas Negras?');
    },

    getDeleteProductButton() {
        return cy.get('[id="saveEdit"]');
    }
}