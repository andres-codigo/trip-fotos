export const isLoggedInUser = (id, userId) => {
	if (id !== userId) {
		return false
	}
	return true
}
