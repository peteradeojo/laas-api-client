import { Link } from 'react-router-dom';
import ProgressLoader from '../../components/Loaders/ProgessLoader';
import { useGetSummaryMetricsQuery } from '../../services/metrics';
import { BarChart } from '@mui/x-charts';
import MediaQuery from 'react-responsive';

const Metric = ({ m }) => {
	const series = [
		{
			data:
				m.data.length < 1
					? [0, 0, 0, 0]
					: m.data.map((d) => parseFloat(d.weight)),
		},
	];

	const xAxis = [
		{
			id: 'Level',
			scaleType: 'band',
			data: m.data.length < 1 ? ["critical", "warn", "error", "fatal"] : m.data.map((d) => d.level),
		},
	];

	return (
		<div style={{ width: '100%', minHeight: '300px' }}>
			<h2>
				App:{' '}
				<b>
					<Link to={`/dashboard/apps/${m.appId}`} >{m.app}</Link>
				</b>
			</h2>
			<br />

			<MediaQuery minWidth={415}>
				<BarChart
					xAxis={xAxis}
					series={series}
					height={300}
					width={400}
					bottomAxis={'Level'}
				/>
			</MediaQuery>
			<MediaQuery maxWidth={414}>
				<BarChart
					xAxis={xAxis}
					series={series}
					height={300}
					width={280}
					bottomAxis={'Level'}
				/>
			</MediaQuery>
		</div>
	);
};

const Metrics = ({ metrics }) => {
	return metrics.map((m, i) => <Metric key={i} m={m} />);
};

const Dashboard = () => {
	const metricsQuery = useGetSummaryMetricsQuery();

	return (
		<div className="container">
			{metricsQuery.isLoading ? (
				<ProgressLoader isLoading={true} />
			) : metricsQuery.isError ? (
				<p>{metricsQuery.error.message}</p>
			) : (
				<Metrics metrics={metricsQuery.data} />
			)}
		</div>
	);
};

export default Dashboard;
