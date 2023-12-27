import styles from './style.module.scss';
import { useContext, useState, useRef } from 'react';

import LogContext from '../LogContext';
import { AppContext } from '../../context/AppContext';

const parseDate = (date) => {
	const d = new Date(date);
	return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
};

const Log = ({
	log,
	refetchLogs,
	empty,
	appToken,
	generateAppToken,
	deleteLog,
}) => {
	if (empty) {
		return (
			<div className={`${styles.empty}`} key={`log-for-${appToken}`}>
				<span className={'h3'}>Empty</span>
				<div>
					You haven't stored any logs here yet.
					{appToken ? (
						<>
							<p>
								Copy your app token to send logs <br />
								<br />
								<button
									onClick={() => {
										navigator.clipboard.writeText(appToken);
									}}
								>
									Copy
								</button>{' '}
								<span>{appToken}</span>
							</p>
						</>
					) : (
						<p>
							<br />
							Generate an app token to begin sending logs
							<br />
							<button className="btn btn-primary" onClick={generateAppToken}>
								Generate
							</button>
						</p>
					)}
				</div>
				<br />
				<pre>
					curl
					<br />
					-X POST
					<br />
					https://laas-api-nest.onrender.com/logs
					<br />
					-H "APP_ID: {appToken}"
					<br />
					--json
					<br />
					{'{"level": "info", "text": "Hello World"}'}
				</pre>
			</div>
		);
	}

	// const [deleteLog, deleteResult] = useDeleteLogMutation();

	const [expanded, setExpanded] = useState(false);

	const appContext = useContext(AppContext);

	const deleteLogHandler = async (id) => {
		await deleteLog(id);
		// alert("Log deleted");
		refetchLogs();
	};

	const toggleExpansion = (e) => {
    setExpanded(!expanded);
  };

	return (
		<>
			<div
				className={`${styles.log} ${expanded ? 'expanded' : ''}`}
			>
				{!expanded ? (
					<>
						<div className="row nowrap">
							<p
								className={`${styles.level} ${styles[log.level.toLowerCase()]}`}
                onClick={toggleExpansion}
							>
								{log.level.toUpperCase()}
							</p>
							<p className={styles.logText} onClick={toggleExpansion}>
								{log.text.substr(0, 100)}
								{log.text.length > 100 && '...'}
							</p>
						</div>
					</>
				) : (
					<div
						className={`${styles.expandedLog} ${
							styles[log.level.toLowerCase()]
						}`}
					>
						<p className={`${styles.title} row between`} onClick={toggleExpansion}>
							<span>
								<b>{appContext.app.title} </b>(IP: {log.ip})
							</span>
							<span>{log.createdAt}</span>
						</p>
						<div className={styles.logMessage}>{log.text}</div>
						<div>
							<LogContext context={log.context} />
						</div>
					</div>
				)}
				<div className="pb-2"></div>
			</div>
		</>
	);

	// return (
	//   <>
	//     <div className={`${styles.log}`}>
	//       <span
	//         className={styles.close}
	//         onClick={() => {
	//           deleteLogHandler(log.id);
	//         }}
	//       >
	//         &times;
	//       </span>
	//       <span className={`${styles.levelBar} ${styles[log.level]}`}></span>
	//       <div className={`${styles.logContent}`}>
	//         <div>
	//           <p style={{ fontSize: "1.3em", fontWeight: "bolder" }}>
	//             {log.level.toUpperCase()}
	//           </p>
	//           <small>{parseDate(log.createdAt)}</small>
	//           <p>
	//             <b>IP Address:</b> {log.ip}
	//           </p>
	//           <p style={{ padding: "10px 4px", background: "#ccc" }}>{log.text}</p>
	//           <LogContext context={log.context} />
	//         </div>
	//       </div>
	//     </div>
	//   </>
	// );
};

export default Log;
