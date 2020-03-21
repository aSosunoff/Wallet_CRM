<template>
	<div>
		<div class="page-subtitle">
			<h4>Редактировать</h4>
		</div>

		<form @submit.prevent="onSubmit">
			<FieldCategories ref="fieldCategories" />

			<FieldTitle ref="fieldTitle" />

			<FieldLimit ref="fieldLimit" />

			<button class="btn waves-effect waves-light" type="submit">
				Обновить
				<i class="material-icons right">send</i>
			</button>
		</form>
	</div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
	name: 'category-edit',
	components: {
		FieldCategories: () => import('@/components/Category/field.categories.vue'),
		FieldTitle: () => import('@/components/Category/field.title.vue'),
		FieldLimit: () => import('@/components/Category/field.limit.vue'),
	},
	computed: {
		...mapGetters(['GET_CURRENT']),
	},
	watch: {
		GET_CURRENT(category) {
			this.$refs.fieldTitle.title = category.title;
			this.$refs.fieldLimit.limit = category.limit;
		},
	},
	methods: {
		...mapActions(['EDIT_CATEGORY']),
		...mapMutations(['SET_ERROR']),

		async onSubmit() {
			try {
				const res = await Promise.allSettled([
					this.$refs.fieldCategories.checkValidate(),
					this.$refs.fieldTitle.checkValidate(),
					this.$refs.fieldLimit.checkValidate(),
				]);

				const err = res.filter(e => e.status === 'rejected').map(e => e.reason.message);

				if (err.length) {
					throw new Error(err.join('</br>'));
				}

				const [id, title, limit] = res.map(e => e.value);

				await this.EDIT_CATEGORY({
					id,
					title,
					limit,
				});

				this.$message('Категория была обновлена');
			} catch (e) {
				this.SET_ERROR(e);
			}
		},
	},
};
</script>
