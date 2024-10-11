describe('Trip Fotos user auth page > not logged in', () => {
	let emptyEmailInputErrorMessage
	let emptyPasswordInputErrorMessage
	let emptyEmailTest
	let emptyPasswordTest

	beforeEach(() => {
		cy.visit(Cypress.env('auth_url'))

		cy.get('[data-cy="user-authentication"]').as(
			'userAuthenticationContainer'
		)
		cy.get('[data-cy="user-auth-email"]').as('userAuthEmail')
		cy.get('[data-cy="user-auth-password"]').as('userAuthPassword')
		cy.get('[data-cy="user-auth-login-button"]').as('userAuthLoginButton')

		emptyEmailInputErrorMessage = 'Please enter a valid email address.'
		emptyPasswordInputErrorMessage =
			'Your password must be minimum 8 characters long! 8 characters left'

		emptyEmailTest = () => {
			// Check if the input field is empty
			cy.get('@userAuthEmail').find('input').should('have.value', '') // Verify input is empty

			// Check the classes for validation
			cy.get('@userAuthEmail')
				.should('have.class', 'form-control')
				.and('have.class', 'invalid')

			// Verify the error message is displayed
			cy.get('@userAuthEmail')
				.find('p')
				.should('contain.text', emptyEmailInputErrorMessage)
		}

		emptyPasswordTest = () => {
			// Check if the input field is empty
			cy.get('@userAuthPassword').find('input').should('have.value', '') // Verify input is empty

			// Check the classes for validation
			cy.get('@userAuthPassword')
				.should('have.class', 'form-control')
				.and('have.class', 'invalid')

			// Verify the error message is displayed
			cy.get('@userAuthPassword')
				.find('p')
				.should('contain.text', emptyPasswordInputErrorMessage)
		}
	})

	it('displays email error message when input field is empty on focus and then blur ', () => {
		cy.get('@userAuthenticationContainer')
			.get('@userAuthEmail')
			.find('input')
			.focus()
			.blur()
			.then(() => {
				emptyEmailTest()
			})
	})

	it('displays password error message when input field is empty on focus and then blur ', () => {
		cy.get('@userAuthenticationContainer')
			.get('@userAuthPassword')
			.find('input')
			.focus()
			.blur()
			.then(() => {
				emptyPasswordTest()
			})
	})

	it('displays email and password error messages when input fields are empty and login button clicked ', () => {
		cy.get('@userAuthenticationContainer')
			.get('@userAuthLoginButton')
			.click()
			.then(() => {
				emptyEmailTest()
				emptyPasswordTest()
			})
	})
})
