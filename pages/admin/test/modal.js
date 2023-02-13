import React, { useState } from 'react';

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button onClick={toggleModal} className="bg-blue-500 text-white py-2 px-4 rounded">
        Open Modal
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-500 opacity-75 flex items-center justify-center">
          <div className="relative w-64 bg-white p-6 shadow-lg">
            <button onClick={toggleModal} className="absolute top-0 right-0">
              <i class='fa'></i>
            </button>
            <h3 className="text-lg font-medium mb-4">Modal Title</h3>
            <p className="text-gray-700 mb-4">Modal content goes here.</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
