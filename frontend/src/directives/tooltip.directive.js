export default {
	bind(el, { value, arg }) {
		let position = 'bottom';

		if (arg) {
			position = arg;
		}

		window.M.Tooltip.init(el, { html: value, position });
	},
	unbind(el) {
		const tooltip = window.M.Tooltip.getInstance(el);

		if (tooltip && 'destroy' in tooltip) {
			tooltip.destroy();
		}
	},
};
