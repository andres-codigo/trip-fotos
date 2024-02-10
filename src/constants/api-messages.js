export const APIErrorMessageConstants = Object.freeze({
	// GENERAL
	GENERIC_MESSAGE: 'Something went wrong!',
	CATCH_MESSAGE: 'There has been a problem with your fetch operation.',

	// AUTHENTICATION
	LOGIN_TYPE_EMAIL_EXISTS: 'EMAIL_EXISTS',
	LOGIN_MESSAGE_EMAIL_EXISTS:
		'The email address is already in use by another account.',
	LOGIN_TYPE_OPERATION_NOT_ALLOWED: 'OPERATION_NOT_ALLOWED',
	LOGIN_MESSAGE_OPERATION_NOT_ALLOWED:
		'Password sign-in is disabled for this project.',
	LOGIN_TYPE_TOO_MANY_ATTEMPTS: 'TOO_MANY_ATTEMPTS_TRY_LATER',
	LOGIN_MESSAGE_TOO_MANY_ATTEMPTS:
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
