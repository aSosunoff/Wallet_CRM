<template>
	<component :is="layout" />
</template>

<script>
export default {
	computed: {
		layout() {
			const layout = this.$route.meta.layout || 'empty';
			return `${layout}-layout`;
		},
	},
	components: {
		EmptyLayout: () => import('@/layouts/EmptyLayout.vue'),
		MainLayout: () => import('@/layouts/MainLayout.vue'),
	},
};
</script>

<style lang="scss">
@import '~materialize-css/dist/css/materialize.min.css';
@import 'assets/index.css';
</style>
