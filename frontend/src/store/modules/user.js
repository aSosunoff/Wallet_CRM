export default {
	state: {
		userAuth: null,
		isPaddindUpdate: false,
		isPaddindGetUser: false,
	},
	getters: {},
	mutations: {
		SET_AUTH_USER(state, user) {
			state.userAuth = { ...user };
		},
		SET_PADDING_UPDATE(state, padding) {
			state.isPaddindUpdate = padding;
		},
		SET_PADDING_GET_USER(state, padding) {
			state.isPaddindGetUser = padding;
		},
	},
	actions: {
		async GET_USER({ commit }, { id }) {
			try {
				commit('SET_PADDING_GET_USER', true);

				const { data } = await window.axiosTransport.get(`user/${id}`);

				return data;
			} catch (err) {
				console.log(err);
				throw new Error(err.response.data);
			} finally {
				commit('SET_PADDING_GET_USER', false);
			}
		},
		async GET_AUTH_USER({ commit }) {
			try {
				commit('SET_PADDING_GET_USER', true);

				const { data } = await window.axiosTransport.get('user/getAuthUser');

				commit('SET_AUTH_USER', data);

				return data;
			} catch (err) {
				throw new Error(err.response.data);
			} finally {
				commit('SET_PADDING_GET_USER', false);
			}
		},
		async UPDATE_USER({ commit }, user) {
			try {
				commit('SET_PADDING_UPDATE', true);

				await window.axiosTransport.put('user/putUpdateUser', user);

				return true;
			} catch (err) {
				throw new Error(err.response.data);
			} finally {
				commit('SET_PADDING_UPDATE', false);
			}
		},
	},
};
