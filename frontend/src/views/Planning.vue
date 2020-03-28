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
					<p v-tooltip="cat.tooltip">
						<strong>{{ cat.title }}:</strong>
						{{ cat.sumAmount | currencyFilter('RUB') }} из
						{{ cat.limit | currencyFilter('RUB') }}

						<a
							style="cursor:pointer"
							@click.prevent="cat.visibleInfo = !cat.visibleInfo"
							class="right"
							>информация</a
						>
					</p>

					<div class="progress">
						<div
							class="determinate"
							:class="cat.progressColor"
							:style="{ width: cat.progressPercent }"
						></div>
					</div>

					<transition name="fade">
						<div v-if="cat.visibleInfo">
							<table>
								<thead>
									<tr>
										<th>Описание</th>
										<th>Тип</th>
										<th>Сумма</th>
									</tr>
								</thead>

								<tbody>
									<tr v-for="rec of cat.records" :key="rec.id">
										<td>{{ rec.description }}</td>
										<td>{{ rec.type | recordType }}</td>
										<td>{{ rec.amount }}</td>
									</tr>
								</tbody>
							</table>
						</div>
					</transition>
				</div>
			</section>
		</template>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import currencyFilter from '@/filters/currency.filter';

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

			const tooltip = currencyFilter(cat.limit - sumAmount, 'RUB');

			return {
				title: cat.title,
				sumAmount,
				limit: cat.limit,
				progressPercent: `${progressPercent}%`,
				progressColor,
				records: cat.records,
				visibleInfo: false,
				tooltip: `остаток ${tooltip}`,
			};
		});

		this.loading = false;
	},
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
	transition: all 0.2s ease;
}
.fade-enter,
.fade-leave-to {
	transform: translateY(-10px);
	opacity: 0;
}
</style>
