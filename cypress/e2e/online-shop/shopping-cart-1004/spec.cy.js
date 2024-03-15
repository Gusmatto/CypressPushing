const directiorioName = __dirname.replaceAll('\\', '/');
const module = directiorioName.split(/[/]/)[2];
const scenarioName = directiorioName.slice(directiorioName.lastIndexOf('/') + 1).split('-').slice(0, -1).join('-');
const testCaseId = directiorioName.split(/[-]/).pop();

import { ProductsPage } from "../../../support/pages/products/productsPage";

describe(`${scenarioName} - ${module}`, () => {
    let productPage = new ProductsPage();

    before(() => {
        cy.login(Cypress.env().user, Cypress.env().pass);
        cy.visit('');
    });

    it('should be able to validate quantity, name, unitPrice and totalPrice in shopping cart', () => {
        cy.getDataCy(productPage.onlineShopLink).click();
        cy.getDataCy(productPage.name).eq(0).should('be.visible').invoke('text').as('firstProductName');
        cy.getDataCy(productPage.price).eq(0).invoke('text').as('firstProductPrice');

        cy.get(productPage.addToCart).eq(0).click();
        cy.getDataCy(productPage.closeModal).click();
        cy.get(productPage.addToCart).eq(0).click();
        cy.getDataCy(productPage.closeModal).click();

        cy.getDataCy(productPage.name).eq(1).should('be.visible').invoke('text').as('secondProductName');
        cy.getDataCy(productPage.price).eq(1).invoke('text').as('secondProductPrice');

        cy.get(productPage.addToCart).eq(1).click();
        cy.getDataCy(productPage.closeModal).click();

        cy.getDataCy(productPage.goShoppingCart).click();

        cy.getDataCy(productPage.productAmount).eq(0).invoke('text').then(quantity => {
            expect(quantity).to.be.equal("2");
        });

        cy.getDataCy(productPage.productName).eq(0).invoke('text').then(function(name) {
            expect(name).to.be.equal(this.firstProductName);
        });
        cy.getDataCy(productPage.unitPrice).eq(0).invoke('text').then(function(price) {
            expect(price).to.be.equal(`$${this.firstProductPrice}`);
        });

        cy.getDataCy(productPage.totalPrice).eq(0).invoke('text').then(function(price) {
            expect(price).to.be.equal(`$${2 * this.firstProductPrice}`);
        });

        cy.getDataCy(productPage.productAmount).eq(1).invoke('text').then(quantity => {
            expect(quantity).to.be.equal("1");
        });

        cy.getDataCy(productPage.productName).eq(1).invoke('text').then(function(name) {
            expect(name).to.be.equal(this.secondProductName);
        });

        cy.getDataCy(productPage.unitPrice).eq(1).invoke('text').then(function(price) {
            expect(price).to.be.equal(`$${this.secondProductPrice}`);
        });

        cy.getDataCy(productPage.totalPrice).eq(1).invoke('text').then(function(price) {
            expect(price).to.be.equal(`$${this.secondProductPrice}`);
        });
    });
});
