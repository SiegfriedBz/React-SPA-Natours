/// <reference types="cypress" />

import { TUser } from '../../src/types/user.types'

declare global {
  namespace Cypress {
    interface Chainable {
      // Selector
      getDataCyEl: (selector: string) => Chainable<JQuery<HTMLElement>>
      // View Selector
      setXsScreen: () => Chainable<Element>
      setMdScreen: () => Chainable<Element>
      setXlScreen: () => Chainable<Element>
      // Open(on xs-medium screens) Menu Modal
      openMenuModal: () => Chainable<Element>
      // Stub Login As
      stubLoginAs: ({ As }: { As: 'User' | 'Admin' }) => Chainable<Element>
      // Intercept/Stub POST /api/sessions/login
      interceptPostLoginAs: ({
        As
      }: {
        As: 'User' | 'Admin'
      }) => Chainable<Element>
      // Intercept/Stub POST /api/users/signup
      interceptPostSignupAs: ({
        As
      }: {
        As: 'User' | 'Admin'
      }) => Chainable<Element>
      // Intercept/Stub GET api/users/me
      interceptGetMeAs: ({ As }: { As: 'User' | 'Admin' }) => Chainable<Element>
      // Intercept/Stub GET api/users/my-bookings
      interceptGetMyBookings: () => Chainable<Element>
      // Intercept/Stub GET /api/users/?role=guide&role=lead-guide
      interceptAdminGeAllGuides: () => Chainable<Element>
      // Intercept/Stub GET /api/tours?page=page
      interceptGetAllToursForPage: (page: number) => Chainable<Element>
      // Intercept/Stub GET /api/tours/:selectedTourId
      interceptGetSelectedTour: () => Chainable<Element>
      // Intercept/Stub GET /api/tours/:selectedTourId/reviews
      interceptGetSelectedTourReviews: () => Chainable<Element>
      // Stub Home page Click on Selected Tour Card
      stubHomeClickOnSelectedTourCard: () => Chainable<Element>
      // Intercept/Stub GET /api/tours/stats
      interceptGetToursInsightsStats: () => Chainable<Element>
      // Intercept/Stub GET /api/tours/monthly-stats/:year
      interceptGetToursPlanningStats: (year: string) => Chainable<Element>
      // Intercept/Stub Mapbox api
      interceptMapbox: () => Chainable<Element>
      // Intercept/Stub Stripe api
      interceptStripe: () => Chainable<Element>
    }
  }
}

export {}

const API_URL = Cypress.env('API_URL')
const API_TOURS_PER_PAGE = Cypress.env('API_TOURS_PER_PAGE')

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }c
//   }
// }

/** SELECTOR */
Cypress.Commands.add('getDataCyEl', (selector) => {
  return cy.get(`[data-cy="${selector}"]`)
})

/** VIEW Selector */
Cypress.Commands.add('setXsScreen', () => {
  cy.viewport('iphone-6')
})
Cypress.Commands.add('setMdScreen', () => {
  cy.viewport('ipad-2')
})
Cypress.Commands.add('setXlScreen', () => {
  cy.viewport('macbook-15')
})

/** OPEN (on xs-medium screens) MENU MODAL */
Cypress.Commands.add('openMenuModal', () => {
  cy.getDataCyEl('burger-menu-button').click({ force: true })
})

/** LOGIN */
// Stub Login As User | Admin
// => fill login form + submit
Cypress.Commands.add('stubLoginAs', ({ As }: { As: 'User' | 'Admin' }) => {
  // Stub the API on POST /sessions/login route
  cy.interceptPostLoginAs({ As })

  // Stub the API on GET /?page=1 route
  cy.interceptGetAllToursForPage(1)
  // Stub the API on GET /?page=2 route
  cy.interceptGetAllToursForPage(2)

  // Intercept Stripe API
  cy.interceptStripe()

  cy.visit('/login')

  // Fill Login form
  cy.fixture(`../fixtures/user/selected${As}.json`).then((selectedUser) => {
    Object.entries(selectedUser)
      .filter(([field]) => field === 'email' || field === 'password')
      .forEach(([field, value]) => {
        cy.get(`[data-cy="form-login-input-${field}"]`).type(`${value}`)
      })
  })

  // Submit Login form
  cy.get('[data-cy=form-login-btn]').click()
})

// Stub the API on POST /sessions/login route
Cypress.Commands.add(
  'interceptPostLoginAs',
  ({ As }: { As: 'User' | 'Admin' }) => {
    cy.fixture(`../fixtures/user/selected${As}.json`).then((selectedUser) => {
      cy.intercept('POST', `${API_URL}/sessions/login`, {
        // stubbed server response
        status: 'success',
        data: {
          user: selectedUser
        }
      }).as(`interceptPostLoginAs-${As}`)
    })
  }
)

/** SIGNUP */
// Stub the API on POST /users/signup route
Cypress.Commands.add(
  'interceptPostSignupAs',
  ({ As }: { As: 'User' | 'Admin' }) => {
    cy.fixture(`../fixtures/user/selected${As}.json`).then((selectedUser) => {
      cy.intercept('POST', `${API_URL}/users/signup`, {
        // stubbed server response
        status: 'success',
        data: { selectedUser }
      }).as(`interceptPostSignupAs-${As}`)
    })
  }
)

