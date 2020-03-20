<template>
	<div class="col s12 m6">
		<div>
			<div class="page-subtitle">
				<h4>Создать</h4>
			</div>

			<Form
				btnSubmitName="Создать"
				typeForm="create"
				successMessage="Категория была создана"
			/>
		</div>
	</div>
</template>

<script>
export default {
	name: 'category-create',
	components: {
		Form: () => import('@/components/Category/Form'),
	},
};
</script>
