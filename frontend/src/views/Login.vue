<template>
	<form class="card auth-card hoverable" @submit.prevent="onSubmit">
		<div class="card-content">
			<span class="card-title">Вход на сайт</span>

			<FieldEmail ref="fieldEmail" :disabled="GET_CHECK_AUTH"></FieldEmail>

			<FieldPassword ref="fieldPassword" :disabled="GET_CHECK_AUTH"></FieldPassword>
		</div>

		<div class="card-action" v-if="!GET_CHECK_AUTH">
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

import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'login',
	computed: {
		...mapGetters(['GET_CHECK_AUTH']),
	},
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
		...mapActions(['LOGIN']),
		...mapActions(['GET_AUTH_USER', 'GET_USER']),

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

				const [email, password] = res.map(e => e.value);

				await this.LOGIN({ email, password });

				const user = await this.GET_AUTH_USER();

				sessionStorage.setItem('username', user.name || user.email);

				this.$router.push('/');
			} catch (err) {
				this.$error(err.message);
			}
		},
	},
};
</script>
