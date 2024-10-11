describe('Trip Fotos user auth page > not logged in', () => {
	beforeEach(() => {
		cy.visit(Cypress.env('auth_url'))
	})

	it('Render banner', () => {
		cy.get('[data-cy="nav-header"]').as('navHeader')

		cy.get('@navHeader')
			.should('have.class', 'header')
			.find('.nav-header > a')
			.then(($navHeader) => {
				expect($navHeader.text()).to.equal('Trip Fotos')
			})
	})

	it('Render login form', () => {
		cy.get('.user-authentication').as('userAuthentication')

		cy.get('@userAuthentication')
			.get('[data-cy="user-auth-email"]')
			.should('have.class', 'form-control')
			.find('label')
			.invoke('text')
			.should('equal', 'E-Mail')

		cy.get('@userAuthentication')
			.get('[data-cy="user-auth-password"]')
			.should('have.class', 'form-control')
			.find('label')
			.invoke('text')
			.should('equal', 'Password')

		cy.get('@userAuthentication')
			.get('[data-cy="user-auth-login-button"]')
			.invoke('text')
			.should('equal', 'Login')
	})
})
