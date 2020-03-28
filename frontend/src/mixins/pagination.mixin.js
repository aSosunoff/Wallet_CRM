const chunk = (arr, size = 1) => {
	const a = arr || [];

	return Array(Math.ceil(a.length / size))
		.fill([])
		.map((e, inx) => a.slice(inx * size, inx * size + size));
};

export default {
	data() {
		const page = window.parseInt(this.$route.query.page) || 1;
		return {
			page,
			pageSize: 5,
			pageCount: 0,
			items: [],
			itemsOnPage: [],
		};
	},
	methods: {
		pageChangeHandler(page) {
			this.$router.push({ query: { page } }).catch(error => {
				if (error.name !== 'NavigationDuplicated') {
					throw error;
				}
			});
			this.page = page;
			this.itemsOnPage = this.items[page - 1] || this.items[0];
		},
		setupPagination(items) {
			this.items = chunk(items, this.pageSize);
			this.pageCount = this.items.length;
			this.pageChangeHandler(this.page);
		},
	},
};
