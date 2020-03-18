import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
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
	actions: {
		async FETCH_FIXER() {
			const key = 'dd0cd4a92636daab03deea24939fb1cc';
			const { data } = await axios.get(
				`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB`,
			);
			return data;
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
