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
import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'history',
	data: () => ({
		loading: true,
	}),
	computed: {
		...mapGetters(['GET_RECORDS']),
	},
	methods: {
		...mapActions(['GET_ALL_RECORDS']),
	},
	async mounted() {
		if (!this.GET_RECORDS.length) {
			await this.GET_ALL_RECORDS();
		}

		this.loading = false;
	},
	components: {
		Table: () => import('@/components/History/Table'),
	},
};
</script>
