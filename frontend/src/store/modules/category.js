export default {
	actions: {
		async CREATE_CATEGORY({ commit, getters }, { title, limit }) {
			try {
				await window.axiosTransport.post('category/create', {
					id_user: getters.GET_AUTH_USER_NAME.id,
					title,
					limit,
				});

				return true;
			} catch (e) {
				commit('SET_ERROR', e);
				throw e;
			}
		},
	},
};
