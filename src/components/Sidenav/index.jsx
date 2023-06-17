import { Link, useNavigate } from 'react-router-dom';
import {
	FaArrowAltCircleRight,
	FaArrowDown,
	FaArrowRight,
	FaCog,
	FaHome,
	FaPlus,
} from 'react-icons/fa';
import { useState } from 'react';

import styles from './style.module.scss';

const buildUserEl = (data) => {
	const { user } = data;

	return (
		<>
			<img src={`https://ui-avatars.com/api?name=${user.name}`} alt="" />
			<p className={styles.nametag}>{user.name}</p>
		</>
	);
};

const buildAppLinks = (apps) => {
	if (apps.length === 0) {
		return (
			<Link to={'apps/new'}>
				<FaPlus /> Create App
			</Link>
		);
	}

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

const DropDownLink = ({ children, label }) => {
	const [expanded, setExpanded] = useState(false);

	return (
		<div className={styles.dropdown + ' ' + (expanded ? styles.expanded : '')}>
			<div
				className={styles.dropdownLabel}
				onClick={() => setExpanded(!expanded)}
			>
				{expanded ? <FaArrowDown /> : <FaArrowRight />}
				<p>{label}</p>
			</div>
			<div className={styles.dropdownList}>{children}</div>
		</div>
	);
};

const Sidenav = ({ userHook, appsHook }) => {
	const navigate = useNavigate();

	const logout = () => {
		localStorage.removeItem('authToken');
		navigate('/login');
	};

	return (
		<>
			<div className={'p-5 ' + styles.sidenavWrapper}>
				<nav className={styles.sidenav}>
					<Link to={'/dashboard'} className={styles.userPane}>
						{userHook.isSuccess ? buildUserEl(userHook.data.data) : null}
					</Link>

					<ul className={'mt-4 ' + styles.linksArea}>
						<li>
							<Link to={'/dashboard'}>
								<FaHome />
								<p>Dashboard</p>
							</Link>
						</li>
						{appsHook.isSuccess ? (
							<li>
								<DropDownLink label={'Apps'}>
									{buildAppLinks(appsHook.data.data)}
								</DropDownLink>
							</li>
						) : appsHook.isLoading ? (
							<li>
								<p className={styles.navItem}>Loading apps</p>
							</li>
						) : null}
					</ul>
				</nav>

				<footer className={styles.footer} onClick={() => logout()}>
					<p>Log out</p>
				</footer>
			</div>
		</>
	);
};

export default Sidenav;
