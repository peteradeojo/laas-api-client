import { useParams } from 'react-router-dom';
import {
	useGetAppQuery,
	useGetAppLogsQuery,
	useGenerareAppTokenMutation,
	useDeleteLogMutation,
	useClearLogsMutation,
} from '../../services/api';

import styles from './style.module.scss';
import { useState } from 'react';

const Log = ({ log, refetchLogs, empty, appToken }) => {
	if (empty) {
		return (
			<div className={`${styles.log} ${styles.empty}`}>
				<p className={'h3'}>Empty</p>
				<p>
					You haven't stored any logs here yet. Copy your token to start sending
					logs: {appToken}
				</p>
				<br />
				<br />
				<pre>
					curl
					<br />
					-X POST
					<br />
					https://laas-api-nest.onrender.com/logs
					<br />
					--json
					<br />
					{'{"level": "info", "text": "Hello World"}'}
				</pre>
			</div>
		);
	}

	const [deleteLog, deleteResult] = useDeleteLogMutation();

	// console.log(refetchLogs);

	const deleteLogHandler = async (id) => {
		await deleteLog(id);
		alert('Log deleted');
		refetchLogs();
	};

	return (
		<>
			<div className={`${styles.log} ${styles[log.level]}`}>
				<span
					className={styles.close}
					onClick={() => {
						deleteLogHandler(log._id);
					}}
				>
					&times;
				</span>
				<p className={'h3'}>{log.level}</p>
				<p>{log.text}</p>
				<p>{log.createdAt}</p>
			</div>
		</>
	);
};

const Application = () => {
	const [page, setPage] = useState(1);

	const { id } = useParams();
	const {
		data: logs,
		error,
		isLoading,
		refetch,
	} = useGetAppLogsQuery({ appId: id, page, count: 20 });

	const {
		data: appData,
		error: appError,
		isLoading: appIsLoading,
		refetch: appRefetch,
	} = useGetAppQuery(id);

	const [generateToken, tokenResult] = useGenerareAppTokenMutation();
	const [clearLogs, clearResult] = useClearLogsMutation();

	const nextPage = () => {
		setPage(page + 1);
	};

	const prevPage = () => {
		if (page == 1) return;
		setPage(page - 1);
	};

	const generateAppToken = async () => {
		await generateToken(id);
		appRefetch();
	};

	return (
		<>
			{error ? (
				<p>An error occurred: {error.message}</p>
			) : isLoading ? (
				<>Loading...</>
			) : logs ? (
				<>
					<div style={{ margin: '10px 0' }}>
						<h3>{appData?.data.title}</h3>
						<p>
							{/* token:{' '}
							{appData?.data.token || (
								<button onClick={generateAppToken}>
									Generate/Regenerate Token
								</button>
							)} */}
							<button
								onClick={async () => {
									console.log(id);
									await clearLogs(id);
									refetch(id);
								}}
							>
								Clear Logs
							</button>
						</p>
						{tokenResult.isLoading && <p>Generating token...</p>}
						{!appError && appData && (
							<>
								{(
									<p
										onClick={(e) => {
											navigator.clipboard.writeText(appData.data.token);
											alert('Copied to clipboard');
										}}
									>
										{appData.data.token}
									</p>
								) || <button onClick={generateAppToken}>Generate Token</button>}
							</>
						)}

						<p>Page: {page}</p>
						<p>Total: {logs.total}</p>
						<button onClick={prevPage}>Previous Page</button>
						<button onClick={nextPage}>Next Page</button>
					</div>
					{logs.data.length >= 1 &&
						logs.data.map((log) => (
							<Log
								log={log}
								key={log._id}
								refetchLogs={() => {
									refetch(id);
								}}
							/>
						))}

					{logs.data.length < 1 && <Log empty appToken={appData?.data.token} />}
				</>
			) : null}
		</>
	);
};

export default Application;
