<template>
	<div>
		<div class="page-title">
			<h3>Счет</h3>

			<button class="btn waves-effect waves-light btn-small" @click="refresh">
				<i class="material-icons">refresh</i>
			</button>
		</div>

		<Loader v-if="loading" />

		<div v-else class="row">
			<HomeBill :rates="currency.rates" />

			<HomeCurrency :rates="currency.rates" :date="currency.date" />
		</div>
	</div>
</template>

<script>
import HomeBill from '@/components/HomeBill.vue';
import HomeCurrency from '@/components/HomeCurrency.vue';

import { mapActions } from 'vuex';

export default {
	name: 'home',
	data: () => ({
		loading: true,
		currency: null,
	}),
	methods: {
		...mapActions(['FETCH_FIXER']),

		async refresh() {
			this.loading = true;
			this.currency = await this.FETCH_FIXER();
			this.loading = false;
		},
	},
	async mounted() {
		try {
			this.currency = await this.FETCH_FIXER();
			this.loading = false;
		} catch (e) {
			/* continue regardless of error */
		}
	},
	components: {
		HomeBill,
		HomeCurrency,
	},
};
</script>
