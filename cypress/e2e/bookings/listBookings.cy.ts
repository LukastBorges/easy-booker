/// <reference types="cypress" />

describe('Bookings list', () => {
  beforeEach(() => {
    cy.visit('/bookings')
  })

  it('displays user based bookings', () => {
    cy.get('[data-cy="bookings-list"]')
      .contains('tr', 'John Doe')
      .should('contain.text', 'John Doe')
      .should('contain.text', 'Sunset Villa')
      .should('contain.text', '17 Mar, 2024 - 24 Mar, 2024')
  })
})
