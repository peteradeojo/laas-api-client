import styles from './style.module.scss';

import { Navigate, Link } from 'react-router-dom';

import {
	FaArrowAltCircleRight,
	FaArrowDown,
	FaArrowRight,
	FaCog,
	FaHome,
	FaPlus,
	FaList,
	FaSignOutAlt,
} from 'react-icons/fa';
import { useState } from 'react';

import { buildAppLinks } from '../util';
import NavAppList from '../NavAppList';

const buildUserEl = (user) => {
	return (
		<>
			<img
				className="circle"
				src={`https://ui-avatars.com/api?name=${user.name}`}
				alt=""
				height={'50px'}
			/>
		</>
	);
};

const MobileNav = ({ userHook, appsHook, logout }) => {
	const [expanded, setExpanded] = useState(false);

	return (
		<div className={styles.mobileNavWrapper}>
			{appsHook.isLoading || appsHook.isFetching ? (
				<>Loading App</>
			) : appsHook.isError ? (
				<>{appsHook.error.data.message}</>
			) : appsHook.isSuccess ? (
				<>
					<div className="row between">
						<div>
							<button className="btn" onClick={() => setExpanded(!expanded)}>
								<FaList />
							</button>
						</div>
						<div>
							{userHook.isLoading || userHook.isFetching ? (
								<h3>Loading</h3>
							) : userHook.isError ? (
								<>An error occured</>
							) : userHook.isSuccess ? (
								buildUserEl(userHook.data.data.user)
							) : null}
						</div>
					</div>
					{expanded && (
						<ul className={`${styles.linksArea} mt-3`}>
							<li>
								<Link to={'/dashboard'}>
									<FaHome />
									Dashboard
								</Link>
							</li>
							<li>
								<NavAppList label={'Apps'}>
									{buildAppLinks(appsHook.data.data)}
								</NavAppList>
							</li>
							<li>
								<div className={`${styles.navItem}`} onClick={logout}>
									<FaSignOutAlt color="red" />
									Log Out
								</div>
							</li>
						</ul>
					)}
				</>
			) : (
				<Navigate to={'/'} />
			)}
		</div>
	);
};

export default MobileNav;
