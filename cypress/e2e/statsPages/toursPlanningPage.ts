/// <reference types="cypress" />
import '../../support/commands'

const year = '2024'

describe('Stats - Tours Planning page spec', () => {
  describe('When Admin is logged in', () => {
    beforeEach(() => {
      // Stub the API on GET /?page=1 route
      cy.interceptGetAllToursForPage(1)
      // Stub the API on GET /?page=2 route
      cy.interceptGetAllToursForPage(2)

      // Intercept/Stub GET Tours Planning Stats
      cy.interceptGetToursPlanningStats(year)

      // Intercept Stripe API
      cy.interceptStripe()
    })

    describe("When Admin clicks on 'Tour Planning' link", () => {
      describe('When large screen is used', () => {
        beforeEach(() => {
          cy.setXlScreen()
          /** Stub Login As Admin */
          cy.stubLoginAs({ As: 'Admin' })
          // Wait for interceptor
          cy.wait(`@interceptPostLoginAs-Admin`)
        })
        it(`should display the default (${year}) monthly stats`, () => {
          cy.getDataCyEl('nav-item-planning').click()

          cy.getDataCyEl('planning-charts-wrapper').should('exist')
        })
      })

      describe('When mobile screen is used', () => {
        beforeEach(() => {
          cy.setXsScreen()
          /** Stub Login As Admin */
          cy.stubLoginAs({ As: 'Admin' })
          // Wait for interceptor
          cy.wait(`@interceptPostLoginAs-Admin`)
        })
        it(`should display the default (${year}) monthly stats`, () => {
          cy.openMenuModal()

          cy.getDataCyEl('nav-item-planning').click({
            force: true,
            multiple: true
          })

          cy.getDataCyEl('planning-charts-wrapper').should('exist')
        })
      })
    })
  })
})
