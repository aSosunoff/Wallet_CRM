<template>
	<div>
		<div class="page-title">
			<h3>История записей</h3>
		</div>

		<Loader v-if="loading" />

		<div v-else>
			<div class="history-chart">
				<canvas></canvas>
			</div>

			<section>
				<Table />
			</section>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	name: 'history',
	data: () => ({
		loading: true,
	}),
	components: {
		Table: () => import('@/components/History/Table'),
	},
	methods: {
		...mapActions(['GET_ALL_RECORDS']),
	},
	async mounted() {
		await this.GET_ALL_RECORDS();

		this.loading = false;
	},
};
</script>
