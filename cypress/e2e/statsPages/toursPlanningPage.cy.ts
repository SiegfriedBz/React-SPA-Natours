/// <reference types="cypress" />
import '../../support/commands'

const year = '2024'

describe('Stats - Tours Planning page spec', () => {
  describe('When Admin is logged in', () => {
    const As = 'Admin'
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
          cy.stubLoginAs({ As })
          /** Stub Login As Admin */
          // Wait for interceptor
          // cy.wait(`@interceptPostLoginAs-${As}`)
        })
        it(`should display the default (${year}) monthly stats`, () => {
          cy.getDataCyEl('nav-item-planning').click()

          // Wait for interceptors
          cy.wait(`@interceptGetToursPlanningStats-${year}`)

          cy.getDataCyEl('planning-charts-wrapper').should('exist')
        })
      })

      describe('When mobile screen is used', () => {
        beforeEach(() => {
          cy.setXsScreen()
          cy.stubLoginAs({ As })
          /** Stub Login As Admin */
          // Wait for interceptor
          // cy.wait(`@interceptPostLoginAs-${As}`)
        })
        it(`should display the default (${year}) monthly stats`, () => {
          cy.openMenuModal()

          cy.getDataCyEl('nav-item-planning').click({
            force: true,
            multiple: true
          })

          // Wait for interceptors
          cy.wait(`@interceptGetToursPlanningStats-${year}`)

          cy.getDataCyEl('planning-charts-wrapper').should('exist')
        })
      })
    })
  })
})
