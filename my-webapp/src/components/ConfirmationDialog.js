// ConfirmationDialog.js
import React from 'react';

const ConfirmationDialog = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">DELETE MEMBER DETAILS</h3>
        <p className="mb-4">
          Are you sure you want to delete this member's details? This action cannot be undone.
        </p>
        <div className="flex justify-end">
          <button
            onClick={onConfirm}
            className="bg-purple-700 text-white py-2 px-4 rounded-md hover:bg-purple-800 transition mr-2"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
