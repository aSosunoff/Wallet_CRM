<template>
	<div>
		<Loader v-if="loading" />

		<div v-else class="app-main-layout">
			<Navbar @click="isOpen = !isOpen" />

			<Sidebar v-model="isOpen" />

			<main class="app-content" :class="{ full: !isOpen }">
				<div class="app-page">
					<router-view />
				</div>
			</main>

			<div class="fixed-action-btn">
				<router-link class="btn-floating btn-large blue" to="/record">
					<i class="large material-icons">add</i>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import Navbar from '@/components/app/Navbar.vue';
import Sidebar from '@/components/app/Sidebar.vue';

import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'MainLayout',
	data: () => ({
		isOpen: true,
		loading: true,
	}),
	computed: {
		...mapGetters(['GET_AUTH_USER_NAME']),
		...mapGetters(['GET_ERROR']),
	},
	methods: {
		...mapActions(['GET_AUTH_USER']),
	},
	watch: {
		GET_ERROR(error) {
			this.$error(error.message);
		},
	},
	async mounted() {
		try {
			if (!Object.keys(this.GET_AUTH_USER_NAME).length) {
				await this.GET_AUTH_USER();
			}

			this.loading = false;
		} catch (e) {
			/* continue regardless of error */
		}
	},
	components: {
		Navbar,
		Sidebar,
	},
};
</script>
