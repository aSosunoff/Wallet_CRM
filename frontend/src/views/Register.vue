<template>
	<form class="card auth-card hoverable" @submit.prevent="onSubmit">
		<div class="card-content">
			<span class="card-title">Регистрация</span>

			<FieldEmail ref="fieldEmail" :disabled="GET_CHECK_AUTH"></FieldEmail>

			<FieldPassword ref="fieldPassword" :disabled="GET_CHECK_AUTH"></FieldPassword>

			<input ref="fieldName" type="text" v-model.trim="name" :disabled="GET_CHECK_AUTH" />

			<FieldAgree ref="fieldAgree" :disabled="GET_CHECK_AUTH"></FieldAgree>
		</div>

		<div class="card-action" v-if="!GET_CHECK_AUTH">
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
import FieldAgree from '@/components/app/formAuthRegister/field.agree.vue';

import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'register',
	data: () => ({
		name: '',
	}),
	computed: {
		...mapGetters(['GET_CHECK_AUTH']),
	},
	components: {
		FieldEmail,
		FieldPassword,
		FieldAgree,
	},
	methods: {
		...mapActions(['REGISTER']),
		...mapActions(['GET_AUTH_USER']),

		async onSubmit() {
			try {
				const res = await Promise.allSettled([
					this.$refs.fieldEmail.checkValidate(),
					this.$refs.fieldPassword.checkValidate(),
					Promise.resolve(this.name),
					this.$refs.fieldAgree.checkValidate(),
				]);

				const err = res.filter(e => e.status === 'rejected').map(e => e.reason.message);

				if (err.length) {
					throw new Error(err.join('</br>'));
				}

				const [email, password, name] = res.map(e => e.value);

				await this.REGISTER({ email, password, name });

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
