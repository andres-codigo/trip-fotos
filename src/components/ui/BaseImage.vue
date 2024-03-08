<template>
	<base-dialog
		:show="!!show"
		:title="title + `'s photos`"
		:section-classes="addImageClasses"
		@close="toggleDialog"
	>
		<img :src="url" />
	</base-dialog>
	<li class="image-preview" @click="toggleDialog">
		<!-- TODO: temporary removal of v-lazy load component as need to refine its usage -->
		<!-- <img v-lazy="url" /> -->
		<img :src="url" />
	</li>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: null,
		},
		url: {
			type: String,
			default: null,
		},
	},
	data() {
		return {
			show: false,
			addImageClasses: true,
		}
	},
	methods: {
		toggleDialog() {
			this.show = !this.show
		},
	},
}
</script>

<style scoped lang="scss">
.image-preview {
	margin: 1rem 2.5%;
	overflow: hidden;
	position: relative;
	width: 28%;

	img {
		cursor: pointer;
		display: block;
		height: 100%;
		object-fit: scale-down;
		width: 100%;
	}
}

@media only screen and (max-width: 480px) {
	.traveller {
		.images {
			.images-list {
				padding: 15px;
				.image-preview {
					margin: 0.5rem 2.5%;
					width: 45%;
				}
			}
		}
	}
}

// Min/max media queries
@include media-query-max-width-image-resizing(357px, 160px);

@include media-query-min-max-width-image-resizing(358px, 666px, 260px);

@include media-query-min-width-image-resizing(667px, 300px);

@include media-query-min-max-width-image-resizing(960px, 2000px, 400px);

// Device orientated min/max media queries
@include media-query-max-device-width-image-resizing(480px, 260px);

@include media-query-ipad-orientation-min-max-device-width-image-resizing(
	481px,
	1024px,
	portrait,
	500px
);

@include media-query-ipad-orientation-min-max-device-width-image-resizing(
	481px,
	1024px,
	landscape,
	400px
);
</style>
