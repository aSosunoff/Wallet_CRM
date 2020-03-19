<template>
	<div class="col s12 m6">
		<div>
			<div class="page-subtitle">
				<h4>Создать</h4>
			</div>

			<form @submit.prevent="onSubmit">
				<div class="input-field">
					<input
						id="name"
						type="text"
						v-model.trim="name"
						:class="{
							invalid: $v.name.$dirty && !$v.name.required,
						}"
					/>

					<label for="name">Название</label>

					<small class="helper-text invalid" v-if="$v.name.$dirty && !$v.name.required"
						>Необходимо ввести название</small
					>
				</div>

				<div class="input-field">
					<input
						id="limit"
						type="number"
						v-model.number="limit"
						:class="{
							invalid:
								($v.limit.$dirty && !$v.limit.minValue) ||
								($v.limit.$dirty && !$v.limit.required),
						}"
					/>

					<label for="limit">Лимит</label>

					<small class="helper-text invalid" v-if="$v.limit.$dirty && !$v.limit.minValue"
						>Необходимо ввести минимальный лимит
						{{ $v.limit.$params.minValue.min }}</small
					>

					<small
						class="helper-text invalid"
						v-else-if="$v.limit.$dirty && !$v.limit.required"
						>Необходимо заполнить лимит</small
					>
				</div>

				<button class="btn waves-effect waves-light" type="submit">
					Создать
					<i class="material-icons right">send</i>
				</button>
			</form>
		</div>
	</div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators/';

export default {
	name: 'category-create',
	data: () => ({
		name: '',
		limit: 100,
	}),
	validations: {
		name: { required },
		limit: { required, minValue: minValue(100) },
	},
	mounted() {
		window.M.updateTextFields();
	},
	methods: {
		onSubmit() {
			if (this.$v.$invalid) {
				this.$v.$touch();
				this.$error('Не заполнены обязательные поля');
			}
		},
	},
};
</script>
