export default {
	state: {
		checkLogin: false,
	},
	getters: {
		GET_CHECK_AUTH: state => state.checkLogin,
	},
	mutations: {
		SET_CHECK_AUTH(state, isCheck) {
			state.checkLogin = isCheck;
		},
	},
	actions: {
		async LOGIN({ commit }, { email, password }) {
			try {
				commit('SET_CHECK_AUTH', true);

				await window.axiosTransport.post('auth/login', {
					email,
					password,
				});

				return true;
			} catch (err) {
				const e = new Error(err.response.data);
				commit('SET_ERROR', e);
				throw e;
			} finally {
				commit('SET_CHECK_AUTH', false);
			}
		},
		async REGISTER({ commit }, { name, email, password }) {
			try {
				commit('SET_CHECK_AUTH', true);

				await window.axiosTransport.post('auth/register', {
					email,
					password,
					name,
				});

				return true;
			} catch (err) {
				const e = new Error(err.response.data);
				commit('SET_ERROR', e);
				throw e;
			} finally {
				commit('SET_CHECK_AUTH', false);
			}
		},
		async LOGOUT({ commit }) {
			try {
				commit('SET_CHECK_AUTH', true);

				await window.axiosTransport.post('auth/logout');

				commit('CLEAR_AUTH_USER');

				return true;
			} catch (err) {
				const e = new Error(err.response.data);
				commit('SET_ERROR', e);
				throw e;
			} finally {
				commit('SET_CHECK_AUTH', false);
			}
		},
	},
};
