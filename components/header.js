import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
function createHeader(headerName, array, optionalCreatedAt) {
  const [isOpen2, setIsOpen2] = useState(false);
  return (
    <header className="relative bg-white shadow w-full">
      <button
        className="flex items-center justify-between w-full p-2 border hover:border-gray-300 focus:outline-none "
        onClick={() => setIsOpen2(!isOpen2)}
      >
        <div className="flex flex-col text-center ">


          <div className="link2">{headerName}</div>
          {optionalCreatedAt ? <div className="link2 ">{optionalCreatedAt}</div> : null}

        </div>
        <i
          className={`transform transition-all duration-200 fa-solid fa-angle-down ${
            isOpen2 ? `rotate-180` : ``
          }`}
        ></i>
      </button>
      <AnimatePresence>
        {isOpen2 && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-white shadow-xl p-2"
            style={{ height: isOpen2 ? "auto" : 0 }}
          >
            <div className="flex flex-col gap-3 px-4 ">
              {array.map((e) => {
                return <div className="">{e}</div>;
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
};

export default Header;
export const header = createHeader;
