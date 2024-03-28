import styles from './modal-overlay.module.css';
import { ModalOverlayComponent } from './modal-overlay.types';
import React from 'react';

const ModalOverlay: React.FC<ModalOverlayComponent> = ({ onClose }) => {
  return <div onClick={onClose} className={styles.modal}></div>;
};

export default ModalOverlay;
