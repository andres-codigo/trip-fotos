export const isLoggedInUser = (id, userId) => {
	if (id !== userId) {
		return false
	}
	return true
}

export const delayLoading = (milliseconds) => {
	return new Promise((resolve) => setTimeout(resolve, milliseconds))
}
