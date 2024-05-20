/// <reference types="cypress" />
import '../../support/commands'

describe('Home/AllTours page spec', () => {
  beforeEach(() => {
    // Stub the API on GET /?page=1 route
    cy.interceptGetAllToursForPage(1)
    // Stub the API on GET /?page=2 route
    cy.interceptGetAllToursForPage(2)

    // Intercept Stripe API
    cy.interceptStripe()

    cy.visit('/tours')
  })

  describe('When user visits "/tours"', () => {
    it('should navigate to root path', () => {
      cy.location('pathname').should('eq', '/')
    })
  })

  describe('When user visits "/"', () => {
    describe('Home page structure', () => {
      it('should display the hero section', () => {
        cy.getDataCyEl('home-hero').should('be.visible')
      })

      it('should display the tours cards section', () => {
        cy.getDataCyEl('home-all-tours-cards').should('exist')
      })

      it('should display pagination section', () => {
        cy.getDataCyEl('home-pagination').should('exist')
      })
    })
  })
})
