/// <reference types="Cypress" />

export const ProductsPage = {

    getProductsTitle() {
        return cy.contains('Products');
    },

    getAddProductButton() {
        return cy.get('[data-cy="add-product"]');
    },

    getCreateProductModal() {
        return cy.contains('Create Product');
    },

    getProductNameInput() {
        return cy.get('[data-cy="productName"]');
    },

    getProductPriceInput() {
        return cy.get('[data-cy="productPrice');
    },

    getProductImageUrlInput() {
        return cy.get('[data-cy="productCard');
    },

    getProductIdInput() {
        return cy.get('[data-cy="productID');
    },

    getCreateProductButton() {
        return cy.get('[data-cy="createProduct');
    }
}