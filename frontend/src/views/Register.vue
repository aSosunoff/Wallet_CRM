<template>
	<form class="card auth-card hoverable" @submit.prevent="onSubmit">
		<div class="card-content">
			<span class="card-title">Регистрация</span>

			<FieldEmail ref="fieldEmail" :disabled="isCheck"></FieldEmail>

			<FieldPassword ref="fieldPassword" :disabled="isCheck"></FieldPassword>

			<input ref="fieldName" type="text" v-model.trim="name" :disabled="isCheck" />

			<FieldAgree ref="fieldAgree" :disabled="isCheck"></FieldAgree>
		</div>

		<div class="card-action" v-if="!isCheck">
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
import { mapActions, mapMutations } from 'vuex';

export default {
	name: 'register',
	data: () => ({
		name: '',
		isCheck: false,
	}),
	components: {
		FieldEmail: () => import('@/components/app/formAuthRegister/field.email.vue'),
		FieldPassword: () => import('@/components/app/formAuthRegister/field.password.vue'),
		FieldAgree: () => import('@/components/app/formAuthRegister/field.agree.vue'),
	},
	methods: {
		...mapActions(['REGISTER']),
		...mapMutations(['SET_ERROR']),

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
					this.SET_ERROR(err.join('</br>'));
					return;
				}

				const [email, password, name] = res.map(e => e.value);

				this.isCheck = true;

				await this.REGISTER({ email, password, name });

				this.$router.push('/');
			} catch (e) {
				/* */
			} finally {
				this.isCheck = false;
			}
		},
	},
};
</script>
