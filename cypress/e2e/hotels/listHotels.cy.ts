/// <reference types="cypress" />

describe('Hotels listing', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('displays hotel card offers', () => {
    cy.get('[data-cy="navbar"]').should('contain', 'easy booker')
    cy.get('[data-cy="header"]').should('contain', 'More than just a stay')
    cy.get('[data-cy="hotels-container"] > div').should('have.length', 8)
  })

  it('filter list based on place', async () => {
    cy.get('[data-cy="location-select"]').click()
    cy.get('[title="Greece"]').click()
    cy.get('[data-cy="search-button"]').click()
    cy.get('[data-cy="hotels-container"] > div')
      .should('have.length', 1)
      .first()
      .should('contain.text', 'Sunset Villa')
  })
})
