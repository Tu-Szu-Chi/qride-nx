import React from 'react';
import { Modal } from 'antd';

interface DeleteConfirmModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  selectedCount: number;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  visible,
  onConfirm,
  onCancel,
  selectedCount,
}) => {
  return (
    <Modal
      title="Confirm Deletion"
      visible={visible}
      onOk={onConfirm}
      onCancel={onCancel}
      okText="Delete"
      cancelText="Cancel"
    >
      <p>Are you sure you want to delete {selectedCount} selected post(s)?</p>
    </Modal>
  );
};

export default DeleteConfirmModal;
