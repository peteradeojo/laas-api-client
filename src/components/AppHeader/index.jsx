import { useState } from 'react';

import styles from './style.module.scss';
import { useClearLogsMutation, useUpdateAppMutation } from '../../services/api';
import ProgressLoader from '../Loaders/ProgessLoader';
import LogFilterPanel from '../LogFilterPanel';

const AppHeader = ({ app, refetchAppLogs }) => {
	const [clearLogs, clearResult] = useClearLogsMutation();
	const [updateApp, updateAppResult] = useUpdateAppMutation();

	const [appTitle, setAppTitle] = useState(app.title);
	const [editingTitle, setEditingTitle] = useState(false);
	const [dirtyTitle, setDirtyTitle] = useState(appTitle !== app.title);

	const clearLogsHandler = async () => {
		console.log('Clearing logs');
		try {
			await clearLogs(app._id);
			refetchAppLogs();
		} catch (err) {
			console.log(err);
		}
	};

	const saveApp = async () => {
		try {
			const response = await updateApp({
				id: app._id,
				body: { title: appTitle },
			}).unwrap();

			if (!response.statusCode) {
				setDirtyTitle(false);
				setAppTitle(response.data.title);
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<div className={styles.appHeader}>
				<div>
					{!editingTitle ? (
						<div className="row">
							<h1 onClick={(e) => setEditingTitle(true)}>
								{!dirtyTitle ? app.title : appTitle}
								{/* {appTitle} */}
							</h1>
							{dirtyTitle && (
								<button className="btn btn-sm ml-3" onClick={saveApp}>
									Save
								</button>
							)}
						</div>
					) : (
						<input
							autoFocus={true}
							type="text"
							value={appTitle}
							onChange={(e) => {
								setAppTitle(e.target.value);
							}}
							onFocus={(e) => setEditingTitle(true)}
							onBlur={(e) => {
								setAppTitle(e.target.value);
								setEditingTitle(false);
								setDirtyTitle(appTitle !== app.title);
							}}
							className="form-control"
						/>
					)}
				</div>
				<button
					className="btn"
					disabled={clearResult.isLoading}
					onClick={clearLogsHandler}
				>
					Clear Logs
				</button>
			</div>

			{clearResult.isLoading && <ProgressLoader />}
			{updateAppResult.isLoading && <ProgressLoader />}
		</>
	);
};

export default AppHeader;
