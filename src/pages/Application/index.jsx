import { useParams } from 'react-router-dom';
import { useGetAppLogsQuery } from '../../services/api';

import styles from './style.module.scss';
import { useState } from 'react';

const Log = ({ log }) => {
	const [page, setPage] = useState(1);

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

	const nextPage = () => {
		setPage(page + 1);
	};

	const prevPage = () => {
		if (page == 1) return;
		setPage(page - 1);
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
