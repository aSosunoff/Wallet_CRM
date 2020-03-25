import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
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
			},
			component: () => import('@/views/Home.vue'),
		},
		{
			path: '/categories',
			name: 'categories',
			meta: {
				layout: 'main',
			},
			component: () => import('@/views/Categories.vue'),
		},
		{
			path: '/detail',
			name: 'detail',
			meta: {
				layout: 'main',
			},
			component: () => import('@/views/Detail.vue'),
		},
		{
			path: '/history',
			name: 'history',
			meta: {
				layout: 'main',
			},
			component: () => import('@/views/History.vue'),
		},
		{
			path: '/planning',
			name: 'planning',
			meta: {
				layout: 'main',
			},
			component: () => import('@/views/Planning.vue'),
		},
		{
			path: '/profile',
			name: 'profile',
			meta: {
				layout: 'main',
			},
			component: () => import('@/views/Profile.vue'),
		},
		{
			path: '/record',
			name: 'record',
			meta: {
				layout: 'main',
			},
			component: () => import('@/views/Record.vue'),
		},
		{
			path: '*',
			name: '404',
			meta: {
				layout: 'main',
			},
			component: () => import('@/views/404.vue'),
		},
	],
});
