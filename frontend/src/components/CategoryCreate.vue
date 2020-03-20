<template>
	<div class="col s12 m6">
		<div>
			<div class="page-subtitle">
				<h4>Создать</h4>
			</div>

			<form @submit.prevent="onSubmit">
				<div class="input-field">
					<input
						id="title"
						type="text"
						v-model.trim="title"
						:class="{
							invalid: $v.title.$dirty && !$v.title.required,
						}"
					/>

					<label for="title">Название</label>

					<small class="helper-text invalid" v-if="$v.title.$dirty && !$v.title.required"
						>Необходимо ввести название</small
					>
				</div>

				<div class="input-field">
					<input
						id="limit"
						type="number"
						v-model.number="limit"
						:class="{
							invalid:
								($v.limit.$dirty && !$v.limit.minValue) ||
								($v.limit.$dirty && !$v.limit.required),
						}"
					/>

					<label for="limit">Лимит</label>

					<small class="helper-text invalid" v-if="$v.limit.$dirty && !$v.limit.minValue"
						>Необходимо ввести минимальный лимит
						{{ $v.limit.$params.minValue.min }}</small
					>

					<small
						class="helper-text invalid"
						v-else-if="$v.limit.$dirty && !$v.limit.required"
						>Необходимо заполнить лимит</small
					>
				</div>

				<button class="btn waves-effect waves-light" type="submit">
					Создать
					<i class="material-icons right">send</i>
				</button>
			</form>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex';
import { required, minValue } from 'vuelidate/lib/validators/';

export default {
	name: 'category-create',
	data: () => ({
		title: '',
		limit: 100,
	}),
	validations: {
		title: { required },
		limit: { required, minValue: minValue(100) },
	},
	mounted() {
		window.M.updateTextFields();
	},
	methods: {
		...mapActions(['CREATE_CATEGORY']),

		async onSubmit() {
			try {
				if (this.$v.$invalid) {
					this.$v.$touch();
					return;
				}

				const idСatalog = await this.CREATE_CATEGORY({
					title: this.title,
					limit: this.limit,
				});

				this.$emit('createCategory', {
					_id: idСatalog,
					title: this.title,
					limit: this.limit,
				});

				this.title = '';
				this.limit = 100;
				this.$v.$reset();
				this.$message('Категория была создана');
			} catch (e) {
				/* continue regardless of error */
			}
		},
	},
};
</script>
