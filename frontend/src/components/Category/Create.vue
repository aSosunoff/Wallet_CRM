<template>
	<div>
		<div class="page-subtitle">
			<h4>Создать</h4>
		</div>

		<form @submit.prevent="onSubmit">
			<FieldTitle ref="fieldTitle" />

			<FieldLimit ref="fieldLimit" />

			<button class="btn waves-effect waves-light" type="submit">
				Создать
				<i class="material-icons right">send</i>
			</button>
		</form>
	</div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';

export default {
	name: 'category-create',
	components: {
		FieldTitle: () => import('@/components/Category/field.title.vue'),
		FieldLimit: () => import('@/components/Category/field.limit.vue'),
	},
	methods: {
		...mapActions(['CREATE_CATEGORY']),
		...mapMutations(['SET_ERROR']),

		async onSubmit() {
			try {
				const res = await Promise.allSettled([
					this.$refs.fieldTitle.checkValidate(),
					this.$refs.fieldLimit.checkValidate(),
				]);

				const err = res.filter(e => e.status === 'rejected').map(e => e.reason.message);

				if (err.length) {
					throw new Error(err.join('</br>'));
				}

				const [title, limit] = res.map(e => e.value);

				await this.CREATE_CATEGORY({
					title,
					limit,
				});

				this.$message('Категория была создана');

				this.$refs.fieldTitle.clearValue();
				this.$refs.fieldLimit.clearValue();
			} catch (e) {
				this.SET_ERROR(e);
			}
		},
	},
};
</script>
