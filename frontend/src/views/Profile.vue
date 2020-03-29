<template>
	<div>
		<div class="page-title">
			<h3>Профиль</h3>
		</div>

		<form class="form" @submit.prevent="onSubmit">
			<div class="input-field">
				<input
					id="description"
					type="text"
					v-model="name"
					:class="{ invalid: $v.name.$dirty && !$v.name.required }"
				/>

				<label for="description" :class="{ active: !!name }">Имя</label>

				<small class="helper-text invalid" v-if="$v.name.$dirty && !$v.name.required"
					>Необходимо заполнить поле Имени</small
				>
			</div>

			<div class="input-field">
				<input
					id="email"
					type="text"
					:value="GET_AUTH_USER.email"
					disabled="disabled"
				/>
				<label for="email" :class="{ active: !!GET_AUTH_USER.email }">email</label>
			</div>

			<div class="input-field">
				<input
					id="bill"
					type="text"
					:value="GET_AUTH_USER.bill | currencyFilter"
					disabled="disabled"
				/>
				<label for="bill" :class="{ active: !!GET_AUTH_USER.bill }">Баланс</label>
			</div>

			<button class="btn waves-effect waves-light" type="submit" v-if="!isCheck">
				Обновить
				<i class="material-icons right">send</i>
			</button>

			<div class="progress" v-else>
				<div class="indeterminate"></div>
			</div>
		</form>
	</div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { required } from 'vuelidate/lib/validators';

export default {
	data: () => ({
		name: '',
		isCheck: false,
	}),
	validations: {
		name: { required },
	},
	methods: {
		...mapActions(['UPDATE_USER']),
		...mapMutations(['SET_AUTH_USER']),

		async onSubmit() {
			try {
				if (this.$v.$invalid) {
					this.$v.$touch();
					return;
				}

				this.isCheck = true;

				const updateUser = await this.UPDATE_USER({
					...this.GET_AUTH_USER,
					name: this.name,
				});

				this.SET_AUTH_USER(updateUser);
			} catch (e) {
				this.SET_ERROR(e);
			} finally {
				this.isCheck = false;
			}
		},
	},
	computed: {
		...mapGetters(['GET_AUTH_USER']),
	},
	mounted() {
		this.name = this.GET_AUTH_USER.name;
	},
};
</script>
