import { Link } from 'react-router-dom';

const Home = () => {
	return (
		<>
			<div>
				<h1>LAAS</h1>
				<Link to={'/login'}>Log In</Link>
			</div>
		</>
	);
};

export default Home;
