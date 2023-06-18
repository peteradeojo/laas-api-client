import { useParams } from 'react-router-dom';
import {
	useGetAppQuery,
	useGetAppLogsQuery,
	useGenerareAppTokenMutation,
	useClearLogsMutation,
	useDeleteLogMutation,
} from '../../services/api';

import styles from './style.module.scss';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import ProgressLoader from '../../components/Loaders/ProgessLoader';
import AppHeader from '../../components/AppHeader';
import Log from '../../components/Log';
import PageSwitcher from '../../components/PageSwitcher';

const socket = io(__APP_ENV__.API_URL);

const LogList = ({ logs, refetchLogs, logDeleter }) => {
	return logs.map((log) => (
		<Log
			log={log}
			key={log._id}
			refetchLogs={refetchLogs}
			deleteLog={logDeleter(log._id)}
		/>
	));
};

const AppTokenGenerator = ({ onClick }) => (
	<button onClick={onClick}>Generate App Token</button>
);

const Application = () => {
	const [page, setPage] = useState(1);
	const [additionalLogs, setAdditionalLogs] = useState([]);

	const { id } = useParams();

	socket.emit('join', id);

	const logsHook = useGetAppLogsQuery({ appId: id, page, count: 20 });

	const appHook = useGetAppQuery(id);

	const [generateToken, tokenResult] = useGenerareAppTokenMutation();
	const [clearLogs, clearResult] = useClearLogsMutation();
	const [deleteLog, deleteLogResult] = useDeleteLogMutation();

	const generateAppToken = async () => {
		await generateToken(id);
		appHook.refetch();
	};

	useEffect(() => {
		const handleLogsMessage = (message) => {
			setAdditionalLogs((prev) => [message, ...prev]);
		};
		socket.on('log', handleLogsMessage);

		return () => {
			socket.off('log', handleLogsMessage);
		};
	}, []);

	const deleteAllLogs = async () => {
		setAdditionalLogs([]);
		await clearLogs(id);
		logsHook.refetch();
	};

	const deleteLogHandler = (logId) => {
		return async () => {
			await deleteLog(logId);
			setAdditionalLogs((prev) => prev.filter((log) => log._id != logId));
		};
	};

	return (
		<>
			{logsHook.isFetching && <ProgressLoader />}
			{(appHook.isLoading || appHook.isFetching) && <ProgressLoader />}
			{(!appHook.isLoading || appHook.isSuccess) && (
				<>
					<AppHeader app={appHook.data.data} />
				</>
			)}

			{(logsHook.isFetching || logsHook.isLoading) && <ProgressLoader />}
			<>
				<PageSwitcher
					page={page}
					setPage={setPage}
					logs={{ ...logsHook.data, data: null }}
				/>
			</>
			{logsHook.isSuccess &&
				(!logsHook.isFetching && logsHook.data.data.length == 0 ? (
					<Log
						empty
						appToken={appHook?.data?.data?.token}
						generateAppToken={generateAppToken}
						refetchLogs={logsHook.refetch}
					/>
				) : (
					<>
						<div
							className="container bg-primary"
							style={{ wordBreak: 'break-word' }}
						>
							{appHook?.data?.data?.token}
						</div>
						{
							<LogList
								logs={additionalLogs}
								refetchLogs={logsHook.refetch}
								logDeleter={deleteLogHandler}
							/>
						}
						{
							<LogList
								logs={logsHook.data.data}
								refetchLogs={logsHook.refetch}
								logDeleter={deleteLogHandler}
							/>
						}
					</>
				))}
		</>
	);
};

export default Application;
