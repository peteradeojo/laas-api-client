import { Link, Outlet } from 'react-router-dom';

export default () => {
	return (
		<>
			<h1>
				<Link to={'/'}>LAAS</Link>
			</h1>
			<Outlet />
		</>
	);
};
