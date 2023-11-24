import ProgressLoader from '../../components/Loaders/ProgessLoader';
import { useGetSummaryMetricsQuery } from '../../services/metrics';
import { BarChart } from '@mui/x-charts';
import MediaQuery from 'react-responsive';

const Metric = ({ m }) => {
	return (
		<div style={{ width: '100%', minHeight: '300px' }}>
			<h2>
				App:{' '}
				<b>
					<u>{m.app}</u>
				</b>
			</h2>
			<br />

			<MediaQuery minWidth={415}>
				<BarChart
					xAxis={[
						{
							id: 'Level',
							data: ['info', 'debug', 'warn', 'error', 'critical'],
							scaleType: 'band',
						},
					]}
					series={[
						{
							data:
								m.data.length < 1
									? [0, 0, 0, 0, 0]
									: m.data.map((d) => parseFloat(d.weight)),
						},
					]}
					height={300}
					width={400}
					bottomAxis={'Level'}
				/>
			</MediaQuery>
			<MediaQuery maxWidth={414}>
				<BarChart
					xAxis={[
						{
							id: 'Level',
							data: m.data.map((d) => d.level),
							scaleType: 'band',
						},
					]}
					series={[{ data: m.data.map((d) => parseFloat(d.weight)) }]}
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
				<ProgressLoader />
			) : metricsQuery.isError ? (
				<p>{metricsQuery.error.message}</p>
			) : (
				<Metrics metrics={metricsQuery.data} />
			)}
		</div>
	);
};

export default Dashboard;
