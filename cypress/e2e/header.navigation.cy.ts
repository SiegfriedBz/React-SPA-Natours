/// <reference types="cypress" />

describe('Header Navigation spec', () => {
  beforeEach(() => {
    const API_URL = Cypress.env('API_URL')
    // Intercept GET Tours request on home page after signup, as not the object of the current tests
    cy.intercept('GET', `${API_URL}/tours`, { status: 200 })
  })
  it('click on each nav-item should update the url correctly', () => {
    cy.visit('/')

    // Get ALL nav-items
    cy.get('[data-cy^="nav-item-"]').each(($navEl) => {
      // Get the value of the data-test attribute
      const dataTestAttrValue = $navEl.attr('data-cy')
      // Extract expected pathName
      const expectedPathName = dataTestAttrValue?.replace('nav-item-', '')

      // Click on navElement
      cy.wrap($navEl).click()

      // Check the url
      cy.location().its('pathname').should('contain', `/${expectedPathName}`)
    })
  })
})
