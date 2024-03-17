import { useGetUserQuery, useGetAppsQuery } from '../../services/api';
import { Navigate, Outlet } from 'react-router-dom';
import Sidenav from '../Sidenav';
import TopNav from '../TopNav';
import { TeamContext } from '../../context/TeamContext';
import { useContext, useState } from 'react';

const DashBoardLayout = () => {
	const teamCtx = useContext(TeamContext);

	const [team, setTeam] = useState(teamCtx);

	const token = localStorage.getItem('authToken');
	const userHook = useGetUserQuery(token);
	const appsHook = useGetAppsQuery(teamCtx.onTeam, {
		refetchOnMountOrArgChange: false,
	});

	return (
		<>
			{appsHook.isError && <Navigate to="/login" />}

			{!token && <Navigate to="/login" />}
			{userHook.isError && <Navigate to={'/login'} />}
			<Sidenav appsHook={appsHook} userHook={userHook} />

			<TeamContext.Provider value={team}>
				<div className="main withSidebar">
					<TopNav
						updateTeam={(id) => {
							setTeam({ ...team, onTeam: id });
						}}
					/>
					<Outlet />
				</div>
			</TeamContext.Provider>
		</>
	);
};

export default DashBoardLayout;
