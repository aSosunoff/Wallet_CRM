export default {
	state: {
		error: null,
	},
	mutations: {
		SET_ERROR(state, error) {
			let err = error;

			if (typeof err === 'string') {
				err = new Error(err);
			}

			state.error = err;
		},
		CLEAR_ERROR(state) {
			state.error = null;
		},
	},
	getters: {
		GET_ERROR: state => state.error,
	},
};
