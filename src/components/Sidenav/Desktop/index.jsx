import styles from '../style.module.scss';

import {
	FaArrowDown,
	FaArrowRight,
	FaCog,
	FaCogs,
	FaGithub,
	FaHome,
	FaPlus,
	FaSignOutAlt,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { buildUserEl } from '../util';

const DesktopSidenav = ({ userHook, appsHook, logout }) => {
	return (
		<>
			<div className={'p-5 ' + styles.sidenavWrapper}>
				<nav className={styles.sidenav}>
					<Link to={'/profile'} className={styles.userPane}>
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
							<>
								<li>
									<Link to={'/dashboard/apps'}>
										<FaCog /> Apps
									</Link>
								</li>
								<li>
									<a href="https://github.com/peteradeojo/laas-api-client" target='_blank' rel='noreferrer noopener'>
										<FaGithub /> View on Github
									</a>
								</li>
								<li>
									<span className={styles.navItem} onClick={() => logout()}>
										<FaSignOutAlt color="red" /> Logout
									</span>
								</li>
							</>
						) : appsHook.isLoading ? (
							<li>
								<p className={styles.navItem}>
									<FaCogs />
									Loading your sidebar
								</p>
							</li>
						) : null}
					</ul>
				</nav>

				{/* <footer className={styles.footer} onClick={() => logout()}>
					<p>Log out</p>
				</footer> */}
			</div>
		</>
	);
};

export default DesktopSidenav;
