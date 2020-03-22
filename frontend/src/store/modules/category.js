export default {
	state: {
		categories: null,
		current: null,
	},
	mutations: {
		ADD_CATEGORY(state, category) {
			state.categories.push(category);
		},
		UPDATE_CATEGORY(state, category) {
			state.current = category;
			state.categories.splice(
				state.categories.findIndex(e => e.id === category.id),
				1,
				category,
			);
		},
		SET_CATEGORY(state, categories) {
			state.categories = categories;
		},
		SELECT_CATEGORY_CURRENT(state, category) {
			state.current = category;
		},
	},
	getters: {
		GET_CATEGORIES: state => state.categories,
		GET_CURRENT: state => state.current,
	},
	actions: {
		async CREATE_CATEGORY({ commit }, { title, limit }) {
			try {
				const { data } = await window.axiosTransport.post('category/create', {
					title,
					limit,
				});

				commit('ADD_CATEGORY', {
					...data,
				});

				return data;
			} catch (e) {
				commit('SET_ERROR', e);

				throw e;
			}
		},
		async EDIT_CATEGORY({ commit }, { id, title, limit }) {
			try {
				const { data } = await window.axiosTransport.post('category/edit', {
					id,
					title,
					limit,
				});

				commit('UPDATE_CATEGORY', {
					...data,
				});

				return data;
			} catch (e) {
				commit('SET_ERROR', e);

				throw e;
			}
		},
		async GET_ALL_CATEGORY({ commit }) {
			try {
				const { data } = await window.axiosTransport.get('category/get-all-category');

				commit('SET_CATEGORY', [...data]);

				return data;
			} catch (e) {
				commit('SET_ERROR', e);

				throw e;
			}
		},
	},
};
