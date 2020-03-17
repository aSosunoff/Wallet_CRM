<template>
	<form class="card auth-card hoverable" @submit.prevent="onSubmit">
		<div class="card-content">
			<span class="card-title">Вход на сайт</span>

			<FieldEmail ref="fieldEmail" :disabled="checkForm"></FieldEmail>

			<FieldPassword ref="fieldPassword" :disabled="checkForm"></FieldPassword>
		</div>

		<div class="card-action" v-if="!checkForm">
			<div>
				<button class="btn waves-effect waves-light auth-submit" type="submit">
					Войти
					<i class="material-icons right">send</i>
				</button>
			</div>

			<p class="center">
				Нет аккаунта?
				<router-link to="/register">Зарегистрироваться</router-link>
			</p>
		</div>

		<div class="progress" v-else>
			<div class="indeterminate"></div>
		</div>
	</form>
</template>

<script>
import messages from '@/utils/messages';
import FieldEmail from '@/components/app/formAuthRegister/field.email.vue';
import FieldPassword from '@/components/app/formAuthRegister/field.password.vue';

export default {
	name: 'login',
	data: () => ({
		checkForm: false,
	}),
	components: {
		FieldEmail,
		FieldPassword,
	},
	mounted() {
		if (messages[this.$route.query.message]) {
			this.$message(messages[this.$route.query.message]);
		}
	},
	methods: {
		async onSubmit() {
			try {
				const res = await Promise.allSettled([
					this.$refs.fieldEmail.checkValidate(),
					this.$refs.fieldPassword.checkValidate(),
				]);

				const err = res.filter(e => e.status === 'rejected').map(e => e.reason.message);

				if (err.length) {
					throw new Error(err.join('</br>'));
				}

				const formDataArr = res.map(e => e.value);

				const formData = {
					email: formDataArr[0],
					password: formDataArr[1],
				};

				this.checkForm = true;

				const response = await window.axiosTransport.post('auth/login', formData);

				sessionStorage.setItem('username', response.data);

				this.$router.push('/');
			} catch (err) {
				if (err.response && 'data' in err.response) {
					this.$error(err.response.data);
				} else {
					this.$error(err);
				}
			} finally {
				this.checkForm = false;
			}
		},
	},
};
</script>
