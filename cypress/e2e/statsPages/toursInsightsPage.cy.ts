/// <reference types="cypress" />
import '../../support/commands'

describe('Stats - Tours Insights page spec', () => {
  beforeEach(() => {
    // Intercept/Stub GET Tours Planning Stats
    cy.interceptGetToursInsightsStats()

    cy.interceptStripe()
  })

  it('should display difficulty stats', () => {
    cy.visit('/tours/insights')

    // Wait for interceptors
    cy.wait('@interceptGetToursInsightsStats')

    cy.getDataCyEl('stats-by-difficulty-charts-wrapper').should('be.visible')
  })
})
