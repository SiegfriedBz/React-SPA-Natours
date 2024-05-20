/// <reference types="cypress" />
import '../../support/commands'
import {
  NAV_LINKS_NOT_LOGGED_IN,
  NAV_LINKS_LOGGED_IN,
  NAV_LINKS_ADMIN
} from '../../../src/ui/components/header/header.constants'

const year = '2024'

describe('Responsive header spec', () => {
  beforeEach(() => {
    // Stub the API on GET /?page=1 route
    cy.interceptGetAllToursForPage(1)
    // Stub the API on GET /?page=2 route
    cy.interceptGetAllToursForPage(2)
    // Intercept/Stub GET Tours Planning Stats
    cy.interceptGetToursInsightsStats()
    // Intercept Stripe API
    cy.interceptStripe()
  })

  describe('When the user is on a mobile device', () => {
    beforeEach(() => {
      cy.setXsScreen()
    })

    it('should display the header with the burger menu button', () => {
      cy.visit('/')
      cy.getDataCyEl('burger-menu-button').should('be.visible')
    })

    it('click on burger menu button should open Mobile Nav Menu Modal', () => {
      cy.visit('/')
      cy.getDataCyEl('burger-menu-button').click()
      cy.getDataCyEl('mobile-nav').should('be.visible')
      cy.getDataCyEl('modal-close-button').click()
    })

    describe('When Mobile Nav Menu Modal is open', () => {
      it('click on modal-close-button should close Mobile Nav Menu Modal', () => {
        cy.visit('/')
        cy.getDataCyEl('burger-menu-button').click()
        cy.getDataCyEl('mobile-nav').should('be.visible')
        cy.getDataCyEl('modal-close-button').click()
        cy.getDataCyEl('burger-menu-button').should('be.visible')
      })
    })

    describe('When Mobile Nav Menu Modal is open and user clicks on each nav-item', () => {
      describe('When User is NOT logged in', () => {
        beforeEach(() => {
          cy.visit('/')
          cy.getDataCyEl('burger-menu-button').click()
        })
        describe('When the User clicks on a link', () => {
          NAV_LINKS_NOT_LOGGED_IN.forEach(({ label, to }) => {
            it(`clicks on ${label} link navigates to ${to} page`, () => {
              cy.getDataCyEl('mobile-nav')
                .contains(label)
                .click({ multiple: true })

              cy.location().its('pathname').should('contain', `${to}`)
            })
          })
        })
      })

      describe('When User is logged in', () => {
        beforeEach(() => {
          cy.stubLoginAs({ As: 'User' })
          cy.interceptGetMeAs({ As: 'User' })
          cy.interceptGetMyBookings()
        })

        describe('When the Logged in User clicks on a link', () => {
          NAV_LINKS_LOGGED_IN.forEach(({ label, to }) => {
            it(`clicks on ${label} link navigates to ${to} page`, () => {
              cy.getDataCyEl('burger-menu-button').click({ force: true })

              cy.getDataCyEl('mobile-nav')
                .contains(label)
                .click({ multiple: true })

              cy.location().its('pathname').should('contain', `${to}`)
            })
          })
        })
      })

      describe('When Admin is logged in', () => {
        beforeEach(() => {
          cy.stubLoginAs({ As: 'Admin' })
          cy.interceptGetMeAs({ As: 'Admin' })
          cy.interceptGetMyBookings()
          cy.interceptAdminGeAllGuides() // triggered on /tours/new route

          // Intercept/Stub GET Tours Planning Stats
          cy.interceptGetToursPlanningStats(year)
        })

        describe('When the Logged in Admin clicks on a link', () => {
          NAV_LINKS_ADMIN.forEach(({ label, to }) => {
            it(`clicks on ${label} link navigates to ${to} page`, () => {
              cy.getDataCyEl('burger-menu-button').click({ force: true })

              cy.getDataCyEl('mobile-nav')
                .contains(label)
                .click({ multiple: true })

              cy.location().its('pathname').should('contain', `${to}`)
            })
          })
        })
      })
    })
  })

  describe('When the user is on a tablet device', () => {
    beforeEach(() => {
      cy.setMdScreen()
    })

    it('should display the header with the burger menu button', () => {
      cy.visit('/')
      cy.getDataCyEl('burger-menu-button').should('be.visible')
    })

    it('click on burger menu button should open Mobile Nav Menu Modal', () => {
      cy.visit('/')
      cy.getDataCyEl('burger-menu-button').click()
      cy.getDataCyEl('mobile-nav').should('be.visible')
      cy.getDataCyEl('modal-close-button').click()
    })

    describe('When Mobile Nav Menu Modal is open', () => {
      it('click on modal-close-button should close Mobile Nav Menu Modal', () => {
        cy.visit('/')
        cy.getDataCyEl('burger-menu-button').click()
        cy.getDataCyEl('mobile-nav').should('be.visible')
        cy.getDataCyEl('modal-close-button').click()
        cy.getDataCyEl('burger-menu-button').should('be.visible')
      })
    })

    describe('When Mobile Nav Menu Modal is open and user clicks on each nav-item', () => {
      describe('When User is NOT logged in', () => {
        beforeEach(() => {
          cy.visit('/')
          cy.getDataCyEl('burger-menu-button').click()
        })
        describe('When the User clicks on a link', () => {
          NAV_LINKS_NOT_LOGGED_IN.forEach(({ label, to }) => {
            it(`clicks on ${label} link navigates to ${to} page`, () => {
              cy.getDataCyEl('mobile-nav')
                .contains(label)
                .click({ multiple: true })

              cy.location().its('pathname').should('contain', `${to}`)
            })
          })
        })
      })

      describe('When User is logged in', () => {
        beforeEach(() => {
          cy.stubLoginAs({ As: 'User' })
          cy.interceptGetMeAs({ As: 'User' })
          cy.interceptGetMyBookings()
        })

        describe('When the Logged in User clicks on a link', () => {
          NAV_LINKS_LOGGED_IN.forEach(({ label, to }) => {
            it(`clicks on ${label} link navigates to ${to} page`, () => {
              cy.getDataCyEl('burger-menu-button').click({ force: true })

              cy.getDataCyEl('mobile-nav')
                .contains(label)
                .click({ multiple: true })

              cy.location().its('pathname').should('contain', `${to}`)
            })
          })
        })
      })

      describe('When Admin is logged in', () => {
        beforeEach(() => {
          cy.stubLoginAs({ As: 'Admin' })
          cy.interceptGetMeAs({ As: 'Admin' })
          cy.interceptGetMyBookings()
          cy.interceptAdminGeAllGuides() // triggered on /tours/new route

          // Intercept/Stub GET Tours Planning Stats
          cy.interceptGetToursPlanningStats(year)
        })

        describe('When the Logged in Admin clicks on a link', () => {
          NAV_LINKS_ADMIN.forEach(({ label, to }) => {
            it(`clicks on ${label} link navigates to ${to} page`, () => {
              cy.getDataCyEl('burger-menu-button').click({ force: true })

              cy.getDataCyEl('mobile-nav')
                .contains(label)
                .click({ multiple: true })

              cy.location().its('pathname').should('contain', `${to}`)
            })
          })
        })
      })
    })
  })

  // describe('When the user is on a desktop device', () => {
  //   beforeEach(() => {
  //     cy.setXlScreen()
  //     cy.visit('/')
  //   })

  //   it('should display the header with the desktop-nav', () => {
  //     cy.getDataCyEl('desktop-nav').should('be.visible')
  //   })

  //   describe('When User is NOT logged in', () => {
  //     describe('When the User clicks on a link', () => {
  //       NAV_LINKS_NOT_LOGGED_IN.forEach(({ label, to, dataCy }) => {
  //         it(`clicks on ${label} link navigates to ${to} page`, () => {
  //           cy.getDataCyEl(dataCy).click()

  //           cy.location().its('pathname').should('contain', `${to}`)
  //         })
  //       })
  //     })
  //   })

  //   describe('When User is logged in', () => {
  //     beforeEach(() => {
  //       cy.stubLoginAs({ As: 'User' })
  //       cy.interceptGetMeAs({ As: 'User' })
  //       cy.interceptGetMyBookings()
  //     })

  //     describe('When the Logged in User clicks on a link', () => {
  //       NAV_LINKS_LOGGED_IN.forEach(({ label, to, dataCy }) => {
  //         it(`clicks on ${label} link navigates to ${to} page`, () => {
  //           cy.getDataCyEl(dataCy).click({ multiple: true })

  //           cy.location().its('pathname').should('contain', `${to}`)
  //         })
  //       })
  //     })
  //   })

  //   describe('When Admin is logged in', () => {
  //     beforeEach(() => {
  //       cy.stubLoginAs({ As: 'Admin' })
  //       cy.interceptGetMeAs({ As: 'Admin' })
  //       cy.interceptGetMyBookings()
  //       cy.interceptAdminGeAllGuides() // triggered on /tours/new route

  //       // Intercept/Stub GET Tours Planning Stats
  //       cy.interceptGetToursPlanningStats(year)
  //     })

  //     describe('When the Logged in Admin clicks on a link', () => {
  //       NAV_LINKS_ADMIN.forEach(({ label, to, dataCy }) => {
  //         it(`clicks on ${label} link navigates to ${to} page`, () => {
  //           cy.getDataCyEl(dataCy).click()
  //           cy.location().its('pathname').should('contain', `${to}`)
  //         })
  //       })
  //     })
  //   })
  // })
})