/** GET ME */
// Intercept/Stub GET api/users/me
Cypress.Commands.add('interceptGetMeAs', ({ As }: { As: 'User' | 'Admin' }) => {
  cy.fixture(`../fixtures/user/selected${As}.json`).then((selectedUser) => {
    cy.intercept('GET', `${API_URL}/users/me`, {
      status: 'success',
      data: {
        user: selectedUser
      }
    }).as(`interceptGetMeAs-${As}`)
  })
})

/** GET MY BOOKINGS */
// Intercept/Stub GET api/users/my-bookings
Cypress.Commands.add('interceptGetMyBookings', () => {
  cy.fixture(`../fixtures/bookings/bookings.json`).then((allBookings) => {
    cy.intercept('GET', `${API_URL}/users/my-bookings`, {
      status: 'success',
      // dataCount: allBookings.length,
      dataCount: 4,
      data: {
        bookings: allBookings
      }
    }).as(`interceptGetMyBookings`)
  })
})

/** POST TOUR */
// Intercept Admin GET users/?role=guide&role=lead-guide route
// triggered on /tours/new route
Cypress.Commands.add('interceptAdminGeAllGuides', () => {
  cy.fixture('../fixtures/user/users.json').then((allUsers) => {
    const allGuides = allUsers.filter(
      (user: TUser) => user.role === 'guide' || user.role === 'lead-guide'
    )
    cy.intercept('GET', `${API_URL}/users/?role=guide&role=lead-guide`, {
      status: 'success',
      dataCount: allGuides.length,
      data: {
        users: allGuides
      }
    }).as('interceptAdminGeAllGuides')
  })
})

/** Stub Home Page Click on SelectedTourCard */
Cypress.Commands.add('stubHomeClickOnSelectedTourCard', () => {
  cy.wait('@interceptGetAllToursForPage-1')
  cy.wait('@interceptGetAllToursForPage-2')

  // Click on the the selected tour link
  cy.fixture('../fixtures/tour/selectedTour.json').then((selectedTour) => {
    cy.getDataCyEl(`link-to-tour-details-${selectedTour._id}`).should(
      'be.visible'
    )
    cy.getDataCyEl(`link-to-tour-details-${selectedTour._id}`).click()
  })

  // Wait for the interceptors
  cy.wait('@interceptGetSelectedTour')
  cy.wait('@interceptGetSelectedTourReviews')
  cy.wait('@interceptMapbox')
})

/** TOURS */
// Stub the API on GET /tours?page=n route
Cypress.Commands.add('interceptGetAllToursForPage', (page: number) => {
  cy.fixture('../fixtures/tour/tours.json').then((allTours) => {
    cy.intercept('GET', `${API_URL}/tours?page=${page}`, {
      status: 'success',
      dataCount: API_TOURS_PER_PAGE,
      data: {
        tours: allTours.slice(
          (page - 1) * API_TOURS_PER_PAGE,
          page * API_TOURS_PER_PAGE
        )
      }
    }).as(`interceptGetAllToursForPage-${page}`)
  })
})

// Stub the API on GET /tours/:id route
Cypress.Commands.add('interceptGetSelectedTour', () => {
  cy.fixture('../fixtures/tour/selectedTour.json').then((selectedTour) => {
    cy.intercept('GET', `${API_URL}/tours/${selectedTour._id}`, {
      status: 'success',
      data: {
        tour: selectedTour
      }
    }).as('interceptGetSelectedTour')
  })
})

// Stub the API on GET /tours/:id/reviews route
Cypress.Commands.add('interceptGetSelectedTourReviews', () => {
  cy.fixture('../fixtures/tour/selectedTour.json').then((selectedTour) => {
    cy.intercept('GET', `${API_URL}/tours/${selectedTour._id}/reviews`, {
      status: 'success',
      data: {
        reviews: []
      }
    }).as('interceptGetSelectedTourReviews')
  })
})

/** TOURS STATS */
// Stub the API on GET /tours/stats route
Cypress.Commands.add('interceptGetToursInsightsStats', () => {
  cy.fixture('../fixtures/tour/tours.stats.json').then((byDifficultyStats) => {
    cy.intercept('GET', `${API_URL}/tours/stats`, {
      status: 'success',
      data: {
        stats: byDifficultyStats
      }
    }).as('interceptGetToursInsightsStats')
  })
})

// Stub the API on GET /tours/stats/:year route
Cypress.Commands.add('interceptGetToursPlanningStats', (year: string) => {
  cy.fixture('../fixtures/tour/tours.stats.monthly.json').then(
    (monthlyStats) => {
      cy.intercept('GET', `${API_URL}/tours/monthly-stats/${year}`, {
        status: 'success',
        data: {
          stats: monthlyStats
        }
      }).as(`interceptGetToursPlanningStats-${year}`)
    }
  )
})

/** Mapbox */
// Intercept Mapbox API
Cypress.Commands.add('interceptMapbox', () => {
  cy.intercept('GET', `https://api.mapbox.com/**`, {
    status: 'success'
  }).as('interceptMapbox')

  cy.intercept('POST', `https://events.mapbox.com/**`, {
    status: 'success'
  }).as('interceptMapbox')
})

/** Stripe */
// Intercept Stripe API
Cypress.Commands.add('interceptStripe', () => {
  // cy.intercept('GET', `https://js.stripe.com/**`, {
  //   status: 'success'
  // }).as('interceptGetStripe')

  cy.intercept('POST', `https://m.stripe.com/**`, {
    status: 'success'
  }).as('interceptPostStripe')
})
