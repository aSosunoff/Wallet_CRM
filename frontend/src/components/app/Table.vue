<template>
	<table>
		<thead v-if="isHeader || isTitle">
			<tr v-if="isTitle">
				<th :colspan="colSpanTitle">{{ title }}</th>
				<th v-if="isRowBtn1"></th>
			</tr>

			<tr v-if="isHeader">
				<th v-for="(headerValue, inx) of getHeader" :key="inx">
					{{ headerValue }}
				</th>
				<th v-if="isRowBtn1"></th>
			</tr>
		</thead>

		<tbody v-if="isBody">
			<tr v-for="(rec, inx) of items" :key="inx">
				<td
					v-for="(cell, inxSub) of filterVisibleField(rec)"
					:key="inx + inxSub"
					v-html="cell"
				></td>

				<td v-if="isRowBtn1">
					<button class="btn-small btn" @click="$emit('rowBtn1', rec, $event)">
						<i class="material-icons">open_in_new</i>
					</button>
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script>
export default {
	name: 'history',
	props: {
		items: {
			type: Array,
			default: () => [],
		},
		title: {
			type: String,
			default: '',
		},
		header: {
			type: Object,
			default: () => ({}),
		},
		rowBtn1: {
			type: Boolean,
			default: false,
		},
	},
	methods: {
		filterVisibleField(row) {
			const rowVisible = {};

			Object.keys(this.header).forEach(e => {
				rowVisible[e] = row[e];
			});

			return rowVisible;
		},
	},
	computed: {
		isHeader() {
			return !!Object.keys(this.header).length;
		},
		getHeader() {
			return Object.values(this.header);
		},
		isTitle() {
			return !!this.title;
		},
		isBody() {
			return !!this.items.length;
		},
		colSpanTitle() {
			return Object.keys(this.header).length;
		},
		isRowBtn1() {
			return this.rowBtn1;
		},
	},
	data: () => ({}),
	mounted() {},
};
</script>
