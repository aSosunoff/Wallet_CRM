export default {
	state: {
		checkLogin: false,
	},
	getters: {
		GET_CHECK_LOGIN: state => state.checkLogin,
	},
	mutations: {
		SET_CHECK_LOGIN(state, isCheck) {
			state.checkLogin = isCheck;
		},
	},
	actions: {
		async LOGIN({ commit }, { email, password }) {
			try {
				commit('SET_CHECK_LOGIN', true);

				const { data } = await window.axiosTransport.post('auth/login', {
					email,
					password,
				});

				return data;
			} catch (err) {
				throw new Error(err.response.data);
			} finally {
				commit('SET_CHECK_LOGIN', false);
			}
		},
	},
};
