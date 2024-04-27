/// <reference types="cypress" />
import '../../support/commands'

const allStats = [
  {
    _id: 'difficult',
    avgRating: 4.5,
    avgPrice: 997,
    minPrice: 997,
    maxPrice: 997,
    totalRatingsCount: 6,
    totalToursCount: 1
  },
  {
    _id: 'easy',
    avgRating: 4.766666666666667,
    avgPrice: 1030.3333333333333,
    minPrice: 397,
    maxPrice: 1497,
    totalRatingsCount: 21,
    totalToursCount: 3
  },
  {
    _id: 'medium',
    avgRating: 4.75,
    avgPrice: 2247,
    minPrice: 1497,
    maxPrice: 2997,
    totalRatingsCount: 13,
    totalToursCount: 2
  }
]

describe('All Tours stats page spec', () => {
  const API_URL = Cypress.env('API_URL')

  describe('When the API sends a 200', () => {
    beforeEach(() => {
      cy.intercept('GET', `${API_URL}/tours/stats`, {
        status: 'success',
        data: {
          stats: allStats
        }
      }).as('interceptGetAllStats')
    })

    it('should display all stats', () => {
      cy.visit('/tours/stats')

      // Wait for interceptors
      cy.wait('@interceptGetAllStats')

      cy.getDataCyEl('stat-card').should('be.visible')
    })
  })
})
