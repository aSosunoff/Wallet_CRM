<template>
	<div class="col s12 m6">
		<div>
			<div class="page-subtitle">
				<h4>Редактировать</h4>
			</div>

			<Form
				btnSubmitName="Обновить"
				typeForm="edit"
				@onSubmit="onSubmit"
			/>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	name: 'category-edit',
	components: {
		Form: () => import('@/components/Category/Form'),
	},
	methods: {
		...mapActions(['EDIT_CATEGORY']),

		async onSubmit(category) {
			await this.EDIT_CATEGORY(category);
			this.$message('Категория была изменена');
		},
	},
};
</script>
