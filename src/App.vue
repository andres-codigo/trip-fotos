<template>
	<the-header></the-header>
	<router-view v-slot="slotProps">
		<transition name="route" mode="out-in">
			<component :is="slotProps.Component"></component>
		</transition>
	</router-view>
	<SpeedInsights />
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue'

export default {
	components: {
		TheHeader,
	},
	computed: {
		didAutoLogout() {
			return this.$store.getters.didAutoLogout
		},
	},
	created() {
		this.$store.dispatch('tryLogin')
	},
	watch: {
		didAutoLogout(curValue, oldValue) {
			if (curValue && curValue !== oldValue) {
				this.$router.replace('/coaches')
			}
		},
	},
}
</script>

<script setup>
import { SpeedInsights } from '@vercel/speed-insights/vue'
</script>

<style lang="scss">
@import './styles/global.scss';
</style>
