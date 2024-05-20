/// <reference types="cypress" />
import '../../support/commands'

describe('Home - Search spec', () => {
  beforeEach(() => {
    // Stub the API on GET /?page=1 route
    cy.interceptGetAllToursForPage(1)
    // Stub the API on GET /?page=2 route
    cy.interceptGetAllToursForPage(2)

    // Intercept Stripe API
    cy.interceptStripe()

    // Visit the home page
    cy.visit('/')
  })

  describe('When user visits home page', () => {
    it('should show HEADER search button', () => {
      cy.getDataCyEl('header-search-button').should('be.visible')
    })

    it('should show HERO search button', () => {
      cy.getDataCyEl('hero-search-button').should('be.visible')
    })

    it("should NOT show 'Get Distances' button", () => {
      cy.contains('Get Distances').should('not.exist')
    })

    it("should NOT show 'Filter Tours' button", () => {
      cy.contains('Filter Tours').should('not.exist')
    })

    it("should NOT show 'Tours Within' button", () => {
      cy.contains('Tours Within').should('not.exist')
    })
  })

  describe('When user clicks on HEADER search button', () => {
    it('should show search forms - open buttons', () => {
      cy.getDataCyEl('header-search-button').click()

      cy.contains('Get Distances').should('be.visible')
      cy.contains('Filter Tours').should('be.visible')
      cy.contains('Tours Within').should('be.visible')
    })
  })

  describe('When user clicks on HERO search button', () => {
    it('should show search forms - open buttons', () => {
      cy.getDataCyEl('hero-search-button').click()

      cy.contains('Get Distances').should('be.visible')
      cy.contains('Filter Tours').should('be.visible')
      cy.contains('Tours Within').should('be.visible')
    })
  })

  describe('When user clicks on (Search Forms) Open buttons', () => {
    beforeEach(() => {
      // Display the 3 search forms - Open Buttons
      cy.getDataCyEl('header-search-button').click()
    })

    describe('When user clicks on Get Distances Form - Open button', () => {
      beforeEach(() => {
        cy.contains('Get Distances').click()
      })
      it('should show the modal window', () => {
        cy.getDataCyEl('modal-window').should('be.visible')
      })
      it('should show the modal close button', () => {
        cy.getDataCyEl('modal-close-button').should('be.visible')
      })
      it('should show Get Distances Form', () => {
        cy.getDataCyEl('distances-to-tours-form').should('be.visible')
      })
    })

    describe('When user clicks on Filter Tours Form - Open button', () => {
      beforeEach(() => {
        cy.contains('Filter Tours').click()
      })
      it('should show the modal window', () => {
        cy.getDataCyEl('modal-window').should('be.visible')
      })
      it('should show the modal close button', () => {
        cy.getDataCyEl('modal-close-button').should('be.visible')
      })
      it('should show Filter Tours Form', () => {
        cy.getDataCyEl('filter-tours-form').should('be.visible')
      })
    })

    describe('When user clicks on Tours Within Distance Form - Open button', () => {
      beforeEach(() => {
        cy.contains('Tours Within').click()
      })
      it('should show the modal window', () => {
        cy.getDataCyEl('modal-window').should('be.visible')
      })
      it('should show the modal close button', () => {
        cy.getDataCyEl('modal-close-button').should('be.visible')
      })
      it('should show Tours Within Distance Form', () => {
        cy.getDataCyEl('tours-within-distance-form').should('be.visible')
      })
    })
  })
})
