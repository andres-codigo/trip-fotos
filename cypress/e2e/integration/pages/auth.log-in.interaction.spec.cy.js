describe('Trip Fotos user auth page > not logged in', () => {
	let emailInputErrorMessage
	let passwordInputErrorMessage
	let invalidInputTest

	beforeEach(() => {
		cy.visit(Cypress.env('auth_url'))

		// Aliases
		cy.get('[data-cy="user-authentication"]').as(
			'userAuthenticationContainer',
		)
		cy.get('[data-cy="user-auth-email"]').as('userAuthEmail')
		cy.get('[data-cy="user-auth-password"]').as('userAuthPassword')
		cy.get('[data-cy="user-auth-login-button"]').as('userAuthLoginButton')

		// Error Messages
		emailInputErrorMessage = 'Please enter a valid email address.'
		passwordInputErrorMessage =
			'Your password must be minimum 8 characters long! 8 characters left'

		// Functions
		invalidInputTest = (alias, errorMessage) => {
			// Check the classes for validation
			cy.get(alias)
				.should('have.class', 'form-control')
				.and('have.class', 'invalid')

			// Verify the error message is displayed
			cy.get(alias).find('p').should('contain.text', errorMessage)
		}
	})

	it('displays email error message when input is empty', () => {
		cy.get('@userAuthenticationContainer')
			.get('@userAuthEmail')
			.find('input')
			.focus()
			.should('have.value', '')
			.blur()

		invalidInputTest('@userAuthEmail', emailInputErrorMessage)
	})

	it('displays email error message when email is invalid', () => {
		cy.get('@userAuthenticationContainer')
			// Enter invalid email address
			.get('@userAuthEmail')
			.find('input')
			.focus()
			.type('invalid@email')
			.should('have.value', 'invalid@email')

		invalidInputTest('@userAuthEmail', emailInputErrorMessage)
	})
	it('displays no email error message when email typed becomes valid', () => {
		const firstCharacterOfValidEmail = 'v'
		const remainderOfValidEmail = 'alid@email.com'

		cy.get('@userAuthenticationContainer')
			// Enter first character of email address
			.get('@userAuthEmail')
			.find('input')
			.focus()
			.type(firstCharacterOfValidEmail)
			.should('have.value', firstCharacterOfValidEmail)

		// Loop through each character and type it
		for (let char of remainderOfValidEmail) {
			cy.get('@userAuthEmail').find('input').type(char)
		}

		// Check CSS classes does not include 'invalid' class
		cy.get('@userAuthEmail')
			.should('have.class', 'form-control')
			.and('not.have.class', 'invalid')

			// Verify the error message element is removed from the DOM
			.find('p')
			.should('not.exist')
	})

	it('displays password error message when input is empty', () => {
		cy.get('@userAuthenticationContainer')
			.get('@userAuthPassword')
			.find('input')
			.focus()
			.should('have.value', '') // Verify input is empty
			.blur()

		invalidInputTest('@userAuthPassword', passwordInputErrorMessage)
	})

	it('displays and counts down remaining password characters needed to meet minimum password length requirement in error message', () => {
		const inputSelector = '@userAuthPassword'
		const errorMessageSelector = 'p'
		const minLength = 8
		const password = '2345678'

		cy.get(inputSelector)
			.find('input')
			.focus()
			.should('have.value', '')
			.blur()

		// Initial error message indicating required and remaining characters
		cy.get(errorMessageSelector).should(
			'contain.text',
			`Your password must be minimum ${minLength} characters long! ${minLength} characters left.`,
		)

		// Type characters to the input
		for (let i = 0; i < password.length; i++) {
			cy.get(inputSelector).find('input').type(password[i])

			// Calculate remaining characters needed
			const currentLength = i + 1 // Current input length
			const remainingChars = minLength - currentLength

			// Update the error message check based on remaining characters
			if (remainingChars > 0 && remainingChars < minLength) {
				cy.get(errorMessageSelector).should(
					'contain.text',
					`Your password must be minimum ${minLength} characters long! ${remainingChars} characters left.`,
				)
			} else {
				// Check error message removed once minimum password character length is met
				cy.get(errorMessageSelector).should('not.exist')
			}
		}
	})

	it('displays email and password error messages when inputs are empty and login button clicked', () => {
		cy.get('@userAuthenticationContainer')
			.get('@userAuthLoginButton')
			.click()

		invalidInputTest('@userAuthEmail', emailInputErrorMessage)
		invalidInputTest('@userAuthPassword', passwordInputErrorMessage)
	})

	it.skip('displays the home page when valid email and password details are entered and login button clicked', () => {
		// TODO: PRIOR TO RUNNING TEST
		const email = '' // ADD REGISTERED TRAVELLER'S EMAIL ADDRESS FROM FIREBASE > AUTHENTICATION > USERS LIST
		const password = '' // ADD PASSWORD ASSOCIATED WITH TRAVELLER

		cy.get('@userAuthenticationContainer')
			// Enter email address
			.get('@userAuthEmail')
			.find('input')
			.focus()
			.type(email)
			.should('have.value', email)

			// Enter password
			.get('@userAuthPassword')
			.find('input')
			.focus()
			.type(password)
			.should('have.value', password)

			// Click Login button
			.get('@userAuthLoginButton')
			.click()

		cy.url().should('eq', 'http://localhost:3000/trips')
	})
})
