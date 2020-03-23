export default {
	state: {
		isPaddindUpdate: false,
		isPaddindGetUser: false,
		authUser: {},
	},
	getters: {
		GET_AUTH_USER_NAME: state => state.authUser,
	},
	mutations: {
		SET_PADDING_UPDATE(state, padding) {
			state.isPaddindUpdate = padding;
		},
		SET_PADDING_GET_USER(state, padding) {
			state.isPaddindGetUser = padding;
		},
		SET_AUTH_USER(state, user) {
			state.authUser = { ...user };
		},
		CLEAR_AUTH_USER(state) {
			state.authUser = {};
		},
	},
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
		async GET_AUTH_USER({ commit }) {
			try {
				const { data } = await window.axiosTransport.get('user/getAuthUser');

				commit('SET_AUTH_USER', { ...data });

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
