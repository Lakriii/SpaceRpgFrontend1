import React from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, message }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 rounded-lg p-6 max-w-sm w-full text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {title && <h3 className="text-xl font-semibold mb-4">{title}</h3>}
        <p className="mb-6">{message}</p>
        <button
          onClick={onClose}
          className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
