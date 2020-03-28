<template>
	<div>
		<div>
			<Loader v-if="loading" />

			<p class="center" v-else-if="!record">
				Записи не существует
				<router-link to="/record" class="waves-effect waves-light btn">
					<i class="material-icons left">add_box</i>
					Добавить запись</router-link
				>
			</p>

			<template v-else>
				<div class="breadcrumb-wrap">
					<router-link to="/history" class="breadcrumb">История</router-link>
					<a @click.prevent class="breadcrumb">
						{{ record.type | recordType }}
					</a>
				</div>

				<div class="row">
					<div class="col s12 m6">
						<div class="card" :class="[record.type === 'outcome' ? 'red' : 'green']">
							<div class="card-content white-text">
								<p>Описание: {{ record.description }}</p>
								<p>Сумма: {{ record.amount | currencyFilter }}</p>
								<p>Категория: {{ record.category.title }}</p>

								<small>{{ record.created | dateFilter }}</small>
							</div>
						</div>
					</div>
				</div>
			</template>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	data: () => ({
		loading: true,
		record: {},
	}),
	methods: {},
	computed: {
		...mapGetters(['GET_RECORDS']),
	},
	mounted() {
		this.record = this.GET_RECORDS.find(e => e.id === this.$route.params.id);

		this.loading = false;
	},
};
</script>
