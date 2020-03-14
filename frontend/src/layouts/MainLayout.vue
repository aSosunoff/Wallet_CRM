<template>
	<div class="app-main-layout">
		<Navbar @click="isOpen = !isOpen" />

		<Sidebar v-model="isOpen" />

		<main class="app-content" :class="{ full: !isOpen }">
			<div class="app-page">
				<router-view />
			</div>
		</main>

		<LinkNewRecord />
	</div>
</template>

<script>
import Navbar from '@/components/app/Navbar.vue';
import Sidebar from '@/components/app/Sidebar.vue';
import LinkNewRecord from '@/components/app/LinkNewRecord.vue';

export default {
	name: 'MainLayout',
	data: () => ({
		isOpen: true,
	}),
	components: {
		Navbar,
		Sidebar,
		LinkNewRecord,
	},
};
</script>
