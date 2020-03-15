<template>
	<form class="card auth-card hoverable" @submit.prevent="onSubmit">
		<div class="card-content">
			<span class="card-title">Вход на сайт</span>

			<div class="input-field">
				<input
					id="email"
					type="text"
					v-model.trim="email"
					:class="{
						invalid:
							($v.email.$dirty && !$v.email.required) ||
							($v.email.$dirty && !$v.email.email),
					}"
					@keypress="onPressKey"
				/>

				<label for="email">Email</label>

				<small class="helper-text invalid" v-if="$v.email.$dirty && !$v.email.required"
					>Необходимо заполнить поле email</small
				>
				<small class="helper-text invalid" v-else-if="$v.email.$dirty && !$v.email.email"
					>Поле email не корректно</small
				>
			</div>

			<div class="input-field">
				<input
					id="password"
					type="password"
					v-model.trim="password"
					:class="{
						invalid:
							($v.password.$dirty && !$v.password.required) ||
							($v.password.$dirty && !$v.password.minLength),
					}"
					@keypress="onPressKey"
				/>

				<label for="password">Пароль</label>

				<small
					class="helper-text invalid"
					v-if="$v.password.$dirty && !$v.password.required"
					>Введите пароль</small
				>
				<small
					class="helper-text invalid"
					v-else-if="$v.password.$dirty && !$v.password.minLength"
					>Минимальное количество символов {{ $v.password.$params.minLength.min }}. Сейчас
					он {{ password.length }}</small
				>
			</div>
		</div>

		<div class="card-content red lighten-5" v-show="canAccess">
			{{ canAccess }}
		</div>

		<div class="card-action">
			<div>
				<button
					class="btn waves-effect waves-light auth-submit"
					type="submit"
					:class="{ disabled: checkForm }"
				>
					Войти
					<i class="material-icons right">send</i>
				</button>
			</div>

			<p class="center">
				Нет аккаунта?
				<router-link to="/register">Зарегистрироваться</router-link>
			</p>
		</div>
	</form>
</template>

<script>
import { email, minLength, required } from 'vuelidate/lib/validators';

export default {
	name: 'login',
	data: () => ({
		email: '',
		password: '',
		canAccess: '',
		checkForm: false,
	}),
	validations: {
		email: { email, required },
		password: { required, minLength: minLength(6) },
	},
	methods: {
		onPressKey() {
			this.canAccess = '';
		},
		onCheckForm(formData, callback) {
			console.log(formData);

			this.checkForm = true;
			setTimeout(() => {
				this.checkForm = false;
				// callback('У вас нет прав для входа');
				callback();
			}, 4000);
		},
		onSubmit() {
			if (this.$v.$invalid) {
				this.$v.$touch();
				return;
			}

			const formData = {
				email: this.email,
				password: this.password,
			};

			this.onCheckForm(formData, canAccess => {
				this.canAccess = canAccess;

				if (!canAccess) {
					this.$router.push('/');
				}
			});
		},
	},
};
</script>
