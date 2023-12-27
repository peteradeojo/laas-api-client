import { useParams } from 'react-router-dom';
import {
	useGetAppQuery,
	useGetAppLogsQuery,
	useGenerareAppTokenMutation,
	useClearLogsMutation,
	useDeleteLogMutation,
} from '../../services/api';

import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import ProgressLoader from '../../components/Loaders/ProgessLoader';
import AppHeader from '../../components/AppHeader';
import Log from '../../components/Log';
import PageSwitcher from '../../components/PageSwitcher';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const LogList = ({ logs, refetchLogs, logDeleter }) => {
	return logs.map((log) => (
		<Log
			log={log}
			key={`log-${log.level}-${log.id}`}
			refetchLogs={refetchLogs}
			deleteLog={logDeleter(log.id)}
		/>
	));
};

const AppTokenGenerator = ({ onClick }) => (
	<button onClick={onClick}>Generate App Token</button>
);

const Application = () => {
	const socket = io(__APP_ENV__.WS_URL);

	const [logFilter, setLogsFilter] = useState({});
	const [page, setPage] = useState(1);
	const [additionalLogs, setAdditionalLogs] = useState([]);

  const appContext = useContext(AppContext);

	const { id } = useParams();

	socket.emit('connect-log-stream', id);

	const logsHook = useGetAppLogsQuery({
		appId: id,
		page,
		count: 20,
		filter: logFilter,
	});

	const appHook = useGetAppQuery(id);

	const [generateToken, tokenResult] = useGenerareAppTokenMutation();
	const [clearLogs, clearResult] = useClearLogsMutation();
	const [deleteLog, deleteLogResult] = useDeleteLogMutation();

	const generateAppToken = async () => {
		await generateToken(id);
		appHook.refetch();
	};

  if (appHook.isSuccess) {
    appContext.app = appHook.data.data;
  }

	useEffect(() => {
		const handleLogsMessage = (message) => {
			setAdditionalLogs((prev) => [message, ...prev]);
		};
		socket.on('log', handleLogsMessage);

		return () => {
			socket.off('log', handleLogsMessage);
			socket.disconnect();
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
			setAdditionalLogs((prev) => prev.filter((log) => log.id != logId));
		};
	};

	return (
		<>
			{deleteLogResult.isLoading && <ProgressLoader />}
			{logsHook.isFetching && <ProgressLoader />}
			{(appHook.isLoading || appHook.isFetching) && <ProgressLoader />}
			{!appHook.isLoading || appHook.isSuccess ? (
				<>
					<AppHeader
						app={appContext.app}
						refetchAppLogs={logsHook.refetch}
						clearLogs={deleteAllLogs}
						clearResult={clearResult}
						key={appHook.data.data.id}
					/>
				</>
			) : (
				<></>
			)}

			{(logsHook.isFetching || logsHook.isLoading) && <ProgressLoader isLoading={true} />}
			<>
				<PageSwitcher
					appId={appHook?.data?.data?.id}
					page={page}
					setPage={setPage}
					logs={{ ...logsHook.data, data: null }}
					logsHook={logsHook}
					setLogsFilter={setLogsFilter}
				/>
			</>
			{logsHook.isSuccess &&
				(!logsHook.isFetching &&
				!logsHook.isLoading &&
				logsHook.data.data.length == 0 &&
				additionalLogs.length == 0 ? (
					<Log
						empty
						appToken={appHook?.data?.data?.token}
						generateAppToken={generateAppToken}
						refetchLogs={logsHook.refetch}
					/>
				) : (
					<>
						<div className="container" style={{ wordBreak: 'break-word' }}>
							<div className="p-2 mb-2 bg-primary">{appHook?.data?.data?.token}</div>
							{
								<LogList
									logs={[...additionalLogs, ...(logsHook.data.data || [])]}
									refetchLogs={logsHook.refetch}
									logDeleter={deleteLogHandler}
									key={`appLogs-${appHook.data?.data.id}`}
								/>
							}
						</div>
					</>
				))}
		</>
	);
};

export default Application;
