<template>
	<div>
		<div class="page-title">
			<h3>Категории</h3>
		</div>

		<section>
			<Loader v-if="loading" />

			<div class="row" v-else>
				<Create />

				<Edit />
			</div>
		</section>
	</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	name: 'category',
	data: () => ({
		loading: true,
	}),
	async mounted() {
		await this.GET_ALL_CATEGORY();
		this.loading = false;
	},
	components: {
		Create: () => import('@/components/Category/Create'),
		Edit: () => import('@/components/Category/Edit'),
	},
	methods: {
		...mapActions(['GET_ALL_CATEGORY']),
	},
};
</script>
