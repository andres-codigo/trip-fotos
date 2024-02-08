export const APIErrorMessageConstants = Object.freeze({
	GENERIC_MESSAGE: 'Something went wrong!',
	CATCH_MESSAGE: 'There has been a problem with your fetch operation:',

	// AUTHENTICATION
	LOGIN_EMAIL_EXISTS_TYPE: 'EMAIL_EXISTS',
	LOGIN_EMAIL_EXISTS_MESSAGE:
		'The email address is already in use by another account.',
	LOGIN_OPERATION_NOT_ALLOWED_TYPE: 'OPERATION_NOT_ALLOWED',
	LOGIN_OPERATION_NOT_ALLOWED_MESSAGE:
		'Password sign-in is disabled for this project.',
	LOGIN_TOO_MANY_ATTEMPTS_TYPE: 'TOO_MANY_ATTEMPTS_TRY_LATER',
	LOGIN_TOO_MANY_ATTEMPTS_MESSAGE:
		'We have blocked all requests from this device due to unusual activity. Try again later.',
	FAILED_TO_AUTHENTICATE:
		'Failed to authenticate. Check your login credentials.',

	// COACHES
	REGISTER_COACH: 'Failed to register coach.',
	LOAD_COACH_NAME: 'Failed to load coach name.',
	LOAD_COACH: 'Failed to register coach.',
	DELETE_COACH: 'Failed to delete coach.',
	LOAD_COACHES: 'Failed to load coaches.',
})
