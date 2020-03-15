<template>
	<div class="input-field">
		<input
			id="password"
			type="password"
			v-model.trim="password"
			:class="{
				invalid:
					($v.password.$dirty && !$v.password.required) ||
					($v.password.$dirty && !$v.password.minLength),
			}"
			:disabled="disabled"
		/>

		<label for="password">Пароль</label>

		<small class="helper-text invalid" v-if="$v.password.$dirty && !$v.password.required"
			>Введите пароль</small
		>
		<small class="helper-text invalid" v-else-if="$v.password.$dirty && !$v.password.minLength"
			>Минимальное количество символов {{ $v.password.$params.minLength.min }}. Сейчас он
			{{ password.length }}</small
		>
	</div>
</template>

<script>
import { minLength, required } from 'vuelidate/lib/validators';

export default {
	name: 'field-password',
	props: {
		disabled: {
			type: Boolean,
			default: false,
		},
	},
	data: () => ({
		password: '',
	}),
	validations: {
		password: { required, minLength: minLength(6) },
	},
	methods: {
		async checkValidate() {
			return new Promise((resolve, reject) => {
				if (this.$v.$invalid) {
					this.$v.$touch();
					reject(new Error('Не верный пароль'));
				}
				resolve(this.password);
			});
		},
	},
};
</script>
