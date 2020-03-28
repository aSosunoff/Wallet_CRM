<template>
	<div>
		<div class="page-title">
			<h3>История записей</h3>
		</div>

		<Loader v-if="loading" />

		<div v-else>
			<div class="history-chart">
				<HistoryChart :labels="labels" :datasetData="datasetData" />
			</div>

			<section>
				<TableHistory :items="GET_RECORDS" />
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
		labels: [],
		datasetData: [],
	}),
	computed: {
		...mapGetters(['GET_RECORDS', 'GET_CATEGORIES']),
	},
	methods: {
		...mapActions(['LOAD_RECORDS', 'LOAD_CATEGORIES']),
	},
	async mounted() {
		await this.LOAD_RECORDS();

		await this.LOAD_CATEGORIES();

		this.labels = this.GET_CATEGORIES.map(e => e.title);

		this.datasetData = this.GET_CATEGORIES.map(category => category.records.reduce(
			(r, e) => (e.type === 'outcome' ? r + e.amount : r - e.amount),
			0,
		));

		this.loading = false;
	},
	components: {
		TableHistory: () => import('@/components/History/TableHistory'),
		HistoryChart: () => import('@/components/History/HistoryChart'),
	},
};
</script>
