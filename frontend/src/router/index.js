import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/login',
			name: 'login',
			component: () => import('@/views/Login.vue'),
		},
		{
			path: '/register',
			name: 'register',
			component: () => import('@/views/Register.vue'),
		},
		{
			path: '/',
			name: 'home',
			meta: {
				layout: 'main',
				auth: true,
			},
			component: () => import('@/views/Home.vue'),
		},
		{
			path: '/categories',
			name: 'categories',
			meta: {
				layout: 'main',
				auth: true,
			},
			component: () => import('@/views/Categories.vue'),
		},
		{
			path: '/detail',
			name: 'detail',
			meta: {
				layout: 'main',
				auth: true,
			},
			component: () => import('@/views/Detail.vue'),
		},
		{
			path: '/history',
			name: 'history',
			meta: {
				layout: 'main',
				auth: true,
			},
			component: () => import('@/views/History.vue'),
		},
		{
			path: '/planning',
			name: 'planning',
			meta: {
				layout: 'main',
				auth: true,
			},
			component: () => import('@/views/Planning.vue'),
		},
		{
			path: '/profile',
			name: 'profile',
			meta: {
				layout: 'main',
				auth: true,
			},
			component: () => import('@/views/Profile.vue'),
		},
		{
			path: '/record',
			name: 'record',
			meta: {
				layout: 'main',
				auth: true,
			},
			component: () => import('@/views/Record.vue'),
		},
		{
			path: '*',
			name: '404',
			meta: {
				layout: 'main',
				auth: true,
			},
			component: () => import('@/views/404.vue'),
		},
	],
});

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.auth)) {
		next();
	} else {
		next();
	}
});

export default router;
