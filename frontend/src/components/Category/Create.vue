<template>
	<div class="col s12 m6">
		<div>
			<div class="page-subtitle">
				<h4>Создать</h4>
			</div>

			<Form
				btnSubmitName="Создать"
				typeForm="create"
				@onSubmit="onSubmit"
			/>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	name: 'category-create',
	components: {
		Form: () => import('@/components/Category/Form'),
	},
	methods: {
		...mapActions(['CREATE_CATEGORY']),

		async onSubmit(category) {
			await this.CREATE_CATEGORY(category);
			this.$message('Категория была создана');
		},
	},
};
</script>
