import styles from '../style.module.scss';

import { FaArrowDown, FaArrowRight, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { buildAppLinks, buildUserEl } from '../util';
import NavAppList from '../NavAppList';

const DesktopSidenav = ({ userHook, appsHook, logout }) => {
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
								<NavAppList label={'Apps'}>
									{buildAppLinks(appsHook.data.data)}
								</NavAppList>
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

export default DesktopSidenav;
