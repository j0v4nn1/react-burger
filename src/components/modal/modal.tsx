import styles from './modal.module.css';
import ReactDOM from 'react-dom';
import React, { useEffect } from 'react';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { useNavigate } from 'react-router-dom';
import { ModalComponent } from './modal.types';

const Modal: React.FC<ModalComponent> = ({ children, closeModalPath, onRemove }) => {
  const navigate = useNavigate();

  useEffect(() => {
    document.addEventListener('keydown', keydownHandler);
    return () => document.removeEventListener('keydown', keydownHandler);
  });

  const handleCloseModal = () => {
    onRemove();
    navigate(closeModalPath);
  };

  const keydownHandler = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      handleCloseModal();
    }
  };

  const portalElement = document.getElementById('react-modals');

  if (portalElement) {
    return ReactDOM.createPortal(
      <div className={styles.modals}>
        <ModalOverlay onClose={handleCloseModal} />
        <div className={styles.modal}>{children}</div>
      </div>,
      portalElement
    );
  } else {
    return null;
  }
};

export default Modal;
