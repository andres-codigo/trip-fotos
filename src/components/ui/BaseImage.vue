<template>
	<span class="image-preview">
		<img :src="url" />
	</span>
</template>

<script>
export default {
	props: ['url'],
}
</script>

<style scoped lang="scss">
.image-preview {
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
}
</style>
