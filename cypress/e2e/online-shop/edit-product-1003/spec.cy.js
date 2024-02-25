const directiorioName = __dirname.replaceAll('\\', '/');
const module = directiorioName.split(/[/]/)[2];
const scenarioName = directiorioName.slice(directiorioName.lastIndexOf('/') + 1).split('-').slice(0, -1).join('-');
const testCaseId = directiorioName.split(/[-]/).pop();
import { ProductsPage  } from '../../../support/pages/products/productsPage';

describe(`${scenarioName} - ${module}`, () => {
    before(() => {
        cy.login(Cypress.env().user, Cypress.env().pass);
        cy.visit('');
    });

    it('should be able to edit a product', () => {
        cy.fixture(`${module}/${scenarioName}-${testCaseId}/data`).then(data => {
            cy.deleteProduct(data.product.id);
            cy.createProduct(data.product);
            cy.getDataCy('onlineshoplink').click();
            cy.getDataCy('search-type').select('ID');
            cy.getDataCy('search-bar').type(`${data.product.id} {enter}`);
        });
    });
});