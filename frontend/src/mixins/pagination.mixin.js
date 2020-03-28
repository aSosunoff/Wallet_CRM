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
			pagination: {
				current: page,
				size: 5,
				count: 0,
				allItems: [],
				itemsOnPage: [],
			},
		};
	},
	methods: {
		pageChangeHandler(page) {
			this.$router.push({ query: { page } }).catch(error => {
				if (error.name !== 'NavigationDuplicated') {
					throw error;
				}
			});
			// eslint-disable-next-line
			this.pagination.itemsOnPage =
				this.pagination.allItems[page - 1] || this.pagination.allItems[0];
		},
		setupPagination(pageAllItems) {
			this.pagination.allItems = chunk(pageAllItems, this.pagination.size);
			this.pagination.count = this.pagination.allItems.length;
			this.pageChangeHandler(this.pagination.current);
		},
	},
};
