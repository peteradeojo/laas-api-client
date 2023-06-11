import { useParams } from 'react-router-dom';
import {
	useGetAppQuery,
	useGetAppLogsQuery,
	useGenerareAppTokenMutation,
} from '../../services/api';

import styles from './style.module.scss';
import { useState } from 'react';

const Log = ({ log }) => {
	return (
		<>
			<div className={`${styles.log} ${styles[log.level]}`}>
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
							token:{' '}
							{appData?.data.token || (
								<button onClick={generateAppToken}>
									Generate/Regenerate Token
								</button>
							)}
						</p>
						{tokenResult.isLoading && <p>Generating token...</p>}

						<p>Page: {page}</p>
						<button onClick={prevPage}>Previous Page</button>
						<button onClick={nextPage}>Next Page</button>
					</div>
					{logs.data.length >= 1 &&
						logs.data.map((log) => <Log log={log} key={log._id} />)}

					{logs.data.length < 1 && (
						<Log
							log={{
								level: 'No Logs',
								text: 'No logs found',
							}}
						/>
					)}
				</>
			) : null}
		</>
	);
};

export default Application;
