describe('Trip Fotos user auth page > not logged in', () => {
	const urls = {
		cyAuth: Cypress.env('auth_url'),
		trips: 'http://localhost:3000/trips',
	}

	const selectors = {
		navHeader: '[data-cy="nav-header"]',
		authEmail: '[data-cy="user-auth-email"]',
		authPassword: '[data-cy="user-auth-password"]',
		loginButton: '[data-cy="user-auth-login-button"]',
	}

	const labels = {
		email: 'E-Mail',
		password: 'Password',
		login: 'Login',
	}

	beforeEach(() => {
		cy.visit(urls.cyAuth)
	})

	it('Render banner', () => {
		cy.get(selectors.navHeader).as('navHeader')

		cy.get('@navHeader')
			.should('have.class', 'header')
			.find('a')
			.then(($navHeader) => {
				expect($navHeader.text()).to.equal('Trip Fotos')
			})
	})

	it('Render login form', () => {
		cy.get('.user-authentication').as('userAuthentication')

		cy.get('@userAuthentication')
			.find(selectors.authEmail)
			.should('have.class', 'form-control')
			.find('label')
			.invoke('text')
			.should('equal', labels.email)

		cy.get('@userAuthentication')
			.find(selectors.authPassword)
			.should('have.class', 'form-control')
			.find('label')
			.invoke('text')
			.should('equal', labels.password)

		cy.get('@userAuthentication')
			.find(selectors.loginButton)
			.invoke('text')
			.should('equal', labels.login)
	})
})
