const directiorioName = __dirname.replaceAll('\\', '/');
const module = directiorioName.split(/[/]/)[2];
const scenarioName = directiorioName.slice(directiorioName.lastIndexOf('/') + 1).split('-').slice(0, -1).join('-');
const testCaseId = directiorioName.split(/[-]/).pop();

import { ProductsPage  } from '../../../support/pages/products/productsPage';

describe(`${scenarioName} - ${module}`, () => {
    let productPage = new ProductsPage();

    before(() => {
        cy.login(Cypress.env().user, Cypress.env().pass);
        cy.visit('');
    });

    it('should be able to create a product', () => {
        cy.fixture(`${module}/${scenarioName}-${testCaseId}/${testCaseId}`).then(data => {
            data.product = `${data.product}-{testCaseId}`;
            cy.getDataCy(productPage.onlineShopLink).click();

            // Create product
            cy.intercept('POST', 'api/create-product').as('createProduct');
            cy.contains(productPage.productsTitle).should('have.text', 'Products');
            cy.getDataCy(productPage.addProduct).click();
            cy.getDataCy(productPage.productName).type(data.productName);
            cy.getDataCy(productPage.productPrice).type(data.productPrice);
            cy.getDataCy(productPage.productCard).type(data.productImageUrl);
            cy.getDataCy(productPage.productId).type(data.productID);
            cy.getDataCy(productPage.createProduct).click();
            // cy.get(productPage.closeModalButton).click();

            // Search product
            cy.getDataCy('search-type').select('id');
            cy.getDataCy('search-bar').type(data.productID).type('{enter}');

            // Delete product created
            cy.getDataCy('delete-5678').click( {force: true} );
            cy.contains(productPage.productDeleteMessage).should('be.visible');
            cy.get(productPage.deleteButton).click();
            cy.contains(`${data.productName} has been deleted`).should('be.visible');
            cy.get(productPage.closeModalButton).click();
            cy.getDataCy('search-type').select('id');
            cy.getDataCy('search-bar').clear().type(data.productID).type('{enter}');
            cy.get('p').contains('Zapatillas Negras').should('not.exist');
        });
    });
});