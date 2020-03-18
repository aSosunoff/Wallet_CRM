import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import user from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		error: null,
	},
	mutations: {
		SET_ERROR(state, error) {
			state.error = error;
		},
		CLEAR_ERROR(state) {
			state.error = null;
		},
	},
	getters: {
		GET_ERROR: state => state.error,
	},
	modules: {
		auth,
		user,
	},
});
