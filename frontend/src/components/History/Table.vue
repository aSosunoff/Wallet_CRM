<template>
	<div>
		<table>
			<thead>
				<tr>
					<th>#</th>
					<th>Сумма</th>
					<th>Дата</th>
					<th>Категория</th>
					<th>Тип</th>
					<th></th>
				</tr>
			</thead>

			<tbody>
				<tr v-for="(rec, inx) of GET_RECORDS" :key="rec.id">
					<td>{{ inx + 1 }}</td>
					<td>{{ rec.amount | currencyFilter }}</td>
					<td>{{ rec.created | dateFilter }}</td>
					<td>{{ rec.category.title }}</td>
					<td>
						<span
							class="white-text badge"
							:class="[rec.type === 'outcome' ? 'red' : 'green']"
							>{{ rec.type | recordType }}</span
						>
					</td>
					<td>
						<button class="btn-small btn" @click="$router.push(`/detail/${rec.id}`)">
							<i class="material-icons">open_in_new</i>
						</button>
					</td>
				</tr>
			</tbody>
		</table>

		<Paginate
			:page-count="20"
			:container-class="'pagination'"
			:page-class="'waves-effect'"
			:prev-text="`<`"
			:next-text="`>`"
			:click-handler="onClickPage"
		>
		</Paginate>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'history',
	methods: {
		onClickPage(s) {
			console.log(s);
		},
	},
	computed: {
		...mapGetters(['GET_RECORDS']),
	},
};
</script>
