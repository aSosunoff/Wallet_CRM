export default {
	actions: {
		async CREATE_CATEGORY({ commit, getters }, { title, limit }) {
			try {
				const newCategory = {
					id_user: getters.GET_AUTH_USER_NAME.id,
					title,
					limit,
				};

				console.log(newCategory);
				/* await window.axiosTransport.post('auth/login', {
					email,
					password,
				}); */

				return true;
			} catch (e) {
				/* const e = new Error(err.response.data); */
				commit('SET_ERROR', e);
				throw e;
			}
		},
	},
};
