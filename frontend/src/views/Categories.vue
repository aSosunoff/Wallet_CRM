<template>
	<div>
		<div class="page-title">
			<h3>Категории</h3>
		</div>
		<section>
			<div class="row">
				<CategoryCreate @createCategory="createCategory" />

				<CategoryEdit />
			</div>

			<div class="row">
				<div class="col s12" v-for="category in categories" :key='category._id'>
					{{ category.title }} {{ category.limit }} {{ category._id }}
				</div>
			</div>
		</section>
	</div>
</template>

<script>
export default {
	name: 'category',
	data: () => ({
		categories: [],
	}),
	components: {
		CategoryCreate: () => import('@/components/CategoryCreate'),
		CategoryEdit: () => import('@/components/CategoryEdit'),
	},
	methods: {
		createCategory(newCatogory) {
			this.categories.push(newCatogory);
		},
	},
};
</script>
