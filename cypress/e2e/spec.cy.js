describe('visiting Trip Fotos home page', () => {
	beforeEach(() => {
		cy.visit(Cypress.env('auth_url'))
	})

	it('passes', () => {
		cy.get('[data-cy="nav-header"]').as('navHeader')

		cy.get('@navHeader').invoke('text').should('equal', 'Trip Fotos')
	})
})
