const directiorioName = __dirname.replaceAll('\\', '/');
const module = directiorioName.split(/[/]/)[2];
const scenarioName = directiorioName.slice(directiorioName.lastIndexOf('/') + 1).split('-').slice(0, -1).join('-');
const testCaseId = directiorioName.split(/[-]/).pop();
import { ProductsPage  } from '../../../support/pages/products/productsPage';

describe(`${scenarioName} - ${module}`, () => {
    let productPage = new ProductsPage();

    beforeEach(() => {
        cy.login(Cypress.env().user, Cypress.env().pass);
        cy.visit('');
    });

    it('should be able to complete a full operation purchase', () => {
        cy.fixture(`${module}/${scenarioName}-${testCaseId}/data`).then(data => {
            cy.deleteProduct(data.product1.id);
            cy.createProduct(data.product1);
            cy.deleteProduct(data.product2.id);
            cy.createProduct(data.product2);

            cy.visit('');
            cy.getDataCy(productPage.onlineShopLink).click();
            cy.getDataCy(productPage.searchType).select('id');
            cy.getDataCy(productPage.searchBar).type(data.product1.id).type('{enter}'); 
            cy.getDataCy(productPage.product1).click();
            cy.getDataCy(productPage.closeModal).click();
            cy.getDataCy(productPage.product1).click();
            cy.getDataCy(productPage.closeModal).click();
            cy.getDataCy(productPage.searchType).select('id');
            cy.getDataCy(productPage.searchBar).clear().type(data.product2.id).type('{enter}'); 
            cy.getDataCy(productPage.product2).click();
            cy.getDataCy(productPage.closeModal).click();
            cy.getDataCy(productPage.product2).click();
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

            cy.verifyBillingSummary(0, {
                "subtotalAmount": data.billing.subtotal
            })

            cy.verifyBillingSummary(1, {
                "freightAmount": data.billing.freight
            })

            cy.verifyBillingSummary(2, {
                "totalPriceAmount": data.billing.totalPrice
            })

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
                   expect(result[0].firstName).to.equal(interception.response.body.product.firstName);
                   expect(result[0].lastName).to.equal(interception.response.body.product.lastName);
                   expect(result[0].product).to.equal(interception.response.body.product.products[0].product);
                   expect(result[1].product).to.equal(interception.response.body.product.products[1].product);
                })  
             });
        });       
    });
});