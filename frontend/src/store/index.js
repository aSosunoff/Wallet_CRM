import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import user from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		error: null,
		authUserName: '',
	},
	mutations: {
		SET_ERROR(state, error) {
			state.error = error;
		},
		CLEAR_ERROR(state) {
			state.error = null;
		},
		SET_AUTH_USER(state, name) {
			state.authUserName = name;
		},
		CLEAR_AUTH_USER(state) {
			state.authUserName = null;
		},
	},
	getters: {
		GET_ERROR: state => state.error,
		GET_AUTH_USER: state => state.authUserName,
	},
	modules: {
		auth,
		user,
	},
});
