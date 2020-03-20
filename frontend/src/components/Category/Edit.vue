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
				:current_id="id"
				:key="id"
			/>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
	name: 'category-edit',
	data: () => ({
		id: null,
	}),
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
	computed: {
		...mapGetters(['GET_CATEGORIES']),
	},
	mounted() {
		const { id } = this.GET_CATEGORIES[0];
		this.id = id;
	},
};
</script>
