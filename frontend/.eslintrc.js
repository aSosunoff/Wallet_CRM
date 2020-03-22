module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: ['plugin:vue/essential', '@vue/airbnb'],
	parserOptions: {
		parser: 'babel-eslint',
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		indent: ['error', 'tab'],
		'no-param-reassign': [2, { props: false }],
		'arrow-parens': ['error', 'as-needed'],
		'no-tabs': 0,
		'object-curly-newline': 'off',
	},
};
