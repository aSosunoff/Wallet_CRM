<template>
	<div class="input-field">
		<input
			id="name"
			type="text"
			v-model.trim="name"
			:class="{ invalid: $v.name.$dirty && !$v.name.required }"
			:disabled="disabled"
		/>

		<label for="name">Имя</label>

		<small class="helper-text invalid" v-if="$v.name.$dirty && !$v.name.required"
			>Необходимо ввести имя</small
		>
	</div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';

export default {
	name: 'field-name',
	props: {
		disabled: {
			type: Boolean,
			default: false,
		},
	},
	data: () => ({
		name: '',
	}),
	validations: {
		name: { required },
	},
	methods: {
		async checkValidate() {
			return new Promise((resolve, reject) => {
				if (this.$v.$invalid) {
					this.$v.$touch();
					reject(new Error('Не введено имя'));
				}
				resolve(this.name);
			});
		},
	},
};
</script>
