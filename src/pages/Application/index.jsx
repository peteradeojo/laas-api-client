import { useParams } from 'react-router-dom';
import {
	useGetAppQuery,
	useGetAppLogsQuery,
	useGenerareAppTokenMutation,
	useDeleteLogMutation,
	useClearLogsMutation,
} from '../../services/api';

import styles from './style.module.scss';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io(__APP_ENV__.API_URL);

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

const LogList = ({ logs }) => {
	return logs.map((log) => <Log log={log} key={log._id}></Log>);
};

const PageSwitcher = ({ appData, logs, setPage, page }) => {
	const nextPage = () => {
		setPage(page + 1);
	};

	const prevPage = () => {
		if (page == 1) return;
		setPage(page - 1);
	};
	return (
		<div>
			<p>Page: {page}</p>
			<button onClick={prevPage}>Previous</button>
			<button onClick={nextPage}>Next</button>
		</div>
	);
};

const Application = () => {
	const [page, setPage] = useState(1);
	const [additionalLogs, setAdditionalLogs] = useState([]);

	useEffect(() => {
		const handleLogsMessage = (message) => {
			console.log(message);
			// const newComponent = <Log log={message} />;
			setAdditionalLogs((prev) => [...prev, message]);
		};
		socket.on('log', handleLogsMessage);

		return () => {
			socket.off('log', handleLogsMessage);
		};
	}, []);

	const { id } = useParams();

	socket.emit('join', id);

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

	const generateAppToken = async () => {
		await generateToken(id);
		appRefetch();
	};

	return (
		<>
			<div className="container">
				<p>
					Viewing logs for: <b>{appData?.data.title}</b>
				</p>

				<div className="mt-3">
					{error ? (
						<>{error.message}</>
					) : isLoading ? (
						<>Still loading</>
					) : logs ? (
						<>
							<button
								onClick={() => {
									clearLogs(appData?.data._id);
									refetch();
								}}
							>
								Clear Logs
							</button>
							<PageSwitcher
								appData={appData?.data}
								logs={logs}
								// refetchLogs={refetch}
								page={page}
								setPage={setPage}
							/>
							{logs.data.length > 0 ? (
								<>
									<LogList logs={logs.data} />
									<LogList logs={additionalLogs} />
								</>
							) : (
								<Log empty appToken={appData?.data.token} />
							)}
						</>
					) : (
						<Log empty appToken={appData?.data.token} />
					)}
				</div>
			</div>
		</>
	);
};

export default Application;
