import React, { useEffect, useRef, useState } from "react";

const ShowRolesButton = ({ roles }) => {
  const [showRoles, setShowRoles] = useState(false);

  const handleClick = () => {
    setShowRoles(!showRoles);
  };
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target)) {
        setShowRoles(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
if(roles.length===0){
    return <>No Roles</>
}
if(roles.length===1){
    return <>{roles[0]}</>
}
  return (
    <div className="relative">
      <button
      ref={buttonRef}
        onClick={handleClick}
        className="bg-blue-500 transition-all duration-200 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Show Roles
      </button>
      {showRoles && (
        <div className="absolute z-10 right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg px-2 py-2">
          <ul className="divide-y divide-gray-300">
            {roles.map((role, index) => (
              <li key={index} className="px-4 py-2 text-gray-700">
                {role}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ShowRolesButton;
