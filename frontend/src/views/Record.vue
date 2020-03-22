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

		<form class="form" v-else>
			<div class="input-field">
				<select ref="select">
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

			<p>
				<label>
					<input class="with-gap" name="type" type="radio" value="income" />
					<span>Доход</span>
				</label>
			</p>

			<p>
				<label>
					<input class="with-gap" name="type" type="radio" value="outcome" />
					<span>Расход</span>
				</label>
			</p>

			<div class="input-field">
				<input id="amount" type="number" />
				<label for="amount">Сумма</label>
				<span class="helper-text invalid">amount пароль</span>
			</div>

			<div class="input-field">
				<input id="description" type="text" />
				<label for="description">Описание</label>
				<span class="helper-text invalid">description пароль</span>
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

export default {
	name: 'record',
	data: () => ({
		init_select: null,
		loading: true,
	}),
	computed: {
		...mapGetters(['GET_CATEGORIES']),
	},
	methods: {
		...mapActions(['GET_ALL_CATEGORY']),
	},
	async mounted() {
		await this.GET_ALL_CATEGORY();

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
