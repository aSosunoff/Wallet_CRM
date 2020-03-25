<template>
	<div>
		<div class="page-title">
			<h3>Категории</h3>
		</div>

		<section>
			<Loader v-if="loading" />

			<div class="row" v-else>
				<div
					class="col s12"
					:class="{ m6: GET_CATEGORIES.length > 0, m12: GET_CATEGORIES.length == 0 }"
				>
					<Create />
				</div>

				<div class="col s12 m6">
					<Edit v-if="GET_CATEGORIES.length" />
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
	name: 'category',
	data: () => ({
		loading: true,
	}),
	async mounted() {
		await this.LOAD_CATEGORIES();
		this.loading = false;
	},
	computed: {
		...mapGetters(['GET_CATEGORIES']),
	},
	components: {
		Create: () => import('@/components/Category/Create'),
		Edit: () => import('@/components/Category/Edit'),
	},
	methods: {
		...mapActions(['LOAD_CATEGORIES']),
	},
};
</script>
