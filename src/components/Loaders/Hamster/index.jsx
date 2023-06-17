import styles from './style.module.scss';

const HamsterLoader = () => {
	return (
		<div role="img" className={styles.wheel_and_hamster}>
			<div className={styles.wheel} />
			<div className={styles.hamster}>
				<div className={styles.hamster__body}>
					<div className={styles.hamster__head}>
						<div className={styles.hamster__ear} />
						<div className={styles.hamster__eye} />
						<div className={styles.hamster__nose} />
					</div>
					<div className={`${styles.hamster__limb} ${styles.hamster__limb__fr}`} />
					<div className={`${styles.hamster__limb} ${styles.hamster__limb__fl}`} />
					<div className={`${styles.hamster__limb} ${styles.hamster__limb__br}`} />
					<div className={`${styles.hamster__limb} ${styles.hamster__limb__bl}`} />
					<div className={`${styles.hamster__tail}`} />
				</div>
			</div>
			<div className={styles.spoke} />
		</div>
	);
};

export default HamsterLoader;
