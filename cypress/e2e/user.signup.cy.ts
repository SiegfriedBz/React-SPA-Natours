/// <reference types="cypress" />

describe('User Signup spec', () => {
  const API_URL = Cypress.env('API_URL')

  beforeEach(() => {
    // Intercept GET Tours request on home page after signup, as not the object of the current tests
    cy.intercept('GET', `${API_URL}/tours`, {
      statusCode: 200
    })

    // Set fixtures
    cy.fixture('../fixtures/user/inputData.user.signup.json').as(
      'userSignupInput'
    )

    // Visit Signup page
    cy.visit('/signup')
  })

  describe('When the user fills the form correctly', () => {
    describe('When the server response is OK', () => {
      beforeEach(() => {
        // Set up interceptors
        cy.intercept('POST', `${API_URL}/users/signup`, {
          // stubbed server response
          status: 'success',
          data: {
            user: {
              _id: 'fake_id',
              name: 'Jane Doe',
              email: 'jane@cypress.io',
              role: 'user',
              isActive: true
            }
          }
        }).as('interceptSignup')
      })

      it('should display a success message and navigate to home page', () => {
        // Fill form
        cy.get('@userSignupInput').then((inputData) => {
          Object.entries(inputData).forEach(([field, value]) => {
            cy.get(`[data-cy="form-signup-input-${field}"]`).type(`${value}`)
          })
        })

        // Submit form
        cy.get('[data-cy=form-signup-btn]').click()

        // Wait for interceptors
        cy.wait(['@interceptSignup'])

        // Assert that the success message is displayed
        cy.contains('You signed up successfully!')

        // Assert navigation to home page
        cy.location().its('pathname').should('eq', '/')
      })
    })

    describe('When the server response is NOT OK', () => {
      beforeEach(() => {
        // Set up interceptors
        cy.intercept('POST', `${API_URL}/users/signup`, {
          // stubbed server response
          status: 'fail'
        }).as('interceptSignupWentWrong')
      })

      it('should display an error message and stays on signup page', () => {
        // Fill form
        cy.get('@userSignupInput').then((inputData) => {
          Object.entries(inputData).forEach(([field, value]) => {
            cy.get(`[data-cy="form-signup-input-${field}"]`).type(`${value}`)
          })
        })

        // Submit form
        cy.get('[data-cy=form-signup-btn]').click()

        // Wait for interceptors
        cy.wait(['@interceptSignupWentWrong'])

        // Assert that the error message is displayed
        cy.contains('Signup went wrong')

        // // Assert still on signup page
        cy.location().its('pathname').should('eq', '/signup')
      })
    })
  })

  describe('When the user does NOT fill the form correctly', () => {
    it('should display the correct error message', () => {
      // Fill form with incomplete data
      cy.get('@userSignupInput').then((inputData) => {
        Object.entries(inputData).forEach(([field, value]) => {
          if (field !== 'email') {
            cy.get(`[data-cy="form-signup-input-${field}"]`).type(`${value}`)
          }
        })
      })

      // Submit form
      cy.get('[data-cy=form-signup-btn]').click()

      // Assert that the error message is displayed
      cy.contains('Not a valid email').should('be.visible')

      // // Assert still on signup page
      cy.location().its('pathname').should('eq', '/signup')
    })
  })
})
