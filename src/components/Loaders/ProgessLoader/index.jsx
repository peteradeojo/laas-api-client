import styles from './style.module.scss';

import HamsterLoader from '../Hamster';
import { Backdrop, CircularProgress } from '@mui/material';

const ProgressLoader = ({ isLoading = false }) => {
	// return (
	// 	<div>
	// 		<div className={`${styles.progressCard}`}>
	// 			<HamsterLoader />
	// 		</div>
	// 	</div>
	// );

	return (
		<Backdrop
			sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
			open={isLoading}
		>
			<CircularProgress color="inherit" />
		</Backdrop>
	);
};

export default ProgressLoader;
