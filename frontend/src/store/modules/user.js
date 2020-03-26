export default {
	state: {},
	getters: {},
	mutations: {},
	actions: {
		async GET_USER({ commit }, { id }) {
			try {
				const { data } = await window.axiosTransport.get(`user/${id}`);

				return data;
			} catch (e) {
				commit('SET_ERROR', e);

				throw e;
			}
		},
		async UPDATE_USER({ commit }, user) {
			try {
				await window.axiosTransport.put('user/putUpdateUser', user);

				return true;
			} catch (e) {
				commit('SET_ERROR', e);

				throw e;
			}
		},
	},
};
