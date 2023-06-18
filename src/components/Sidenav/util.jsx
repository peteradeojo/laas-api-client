import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

import styles from './style.module.scss';

export const buildUserEl = (data) => {
	const { user } = data;

	return (
		<>
			<img src={`https://ui-avatars.com/api?name=${user.name}`} alt="" />
			<p className={styles.nametag}>{user.name}</p>
		</>
	);
};

export const buildAppLinks = (apps) => {
	// if (apps.length === 0) {
	// 	return (
	// 		<Link to={'apps/new'}>
	// 			<FaPlus /> Create App
	// 		</Link>
	// 	);
	// }

	return (
		<>
			<Link to={'apps/new'}>
				<FaPlus /> Create App
			</Link>
			{apps.map((app) => (
				<Link key={app._id} to={`apps/${app._id}`}>
					{app.title}
				</Link>
			))}
		</>
	);
};
