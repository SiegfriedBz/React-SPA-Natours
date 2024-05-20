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
    describe('Home page structure', () => {
      it('should display the hero section', () => {
        cy.visit('/')
        cy.getDataCyEl('home-hero').should('be.visible')
      })

      it('should display the correct list of tour names', () => {
        cy.visit('/')
        cy.wait(`@interceptGetAllToursForPage-1`)
        cy.wait(`@interceptGetAllToursForPage-2`)

        cy.fixture('../fixtures/tour/tours.json').then((allTours) => {
          allTours.slice(0, 4).forEach((tour) => {
            cy.contains(tour.name).should('exist')
          })
        })
      })

      it('should display pagination wrapper', () => {
        cy.visit('/')

        cy.getDataCyEl('pagination').should('exist')
      })
    })
  })
})
