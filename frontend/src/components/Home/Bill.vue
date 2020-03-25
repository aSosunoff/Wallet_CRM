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
import { mapGetters } from 'vuex';

export default {
	name: 'home-bill',
	props: ['rates'],
	data: () => ({
		currencies: ['RUB', 'USD', 'EUR'],
	}),
	computed: {
		...mapGetters(['GET_AUTH_USER']),

		base() {
			return this.GET_AUTH_USER.bill / (this.rates.RUB / this.rates.EUR);
		},
	},
	methods: {
		getCurrency(currency) {
			return Math.floor(this.base * this.rates[currency]);
		},
	},
};
</script>
