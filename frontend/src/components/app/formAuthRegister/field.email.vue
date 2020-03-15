<template>
	<div class="input-field">
		<input
			id="email"
			type="text"
			v-model.trim="email"
			:class="{
				invalid:
					($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email),
			}"
			:disabled="disabled"
		/>

		<label for="email">Email</label>

		<small class="helper-text invalid" v-if="$v.email.$dirty && !$v.email.required"
			>Необходимо заполнить поле email</small
		>
		<small class="helper-text invalid" v-else-if="$v.email.$dirty && !$v.email.email"
			>Поле email не корректно</small
		>
	</div>
</template>

<script>
import { email, required } from 'vuelidate/lib/validators';

export default {
	name: 'field-email',
	props: {
		disabled: {
			type: Boolean,
			default: false,
		},
	},
	data: () => ({
		email: '',
	}),
	validations: {
		email: { email, required },
	},
	methods: {
		async checkValidate() {
			return new Promise((resolve, reject) => {
				if (this.$v.$invalid) {
					this.$v.$touch();
					reject(new Error('Не верный email'));
				}
				resolve(this.email);
			});
		},
	},
};
</script>
