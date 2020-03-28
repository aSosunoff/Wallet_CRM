import Vue from 'vue';
import Vuelidate from 'vuelidate';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';

import dateFilter from '@/filters/date.filter';
import currencyFilter from '@/filters/currency.filter';
import recordType from '@/filters/record.type';

import messagePlugin from '@/utils/message.plugin';
import tooltipDirective from '@/directives/tooltip.directive';

import Loader from '@/components/app/Loader.vue';
import Paginate from 'vuejs-paginate';

import '@/registerServiceWorker';
import 'materialize-css/dist/js/materialize.min';
import axios from 'axios/dist/axios.min';

window.axiosTransport = axios.create({
	baseURL: 'http://localhost:3000/api/',
	timeout: 1000,
	withCredentials: true,
});

Vue.config.productionTip = false;

Vue.filter('dateFilter', dateFilter);
Vue.filter('currencyFilter', currencyFilter);
Vue.filter('recordType', recordType);

Vue.directive('tooltip', tooltipDirective);

Vue.use(Vuelidate);
Vue.use(messagePlugin);

Vue.component('Loader', Loader);
Vue.component('Paginate', Paginate);

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app');
