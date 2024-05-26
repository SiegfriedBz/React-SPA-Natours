/// <reference types="cypress" />
import '../support/commands'

const API_URL = Cypress.env('API_URL')

const As = 'User'

describe('Login spec', () => {
  beforeEach(() => {
    // Stub the API on GET /?page=1 route
    cy.interceptGetAllToursForPage(1)
    // Stub the API on GET /?page=2 route
    cy.interceptGetAllToursForPage(2)
    // Intercept Stripe API
    cy.interceptStripe()

    // Visit the login page
    cy.visit('/login')
  })

  describe('When the User fills the form correctly', () => {
    describe('When the server response is OK', () => {
      beforeEach(() => {
        // Stub the API on /sessions/login route
        cy.interceptPostLoginAs({ As })
      })

      it('should display a success message, navigate to home page, and display logout button', () => {
        // Assert login link visible
        cy.contains(/login/i).should('be.visible')

        // Fill form
        cy.fixture(`../fixtures/user/selected${As}.json`).then(
          (selectedUser) => {
            Object.entries(selectedUser)
              .filter(([field]) => field === 'email' || field === 'password')
              .forEach(([field, value]) => {
                cy.get(`[data-cy="form-login-input-${field}"]`).type(`${value}`)
              })
          }
        )

        // Submit form
        cy.get('[data-cy=form-login-btn]').click()

        // Wait for interceptor
        cy.wait(`@interceptPostLoginAs-${As}`)

        // Assert that the success message is displayed
        cy.contains('You logged in successfully!')

        // Assert login link not visible
        cy.contains(/login/i).should('not.exist')

        // Assert navigation to home page
        cy.location().its('pathname').should('eq', '/')
      })
    })

    describe('When the server response is NOT OK', () => {
      beforeEach(() => {
        // Set up interceptors
        cy.intercept('POST', `${API_URL}/sessions/login`, {
          status: 'error'
        }).as('interceptFailedLogin')
      })

      it('should display an error message and stays on login page', () => {
        // Assert login link visible
        cy.contains(/login/i).should('be.visible')

        // Fill form
        cy.fixture(`../fixtures/user/selected${As}.json`).then(
          (selectedUser) => {
            Object.entries(selectedUser)
              .filter(([field]) => field === 'email' || field === 'password')
              .forEach(([field, value]) => {
                cy.get(`[data-cy="form-login-input-${field}"]`).type(`${value}`)
              })
          }
        )

        // Submit form
        cy.get('[data-cy=form-login-btn]').click()

        // Wait for interceptors
        cy.wait('@interceptFailedLogin')

        // Assert that the error message is displayed
        cy.contains('Login went wrong')

        // Assert login link still visible
        cy.contains(/login/i).should('be.visible')

        // // Assert still on login page
        cy.location().its('pathname').should('eq', '/login')
      })
    })
  })

  describe('When the user does NOT fill the form correctly', () => {
    it('should display the correct error message', () => {
      // Assert login link visible & logout btn not visible
      cy.contains(/logout/i).should('not.exist')
      cy.contains(/login/i).should('be.visible')

      // Fill form with incomplete data
      cy.fixture(`../fixtures/user/selected${As}.json`).then((selectedUser) => {
        Object.entries(selectedUser)
          .filter(([field]) => field === 'password')
          .forEach(([field, value]) => {
            cy.get(`[data-cy="form-login-input-${field}"]`).type(`${value}`)
          })
      })

      // Submit form
      cy.get('[data-cy=form-login-btn]').click()

      // Assert that the error message is displayed
      cy.contains('Not a valid email').should('be.visible')

      // Assert login link visible & logout btn not visible
      cy.contains(/logout/i).should('not.exist')
      cy.contains(/login/i).should('be.visible')
    })
  })
})
