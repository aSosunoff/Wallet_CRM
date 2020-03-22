<template>
	<div>
		<div class="page-title">
			<h3>Новая запись</h3>
		</div>

		<Loader v-if="loading" />

		<p class="center" v-else-if="GET_CATEGORIES && !GET_CATEGORIES.length">
			Категорий не существует
			<router-link to="/categories" class="waves-effect waves-light btn">
				<i class="material-icons left">add_box</i>
				Добавить категорию</router-link
			>
		</p>

		<form class="form" @submit.prevent="onSubmit" v-else>
			<div class="input-field">
				<select
					ref="select"
					v-model="record.id_category"
					:class="{
						invalid: $v.record.id_category.$dirty && !$v.record.id_category.required,
					}"
				>
					<option value="" disabled selected>Выбирите категорию</option>

					<option
						v-for="category of GET_CATEGORIES"
						:key="category.id"
						:value="category.id"
						>{{ category.title }}</option
					>
				</select>

				<label>Выберите категорию</label>

				<small
					class="helper-text invalid"
					v-if="$v.record.id_category.$dirty && !$v.record.id_category.required"
					>Необходимо выбрать категорию</small
				>
			</div>

			<p v-for="el of typeList" :key="el.value">
				<label>
					<input
						class="with-gap"
						name="type"
						type="radio"
						:value="el.value"
						v-model="record.type"
					/>
					<span>{{ el.title }}</span>
				</label>
			</p>

			<div class="input-field">
				<input
					id="amount"
					type="number"
					v-model.number="record.amount"
					:class="{
						invalid:
							($v.record.amount.$dirty && !$v.record.amount.minValue) ||
							($v.record.amount.$dirty && !$v.record.amount.required),
					}"
				/>

				<label for="amount">Сумма</label>

				<small
					class="helper-text invalid"
					v-if="$v.record.amount.$dirty && !$v.record.amount.minValue"
					>Необходимо ввести минимальную сумму
					{{ $v.record.amount.$params.minValue.min }}</small
				>

				<small
					class="helper-text invalid"
					v-else-if="$v.record.amount.$dirty && !$v.record.amount.required"
					>Необходимо заполнить поле</small
				>
			</div>

			<div class="input-field">
				<input
					id="description"
					type="text"
					v-model.trim="record.description"
					:class="{
						invalid: $v.record.description.$dirty && !$v.record.description.required,
					}"
				/>

				<label for="description">Описание</label>

				<small
					class="helper-text invalid"
					v-if="$v.record.description.$dirty && !$v.record.description.required"
					>Необходимо заполнить описание</small
				>
			</div>

			<button class="btn waves-effect waves-light" type="submit">
				Создать
				<i class="material-icons right">send</i>
			</button>
		</form>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { required, minValue } from 'vuelidate/lib/validators';

export default {
	name: 'record',
	data: () => ({
		init_select: null,
		loading: true,
		typeList: [
			{
				title: 'Доход',
				value: 'income',
			},
			{
				title: 'Расход',
				value: 'outcome',
			},
		],

		record: {
			id_category: null,
			type: 'income',
			amount: 1,
			description: '',
		},
	}),
	validations: {
		record: {
			id_category: { required },
			amount: { required, minValue: minValue(1) },
			description: { required },
		},
	},
	computed: {
		...mapGetters(['GET_CATEGORIES', 'GET_AUTH_USER_NAME']),
		canCreateRecord() {
			if (this.record.type === 'income') {
				return true;
			}

			if (this.GET_AUTH_USER_NAME.bill >= this.record.amount) {
				return true;
			}

			return false;
		},
	},
	methods: {
		...mapActions(['GET_ALL_CATEGORY']),

		onSubmit() {
			try {
				if (this.$v.$invalid) {
					this.$v.$touch();
					return;
				}

				if (!this.canCreateRecord) {
					this.$message('Вам не хватает финансов');
					return;
				}

				console.log(1);
			} catch (e) {
				this.SET_ERROR(e);
			}
		},
	},
	async mounted() {
		await this.GET_ALL_CATEGORY();

		this.loading = false;

		await this.$nextTick();

		this.init_select = window.M.FormSelect.init(this.$refs.select);

		window.M.updateTextFields();
	},
	destroyed() {
		if (this.init_select && this.init_select.destroy) {
			this.init_select.destroy();
		}
	},
};
</script>
