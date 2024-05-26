/// <reference types="cypress" />
import '../support/commands'

const API_URL = Cypress.env('API_URL')

const As = 'User'

describe('User Signup spec', () => {
  beforeEach(() => {
    // Stub the API on POST /users/signup route
    cy.interceptPostSignupAs({ As })
    // Stub the API on GET /?page=1 route
    cy.interceptGetAllToursForPage(1)
    // Stub the API on GET /?page=2 route
    cy.interceptGetAllToursForPage(2)
    // Intercept Stripe API
    cy.interceptStripe()

    // Visit Signup page
    cy.visit('/signup')
  })

  describe('When the user fills the form correctly', () => {
    describe('When the server response is OK', () => {
      it('should display a success message and navigate to home page', () => {
        // Fill form
        cy.fixture(`../fixtures/user/selected${As}.json`).then(
          (selectedUser) => {
            Object.entries(selectedUser)
              .filter(
                ([field]) =>
                  field === 'name' ||
                  field === 'email' ||
                  field === 'password' ||
                  field === 'passwordConfirmation'
              )
              .forEach(([field, value]) => {
                cy.get(`[data-cy="form-signup-input-${field}"]`).type(
                  `${value}`
                )
              })
          }
        )

        // Submit form
        cy.get('[data-cy=form-signup-btn]').click()

        // Wait for interceptors
        cy.wait(`@interceptPostSignupAs-${As}`)

        // Assert that the success message is displayed
        cy.contains('You signed up successfully!')

        // Assert navigation to home page
        cy.location().its('pathname').should('eq', '/')
      })
    })

    describe('When the server response is NOT OK', () => {
      beforeEach(() => {
        // Set up Failed SignUp interceptor
        cy.intercept('POST', `${API_URL}/users/signup`, {
          // stubbed server response
          status: 'fail'
        }).as('interceptFailedSignup')
      })

      it('should display an error message and stays on signup page', () => {
        // Fill form
        cy.fixture(`../fixtures/user/selected${As}.json`).then(
          (selectedUser) => {
            Object.entries(selectedUser)
              .filter(
                ([field]) =>
                  field === 'name' ||
                  field === 'email' ||
                  field === 'password' ||
                  field === 'passwordConfirmation'
              )
              .forEach(([field, value]) => {
                cy.get(`[data-cy="form-signup-input-${field}"]`).type(
                  `${value}`
                )
              })
          }
        )

        // Submit form
        cy.get('[data-cy=form-signup-btn]').click()

        // Wait for interceptors
        cy.wait('@interceptFailedSignup')

        // Assert that the error message is displayed
        cy.contains('Signup went wrong')

        // // Assert still on signup page
        cy.location().its('pathname').should('eq', '/signup')
      })
    })
  })

  describe('When the user does NOT fill the form correctly', () => {
    it('should display the correct error message', () => {
      // Fill form with incomplete data
      cy.fixture(`../fixtures/user/selected${As}.json`).then((selectedUser) => {
        Object.entries(selectedUser)
          .filter(
            ([field]) =>
              field === 'name' ||
              field === 'email' ||
              field === 'password' ||
              field === 'passwordConfirmation'
          )
          .forEach(([field, value]) => {
            if (field === 'email') {
              value = 'invalid-email'
            }
            cy.get(`[data-cy="form-signup-input-${field}"]`).type(`${value}`)
          })
      })

      // Submit form
      cy.get('[data-cy=form-signup-btn]').click()

      // Assert that the error message is displayed
      cy.contains('Not a valid email').should('be.visible')

      // // Assert still on signup page
      cy.location().its('pathname').should('eq', '/signup')
    })
  })
})
