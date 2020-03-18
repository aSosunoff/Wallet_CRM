<template>
	<div class="col s12 m6 l4">
		<div class="card light-blue bill-card">
			<div class="card-content white-text">
				<span class="card-title">Счет в валюте</span>

				<p v-for="currency in currencies" :key="currency" class="currency-line">
					<span>{{ getCurrency(currency) | currencyFilter(currency) }}</span>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'home-bill',
	props: ['rates'],
	data: () => ({
		currencies: ['RUB', 'USD', 'EUR'],
	}),
	computed: {
		base() {
			return 1000 / (this.rates.RUB / this.rates.EUR);
		},
	},
	methods: {
		getCurrency(currency) {
			return Math.floor(this.base * this.rates[currency]);
		},
	},
};
</script>
