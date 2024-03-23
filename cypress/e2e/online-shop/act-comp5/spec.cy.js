const directorioName = __dirname.replaceAll('\\', '/');
const module = directorioName.split(/[/]/)[2]
const scenarioName = directorioName.slice(directorioName.lastIndexOf('/') + 1).split('-').slice(0, -1).join('-');
const testCaseId = directorioName.split(/[-]/).pop();

describe(`${scenarioName} - ${module} `, () => {
    before(() => {
        cy.login('pushingit', '123456!');
        cy.fixture(`${module}/${scenarioName}-${testCaseId}/data`).as('data')
        cy.visit('');
        cy.get('[data-cy="onlineshoplink"]').click();
        cy.get('[aria-label="Add to cart"]').should('be.visible')
    });

    it('Deberia permitir al usuario validar productos', function () {
        // this.data.productos.producto1.totalPrice = this.data.productos.producto1.quantity * this.data.productos.producto1.price

        // cy.get('[id="add-to-cart-1000"]').click()
        // cy.getByDataCy('closeModal').click()

        cy.get('[id="add-to-cart-1000"]').click()
        cy.getDataCy('closeModal').click()
        cy.getDataCy('goShoppingCart').click()
        cy.getDataCy('goBillingSummary').click()
        cy.getDataCy('goCheckout').click()
        cy.getDataCy('firstName').type("Narciso")
        cy.getDataCy('lastName').type("Laprida")
        cy.getDataCy('cardNumber').type("1234512345123451")
        cy.getDataCy('purchase').click()
        cy.getDataCy('thankYou').should('be.visible')
        //Crear un custom command para verificar nombre y apellido, producto y cantidad, tarjeta y precio total
        //
        cy.verifyPurchase({
            'name': 'Narciso Laprida',
            'Buzo Negro': '1 x Buzo Negro',
            'creditCard': '1234512345123451',
            'totalPrice': '$23.76'
        })

    });
});