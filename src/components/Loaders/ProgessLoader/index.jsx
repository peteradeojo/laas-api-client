import styles from './style.module.scss';

import HamsterLoader from '../Hamster';

const ProgressLoader = () => {
	return (
		<div>
			<div className={`${styles.progressCard}`}>
				<HamsterLoader />
			</div>
		</div>
	);
};

export default ProgressLoader;
