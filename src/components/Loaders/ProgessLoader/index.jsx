import styles from './style.module.scss';

import HamsterLoader from '../Hamster';

const ProgressLoader = () => {
	return (
		<div className="container" style={{overflow: 'hidden'}}>
			<div className={`${styles.progressCard}`}>
				<p className="mb-3 center">Working</p>
				<HamsterLoader />
			</div>
		</div>
	);
};

export default ProgressLoader;
