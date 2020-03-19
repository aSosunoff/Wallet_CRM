<template>
	<div>
		<div class="page-title">
			<h3>Категории</h3>
		</div>
		<section>
			<div class="row">
				<CategoryCreate />

				<CategoryEdit />
			</div>
		</section>
	</div>
</template>

<script>
export default {
	components: {
		CategoryCreate: () => import('@/components/CategoryCreate'),
		CategoryEdit: () => import('@/components/CategoryEdit'),
	},
};
</script>
