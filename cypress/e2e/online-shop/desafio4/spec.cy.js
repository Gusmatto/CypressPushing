const directorioName = __dirname.replaceAll('\\', '/');
const module = directorioName.split(/[/]/)[2];
const scenarioName = directorioName.slice(directorioName.lastIndexOf('/') + 1).split('-').slice(0, -1).join('-');
const testCaseId = directorioName.split(/[-]/).pop();

import { ProductsPage  } from '../../../support/pages/products/productsPage';

describe(`${scenarioName} - ${module}`, () => {
    let productPage = new ProductsPage();

    before(() => {
        cy.login(Cypress.env().user, Cypress.env().pass);
        cy.visit('');
    });

    it('should be able to do a full operation', () => {
        cy.fixture('/online-shop/desafio4/data.json').then(data => {
            cy.deleteProduct(data.product1.id);
            cy.createProduct(data.product1);
            cy.deleteProduct(data.product2.id);
            cy.createProduct(data.product2);

            cy.visit('');
            cy.getDataCy(productPage.onlineShopLink).click();
            cy.getDataCy(productPage.searchType).select('id');
            cy.getDataCy(productPage.searchBar).type(data.product1.id).type('{enter}'); 
            cy.get('[data-cy="add-to-cart-7000787"]').click();
            cy.getDataCy(productPage.closeModal).click();
            cy.get('[data-cy="add-to-cart-7000787"]').click();
            cy.getDataCy(productPage.closeModal).click();
            cy.getDataCy(productPage.searchType).select('id');
            cy.getDataCy(productPage.searchBar).clear().type(data.product2.id).type('{enter}'); 
            cy.get('[data-cy="add-to-cart-8790434"]').click();
            cy.getDataCy(productPage.closeModal).click();
            cy.get('[data-cy="add-to-cart-8790434"]').click();
            cy.getDataCy(productPage.closeModal).click();
            cy.getDataCy(productPage.goShoppingCart).click();

            cy.verifyProductsData(1, {
                "productAmount": data.product1.quantity,
                "productName": data.product1.name,
                "unitPrice": data.product1.price,
                "totalPrice": data.product1.price * data.product1.quantity
            });
            
            cy.verifyProductsData(2, {
                "productAmount": data.product2.quantity,
                "productName": data.product2.name,
                "unitPrice": data.product2.price,
                "totalPrice": data.product2.price * data.product2.quantity
            });

            cy.contains('Show total price').click();
            cy.get('#price').invoke('text').then(parseFloat).should('be.equal', (data.product1.price * data.product1.quantity) + (data.product2.price * data.product2.quantity));
            cy.getDataCy(productPage.goBillingSummary).click();
            
        });       
    });
});