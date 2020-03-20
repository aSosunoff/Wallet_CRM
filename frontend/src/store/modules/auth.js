export default {
	actions: {
		async LOGIN({ commit }, { email, password }) {
			try {
				await window.axiosTransport.post('auth/login', {
					email,
					password,
				});

				return true;
			} catch (e) {
				commit('SET_ERROR', e);
				throw e;
			}
		},
		async REGISTER({ commit }, { name, email, password }) {
			try {
				await window.axiosTransport.post('auth/register', {
					email,
					password,
					name,
				});

				return true;
			} catch (e) {
				commit('SET_ERROR', e);
				throw e;
			}
		},
		async LOGOUT({ commit }) {
			try {
				await window.axiosTransport.post('auth/logout');

				commit('CLEAR_AUTH_USER');

				return true;
			} catch (e) {
				commit('SET_ERROR', e);
				throw e;
			}
		},
	},
};
