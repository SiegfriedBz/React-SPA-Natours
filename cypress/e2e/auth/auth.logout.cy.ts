/// <reference types="cypress" />
import '../../support/commands'

describe('Logout spec', () => {
  const API_URL = Cypress.env('API_URL')

  beforeEach(() => {
    /** 1. Login */
    cy.stubLogin()

    // Intercept GET Tours request on home page after signup, as not the object of the current tests
    cy.intercept('GET', `${API_URL}/tours`, { status: 'success' })
  })

  describe('When the user clicks logout button', () => {
    describe('When the server response is OK', () => {
      beforeEach(() => {
        /** 2. Set logout */
        // Set up interceptors
        cy.intercept('DELETE', `${API_URL}/sessions/logout`, {
          status: 'success'
        }).as('interceptLogout')
      })

      it('should display a success message, navigate to home page, and display login link', () => {
        // Click Logout button
        cy.getDataCyEl('logout-btn').click()

        // Wait for interceptors
        cy.wait('@interceptLogout')

        // Assert that the success message is displayed
        cy.contains('You logged out successfully')

        // Assert navigation to home page
        cy.location().its('pathname').should('eq', '/')

        // Assert login link visible & logout btn not visible
        cy.contains(/logout/i).should('not.exist')
        cy.contains(/login/i).should('be.visible')
      })
    })

    describe('When the server response is NOT OK', () => {
      beforeEach(() => {
        /** 2'. Set logout */
        // Set up interceptors
        cy.intercept('DELETE', `${API_URL}/sessions/logout`, {
          status: 'error'
        }).as('interceptLogoutWentWrong')
      })

      it('should display an error message, stay on the current page', () => {
        // Click Logout button
        cy.getDataCyEl('logout-btn').click()

        // Wait for interceptors
        cy.wait('@interceptLogoutWentWrong')

        // Assert that the success message is displayed
        cy.contains('Logout went wrong')

        // Assert login link not visible & logout btn visible
        cy.contains(/login/i).should('not.exist')
        cy.contains(/logout/i).should('be.visible')
      })
    })
  })
})
