<template>
	<div class="col s12 m6">
		<div>
			<div class="page-subtitle">
				<h4>Редактировать</h4>
			</div>

			<Form
				btnSubmitName="Обновить"
				typeForm="edit"
				successMessage="Категория была изменена"
			/>
		</div>
	</div>
</template>

<script>
export default {
	name: 'category-edit',
	components: {
		Form: () => import('@/components/Category/Form'),
	},
};
</script>
