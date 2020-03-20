export default {
	actions: {
		async CREATE_CATEGORY({ commit }, { title, limit }) {
			try {
				const { data } = await window.axiosTransport.post('category/create', {
					title,
					limit,
				});

				return data;
			} catch (e) {
				commit('SET_ERROR', e);

				throw e;
			}
		},
	},
};
