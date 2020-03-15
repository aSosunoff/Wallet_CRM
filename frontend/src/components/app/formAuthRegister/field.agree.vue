<template>
	<label>
		<input type="checkbox" v-model="agree" :disabled="disabled"/>
		<span>С правилами согласен</span>
	</label>
</template>

<script>
export default {
	name: 'field-agree',
	props: {
		disabled: {
			type: Boolean,
			default: false,
		},
	},
	data: () => ({
		agree: false,
	}),
	validations: {
		agree: { checked: v => v },
	},
	methods: {
		async checkValidate() {
			return new Promise((resolve, reject) => {
				if (this.$v.$invalid) {
					this.$v.$touch();
					reject(new Error('Необходимо согласиться с правилами'));
				}
				resolve(this.agree);
			});
		},
	},
};
</script>
