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
            LoginPage.getLoginToggle().should('have.text', 'Iniciá sesión');
            LoginPage.getLoginToggle().dblclick();
            LoginPage.getUserInputField().type(data.user);
            LoginPage.getPasswordInputField().type(data.password);
            LoginPage.getLoginButton().click();

            // Home
            HomePage.getWelcomeText().should('contain', `Welcome ${data.user}`);
            HomePage.getOnlineShopLink().click();

            // Products
            ProductsPage.getProductsTitle().should('have.text', 'Products');
            ProductsPage.getAddProductButton().click();
            ProductsPage.getCreateProductModal().should('have.text', 'Create Product');
            ProductsPage.getProductNameInput().type(data.productName);
            ProductsPage.getProductPriceInput().type(data.productPrice);
            ProductsPage.getProductImageUrlInput().type(data.productImageUrl);
            ProductsPage.getProductIdInput().type(data.productID);
            ProductsPage.getCreateProductButton().click();

            cy.log(`Create a product number ${testCaseId}`);
        });
    });
});