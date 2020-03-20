<template>
	<div>
		<div class="page-title">
			<h3>Категории</h3>
		</div>

		<section>
			<Loader v-if="loading" />

			<div class="row" v-else>
				<Create @createCategory="createCategory" />

				<Edit :categories="categories" />

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
		Create: () => import('@/components/Category/Create'),
		Edit: () => import('@/components/Category/Edit'),
	},
	methods: {
		...mapActions(['GET_ALL_CATEGORY']),

		createCategory(newCatogory) {
			this.categories.push(newCatogory);
		},
	},
};
</script>
