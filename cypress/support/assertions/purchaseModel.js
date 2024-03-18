Cypress.Commands.add('verifyPurchase', (line, info) => {
    cy.get('p').eq(line).within(($p) => {
        let innerText = $p.text();
        expect(innerText).to.include(info);
    });
});
      