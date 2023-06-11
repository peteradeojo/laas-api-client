import { Link } from 'react-router-dom';
import { useGetUserQuery } from '../../services/api';
import { Navigate } from 'react-router-dom';

const Home = () => {
	const { data: user, error, isLoading } = useGetUserQuery();

	return (
		<>
			{error ? null : isLoading ? null : user ? (
				<Navigate to={'/dashboard'} />
			) : null}
			<div>
				<h1>LAAS</h1>
				<Link to={'/login'}>Log In</Link>
			</div>
		</>
	);
};

export default Home;
