<template>
	<div>
		<Table
			:items="pagination.itemsOnPage"
			title="История"
			:header="{
				rowNumber: '№',
				amount: 'Сумма',
				created: 'Дата',
				categoryTitle: 'Категория',
				type: 'Тип',
			}"
			:rowBtn1="true"
			@rowBtn1="onRowDetail"
		/>

		<Paginate
			v-model="pagination.current"
			:page-count="pagination.count"
			:container-class="'pagination'"
			:page-class="'waves-effect'"
			:prev-text="`<`"
			:next-text="`>`"
			:click-handler="pageChangeHandler"
		>
		</Paginate>
	</div>
</template>

<script>
import paginationMixin from '@/mixins/pagination.mixin';
import currencyFilter from '@/filters/currency.filter';
import dateFilter from '@/filters/date.filter';
import recordType from '@/filters/record.type';

export default {
	name: 'history',
	mixins: [paginationMixin],
	props: {
		items: {
			type: Array,
			default: () => [],
		},
	},
	data: () => ({}),
	methods: {
		onRowDetail(rec) {
			this.$router.push(`/detail/${rec.id}`);
		},
	},
	computed: {},
	mounted() {
		this.setupPagination(
			this.items.map((item, inx) => {
				const typeColorClass = item.type === 'outcome' ? 'red' : 'green';

				return {
					id: item.id,
					rowNumber: inx + 1,
					amount: currencyFilter(item.amount),
					created: dateFilter(item.created),
					categoryTitle: item.category.title,
					type: `<span class="white-text badge ${typeColorClass}">${recordType(
						item.type,
					)}</span>`,
				};
			}),
		);
	},
};
</script>
