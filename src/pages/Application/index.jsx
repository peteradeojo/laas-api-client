import { useParams } from 'react-router-dom';
import {
	useGetAppQuery,
	useGetAppLogsQuery,
	useGenerareAppTokenMutation,
	useClearLogsMutation,
} from '../../services/api';

import styles from './style.module.scss';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import ProgressLoader from '../../components/Loaders/ProgessLoader';
import AppHeader from '../../components/AppHeader';
import Log from '../../components/Log';

const socket = io(__APP_ENV__.API_URL);

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

	const generateAppToken = async () => {
		await generateToken(id);
		appHook.refetch();
	};

	useEffect(() => {
		const handleLogsMessage = (message) => {
			console.log(message);
			// const newComponent = <Log log={message} />;
			setAdditionalLogs((prev) => [message, ...prev]);
			// logsHook.data?.data.push(message);
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

	return (
		<>
			{logsHook.isFetching && <ProgressLoader />}
			{(appHook.isLoading || appHook.isFetching) && <ProgressLoader />}
			{(!appHook.isLoading || appHook.isSuccess) && (
				<AppHeader app={appHook.data.data} />
			)}

			{(logsHook.isLoading || logsHook.isFetching) && <ProgressLoader />}
			{logsHook.isSuccess &&
				(!logsHook.isFetching && logsHook.data.data.length == 0 ? (
					<Log
						empty
						appToken={appHook?.data?.data?.token}
						generateAppToken={generateAppToken}
					/>
				) : (
					<>
						<></>
						{<LogList logs={additionalLogs} />}
						{<LogList logs={logsHook.data.data} />}
					</>
				))}
			<PageSwitcher page={page} setPage={setPage} />
		</>
	);
};

export default Application;
