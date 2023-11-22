import { useRef } from 'react';
import styles from './style.module.scss';

const Modal = ({ children, closer }) => {
	// Closer function is required to display the modal
	const modalRef = useRef();
	if (!closer) return <></>;

	return (
		<div
			className={styles.modal}
			onClick={function (e) {
				if (!modalRef.current.contains(e.target)) {
					closer();
				}
			}}
		>
			<div className={styles.modalBody} ref={modalRef}>
				<button className={styles.closeButton + '  btn'} onClick={closer}>
					&times;
				</button>
				<div style={{width: "100%"}}>{children}</div>
			</div>
		</div>
	);
};

export default Modal;
