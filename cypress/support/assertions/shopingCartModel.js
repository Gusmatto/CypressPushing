Cypress.Commands.add('verifyProductsData', (line, data) => {
    cy.get('.css-1bhbsny').eq(line).within(() => {
        Cypress._.forEach(data, (value, selector) => {
            cy.get(`[id='${selector}']`).should('include.text', value);
        })
    })
})

// .css-5drwi8

Cypress.Commands.add('verifyBillingSummary', (data) => {
    cy.get('.css-5drwi8').within(() => {
        Cypress._.forEach(data, (value, selector) => {
            cy.get(`[id='${selector}']`).should('include.text', value);
        })
    })
})