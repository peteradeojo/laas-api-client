import HamsterLoader from '../../components/Loaders/Hamster';

const Dashboard = ({ message }) => {
	return (
		<div>
			{message ? (<>{message}</>): null}
			<HamsterLoader />
		</div>
	);
};

export default Dashboard;
