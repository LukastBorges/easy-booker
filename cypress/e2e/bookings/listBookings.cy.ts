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
      .should('contain.text', '15 Mar, 2024 - 20 Mar, 2024')
  })
})
