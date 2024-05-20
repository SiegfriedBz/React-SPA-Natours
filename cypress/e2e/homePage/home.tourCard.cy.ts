/// <reference types="cypress" />
import '../../support/commands'

describe('Home - TourCard Navigation spec', () => {
  beforeEach(() => {
    // Stub the API on GET /?page=1 route
    cy.interceptGetAllToursForPage(1)
    // Stub the API on GET /?page=2 route
    cy.interceptGetAllToursForPage(2)

    // Intercept Stripe API
    cy.interceptStripe()

    // Visit the home page
    cy.visit('/')
    cy.wait(`@interceptGetAllToursForPage-1`)
    cy.wait(`@interceptGetAllToursForPage-2`)
  })

  describe('When user clicks on a Tour Card', () => {
    beforeEach(() => {
      // Intercept the API on /tours/:id route
      cy.interceptGetSelectedTour()
      // Intercept the API on /tours/:id/reviews route
      cy.interceptGetSelectedTourReviews()
      // Intercept Mapbox API
      cy.interceptMapbox()
    })

    it('should navigate to the correct tour details page', () => {
      // Click on the the selected tour link
      cy.fixture('../fixtures/tour/selectedTour.json').then((selectedTour) => {
        cy.get(`a:contains(${selectedTour.name})`).should('exist')
        cy.get(`a:contains(${selectedTour.name})`).click({ force: true })
      })

      // Wait for the interceptors
      cy.wait('@interceptGetSelectedTour')
      cy.wait('@interceptGetSelectedTourReviews')

      // Assert the URL
      cy.fixture('../fixtures/tour/selectedTour.json').then((selectedTour) => {
        cy.location('pathname').should('contain', `/tours/${selectedTour._id}`)
      })
    })
  })
})
