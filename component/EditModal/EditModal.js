// components/EditModal.js
import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from './EditModal.module.css';

//Modal.setAppElement('#__next'); // Ensures the modal binds to the correct root element

const EditModal = ({ isOpen, onRequestClose, rowData, onSave }) => {
  const [formData, setFormData] = useState({ ...rowData });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Row"
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <div className={styles.modalContent}>
        <h2>Edit Row</h2>
        <form>
          {Object.keys(formData).map((key) => (
            <div key={key} className={styles.formGroup}>
              <label htmlFor={key} className={styles.label}>
                {key}
              </label>
              <input
                type="text"
                id={key}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
          ))}
        </form>
        <div className={styles.buttonGroup}>
          <button type="button" onClick={handleSubmit} className={styles.saveButton}>
            Save
          </button>
          <button type="button" onClick={onRequestClose} className={styles.cancelButton}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditModal;
