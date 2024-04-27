/// <reference types="cypress" />
import '../../support/commands'

const selectedTour = {
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
  summary: 'Breathtaking hike through the Canadian Banff National Park',
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
}

describe('TourDetails page spec', () => {
  const API_URL = Cypress.env('API_URL')

  describe('When the API sends a 200', () => {
    beforeEach(() => {
      cy.intercept('GET', `${API_URL}/tours/${selectedTour?._id}`, {
        status: 'success',
        data: {
          tour: selectedTour
        }
      }).as('interceptGetTourDetails')
    })

    it('should display the correct tour', () => {
      cy.visit(`/tours/${selectedTour?._id}`)

      // Wait for interceptors
      cy.wait('@interceptGetTourDetails')

      cy.getDataCyEl('tour-details-wrapper').should('be.visible')
      cy.contains(`Tour name: ${selectedTour.name}`)
    })
  })
})
