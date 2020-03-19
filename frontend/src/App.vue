<template>
	<component :is="layout" />
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	computed: {
		layout() {
			const layout = this.$route.meta.layout || 'empty';
			return `${layout}-layout`;
		},
		...mapGetters(['GET_ERROR']),
	},
	watch: {
		GET_ERROR(e) {
			let message = 'Не известная ошибка';

			if (e.code === 'ECONNABORTED') {
				message = 'Превышен лимит запроса';
			} else if (e.response && 'data' in e.response) {
				message = e.response.data;
			} else if (e instanceof Error) {
				message = e.message;
			} else if (typeof e === 'string') {
				message = e;
			}

			this.$error(message);
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
