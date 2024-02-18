const directiorioName = __dirname.replaceAll('\\', '/');
const module = directiorioName.split(/[/]/)[2];
const scenarioName = directiorioName.slice(directiorioName.lastIndexOf('/') + 1).split('-').slice(0, -1).join('-');
const testCaseId = directiorioName.split(/[-]/).pop();
import { LoginPage } from '../../../support/pages/login/loginPage';
import { HomePage  } from '../../../support/pages/home/homePage';
import { ProductsPage  } from '../../../support/pages/products/productsPage';

describe(`${scenarioName} - ${module}`, () => {

    it('should be able to create a product', () => {
        cy.fixture(`${module}/${scenarioName}-${testCaseId}/${testCaseId}`).then(data => {
            data.product = `${data.product}-{testCaseId}`;

            // Login 
            cy.visit(Cypress.config().baseUrl);
            cy.intercept('POST', 'api/login').as('loginRequest');
            cy.getDataCy('registertoggle').should('have.text', 'Iniciá sesión');
            cy.getDataCy('registertoggle').dblclick();
            cy.login(data.user, data.password);

            // Home
            cy.wait('@loginRequest', { timeout: 20000 });
            HomePage.getWelcomeText().should('contain', `Welcome ${data.user}`);
            cy.getDataCy('onlineshoplink').click();

            // Create product
            cy.intercept('POST', 'api/create-product').as('createProduct');
            ProductsPage.getProductsTitle().should('have.text', 'Products');
            cy.getDataCy('add-product').click();
            ProductsPage.getCreateProductModal().should('have.text', 'Create Product');
            cy.getDataCy('productName').type(data.productName);
            cy.getDataCy('productPrice').type(data.productPrice);
            cy.getDataCy('productCard').type(data.productImageUrl);
            cy.getDataCy('productID').type(data.productID);
            cy.getDataCy('createProduct').click();
            // cy.wait('@createProduct', { timeout: 25000 }).its('response.statusCode').should('be.equal', 201);
            ProductsPage.getCloseModalButton().click();

            // Search product
            cy.getDataCy('search-type').select('id');
            cy.getDataCy('search-bar').type(data.productID).type('{enter}');

            // Delete product created
            cy.getDataCy('delete-5678').click();
            ProductsPage.getProductDeleteMessage().should('be.visible');
            ProductsPage.getDeleteProductButton().click();
            cy.contains(`${data.productName} has been deleted`).should('be.visible');
            ProductsPage.getCloseModalButton().click();
            cy.getDataCy('search-type').select('id');
            cy.getDataCy('search-bar').clear().type(data.productID).type('{enter}');
            cy.get('p').contains('Zapatillas Negras').should('not.exist');
        });
    });
});