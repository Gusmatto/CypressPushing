
it('Deberia validar que el usuario ingresado se encuentra en el header', () => {
    cy.visit('https://pushing-it.vercel.app/')
    cy.get('#registertoggle').dblclick()
    cy.get('#user').type('pushingit').invoke('val').as('userName');
    cy.get('#pass').type('123456!')
    cy.get('#submitForm').click()
    cy.get('[id^="user_pushingit"]').invoke('text').then(function(text) {
        expect(text).to.include(this.userName);
    });
});