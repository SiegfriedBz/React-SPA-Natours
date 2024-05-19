/// <reference types="cypress" />
import '../../support/commands'

const API_URL = Cypress.env('API_URL')

const As = 'User'

describe('Logout spec', () => {
  describe('When the user clicks logout button', () => {
    beforeEach(() => {
      /** Stub Login */
      cy.stubLoginAs({ As })
      // Wait for interceptor
      cy.wait(`@interceptPostLoginAs-${As}`)

      // Stub the API on GET /?page=1 route
      cy.interceptGetAllToursForPage(1)
      // Stub the API on GET /?page=2 route
      cy.interceptGetAllToursForPage(2)

      // Intercept Stripe API
      cy.interceptStripe()
    })

    describe('When the server response is OK', () => {
      beforeEach(() => {
        /** Set success logout interceptor */
        cy.intercept('DELETE', `${API_URL}/sessions/logout`, {
          status: 'success'
        }).as('interceptSuccessLogout')
      })

      it('should display a success message, navigate to home page, and display login link', () => {
        // Click Logout button
        cy.getDataCyEl('logout-btn').click({ force: true })
        // Wait for interceptors
        cy.wait('@interceptSuccessLogout')

        // Assert navigation to home page
        cy.location().its('pathname').should('eq', '/')

        // Assert login link visible & logout btn not visible
        cy.contains(/logout/i).should('not.exist')
        cy.contains(/login/i).should('be.visible')
      })
    })

    describe('When the server response is NOT OK', () => {
      beforeEach(() => {
        /** Set failed logout interceptor */
        cy.intercept('DELETE', `${API_URL}/sessions/logout`, {
          status: 'error'
        }).as('interceptFailedLogout')
      })

      it('should display an error message, stay on the current page', () => {
        // Click Logout button
        cy.getDataCyEl('logout-btn').click({ force: true })

        // Wait for interceptors
        cy.wait('@interceptFailedLogout')

        // Assert that the success message is displayed
        cy.contains('Logout went wrong')

        // Assert login link not visible & logout btn visible
        cy.contains(/login/i).should('not.exist')
        cy.contains(/logout/i).should('be.visible')
      })
    })
  })
})
