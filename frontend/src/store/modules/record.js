export default {
	state: {
		records: [],
	},
	mutations: {
		ADD_RECORD(state, record) {
			state.records.push(record);
		},
		/* UPDATE_CATEGORY(state, category) {
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
		}, */
	},
	getters: {
		GET_RECORDS: state => state.records,
	},
	actions: {
		async CREATE_RECORD({ commit }, { idCategory, type, amount, description }) {
			try {
				const { data } = await window.axiosTransport.post('record/create', {
					idCategory,
					type,
					amount,
					description,
				});

				commit('ADD_RECORD', data);

				return data;
			} catch (e) {
				commit('SET_ERROR', e);

				throw e;
			}
		},
		/* async EDIT_CATEGORY({ commit }, { id, title, limit }) {
			try {
				await window.axiosTransport.post('category/edit', {
					id,
					title,
					limit,
				});

				commit('UPDATE_CATEGORY', {
					id,
					title,
					limit,
				});

				return true;
			} catch (e) {
				commit('SET_ERROR', e);

				throw e;
			}
		},
		async GET_ALL_CATEGORY({ commit }) {
			try {
				const { data } = await window.axiosTransport.get('category/get-all-category');

				commit('SET_CATEGORY', data);

				return true;
			} catch (e) {
				commit('SET_ERROR', e);

				throw e;
			}
		}, */
	},
};
