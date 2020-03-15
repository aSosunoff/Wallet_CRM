<template>
	<form class="card auth-card hoverable" @submit.prevent="onSubmit">
		<div class="card-content">
			<span class="card-title">Регистрация</span>

			<FieldEmail :disabled="checkForm"></FieldEmail>

			<FieldPassword :disabled="checkForm"></FieldPassword>

			<FieldName :disabled="checkForm"></FieldName>

			<FieldAgree :disabled="checkForm"></FieldAgree>
		</div>

		<div class="card-content red lighten-5" v-show="canAccess">
			{{ canAccess }}
		</div>

		<div class="card-action" v-if="!checkForm">
			<div>
				<button class="btn waves-effect waves-light auth-submit" type="submit">
					Зарегистрироваться
					<i class="material-icons right">send</i>
				</button>
			</div>

			<p class="center">
				Уже есть аккаунт?
				<router-link to="/login">Войти</router-link>
			</p>
		</div>

		<div class="progress" v-else>
			<div class="indeterminate"></div>
		</div>
	</form>
</template>

<script>
import FieldEmail from '@/components/app/formAuthRegister/field.email.vue';
import FieldPassword from '@/components/app/formAuthRegister/field.password.vue';
import FieldName from '@/components/app/formAuthRegister/field.name.vue';
import FieldAgree from '@/components/app/formAuthRegister/field.agree.vue';

export default {
	name: 'register',
	data: () => ({
		canAccess: '',
		checkForm: false,
	}),
	components: {
		FieldEmail,
		FieldPassword,
		FieldName,
		FieldAgree,
	},
	methods: {
		onCheckForm(formData, callback) {
			console.log(formData);
			setTimeout(() => {
				callback('У вас нет прав для входа');
				// callback();
			}, 4000);
		},
		onSubmit() {
			Promise.all(
				this.$children
					.filter(e => ['field-email', 'field-password', 'field-name', 'field-agree'].includes(e.$options.name))
					.map(e => e.checkValidate()),
			)
				.then(res => ({
					email: res[0],
					password: res[1],
					name: res[2],
					agree: res[3],
				}))
				.then(formData => {
					this.checkForm = true;
					this.canAccess = '';
					this.onCheckForm(formData, canAccess => {
						this.canAccess = canAccess;

						if (!canAccess) {
							this.$router.push('/');
						}

						this.checkForm = false;
					});
				})
				.catch(err => {
					this.$message(err.message);
				});
		},
	},
};
</script>
