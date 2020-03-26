<template>
	<div>
		<div>
			<div class="breadcrumb-wrap">
				<a href="/history" class="breadcrumb">История</a>
				<a class="breadcrumb">
					Расход
				</a>
			</div>

			<Loader v-if="loading" />

			<div v-else class="row">
				<div class="col s12 m6">
					<div class="card red">
						<div class="card-content white-text">
							<p>Описание: {{ record.description }}</p>
							<p>Сумма: {{ record.amount | currencyFilter }}</p>
							<p>Категория: {{ record.category.title }}</p>

							<small>{{ record.created | dateFilter }}</small>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
	data: () => ({
		loading: true,
	}),
	methods: {
		...mapActions(['GET_ALL_RECORDS']),
	},
	computed: {
		...mapGetters(['GET_RECORDS']),
		record() {
			return this.GET_RECORDS.find(e => e.id === this.$route.params.id);
		},
	},
	async mounted() {
		await this.GET_ALL_RECORDS();

		this.loading = false;
	},
};
</script>
