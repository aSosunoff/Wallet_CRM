<script>
import { Pie } from 'vue-chartjs';

export default {
	extends: Pie,
	props: {
		labels: {
			type: Array,
			default: () => ([]),
		},
		datasetData: {
			type: Array,
			default: () => ([]),
		},
	},
	mounted() {
		this.renderChart(
			{
				labels: this.labels,
				datasets: [
					{
						backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
						data: this.datasetData,
					},
				],
			},
			{ responsive: true, maintainAspectRatio: false },
		);
	},
};
</script>
