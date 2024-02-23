// Stjepan Crncic's most excellent article on implementing a click outside event to show/hide hamburger menu
// https://medium.com/@stjepan.crncic/crafting-a-simple-click-outside-directive-in-vue-3-980c55ab1a65

export default {
	beforeMount(el, binding) {
		el.clickOutsideEvent = function (event) {
			// Check if the clicked element is neither the element
			// to which the directive is applied nor its child
			if (!(el === event.target || el.contains(event.target))) {
				// Invoke the provided method
				binding.value(event)
			}
		}
		document.addEventListener('click', el.clickOutsideEvent)
	},
	unmounted(el) {
		// Remove the event listener when the bound element is unmounted
		document.removeEventListener('click', el.clickOutsideEvent)
	},
}
