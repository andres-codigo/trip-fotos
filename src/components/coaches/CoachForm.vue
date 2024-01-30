CoachForm

<template>
	<form @submit.prevent="submitForm">
		<div v-for="(field, key) in fields" :key="key">
			<div
				v-if="field.type === 'text'"
				:class="['form-control', { invalid: !field.isValid }]"
			>
				<label :for="key">{{ field.label }}</label>
				<input
					:type="field.type"
					:id="key"
					v-model.trim="field.val"
					@blur="clearValidity(key)"
				/>

				<p :class="{ invalid: !field.isValid }" v-if="!field.isValid">
					{{ field.label }} must not be empty.
				</p>
			</div>
			<div
				v-else-if="field.type === 'textarea'"
				:class="['form-control', { invalid: !field.isValid }]"
			>
				<label :for="key">{{ field.label }}</label>
				<textarea
					:type="field.type"
					:id="key"
					rows="5"
					v-model.trim="field.val"
					@blur="clearValidity(key)"
				></textarea>
				<p :class="{ invalid: !field.isValid }" v-if="!field.isValid">
					{{ field.label }} must not be empty.
				</p>
			</div>
			<div
				v-else-if="field.type === 'number'"
				:class="['form-control', { invalid: !field.isValid }]"
			>
				<label :for="key">{{ field.label }}</label>
				<input
					:type="field.type"
					:id="key"
					v-model.number="field.val"
					@blur="clearValidity(key)"
				/>
				<p :class="{ invalid: !field.isValid }" v-if="!field.isValid">
					Rate must be greater than 0.
				</p>
			</div>
			<div
				v-else-if="field.type === 'checkbox'"
				:class="['form-control', { invalid: !field.isValid }]"
			>
				<h3>{{ field.label }}</h3>
				<div v-for="(expertiseItem, key) in field.areaTypes" :key="key">
					<input
						:type="field.type"
						:id="expertiseItem.area"
						:value="expertiseItem.area"
						v-model="field.val"
						@blur="clearValidity('areas')"
					/>
					<label :for="expertiseItem.area">{{ expertiseItem.label }}</label>
				</div>
				<p v-if="!field.isValid">At least one expertise must be selected.</p>
			</div>
		</div>
		<AddFile @updated-files-list="updateFilesList" ref="child" />
		<p :class="{ invalid: !formIsValid }" v-if="!formIsValid">
			Please fix the above errors and submit again.
		</p>
		<base-button>Register</base-button>
	</form>
</template>

<script>
import AddFile from '../file-uploader/AddFile.vue'

export default {
	components: {
		AddFile,
	},
	emits: ['save-data'],
	data() {
		return {
			fields: {
				firstName: {
					label: 'First name',
					type: 'text',
					val: '',
					isValid: true,
				},
				lastName: {
					label: 'Last name',
					type: 'text',
					val: '',
					isValid: true,
				},
				description: {
					label: 'Description',
					type: 'textarea',
					val: '',
					isValid: true,
				},
				rate: {
					label: 'Hourly rate',
					type: 'number',
					val: null,
					isValid: true,
				},
				areas: {
					label: 'Areas of Expertise',
					type: 'checkbox',
					val: [],
					isValid: true,
					areaTypes: {
						0: {
							area: 'frontend',
							label: 'Frontend Development',
						},
						1: {
							area: 'backend',
							label: 'Backend Development',
						},
						2: {
							area: 'career',
							label: 'Career Advisory',
						},
					},
				},
			},
			files: {
				val: [],
			},
			formIsValid: true,
		}
	},
	methods: {
		clearValidity(input) {
			if (
				this.fields[input].val === '' ||
				(this.fields[input].type === 'number' && !this.fields[input].val) ||
				(this.fields[input].type === 'number' && this.fields[input].val < 0)
			) {
				this.fields[input].isValid = false
			} else {
				this.fields[input].isValid = true
			}
		},
		validateForm() {
			this.formIsValid = true

			if (this.fields.firstName.val === '') {
				this.fields.firstName.isValid = false
				this.formIsValid = false
			}
			if (this.fields.lastName.val === '') {
				this.fields.lastName.isValid = false
				this.formIsValid = false
			}
			if (this.fields.description.val === '') {
				this.fields.description.isValid = false
				this.formIsValid = false
			}
			if (!this.fields.rate.val || this.fields.rate.val < 0) {
				this.fields.rate.isValid = false
				this.formIsValid = false
			}
			if (this.fields.areas.val.length === 0) {
				this.fields.areas.isValid = false
				this.formIsValid = false
			}
		},
		updateFilesList() {
			this.files.val = this.$refs.child.files
		},
		submitForm() {
			this.validateForm()

			if (!this.formIsValid) {
				return
			}

			const formData = {
				first: this.fields.firstName.val,
				last: this.fields.lastName.val,
				desc: this.fields.description.val,
				rate: this.fields.rate.val,
				areas: this.fields.areas.val,
				files: this.files.val,
			}

			this.$emit('save-data', formData)
		},
	},
}
</script>

<style scoped lang="scss">
.card {
	form {
		.form-control {
			margin: 0.5rem 0;

			label {
				display: block;
				font-weight: bold;
				margin-bottom: 0.5rem;
			}

			input,
			textarea {
				border: 1px solid $color-silver;
				display: block;
				font: inherit;
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

			input[type='checkbox'] {
				opacity: 0;
				position: absolute;

				// Text
				& + label {
					cursor: pointer;
					display: inline-block;
					font-weight: normal;
					line-height: $checkbox-size-20px;
					padding-left: $checkbox-size-20px + 10;
					position: relative;
					@include user-select(none);

					// Checkbox
					&:before {
						background: transparent;
						border-radius: 4px;
						box-shadow: inset 0 0 0 1px $color-alto;
						content: '';
						display: block;
						height: $checkbox-size-20px;
						left: 0;
						position: absolute;
						top: 0;
						width: $checkbox-size-20px;

						transition: 200ms ease-in-out all;
					}

					// Tick
					&:after {
						border-bottom: 1px solid transparent;
						border-right: 1px solid transparent;
						content: '';
						display: block;
						height: 7px;
						left: 8px;
						position: absolute;
						top: 5px;
						transform: rotate(45deg);
						width: 3px;

						transition: 200ms ease-in-out all;
					}
				}

				// Hover
				& + label:hover {
					color: $color-mine-shaft;
				}

				// Focus
				& + label:focus {
					outline: none;
				}

				// Checked
				&:checked {
					& + label {
						&:before {
							background: $color-ripe-plum;
							box-shadow: none;
						}
						&:after {
							border-color: $color-white;
						}
					}
				}
			}

			h3 {
				font-size: 1rem;
				margin: 0.5rem 0;
			}
			&.invalid {
				// label,
				p {
					color: $color-red;
					margin-top: 0.25rem;
				}

				input,
				textarea {
					border: 1px solid $color-red;
				}

				input[type='checkbox'] {
					& + label {
						&:before {
							box-shadow: inset 0 0 0 1px $color-red;
						}
					}
				}
			}
		}

		p {
			&.invalid {
				color: $color-red;
				margin-top: 0.25rem;
			}
		}
	}
}
</style>
