<template>
	<div>
		<div class="page-title">
			<h3>Планирование</h3>
			<h4>{{ GET_AUTH_USER.bill | currencyFilter('RUB') }}</h4>
		</div>

		<Loader v-if="loading" />

		<template v-else>
			<section v-for="cat of categories" :key="cat.id">
				<div>
					<p>
						<strong>{{ cat.title }}:</strong>
						{{ cat.sumAmount | currencyFilter('RUB') }} из
						{{ cat.limit | currencyFilter('RUB') }}
					</p>
					<div class="progress">
						<div
							class="determinate"
							:class="cat.progressColor"
							:style="{ width: cat.progressPercent }"
						></div>
					</div>
				</div>
			</section>
		</template>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
	name: 'planning',
	data: () => ({
		loading: true,
		categories: [],
	}),
	computed: {
		...mapGetters(['GET_CATEGORIES', 'GET_AUTH_USER']),
	},
	methods: {
		...mapActions(['LOAD_CATEGORIES']),

		sumAmount(records) {
			return records.reduce(
				(r, e) => (e.type === 'outcome' ? r + e.amount : r - e.amount),
				0,
			);
		},
	},
	async mounted() {
		await this.LOAD_CATEGORIES();

		this.categories = this.GET_CATEGORIES.map(cat => {
			const sumAmount = this.sumAmount(cat.records);
			const percent = (100 * sumAmount) / cat.limit;
			const progressPercent = percent > 100 ? 100 : percent;

			let progressColor = 'green';

			if (progressPercent > 70) {
				progressColor = 'red';
			} else if (progressPercent > 50) {
				progressColor = 'yellow';
			}

			return {
				title: cat.title,
				sumAmount,
				limit: cat.limit,
				progressPercent: `${progressPercent}%`,
				progressColor,
			};
		});

		this.loading = false;
	},
};
</script>
