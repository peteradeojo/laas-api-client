import { useGetUserQuery, useGetAppsQuery } from '../../services/api';
import { Navigate, Outlet } from 'react-router-dom';
import Sidenav from '../Sidenav';

const DashBoardLayout = () => {
	const token = localStorage.getItem('authToken');
	const userHook = useGetUserQuery(token);
	const appsHook = useGetAppsQuery(null, { refetchOnMountOrArgChange: false });

	return (
		<>
			{appsHook.isError && <Navigate to="/login" />}
		
			{!token && <Navigate to="/login" />}
			{userHook.isError && <Navigate to={'/login'}/>}
			<Sidenav appsHook={appsHook} userHook={userHook} />

			<div className="main withSidebar">
				<Outlet />
			</div>
		</>
	);
};

export default DashBoardLayout;
