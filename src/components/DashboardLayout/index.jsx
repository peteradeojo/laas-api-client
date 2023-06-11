import styles from './style.module.scss';
import { useGetUserQuery, useGetAppsQuery } from '../../services/api';
import { useNavigate, Navigate, Outlet, Link } from 'react-router-dom';
import { useState } from 'react';

const DashBoardLayout = () => {
	const token = localStorage.getItem('authToken');
	const { data, error, isLoading } = useGetUserQuery(token);
	const {
		data: appsData,
		error: appsError,
		isLoading: appsLoading,
	} = useGetAppsQuery();

	return (
		<>
			<div className={styles.nav}>
				{error && (
					<p>
						Something went wrong: {error.message}
						<Navigate to={'/login'} />
					</p>
				)}
				<h1>
					<Link to="/dashboard">{data?.data.user.name}</Link>
				</h1>

				{appsError ? (
					<>Oops somehitng wen't wrong</>
				) : isLoading ? (
					<>Loading...</>
				) : appsData ? (
					<>
						{appsData.data.map((app) => (
							<div key={app._id}>
								<Link to={`/dashboard/apps/${app._id}`}>{app.title}</Link>
							</div>
						))}
					</>
				) : (
					<>No data o</>
				)}
			</div>
			<div>
				<Outlet />
			</div>
		</>
	);
};

export default DashBoardLayout;
