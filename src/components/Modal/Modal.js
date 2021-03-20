import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ children }) => {
  return createPortal(
    <div className={styles.Overlay}>
      <div className={styles.Modal}>{children}</div>
    </div>,
    modalRoot,
  );
};
export default Modal;
