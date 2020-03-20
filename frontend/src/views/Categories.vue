<template>
	<div>
		<div class="page-title">
			<h3>Категории</h3>
		</div>

		<section>
			<Loader v-if="loading" />

			<div class="row" v-else>
				<CategoryCreate @createCategory="createCategory" />

				<CategoryEdit :categories="categories" />

				<div class="row">
					<div class="col s12" v-for="category in categories" :key="category._id">
						{{ category.title }} {{ category.limit }} {{ category._id }}
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	name: 'category',
	data: () => ({
		categories: [],
		loading: true,
	}),
	async mounted() {
		this.categories = await this.GET_ALL_CATEGORY();
		this.loading = false;
	},
	components: {
		CategoryCreate: () => import('@/components/CategoryCreate'),
		CategoryEdit: () => import('@/components/CategoryEdit'),
	},
	methods: {
		...mapActions(['GET_ALL_CATEGORY']),

		createCategory(newCatogory) {
			this.categories.push(newCatogory);
		},
	},
};
</script>
