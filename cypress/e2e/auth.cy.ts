/// <reference types="cypress" />

describe('Login spec', () => {
  const API_URL = Cypress.env('API_URL')

  beforeEach(() => {
    // Intercept GET Tours request on home page after signup, as not the object of the current tests
    cy.intercept('GET', `${API_URL}/tours`, {
      statusCode: 200
    })

    // Set fixtures
    cy.fixture('../fixtures/auth/login/inputData.auth.login.json').as(
      'userLoginInput'
    )

    // Visit Login page
    cy.visit('/login')
  })

  describe('When the user fills the form correctly', () => {
    describe('When the server response is OK', () => {
      beforeEach(() => {
        // Set up interceptors
        cy.intercept('POST', `${API_URL}/sessions/login`, {
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
        }).as('interceptLogin')
      })

      it('should display a success message, navigate to home page, and display logout button', () => {
        // Assert login link visible & logout btn not visible
        cy.contains(/logout/i).should('not.exist')
        cy.contains(/login/i).should('be.visible')

        // Fill form
        cy.get('@userLoginInput').then((inputData) => {
          Object.entries(inputData).forEach(([field, value]) => {
            cy.get(`[data-cy="form-login-input-${field}"]`).type(`${value}`)
          })
        })

        // Submit form
        cy.get('[data-cy=form-login-btn]').click()

        // Wait for interceptors
        cy.wait(['@interceptLogin'])

        // Assert that the success message is displayed
        cy.contains('You logged in successfully!')

        // Assert login link not visible & logout btn visible
        cy.contains(/login/i).should('not.exist')
        cy.contains(/logout/i).should('be.visible')

        // Assert navigation to home page
        cy.location().its('pathname').should('eq', '/')
      })
    })

    describe('When the server response is NOT OK', () => {
      beforeEach(() => {
        // Set up interceptors
        cy.intercept('POST', `${API_URL}/sessions/login`, {
          // stubbed server response
          status: 'error'
        }).as('interceptLoginWentWrong')
      })

      it('should display an error message and stays on login page', () => {
        // Assert login link visible & logout btn not visible
        cy.contains(/logout/i).should('not.exist')
        cy.contains(/login/i).should('be.visible')

        // Fill form
        cy.get('@userLoginInput').then((inputData) => {
          Object.entries(inputData).forEach(([field, value]) => {
            cy.get(`[data-cy="form-login-input-${field}"]`).type(`${value}`)
          })
        })

        // Submit form
        cy.get('[data-cy=form-login-btn]').click()

        // Wait for interceptors
        cy.wait(['@interceptLoginWentWrong'])

        // Assert that the error message is displayed
        cy.contains('Login went wrong')

        // Assert login link still visible & logout btn not visible
        cy.contains(/logout/i).should('not.exist')
        cy.contains(/login/i).should('be.visible')

        // // Assert still on login page
        cy.location().its('pathname').should('eq', '/login')
      })
    })
  })

  describe('When the user does NOT fill the form correctly', () => {
    it('should display the correct error message', () => {
      // Assert login link visible & logout btn not visible
      cy.contains(/logout/i).should('not.exist')
      cy.contains(/login/i).should('be.visible')

      // Fill form with incomplete data
      cy.get('@userLoginInput').then((inputData) => {
        Object.entries(inputData).forEach(([field, value]) => {
          if (field !== 'email') {
            cy.get(`[data-cy="form-login-input-${field}"]`).type(`${value}`)
          }
        })
      })

      // Submit form
      cy.get('[data-cy=form-login-btn]').click()

      // Assert that the error message is displayed
      cy.contains('Not a valid email').should('be.visible')

      // Assert login link visible & logout btn not visible
      cy.contains(/logout/i).should('not.exist')
      cy.contains(/login/i).should('be.visible')
    })
  })
})

describe('Logout spec', () => {
  const API_URL = Cypress.env('API_URL')

  beforeEach(() => {
    /** 1. Login */
    cy.stubLogin()

    // Intercept GET Tours request on home page after signup, as not the object of the current tests
    cy.intercept('GET', `${API_URL}/tours`, { status: 'success' })
  })

  describe('When the user clicks logout button', () => {
    describe('When the server response is OK', () => {
      beforeEach(() => {
        /** 2. Set logout */
        // Set up interceptors
        cy.intercept('DELETE', `${API_URL}/sessions/logout`, {
          status: 'success'
        }).as('interceptLogout')
      })

      it('should display a success message, navigate to home page, and display login link', () => {
        // Click Logout button
        cy.getDataCyEl('logout-btn').click()

        // Wait for interceptors
        cy.wait(['@interceptLogout'])

        // Assert that the success message is displayed
        cy.contains('You logged out successfully')

        // Assert navigation to home page
        cy.location().its('pathname').should('eq', '/')

        // Assert login link visible & logout btn not visible
        cy.contains(/logout/i).should('not.exist')
        cy.contains(/login/i).should('be.visible')
      })
    })

    describe('When the server response is NOT OK', () => {
      beforeEach(() => {
        /** 2'. Set logout */
        // Set up interceptors
        cy.intercept('DELETE', `${API_URL}/sessions/logout`, {
          status: 'error'
        }).as('interceptLogoutWentWrong')
      })

      it('should display an error message, stay on the current page', () => {
        // Click Logout button
        cy.getDataCyEl('logout-btn').click()

        // Wait for interceptors
        cy.wait(['@interceptLogoutWentWrong'])

        // Assert that the success message is displayed
        cy.contains('Logout went wrong')

        // Assert login link not visible & logout btn visible
        cy.contains(/login/i).should('not.exist')
        cy.contains(/logout/i).should('be.visible')
      })
    })
  })
})
