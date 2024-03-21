/// <reference types="cypress" />

import dayjs from 'dayjs'

const TODAY = dayjs().format('YYYY-MM-DD')
const WEEK_FROM_NOW = dayjs().add(1, 'week').format('YYYY-MM-DD')

describe('Managing bookings', () => {
  it('creates a new booking', () => {
    cy.visit('/')
    cy.get('[data-cy="hotels-container"]')
      .contains('div', 'Lakeside Retreat')
      .click()

    // Validates required fields
    cy.contains('Save').click()

    cy.get('div')
      .contains('Please enter Reservation period')
      .should('be.visible')
    cy.get('div').contains('Please enter Room').should('be.visible')
    cy.get('div').contains('Please enter First name').should('be.visible')
    cy.get('div').contains('Please enter Last name').should('be.visible')
    cy.get('div').contains('Please enter Email').should('be.visible')
    cy.get('div').contains('Please enter Country/Region').should('be.visible')
    cy.get('div').contains('Please enter Phone number').should('be.visible')

    // Fill date range
    cy.get('[data-cy="range-date-picker"]')
      .first()
      .click()
      .get(`td[title="${TODAY}"]`)
      .click()
      .get(`td[title="${WEEK_FROM_NOW}"]`)
      .click()

    // Fill headcount
    cy.get('[data-cy="headcount-input"]').clear().type('2')

    // Choose a room
    cy.get('[data-cy="room-select"]').click()
    cy.get('[label="Standard Room"]').click()

    // Fill first name
    cy.get('[data-cy="firstName-input"]').type('Jane')

    // Fill last name
    cy.get('[data-cy="lastName-input"]').type('Doe')

    // Fill email
    cy.get('[data-cy="email-input"]').type('jane.doe@example.com')

    // Fill country/region
    cy.get('[data-cy="location-input"]').type('United States')

    // Fill phone number
    cy.get('[data-cy="phoneNumber-input"]').type('1234567890')

    // Submit the form
    cy.contains('Save').click()

    // Check for success toast message
    cy.contains('Booking saved successfully')

    // Access user's booking page
    cy.visit('/bookings')

    // Check for the existence of newly created booking
    cy.get('[data-cy="bookings-list"]')
      .contains('tr', 'Jane Doe')
      .should('contain.text', 'Jane Doe')
      .should('contain.text', 'Lakeside Retreat')
  })

  it('updates a booking that already exists', () => {
    cy.visit('/bookings')
    cy.get('[data-cy="bookings-list"]')
      .contains('tr', 'Jane Doe')
      .find('[data-cy="edit-button"]')
      .click()

    // Fill first name
    cy.get('[data-cy="firstName-input"]').clear().type('Henry')

    // Fill last name
    cy.get('[data-cy="lastName-input"]').clear().type('Doe')

    // Fill email
    cy.get('[data-cy="email-input"]').clear().type('henry.doe@example.com')

    // Fill country/region
    cy.get('[data-cy="location-input"]').clear().type('Canada')

    // Fill phone number
    cy.get('[data-cy="phoneNumber-input"]').clear().type('+1 (240) 456 8976')

    // Submit the form
    cy.contains('Save').click()

    // Check for success toast message
    cy.contains('Booking updated successfully')

    // Check for the existence of the updated booking
    cy.get('[data-cy="bookings-list"]')
      .contains('tr', 'Henry Doe')
      .should('exist')
  })

  it('removes a booking', () => {
    cy.visit('/bookings')
    cy.get('[data-cy="bookings-list"]')
      .contains('tr', 'Henry Doe')
      .find('[data-cy="remove-button"]')
      .click()

    // Confirm remove
    cy.contains('Yes').click()

    // Check for success toast message
    cy.contains('Booking removed successfully')

    // Check for the existence of the updated booking
    cy.get('[data-cy="bookings-list"]')
      .contains('tr', 'Henry Doe')
      .should('not.exist')
  })
})
