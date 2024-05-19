/// <reference types="cypress" />
import '../../support/commands'

describe('Stats - Tours Insights page spec', () => {
  beforeEach(() => {
    // Intercept/Stub GET Tours Planning Stats
    cy.interceptGetToursInsightsStats()

    cy.interceptStripe()
  })

  it('should display Tours Insights stats', () => {
    cy.visit('/tours/insights')

    // Wait for interceptors
    cy.wait('@interceptGetToursInsightsStats')

    cy.getDataCyEl('insights-charts-wrapper').should('exist')
  })
})
