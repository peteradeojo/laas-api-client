import LogFilterPanel from '../LogFilterPanel';
import styles from './style.module.scss';

const PageSwitcher = ({
	appId,
	logs = { count: 0, total: 0 },
	setPage,
	page,
	logsHook,
	setLogsFilter,
}) => {
	const nextPage = () => {
		setPage(page + 1);
	};

	const ofPage = Math.floor(logs?.total / logs?.count);

	const prevPage = () => {
		if (page == 1) return;
		setPage(page - 1);
	};
	return (
		<>
			<div className={styles.switcher}>
				<p>
					Page: {page} of {ofPage || 1}
				</p>
				<div className="row between py-1">
					<button className="btn mr-5" onClick={prevPage}>
						Previous
					</button>
					<button className="btn" onClick={nextPage}>
						Next
					</button>
				</div>
			</div>

			{appId && (
				<LogFilterPanel
					appId={appId}
					logsHook={logsHook}
					setLogsFilter={setLogsFilter}
				/>
			)}
		</>
	);
};

export default PageSwitcher;
