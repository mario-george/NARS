import Link from 'next/link';
import React, { useState } from 'react';

const SideDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className="focus:outline-none" onClick={toggleDrawer}>
        Open Drawer
      </button>
      <aside
        className={`fixed inset-0 z-10 transform transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } bg-white h-full w-64 p-4`}>
        <h3 className="text-lg font-medium">Side Drawer</h3>
        <nav className="mt-4" onClick={() => setIsOpen(!isOpen)}>
          <Link
            className="block p-2 text-gray-800 hover:bg-gray-200"
            href="/login">
            Login
          </Link>
          <Link
            className="block p-2 text-gray-800 hover:bg-gray-200"
            href="/register">
            Register
          </Link>
        </nav>
      </aside>
    </>
  );
};

export default SideDrawer;
