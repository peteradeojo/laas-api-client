import { useState } from 'react';
import { FaArrowDown, FaArrowRight } from 'react-icons/fa';

import styles from './style.module.scss';

const NavAppList = ({ children, label }) => {
	const [expanded, setExpanded] = useState(false);

	return (
		<div className={styles.dropdown}>
			<div
				className={styles.dropdownLabel}
				onClick={() => setExpanded(!expanded)}
			>
				{expanded ? <FaArrowDown /> : <FaArrowRight />}
				<p>{label}</p>
			</div>
			{expanded && <div className={styles.dropdownList}>{children}</div>}
		</div>
	);
};

export default NavAppList;
