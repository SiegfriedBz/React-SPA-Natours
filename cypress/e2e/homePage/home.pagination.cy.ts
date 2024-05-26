/// <reference types="cypress" />
import '../../support/commands'

describe('Home - Pagination spec', () => {
  beforeEach(() => {
    // Stub the API on GET /?page=1 route
    cy.interceptGetAllToursForPage(1)
    // Stub the API on GET /?page=2 route
    cy.interceptGetAllToursForPage(2)
    // Stub the API on GET /?page=3 route
    cy.interceptGetAllToursForPage(3)

    // Intercept Stripe API
    cy.interceptStripe()
  })

  describe('Home page pagination', () => {
    it("query params should include 'page=1'", () => {
      // Visit the home page
      cy.visit('/')
      cy.wait(`@interceptGetAllToursForPage-1`)
      cy.wait(`@interceptGetAllToursForPage-2`)

      cy.location('search').should('contain', 'page=1')
    })

    it('prev page button should NOT be visible', () => {
      // Visit the home page
      cy.visit('/')
      cy.wait(`@interceptGetAllToursForPage-1`)
      cy.wait(`@interceptGetAllToursForPage-2`)

      cy.getDataCyEl('home-pagination')
        .find('[data-cy="prev-page-btn"]')
        .should('not.be.visible')
    })

    it('next page button should contain 2', () => {
      // Visit the home page
      cy.visit('/')
      cy.wait(`@interceptGetAllToursForPage-1`)
      cy.wait(`@interceptGetAllToursForPage-2`)

      cy.getDataCyEl('home-pagination').should('contain', 2)
    })
  })

  describe('When user clicks on next page button', () => {
    it("query params should include 'page=2'", () => {
      // Visit the home page
      cy.visit('/')
      cy.wait(`@interceptGetAllToursForPage-1`)
      cy.wait(`@interceptGetAllToursForPage-2`)
      cy.getDataCyEl('home-pagination').contains(2).click()

      cy.location('search').should('contain', 'page=2')
    })

    it('prev page button should exist', () => {
      // Visit the home page
      cy.visit('/')
      cy.wait(`@interceptGetAllToursForPage-1`)
      cy.wait(`@interceptGetAllToursForPage-2`)
      cy.getDataCyEl('home-pagination').contains(2).click()
      cy.location('search').should('contain', 'page=2')

      cy.wait(`@interceptGetAllToursForPage-3`)

      cy.getDataCyEl('home-pagination').should('contain', 1)
    })

    it('prev page button should contain 1', () => {
      // Visit the home page
      cy.visit('/')
      cy.wait(`@interceptGetAllToursForPage-1`)
      cy.wait(`@interceptGetAllToursForPage-2`)
      cy.getDataCyEl('home-pagination').contains(2).click()
      cy.location('search').should('contain', 'page=2')

      cy.wait(`@interceptGetAllToursForPage-3`)

      cy.getDataCyEl('home-pagination').should('contain', 1)
    })
  })

  describe('When user is on page 2', () => {
    describe('When user clicks on prev page button', () => {
      it("query params should include 'page=1'", () => {
        // Visit the home page
        cy.visit('/')
        cy.wait(`@interceptGetAllToursForPage-1`)
        cy.wait(`@interceptGetAllToursForPage-2`)
        cy.getDataCyEl('home-pagination').contains(2).click()
        cy.location('search').should('contain', 'page=2')

        cy.wait(`@interceptGetAllToursForPage-3`)

        cy.getDataCyEl('home-pagination').contains(1).click()
        cy.location('search').should('contain', 'page=1')
      })
    })
  })
})
