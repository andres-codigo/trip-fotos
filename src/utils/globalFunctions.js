export const isLoggedInUser = (id, userId) => {
	if (id !== userId) {
		return false
	}
	return true
}

export function delayLoading(milliseconds) {
	return new Promise((resolve) => setTimeout(resolve, milliseconds))
}
