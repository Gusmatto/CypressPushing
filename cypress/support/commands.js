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

import './requests/products'

Cypress.Commands.add('getDataCy', (selector) => {
    return cy.get(`[data-cy="${selector}"]`);
  });

  Cypress.Commands.add('login', (username, password) => {
    cy.request({
      method: "POST",
      url: `${Cypress.env().baseUrlApi}/login`,
      body: {
          username: username,
          password: password
      },
    }).then(response => {
        window.localStorage.setItem('token', response.body.token);
        window.localStorage.setItem('user', response.body.user.user);
        window.localStorage.setItem('userId', response.body.user._id);
        Cypress.env().token = response.body.token;
    });
  });
