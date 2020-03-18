<template>
	<div class="grey lighten-4 empty-layout">
		<router-view />
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	computed: {
		...mapGetters(['GET_ERROR']),
	},
	watch: {
		GET_ERROR(error) {
			this.$error(error.message);
		},
	},
};
</script>
