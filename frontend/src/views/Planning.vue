<template>
	<div>
		<div class="page-title">
			<h3>Планирование</h3>
			<h4>12 212</h4>
		</div>

		<Loader v-if="loading" />

		<section v-else>
			<div>
				<p>
					<strong>Девушка:</strong>
					12 122 из 14 0000
				</p>
				<div class="progress">
					<div class="determinate green" style="width:40%"></div>
				</div>
			</div>
		</section>
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
