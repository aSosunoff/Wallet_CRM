<template>
	<form @submit.prevent="onSubmit">
		<div class="input-field" v-if="typeForm == 'edit'">
			<select ref="select" v-model="id">
				<option value="" disabled selected>Выбирите категорию</option>

				<option
					v-for="category of GET_CATEGORIES"
					:key="category.id"
					:value="category.id"
					>{{ category.title }}</option
				>
			</select>
			<label>Выберите категорию</label>
		</div>

		<div class="input-field">
			<input
				id="title"
				type="text"
				v-model.trim="title"
				:class="{
					invalid: $v.title.$dirty && !$v.title.required,
				}"
			/>

			<label for="title">Название</label>

			<small class="helper-text invalid" v-if="$v.title.$dirty && !$v.title.required"
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
				>Необходимо ввести минимальный лимит {{ $v.limit.$params.minValue.min }}</small
			>

			<small class="helper-text invalid" v-else-if="$v.limit.$dirty && !$v.limit.required"
				>Необходимо заполнить лимит</small
			>
		</div>

		<button class="btn waves-effect waves-light" type="submit">
			{{ btnSubmitName }}
			<i class="material-icons right">send</i>
		</button>
	</form>
</template>

<script>
import { mapGetters } from 'vuex';
import { required, minValue } from 'vuelidate/lib/validators/';

export default {
	name: 'category-form',
	props: ['btnSubmitName', 'typeForm', 'current_id'],
	data: () => ({
		id: null,
		title: '',
		limit: 100,
		init_select: null,
	}),
	computed: {
		...mapGetters(['GET_CATEGORIES']),
	},
	validations: {
		title: { required },
		limit: { required, minValue: minValue(100) },
	},
	watch: {
		id(id) {
			const { title, limit } = this.GET_CATEGORIES.find(e => e.id === id);
			this.id = id;
			this.title = title;
			this.limit = limit;
		},
	},
	async mounted() {
		if (this.current_id) {
			const { id, title, limit } = this.GET_CATEGORIES.find(e => e.id === this.current_id);
			this.id = id;
			this.title = title;
			this.limit = limit;
		}

		await this.$nextTick();

		window.M.updateTextFields();

		this.init_select = window.M.FormSelect.init(this.$refs.select);
	},
	destroyed() {
		if (this.init_select && this.init_select.destroy) {
			this.init_select.destroy();
		}
	},
	methods: {
		onSubmit() {
			try {
				if (this.$v.$invalid) {
					this.$v.$touch();
					return;
				}

				this.$emit('onSubmit', {
					id: this.id,
					title: this.title,
					limit: this.limit,
				});

				if (this.typeForm === 'create') {
					this.id = null;
					this.title = '';
					this.limit = 100;
					this.$v.$reset();
				}
			} catch (e) {
				/* continue regardless of error */
			}
		},
	},
};
</script>
