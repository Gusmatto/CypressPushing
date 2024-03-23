Cypress.Commands.add('verifyPurchase', (data) => {
    cy.get('.css-1tcqc9o').within(() => {
        Cypress._.forEach(data, (value, selector) => {
            cy.get(`[id='${selector}']`).should('include.text', value);
        })
    })
})