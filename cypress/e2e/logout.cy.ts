/// <reference types="cypress" />
import '../support/commands'

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

      describe('When the user is on a mobile device', () => {
        beforeEach(() => {
          cy.setXsScreen()
        })
        it('should display a success message, navigate to home page, and display login link', () => {
          // Open modal menu
          cy.getDataCyEl('burger-menu-button').click({ force: true })
          // Click on modal logout
          cy.getDataCyEl('mobile-nav')
            .contains('Logout')
            .click({ multiple: true })
          // Wait for interceptors
          cy.wait('@interceptSuccessLogout')

          // Assert navigation to home page
          cy.location().its('pathname').should('eq', '/')

          // Assert login link visible
          cy.contains(/login/i).should('be.visible')
        })
      })

      describe('When the user is on a tablet device', () => {
        beforeEach(() => {
          cy.setMdScreen()
        })
        it('should display a success message, navigate to home page, and display login link', () => {
          // Open modal menu
          cy.getDataCyEl('burger-menu-button').click({ force: true })
          // Click on modal logout
          cy.getDataCyEl('mobile-nav')
            .contains('Logout')
            .click({ multiple: true })
          // Wait for interceptors
          cy.wait('@interceptSuccessLogout')

          // Assert navigation to home page
          cy.location().its('pathname').should('eq', '/')

          // Assert login link visible
          cy.contains(/login/i).should('be.visible')
        })
      })

      describe('When the user is on a desktop device', () => {
        beforeEach(() => {
          cy.setXlScreen()
        })
        it('should display a success message, navigate to home page, and display login link', () => {
          // Click on header logout
          cy.contains(/logout/i).click({ force: true })
          // Wait for interceptors
          cy.wait('@interceptSuccessLogout')

          // Assert navigation to home page
          cy.location().its('pathname').should('eq', '/')

          // Assert login link visible
          cy.contains(/login/i).should('be.visible')
        })
      })
    })
  })
})
