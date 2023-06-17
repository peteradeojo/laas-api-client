import styles from './style.module.scss';
import { useGetUserQuery, useGetAppsQuery } from '../../services/api';
import { useNavigate, Navigate, Outlet, Link } from 'react-router-dom';
import { useState } from 'react';
import Sidenav from '../Sidenav';

const DashBoardLayout = () => {
	const token = localStorage.getItem('authToken');
	const userHook = useGetUserQuery(token);
	const appsHook = useGetAppsQuery();

	const navigate = useNavigate();

	const logout = () => {
		localStorage.removeItem('authToken');
		navigate('/login');
	};

	return (
		<>
			{!token && <Navigate to="/login" />}
			<Sidenav appsHook={appsHook} userHook={userHook} />

			<div className="main">
				<Outlet />
			</div>
		</>
	);
};

export default DashBoardLayout;
