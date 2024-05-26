/// <reference types="cypress" />
import '../../support/commands'

const As = 'User'

describe('Navigate from All Tours (home) page to Tour Details page spec', () => {
  beforeEach(() => {
    // Stub the API on GET /?page=1 route
    cy.interceptGetAllToursForPage(1)
    // Stub the API on GET /?page=2 route
    cy.interceptGetAllToursForPage(2)
    // Intercept Mapbox API
    cy.interceptMapbox()
    // Intercept Stripe API
    cy.interceptStripe()

    // Intercept the API on /tours/:id route
    cy.interceptGetSelectedTour()
    // Intercept the API on /tours/:id/reviews route
    cy.interceptGetSelectedTourReviews()
  })

  describe('Home Page - When the user clicks on a tour card', () => {
    describe('When the user is NOT logged in', () => {
      beforeEach(() => {
        /** Visit the home page */
        cy.visit('/')
        /** Stub Home Page Click on SelectedTourCard */
        cy.stubHomeClickOnSelectedTourCard()
      })

      it('should navigate to the correct tour details page and display the correct CTA button', () => {
        cy.fixture('../fixtures/tour/selectedTour.json').then(
          (selectedTour) => {
            // Assert the URL
            cy.url().should('include', `/tours/${selectedTour?._id}`)

            // Assert the tour details page
            cy.getDataCyEl('tour-details-wrapper').should('be.visible')
            cy.contains(`${selectedTour.name}`)
          }
        )

        cy.getDataCyEl('tour-hero').should('be.visible')
        cy.getDataCyEl('tour-description').should('be.visible')
        cy.getDataCyEl('tour-images').should('be.visible')
        cy.getDataCyEl('tour-map').should('be.visible')
        cy.getDataCyEl('tour-reviews').should('be.visible')
        cy.getDataCyEl('tour-cta').should('be.visible')

        cy.getDataCyEl('tour-cta').should('contain', 'Log in to book tour')
      })
    })

    describe('When the user is logged in', () => {
      beforeEach(() => {
        /** Stub Login */
        cy.stubLoginAs({ As })
        // Wait for interceptor
        cy.wait(`@interceptPostLoginAs-${As}`)

        /** Stub Home Page Click on SelectedTourCard */
        cy.stubHomeClickOnSelectedTourCard()
      })

      it('should navigate to the correct tour details page and display the correct CTA button', () => {
        cy.fixture('../fixtures/tour/selectedTour.json').then(
          (selectedTour) => {
            // Assert the URL
            cy.url().should('include', `/tours/${selectedTour?._id}`)

            // Assert the tour details page
            cy.getDataCyEl('tour-details-wrapper').should('be.visible')
            cy.contains(`${selectedTour.name}`)
          }
        )

        cy.getDataCyEl('tour-hero').should('be.visible')
        cy.getDataCyEl('tour-description').should('be.visible')
        cy.getDataCyEl('tour-images').should('be.visible')
        cy.getDataCyEl('tour-map').should('be.visible')
        cy.getDataCyEl('tour-reviews').should('be.visible')
        cy.getDataCyEl('tour-cta').should('be.visible')

        cy.getDataCyEl('tour-cta').should('contain', 'Book tour now!')
      })
    })
  })
})
