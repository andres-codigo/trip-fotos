<template>
	<form @submit.prevent="submitForm">
		<div :class="['form-control', { invalid: !email.isValid }]">
			<label for="email">{{ email.label }}</label>
			<input
				:type="email.type"
				id="email"
				v-model.trim="email.val"
				@blur="clearValidity('email')"
			/>
			<p :class="{ invalid: !email.isValid }" v-if="!email.isValid">
				Please enter a valid email address.
			</p>
		</div>
		<div :class="['form-control', { invalid: !message.isValid }]">
			<label for="message">{{ message.label }}</label>
			<textarea
				:type="message.type"
				rows="5"
				id="message"
				v-model.trim="message.val"
				@blur="clearValidity('message')"
			></textarea>
			<p v-if="!message.isValid">Message must not be empty.</p>
		</div>
		<div class="actions">
			<base-button>Send Message</base-button>
		</div>
	</form>
</template>

<script>
export default {
	data() {
		return {
			email: {
				label: 'Your E-Mail',
				type: 'email',
				val: '',
				isValid: true,
			},
			message: {
				label: 'Message',
				type: 'textarea',
				val: '',
				isValid: true,
			},
			formIsValid: true,
		}
	},
	methods: {
		clearValidity(input) {
			if (
				this[input].val === '' ||
				(this[input].type === 'email' && !this[input].val.includes('@'))
			) {
				this[input].isValid = false
			} else {
				this[input].isValid = true
			}
		},
		validateForm() {
			this.formIsValid = true

			if (this.email.val === '') {
				this.email.isValid = false
				this.formIsValid = false
			}
			if (this.message.val === '') {
				this.message.isValid = false
				this.formIsValid = false
			}
		},
		submitForm() {
			this.validateForm()

			if (!this.formIsValid) {
				return
			}

			this.$store.dispatch('requests/contactCoach', {
				email: this.email.val,
				message: this.message.val,
				coachId: this.$route.params.id,
			})
			this.$router.replace('/coaches')
		},
	},
}
</script>

<style scoped lang="scss">
form {
	.form-control {
		margin: 0.5rem 0;

		label {
			font-weight: bold;
			display: block;
			margin-bottom: 0.5rem;
		}

		input,
		textarea {
			border: 1px solid $color-silver;
			display: block;
			font: inherit;
			padding: 0.15rem;
			width: 100%;

			&:focus {
				background-color: $color-selago;
				border-color: $color-pigment-indigo;
				outline: none;
			}
		}

		textarea {
			height: 150px;
			resize: none;
		}

		&.invalid {
			p {
				color: $color-red;
				margin-top: 0.25rem;
			}

			input,
			textarea {
				border: 1px solid $color-red;
			}
		}
	}
	.actions {
		justify-content: center;
		margin: 0 auto;
		text-align: center;
	}
}
</style>
