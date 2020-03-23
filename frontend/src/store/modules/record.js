export default {
	state: {
		records: null,
	},
	mutations: {
		ADD_RECORD(state, record) {
			state.records.push(record);
		},
		SET_RECORD(state, records) {
			state.records = records;
		},
	},
	getters: {
		GET_RECORDS: state => state.records,
	},
	actions: {
		async CREATE_RECORD({ commit, dispatch }, { idCategory, type, amount, description }) {
			try {
				const { data } = await window.axiosTransport.post('record/create', {
					idCategory,
					type,
					amount,
					description,
				});

				commit('ADD_RECORD', { ...data });

				await dispatch('GET_AUTH_USER');

				return data;
			} catch (e) {
				commit('SET_ERROR', e);

				throw e;
			}
		},
		async GET_ALL_RECORDS({ commit }) {
			try {
				const { data } = await window.axiosTransport.get('record/get-all-records');

				commit('SET_RECORD', [...data]);

				return data;
			} catch (e) {
				commit('SET_ERROR', e);

				throw e;
			}
		},
	},
};
