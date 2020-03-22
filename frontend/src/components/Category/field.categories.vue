<template>
	<div class="input-field" :key="id + GET_CATEGORIES.length">
		<select ref="select" v-model="id">
			<option value="" disabled selected>Выбирите категорию</option>

			<option v-for="category of GET_CATEGORIES" :key="category.id" :value="category.id">{{
				category.title
			}}</option>
		</select>
		<label>Выберите категорию</label>
	</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
	name: 'field-select',
	data: () => ({
		id: null,
		init_select: null,
	}),
	watch: {
		id(idCategory) {
			this.SELECT_CATEGORY_CURRENT(this.GET_CATEGORIES.find(e => e.id === idCategory));
		},
	},
	computed: {
		...mapGetters(['GET_CATEGORIES']),
	},
	methods: {
		...mapMutations(['SELECT_CATEGORY_CURRENT']),

		async checkValidate() {
			return new Promise(resolve => {
				resolve(this.id);
				this.$v.$reset();
			});
		},
	},
	async mounted() {
		this.SELECT_CATEGORY_CURRENT(this.GET_CATEGORIES[0]);

		this.id = this.GET_CATEGORIES[0].id;

		this.init_select = window.M.FormSelect.init(this.$refs.select);
	},
	destroyed() {
		if (this.init_select && this.init_select.destroy) {
			this.init_select.destroy();
		}
	},
	updated() {
		this.init_select = window.M.FormSelect.init(this.$refs.select);
	},
};
</script>
