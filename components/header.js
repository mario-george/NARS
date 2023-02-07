import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
function createHeader(headerName, array) {
  const [isOpen2, setIsOpen2] = useState(false);

  return (
    <header className="relative bg-white shadow w-full">
      <button
        className="flex items-center justify-between w-full p-2 border hover:border-gray-300 focus:outline-none "
        onClick={() => setIsOpen2(!isOpen2)}>
        <div className="text-lg md:text-xl font-bold link2 ">{headerName}</div>
  
          {isOpen2 ? (
            <i class="fa-solid fa-angle-up"></i>
          ) : (
            <i class="fa-solid fa-angle-down"></i>
          )}
        
      </button>
      <AnimatePresence>
        {isOpen2 && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-white shadow-xl p-2"
            style={{ height: isOpen2 ? 'auto' : 0 }}>
              <div className="flex flex-col gap-3 px-4">

            {array.map((e) => {
              return <div>{e}</div>;
            })}
              </div>
            {/* <p className="p-2 border border-gray-300">Option 1</p> */}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  // return (
  //   // <>
  //   //   <header className="relative bg-white shadow">
  //   //     <button
  //   //       className="flex items-center p-2 border-2 border-transparent hover:border-gray-300 focus:outline-none"
  //   //       onClick={() => setIsOpen(!isOpen)}>
  //   //       <span className="font-medium text-lg">Header</span>
  //   //       <svg className="h-6 w-6 ml-2" viewBox="0 0 20 20" fill="currentColor">
  //   //         {isOpen ? (
  //   //           <path
  //   //             fillRule="evenodd"
  //   //             d="M5.293 6.707a1 1 0 010-1.414L10.586 10 5. 293 4.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
  //   //             clipRule="evenodd"
  //   //           />
  //   //         ) : (
  //   //           <path
  //   //             fillRule="evenodd"
  //   //             d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3. 293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
  //   //             clipRule="evenodd"
  //   //           />
  //   //         )}
  //   //       </svg>
  //   //     </button>
  //   //     <AnimatePresence>
  //   //       {isOpen && (
  //   //         <motion.div
  //   //           initial={{ height: 0 }}
  //   //           animate={{ height: 'auto' }}
  //   //           exit={{ height: 0, opacity: 0 }}
  //   //           className="bg-white shadow-xl p-2"
  //   //           style={{ height: isOpen ? 'auto' : 0 }}>
  //   //           <p className="p-2 border-2 border-gray-300">Option 1</p>
  //   //           <p className="p-2 border-2 border-gray-300">Option 2</p>
  //   //           <p className="p-2 border-2 border-gray-300">Option 3</p>
  //   //         </motion.div>
  //   //       )}
  //   //     </AnimatePresence>
  //   //   </header>
  //   //   <header className="relative bg-white shadow">
  //   //     <button
  //   //       className="flex items-center p-2 border-2 border-transparent hover:border-gray-300 focus:outline-none"
  //   //       onClick={() => setIsOpen2(!isOpen2)}>
  //   //       <span className="font-medium text-lg">Header</span>
  //   //       {isOpen2 ? (
  //   //         <i class="fa-solid fa-angle-up"></i>
  //   //       ) : (
  //   //         <i class="fa-solid fa-angle-down"></i>
  //   //       )}
  //   //     </button>
  //   //     <AnimatePresence>
  //   //       {isOpen2 && (
  //   //         <motion.div
  //   //           initial={{ height: 0 }}
  //   //           animate={{ height: 'auto' }}
  //   //           exit={{ height: 0, opacity: 0 }}
  //   //           className="bg-white shadow-xl p-2"
  //   //           style={{ height: isOpen ? 'auto' : 0 }}>
  //   //           <p className="p-2 border-2 border-gray-300">Option 1</p>
  //   //           <p className="p-2 border-2 border-gray-300">Option 2</p>
  //   //           <p className="p-2 border-2 border-gray-300">Option 3</p>
  //   //         </motion.div>
  //   //       )}
  //   //     </AnimatePresence>
  //   //   </header>
  //   // </>
  // );
};

export default Header;
export const header = createHeader;
