const directiorioName = __dirname.replaceAll('\\', '/');
const module = directiorioName.split(/[/]/)[2];
const scenarioName = directiorioName.slice(directiorioName.lastIndexOf('/') + 1).split('-').slice(0, -1).join('-');
const testCaseId = directiorioName.split(/[-]/).pop();

describe(`${scenarioName} - ${module}`, () => {
    before(() => {
        cy.login(Cypress.env().user, Cypress.env().pass);
        cy.visit('');
    });

    it('should be able to validate quantity, name, unitPrice and totalPrice in shopping cart', () => {
        cy.getDataCy('onlineshoplink').click();
        cy.getDataCy('name').eq(0).should('be.visible').invoke('text').as('firstProductName');
        cy.getDataCy('price').eq(0).invoke('text').as('firstProductPrice');

        cy.get('[data-cy*="add-to-cart-"]').eq(0).click();
        cy.getDataCy('closeModal').click();
        cy.get('[data-cy*="add-to-cart-"]').eq(0).click();
        cy.getDataCy('closeModal').click();

        cy.getDataCy('name').eq(1).should('be.visible').invoke('text').as('secondProductName');
        cy.getDataCy('price').eq(1).invoke('text').as('secondProductPrice');

        cy.get('[data-cy*="add-to-cart-"]').eq(1).click();
        cy.getDataCy('closeModal').click();

        cy.getDataCy('goShoppingCart').click();

        cy.getDataCy('productAmount').eq(0).invoke('text').then(quantity => {
            expect(quantity).to.be.equal("2");
        });

        cy.getDataCy('productName').eq(0).invoke('text').then(function(name) {
            expect(name).to.be.equal(this.firstProductName);
        });
        cy.getDataCy('unitPrice').eq(0).invoke('text').then(function(price) {
            expect(price).to.be.equal(`$${this.firstProductPrice}`);
        });

        cy.getDataCy('totalPrice').eq(0).invoke('text').then(function(price) {
            expect(price).to.be.equal(`$${2 * this.firstProductPrice}`);
        });

        cy.getDataCy('productAmount').eq(1).invoke('text').then(quantity => {
            expect(quantity).to.be.equal("1");
        });

        cy.getDataCy('productName').eq(1).invoke('text').then(function(name) {
            expect(name).to.be.equal(this.secondProductName);
        });

        cy.getDataCy('unitPrice').eq(1).invoke('text').then(function(price) {
            expect(price).to.be.equal(`$${this.secondProductPrice}`);
        });

        cy.getDataCy('totalPrice').eq(1).invoke('text').then(function(price) {
            expect(price).to.be.equal(`$${this.secondProductPrice}`);
        });
    });
});
