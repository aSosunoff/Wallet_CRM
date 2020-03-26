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
				<router-link
					class="btn-floating btn-large blue"
					to="/record"
					v-tooltip:left="'создать новую запись'"
				>
					<i class="large material-icons">add</i>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import Navbar from '@/components/app/Navbar.vue';
import Sidebar from '@/components/app/Sidebar.vue';

import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
	name: 'MainLayout',
	data: () => ({
		isOpen: true,
		loading: true,
	}),
	computed: {
		...mapGetters(['GET_AUTH_USER']),
	},
	methods: {
		...mapActions(['LOAD_AUTH_USER']),
		...mapMutations(['SET_ERROR']),
	},
	async mounted() {
		try {
			if (!this.GET_AUTH_USER.id) {
				await this.LOAD_AUTH_USER();
			}

			this.loading = false;
		} catch (e) {
			this.SET_ERROR(e);
			this.$router.push('/login');
		}
	},
	components: {
		Navbar,
		Sidebar,
	},
};
</script>
