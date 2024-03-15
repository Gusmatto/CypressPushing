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

    it('should be able to add products and buy them', () => {
        cy.fixture(`${module}/${scenarioName}-${testCaseId}/data`).then(data => {
            cy.deleteProduct(data.product1.id);
            cy.createProduct(data.product1);
            cy.deleteProduct(data.product2.id);
            cy.createProduct(data.product2);
            cy.visit('');
            cy.getDataCy(productPage.onlineShopLink).click();
            cy.getDataCy(productPage.searchType).select('id');
            cy.getDataCy(productPage.searchBar).type(data.product1.id).type('{enter}');
            cy.get('[data-cy="add-to-cart-7384346"]').click();
            cy.getDataCy(productPage.closeModal).click();
            cy.get('[data-cy="add-to-cart-7384346"]').click();
            cy.getDataCy(productPage.closeModal).click();

            cy.getDataCy(productPage.searchType).select('id');
            cy.getDataCy(productPage.searchBar).clear().type(data.product2.id).type('{enter}');
            cy.get('[data-cy="add-to-cart-78984636"]').click();
            cy.getDataCy(productPage.closeModal).click();
            cy.get('[data-cy="add-to-cart-78984636"]').click();
            cy.getDataCy(productPage.closeModal).click();
            cy.getDataCy(productPage.goShoppingCart).click();
            cy.getDataCy(productPage.goCheckout).click();

            cy.getDataCy(productPage.firstName).type(data.checkout.firstName);
            cy.getDataCy(productPage.lastName).type(data.checkout.lastName);
            cy.getDataCy(productPage.cardNumber).type(data.checkout.cardNumber);
            cy.getDataCy(productPage.purchase).click();
            cy.intercept('POST', '/api/purchase').as('purchase');
            cy.wait('@purchase').then((interception) => {
               const query = `SELECT * FROM public."purchaseProducts" LEFT JOIN public."sells" ON public."purchaseProducts".sell_id = sells.id where public."purchaseProducts".sell_id = ${interception.response.body.product.sellid};`
               cy.task("connectDB", query).then(result => {
                  expect(result[0].id).to.equal(interception.response.body.product.sellid);
                  cy.contains('Purchase has been completed successfully').should('be.visible');
               })  
            });
        });
    });
});