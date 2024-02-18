// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
Cypress.Commands.add('getDataCy', (value) => {
    return cy.get(`[data-cy="${value}"]`);
  });

  Cypress.Commands.add('login', (username, password) => {
    cy.getDataCy('user').type(username);
    cy.getDataCy('pass').type(password);
    cy.getDataCy('submitForm').click();
  });
