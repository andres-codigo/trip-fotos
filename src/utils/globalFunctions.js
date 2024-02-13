import moment from 'moment'

export const isLoggedInUser = (id, userId) => {
	if (id !== userId) {
		return false
	}
	return true
}

export function formatDate(value, format) {
	return moment(value, format)
}

export function delayLoading(milliseconds) {
	return new Promise((resolve) => setTimeout(resolve, milliseconds))
}
