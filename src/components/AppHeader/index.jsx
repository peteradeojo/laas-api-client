import styles from './style.module.scss';

const AppHeader = ({ app }) => {
	return (
		<div className={styles.appHeader}>
			<h1>{app.title}</h1>
		</div>
	);
};

export default AppHeader;
