//Interceptar la llamada que agrega una area al test y el response
// Completar la tarea. Validar el status response de la llamada que edita la tarea 

it('Actividad complementaria 3', () => {
    cy.intercept('DELETE', '/api/tasks?userId=**').as('deleteTask');
    cy.visit('https://pushing-it.vercel.app/')
    cy.get('#registertoggle').dblclick()
    cy.get('#user').type('pushingit')
    cy.get('#pass').type('123456!')
    cy.get('#submitForm').click()
    cy.get('[data-cy="todolistlink"]').click()
    cy.get('[data-cy="removeAll"]').should('be.visible').click();
    cy.wait('@deleteTask').its('response.statusCode').should('be.equal', 202);
    cy.get('[data-cy="task"]').type("Tarea {enter}")
    
    //interceptar el post que agrega la tarea
    cy.contains('p', 'Tarea', { timeout: 10000 }).should('be.visible').click();
    cy.contains('p', 'Tarea', { timeout: 10000 }).should('attr', 'style', 'text-decoration: line-through;')
    //interceptar el put/patch que edita la tarea
});