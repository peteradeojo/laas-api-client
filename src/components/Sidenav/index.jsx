import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';

import MobileNav from './Mobile';
import DesktopSidenav from './Desktop';
import { TeamContext } from '../../context/TeamContext';
import { useContext } from 'react';

const Sidenav = ({ userHook, appsHook }) => {
	const isMobile = useMediaQuery('(max-width: 768px)');

	const navigate = useNavigate();

	const logout = () => {
		localStorage.removeItem('authToken');
		window.location.reload();
		navigate('/login');
	};

	const team = useContext(TeamContext);

	return (
		<TeamContext.Provider value={team}>
			{!isMobile ? (
				<DesktopSidenav
					userHook={userHook}
					appsHook={appsHook}
					logout={logout}
				/>
			) : (
				<MobileNav userHook={userHook} appsHook={appsHook} logout={logout} />
			)}
		</TeamContext.Provider>
	);
};

export default Sidenav;
