<template>
	<form class="card auth-card hoverable" @submit.prevent="onSubmit">
		<div class="card-content">
			<span class="card-title">Вход на сайт</span>

			<FieldEmail ref="fieldEmail" :disabled="isCheck"></FieldEmail>

			<FieldPassword ref="fieldPassword" :disabled="isCheck"></FieldPassword>
		</div>

		<div class="card-action" v-if="!isCheck">
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
import { mapActions, mapMutations } from 'vuex';

export default {
	name: 'login',
	data: () => ({
		isCheck: false,
	}),
	components: {
		FieldEmail: () => import('@/components/app/formAuthRegister/field.email.vue'),
		FieldPassword: () => import('@/components/app/formAuthRegister/field.password.vue'),
	},
	mounted() {
		if (messages[this.$route.query.message]) {
			this.$message(messages[this.$route.query.message]);
		}
	},
	methods: {
		...mapActions(['LOGIN']),
		...mapMutations(['SET_ERROR']),

		async onSubmit() {
			try {
				const res = await Promise.allSettled([
					this.$refs.fieldEmail.checkValidate(),
					this.$refs.fieldPassword.checkValidate(),
				]);

				const err = res.filter(e => e.status === 'rejected').map(e => e.reason.message);

				if (err.length) {
					this.SET_ERROR(new Error(err.join('</br>')));
					return;
				}

				const [email, password] = res.map(e => e.value);

				this.isCheck = true;

				await this.LOGIN({ email, password });

				this.$router.push('/');
			} catch (err) {
				console.warn(err);
			} finally {
				this.isCheck = false;
			}
		},
	},
};
</script>
