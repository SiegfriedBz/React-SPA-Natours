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

    // Visit the home page
    cy.visit('/')
  })

  describe('Home page pagination', () => {
    it("query params should include 'page=1'", () => {
      cy.location('search').should('include', 'page=1')
    })

    it('prev page button should NOT be visible', () => {
      cy.getDataCyEl('pagination')
        .find('[data-cy="prev-page-btn"]')
        .should('not.be.visible')
    })

    it('next page button should exist', () => {
      // cy.wait('@interceptGetAllToursForPage2')

      cy.getDataCyEl('pagination')
        .find('[data-cy="next-page-btn"]')
        .should('exist')
    })

    it('next page button should contain "2', () => {
      // cy.wait('@interceptGetAllToursForPage2')

      cy.getDataCyEl('pagination')
        .find('[data-cy="next-page-btn"]')
        .should('contain', '2')
    })
  })

  describe('When user clicks on next page button', () => {
    beforeEach(() => {
      cy.getDataCyEl('next-page-btn').click()
      cy.wait('@interceptGetAllToursForPage-2')
    })

    it("query params should include 'page=2'", () => {
      cy.location('search').should('include', 'page=2')
    })

    it('prev page button should exist', () => {
      cy.getDataCyEl('pagination')
        .find('[data-cy="prev-page-btn"]')
        .should('exist')
    })

    it('prev page button should contain "1"', () => {
      cy.getDataCyEl('pagination')
        .find('[data-cy="prev-page-btn"]')
        .should('contain', '1')
    })
  })

  describe('When user is on page 2', () => {
    beforeEach(() => {
      cy.getDataCyEl('next-page-btn').click()
      // Assert is on page 2
      cy.location('search').should('include', 'page=2')
    })
    describe('When user clicks on prev page button', () => {
      it("query params should include 'page=1'", () => {
        cy.getDataCyEl('prev-page-btn').click()

        cy.location('search').should('include', 'page=1')
      })
    })
  })
})
