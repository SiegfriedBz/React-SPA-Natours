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
  })

  describe('When user visits "/tours"', () => {
    it('should navigate to root path', () => {
      cy.visit('/tours')

      cy.location('pathname').should('eq', '/')
    })
  })

  describe('When user visits "/"', () => {
    beforeEach(() => {
      cy.visit('/')
    })

    describe('Home page structure', () => {
      it('should display the hero section', () => {
        cy.getDataCyEl('home-hero').should('be.visible')
      })

      it('should display a list of tour cards', () => {
        cy.getDataCyEl('tour-card').should('exist')
      })

      it('should display pagination wrapper', () => {
        cy.getDataCyEl('pagination').should('exist')
      })
    })
  })
})
