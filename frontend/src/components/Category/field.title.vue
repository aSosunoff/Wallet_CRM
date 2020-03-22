<template>
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
</template>

<script>
import { required } from 'vuelidate/lib/validators';

export default {
	name: 'field-title',
	data: () => ({
		title: '',
	}),
	validations: {
		title: { required },
	},
	methods: {
		async checkValidate() {
			return new Promise((resolve, reject) => {
				if (this.$v.$invalid) {
					this.$v.$touch();
					reject(new Error('Необходимо заполнить наименование категории'));
					return;
				}
				resolve(this.title);
			});
		},
		clearValue() {
			this.$v.$reset();
			this.title = '';
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
