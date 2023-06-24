import styles from './style.module.scss';
import { useClearLogsMutation } from '../../services/api';
import ProgressLoader from '../Loaders/ProgessLoader';

const AppHeader = ({ app, refetchAppLogs }) => {
	const [clearLogs, clearResult] = useClearLogsMutation();

	const clearLogsHandler = async () => {
		console.log('Clearing logs');
		try {
			await clearLogs(app._id);
			refetchAppLogs();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<div className={styles.appHeader}>
				<h1>{app.title}</h1>
				<button
					className="btn"
					disabled={clearResult.isLoading}
					onClick={clearLogsHandler}
				>
					Clear Logs
				</button>
			</div>

			{clearResult.isLoading && <ProgressLoader />}
		</>
	);
};

export default AppHeader;
