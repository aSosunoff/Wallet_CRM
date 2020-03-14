<template>
	<component :is="layout"/>
</template>

<script>
import EmptyLayout from '@/layouts/EmptyLayout.vue';
import MainLayout from '@/layouts/MainLayout.vue';

export default {
	computed: {
		layout() {
			console.log(this);
			console.log(this.$route);
			const layput = this.$route.meta.layout || 'empty';
			return `${layput}-layout`;
		},
	},
	components: {
		EmptyLayout,
		MainLayout,
	},
};
</script>

<style lang="scss">
@import '~materialize-css/dist/css/materialize.min.css';
@import 'assets/index.css';
</style>
