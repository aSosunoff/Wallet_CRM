<template>
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
			<tr v-for="rec of GET_RECORDS" :key="rec.id">
				<td>1</td>
				<td>{{ rec.amount }}</td>
				<td>{{ rec.created }}</td>
				<td>категория</td>
				<td>
					<span class="white-text badge red">{{ rec.type }}</span>
				</td>
				<td>
					<button class="btn-small btn">
						<i class="material-icons">open_in_new</i>
					</button>
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'history',
	computed: {
		...mapGetters(['GET_RECORDS']),
	},
};
</script>
