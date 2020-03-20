import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import auth from './modules/auth';
import user from './modules/user';
import category from './modules/category';
import error from './modules/error';

Vue.use(Vuex);

export default new Vuex.Store({
	actions: {
		async FETCH_FIXER({ commit }) {
			try {
				const key = 'dd0cd4a92636daab03deea24939fb1cc';
				const { data } = await axios.get(
					`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB`,
				);
				return data;
			} catch (e) {
				commit('SET_ERROR', 'Не удалось прочитать данные по валютам');

				throw e;
			}
		},
	},
	modules: {
		auth,
		user,
		category,
		error,
	},
});
