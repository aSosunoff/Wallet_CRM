<template>
	<div>
		<div class="page-title">
			<h3>Планирование</h3>
			<h4>12 212</h4>
		</div>

		<Loader v-if="loading" />

		<template v-else>
			<section v-for="cat of GET_CATEGORIES" :key="cat.id">
				<div>
					<p>
						<strong>{{ cat.title }}:</strong>
						12 122 из {{ cat.limit }}
					</p>
					<div class="progress">
						<div class="determinate green" style="width:40%"></div>
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
		...mapGetters(['GET_CATEGORIES']),
	},
	methods: {
		...mapActions(['LOAD_CATEGORIES']),
	},
	async mounted() {
		await this.LOAD_CATEGORIES();

		this.loading = false;
	},
};
</script>
