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
					v-model="recordNew.idCategory"
					:class="{
						invalid:
							$v.recordNew.idCategory.$dirty && !$v.recordNew.idCategory.required,
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

				<label :class="{ active: !!recordNew.idCategory }">Выберите категорию</label>

				<small
					class="helper-text invalid"
					v-if="$v.recordNew.idCategory.$dirty && !$v.recordNew.idCategory.required"
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
						v-model="recordNew.type"
					/>
					<span>{{ el.title }}</span>
				</label>
			</p>

			<div class="input-field">
				<input
					id="amount"
					type="number"
					v-model.number="recordNew.amount"
					:class="{
						invalid:
							($v.recordNew.amount.$dirty && !$v.recordNew.amount.minValue) ||
							($v.recordNew.amount.$dirty && !$v.recordNew.amount.required),
					}"
				/>

				<label for="amount" :class="{ active: !!recordNew.amount }">Сумма</label>

				<small
					class="helper-text invalid"
					v-if="$v.recordNew.amount.$dirty && !$v.recordNew.amount.minValue"
					>Необходимо ввести минимальную сумму
					{{ $v.recordNew.amount.$params.minValue.min }}</small
				>

				<small
					class="helper-text invalid"
					v-else-if="$v.recordNew.amount.$dirty && !$v.recordNew.amount.required"
					>Необходимо заполнить поле</small
				>
			</div>

			<div class="input-field">
				<input
					id="description"
					type="text"
					v-model.trim="recordNew.description"
					:class="{
						invalid:
							$v.recordNew.description.$dirty && !$v.recordNew.description.required,
					}"
				/>

				<label for="description" :class="{ active: !!recordNew.description }">Описание</label>

				<small
					class="helper-text invalid"
					v-if="$v.recordNew.description.$dirty && !$v.recordNew.description.required"
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
import { mapActions, mapGetters, mapMutations } from 'vuex';
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

		recordNew: {
			idCategory: null,
			type: 'income',
			amount: 1,
			description: '',
		},
	}),
	validations: {
		recordNew: {
			idCategory: { required },
			amount: { required, minValue: minValue(1) },
			description: { required },
		},
	},
	computed: {
		...mapGetters(['GET_CATEGORIES', 'GET_AUTH_USER']),

		canCreateRecord() {
			if (this.recordNew.type === 'income') {
				return true;
			}

			return this.GET_AUTH_USER.bill >= this.recordNew.amount;
		},
	},
	methods: {
		...mapActions([
			'LOAD_CATEGORIES',
			'CREATE_RECORD',
			'LOAD_RECORDS',
		]),
		...mapMutations(['SET_ERROR']),

		recordReset() {
			this.recordNew.type = 'income';
			this.recordNew.amount = 1;
			this.recordNew.description = '';
		},
		async onSubmit() {
			try {
				if (this.$v.$invalid) {
					this.$v.$touch();
					return;
				}

				if (!this.canCreateRecord) {
					this.$message('Вам не хватает средств на счёте');
					return;
				}

				await this.CREATE_RECORD(this.recordNew);

				this.$message('Новая запись добавлена');

				this.recordReset();
			} catch (e) {
				this.SET_ERROR(e);
			}
		},
	},
	async mounted() {
		await this.LOAD_CATEGORIES();

		await this.LOAD_RECORDS();

		this.loading = false;

		await this.$nextTick();

		this.init_select = window.M.FormSelect.init(this.$refs.select);
	},
	destroyed() {
		if (this.init_select && this.init_select.destroy) {
			this.init_select.destroy();
		}
	},
};
</script>
