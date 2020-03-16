<template>
	<form class="card auth-card hoverable" @submit.prevent="onSubmit">
		<div class="card-content">
			<span class="card-title">Регистрация</span>

			<FieldEmail ref="fieldEmail" :disabled="checkForm"></FieldEmail>

			<FieldPassword ref="fieldPassword" :disabled="checkForm"></FieldPassword>

			<FieldName ref="fieldName" :disabled="checkForm"></FieldName>

			<FieldAgree ref="fieldAgree" :disabled="checkForm"></FieldAgree>
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
		checkForm: false,
	}),
	components: {
		FieldEmail,
		FieldPassword,
		FieldName,
		FieldAgree,
	},
	methods: {
		async onCheckForm(formData) {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					console.log(formData);
					reject(new Error('У вас нет прав для входа'));
					// resolve();
				}, 4000);
			});
		},
		async onSubmit() {
			try {
				const res = await Promise.allSettled([
					this.$refs.fieldEmail.checkValidate(),
					this.$refs.fieldPassword.checkValidate(),
					this.$refs.fieldName.checkValidate(),
					this.$refs.fieldAgree.checkValidate(),
				]);

				const err = res.filter(e => e.status === 'rejected').map(e => e.reason.message);

				if (err.length) {
					throw new Error(err.join('</br>'));
				}

				const formDataArr = res.map(e => e.value);

				const formData = {
					email: formDataArr[0],
					password: formDataArr[1],
					name: formDataArr[2],
					agree: formDataArr[3],
				};

				this.checkForm = true;

				await this.onCheckForm(formData);

				this.$router.push('/');
			} catch (err) {
				this.$error(err.message);
			} finally {
				this.checkForm = false;
			}
		},
	},
};
</script>
