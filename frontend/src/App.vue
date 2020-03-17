<template>
	<component :is="layout" />
</template>

<script>
import EmptyLayout from '@/layouts/EmptyLayout.vue';
import MainLayout from '@/layouts/MainLayout.vue';

export default {
	computed: {
		layout() {
			const layout = this.$route.meta.layout || 'empty';
			return `${layout}-layout`;
		},
	},
	components: {
		EmptyLayout,
		MainLayout,
	},
	mounted() {
		window.axios.defaults.withCredentials = true;
	},
};
</script>

<style lang="scss">
@import '~materialize-css/dist/css/materialize.min.css';
@import 'assets/index.css';
</style>
