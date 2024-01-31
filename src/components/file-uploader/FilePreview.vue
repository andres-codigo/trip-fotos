<template>
	<component :is="tag" class="file-preview">
		<button @click="$emit('remove', file)" class="close-icon">&times;</button>
		<img :src="file.url" :alt="file.file.name" :title="file.file.name" />

		<span
			class="status-indicator loading-indicator"
			v-show="file.status == 'loading'"
			>In Progress</span
		>
		<span
			class="status-indicator success-indicator"
			v-show="file.status == true"
			>Uploaded</span
		>
		<span
			class="status-indicator failure-indicator"
			v-show="file.status == false"
			>Error</span
		>
	</component>
</template>

<script setup>
defineProps({
	file: { type: Object, required: true },
	tag: { type: String, default: 'li' },
})

defineEmits(['remove'])
</script>

<style scoped lang="scss">
.file-preview {
	aspect-ratio: 1/1;
	margin: 1rem 2.5%;
	overflow: hidden;
	position: relative;
	width: 20%;

	img {
		display: block;
		height: 100%;
		object-fit: cover;
		width: 100%;
	}

	.close-icon,
	.status-indicator {
		--size: $checkbox-size-20px;
		appearance: none;
		border: 0;
		border-radius: var(--size);
		box-shadow: 0 0 5px currentColor;
		height: var(--size);
		line-height: var(--size);
		padding: 0;
		position: absolute;
		right: 0.25rem;
	}

	.close-icon {
		background: $color-el-salva;
		color: $color-white;
		cursor: pointer;
		font-size: var(--size);
		top: 0.25rem;
		width: var(--size);
	}

	.status-indicator {
		bottom: 0.25rem;
		font-size: calc(0.75 * var(--size));
		padding: 0 10px;
	}

	.loading-indicator {
		animation: pulse 1.5s linear 0s infinite;
		color: $color-black;
	}

	.success-indicator {
		background: $color-mantis;
		color: $color-japanese-laurel;
	}

	.failure-indicator {
		background: $color-el-salva;
		color: $color-white;
	}
}

@keyframes pulse {
	0% {
		background: $color-white;
	}

	50% {
		background: $color-alto;
	}

	100% {
		background: $color-white;
	}
}
</style>
