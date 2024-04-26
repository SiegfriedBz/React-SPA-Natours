/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      getDataCyEl: (selector: string) => Chainable<JQuery<HTMLElement>>
      stubLogin: () => Chainable<Element>
    }
  }
}

export {}

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('getDataCyEl', (selector) => {
  return cy.get(`[data-cy=${selector}]`)
})

Cypress.Commands.add('stubLogin', () => {
  const API_URL = Cypress.env('API_URL')

  // Set up interceptors
  cy.intercept('POST', `${API_URL}/sessions/login`, {
    // stubbed server response
    status: 200,
    data: {
      user: {
        _id: 'fake_id',
        name: 'Jane Doe',
        email: 'jane@cypress.io',
        role: 'user',
        isActive: true
      }
    }
  }).as('interceptLogin')

  // Set fixtures
  cy.fixture('../fixtures/auth/login/inputData.user.login.json').as(
    'userLoginInput'
  )

  // Visit Login page
  cy.visit('/login')

  // Fill form
  cy.get('@userLoginInput').then((inputData) => {
    Object.entries(inputData).forEach(([field, value]) => {
      cy.get(`[data-cy="form-login-input-${field}"]`).type(`${value}`)
    })
  })

  // Submit form
  cy.get('[data-cy=form-login-btn]').click()
})
