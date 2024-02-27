Cypress.Commands.add('deleteProduct', (id) => {
    cy.request({
        method: "GET",
        url: `${Cypress.env().baseUrlApi}/products?id=${id}`,
        failsOnStatusCode: false,
        headers: {
            Authorization: `Bearer ${Cypress.env().token}`
        }
    }).its('body.products.docs').each((product) => {
        cy.request({
            method: "DELETE",
            url: `${Cypress.env().baseUrlApi}/product/${product._id}`,
            headers: {
                Authorization: `Bearer ${Cypress.env().token}`
            }
        });
    });
});

Cypress.Commands.add('createProduct', (body) => {
    cy.request({
        method: "POST",
        url: `${Cypress.env().baseUrlApi}/create-product`,
        body: body,
    });
});
