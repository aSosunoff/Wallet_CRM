const compose = (...fn) => x =>
	fn.reduceRight(
		(res, f) => (Array.isArray(f) ? f.map(x => x(res)) : f(res)),
		x
	);

const partial = (fn, ...a) => (...b) => fn.apply(this, [...a, ...b]);

const trace = x => { console.log(x); return x; };

const data = {
	title: "title",
	header: Array(4).fill("Привет"),
	data: [Array(5).fill("Привет"), Array(5).fill("Пока"), Array(5).fill("Пока"), Array(5).fill("Пока"), Array(5).fill("Пока")],
	delete: true,
	deleteRow: false,
	editRow: true,
    pageSize: 2,
    page: 1,
};

const fieldAdd = (nameField, x) => {    
    return e => {
        e[nameField] = nameField in x && x[nameField];
        return e;
    };
};

const DeleteRow = partial(fieldAdd, 'deleteRow');

const EditRow = partial(fieldAdd, 'editRow');

let result = compose(
	x => {
		x.data.map((e, inx) => {
			e.cellValue.unshift((inx + 1) + (x.page - 1) * x.pageSize);
			return e;
		});

		return x;
	},
	x => {
		if (x.data.length && x.pageSize > x.data.length) {
			x.data.push(
				...Array(x.pageSize - x.data.length).fill({
					cellValue: Array(x.data[0].cellValue.length).fill(""),
					editRow: false,
					deleteRow: false
				})
			);
		}

		return x;
    },
    x => ({
		...x,
        data: x.data.map(DeleteRow(x))
    }),
	x => ({
		...x,
        data: x.data.map(EditRow(x))
	}),
	x => ({
		...x,
		data: x.data.map(e => ({ cellValue: e.slice(0, x.columnCount) }))
    }),
    x => ({
		...x,
		data: x.data.slice(x.pageSize * x.page - x.pageSize, x.pageSize * x.page)
	}),
	x => ({
		...x,
		columnCount: x.header.length 
			? x.header.length 
			: x.data.slice(0, 1)[0].length,
	}),
	x => ({
		...x,
		header: 'header' in x ? x.header : []
	}),
    x => ({
		...x,
		data: 'data' in x ? x.data : []
	})
)(data);

console.log(result);
