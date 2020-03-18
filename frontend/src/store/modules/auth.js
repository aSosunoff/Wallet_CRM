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

				const { data } = await window.axiosTransport.post('auth/login', {
					email,
					password,
				});

				return data;
			} catch (err) {
				throw new Error(err.response.data);
			} finally {
				commit('SET_CHECK_AUTH', false);
			}
		},
		async REGISTER({ commit }, { name, email, password }) {
			try {
				commit('SET_CHECK_AUTH', true);

				const { data } = await window.axiosTransport.post('auth/register', {
					email,
					password,
					name,
				});

				return data;
			} catch (err) {
				throw new Error(err.response.data);
			} finally {
				commit('SET_CHECK_AUTH', false);
			}
		},
		async LOGOUT({ commit }) {
			try {
				commit('SET_CHECK_AUTH', true);

				await window.axiosTransport.post('auth/logout');

				return true;
			} catch (err) {
				throw new Error(err.response.data);
			} finally {
				commit('SET_CHECK_AUTH', false);
			}
		},
	},
};
