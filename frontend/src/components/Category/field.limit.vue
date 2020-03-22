<template>
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
			>Необходимо ввести минимальный лимит {{ $v.limit.$params.minValue.min }}</small
		>

		<small class="helper-text invalid" v-else-if="$v.limit.$dirty && !$v.limit.required"
			>Необходимо заполнить лимит</small
		>
	</div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators';

export default {
	name: 'field-title',
	data: () => ({
		limit: 100,
	}),
	validations: {
		limit: { required, minValue: minValue(100) },
	},
	methods: {
		async checkValidate() {
			return new Promise((resolve, reject) => {
				if (this.$v.$invalid) {
					this.$v.$touch();
					reject(new Error('Ошибка в значении лимита'));
					return;
				}
				resolve(this.limit);
			});
		},
		clearValue() {
			this.$v.$reset();
			this.limit = 100;
		},
	},
	updated() {
		window.M.updateTextFields();
	},
	mounted() {
		window.M.updateTextFields();
	},
};
</script>
