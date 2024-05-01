/// <reference types="cypress" />
import '../../support/commands'

describe('All Tours page spec', () => {
  const API_URL = Cypress.env('API_URL')

  describe('When user enters /tours path', () => {
    it('should navigate to root path', () => {
      cy.visit('/tours')

      cy.location('pathname').should('eq', '/')
    })
  })

  describe('When the API sends a 200', () => {
    beforeEach(() => {
      cy.intercept('GET', `${API_URL}/tours`, {
        status: 'success',
        data: {
          tours: [
            {
              startLocation: {
                description: 'Banff, CAN',
                type: 'Point',
                coordinates: [-115.570154, 51.178456],
                address: '224 Banff Ave, Banff, AB, Canada'
              },
              ratingsAverage: 5,
              ratingsCount: 9,
              images: ['tour-1-1.jpg', 'tour-1-2.jpg', 'tour-1-3.jpg'],
              startDates: [
                '2024-04-25T09:00:00.000Z',
                '2024-07-20T09:00:00.000Z',
                '2024-10-05T09:00:00.000Z'
              ],
              _id: '5c88fa8cf4afda39709c2951',
              name: 'The Forest Hiker',
              duration: 5,
              maxGroupSize: 25,
              difficulty: 'easy',
              guides: [
                '5c8a21d02f8fb814b56fa189',
                '5c8a201e2f8fb814b56fa186',
                '5c8a1f292f8fb814b56fa184'
              ],
              price: 397,
              summary:
                'Breathtaking hike through the Canadian Banff National Park',
              description:
                'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\nLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
              imageCover: 'tour-1-cover.jpg',
              locations: [
                {
                  _id: '5c88fa8cf4afda39709c2954',
                  description: 'Banff National Park',
                  type: 'Point',
                  coordinates: [-116.214531, 51.417611],
                  day: 1
                },
                {
                  _id: '5c88fa8cf4afda39709c2953',
                  description: 'Jasper National Park',
                  type: 'Point',
                  coordinates: [-118.076152, 52.875223],
                  day: 3
                },
                {
                  _id: '5c88fa8cf4afda39709c2952',
                  description: 'Glacier National Park of Canada',
                  type: 'Point',
                  coordinates: [-117.490309, 51.261937],
                  day: 5
                }
              ]
            },
            {
              startLocation: {
                description: 'Aspen, USA',
                type: 'Point',
                coordinates: [-106.822318, 39.190872],
                address: '419 S Mill St, Aspen, CO 81611, USA'
              },
              ratingsAverage: 4.5,
              ratingsCount: 6,
              images: ['tour-3-1.jpg', 'tour-3-2.jpg', 'tour-3-3.jpg'],
              startDates: [
                '2025-01-05T10:00:00.000Z',
                '2025-02-12T10:00:00.000Z',
                '2026-01-06T10:00:00.000Z'
              ],
              _id: '5c88fa8cf4afda39709c295a',
              name: 'The Snow Adventurer',
              duration: 4,
              maxGroupSize: 10,
              difficulty: 'difficult',
              guides: [
                '5c8a21d02f8fb814b56fa189',
                '5c8a23412f8fb814b56fa18c',
                '5c8a1f4e2f8fb814b56fa185'
              ],
              price: 997,
              summary:
                'Exciting adventure in the snow with snowboarding and skiing',
              description:
                'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum!\nDolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur, exercitation ullamco laboris nisi ut aliquip. Lorem ipsum dolor sit amet, consectetur adipisicing elit!',
              imageCover: 'tour-3-cover.jpg',
              locations: [
                {
                  _id: '5c88fa8cf4afda39709c295c',
                  description: 'Aspen Highlands',
                  type: 'Point',
                  coordinates: [-106.855385, 39.182677],
                  day: 1
                },
                {
                  _id: '5c88fa8cf4afda39709c295b',
                  description: 'Beaver Creek',
                  type: 'Point',
                  coordinates: [-106.516623, 39.60499],
                  day: 2
                }
              ]
            }
          ]
        }
      }).as('interceptGetAllTours')
    })

    it('should display a list of tour cards', () => {
      cy.visit('/')

      // Wait for interceptors
      cy.wait('@interceptGetAllTours')

      cy.getDataCyEl('tour-card').should('be.visible')
    })
  })
})
