<template>
	<form class="card auth-card hoverable" @submit.prevent="onSubmit">
		<div class="card-content">
			<span class="card-title">Вход на сайт</span>

			<FieldEmail :disabled="checkForm"></FieldEmail>

			<FieldPassword :disabled="checkForm"></FieldPassword>
		</div>

		<div class="card-content red lighten-5" v-show="canAccess">
			{{ canAccess }}
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
		canAccess: '',
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
		onCheckForm(formData, callback) {
			setTimeout(() => {
				callback('У вас нет прав для входа');
				// callback();
			}, 4000);
		},
		onSubmit() {
			Promise.allSettled(
				this.$children
					.filter(e => ['field-email', 'field-password'].includes(e.$options.name))
					.map(e => e.checkValidate()),
			)
				.then(res => {
					const err = res.filter(e => e.status === 'rejected').map(e => e.reason.message);

					if (err.length) {
						throw new Error(err.join('</br>'));
					}

					const formDataArr = res.map(e => e.value);

					return {
						email: formDataArr[0],
						password: formDataArr[1],
					};
				})
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
