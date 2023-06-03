import React from "react";
import ShowRolesButton from "./ShowRolesButton";

const StaffCard = ({ name, email, roles, image }) => {
  return (
    <div className="shadow-md my-2 appearance-none bg-white text-gray-900 shadow rounded-lg p-6 flex items-center space-x-4 border border-gray-200 w-full">
      <div className="flex-shrink-0">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-8 h-8 rounded-full"
          />
        ) : (

            <i className="fa-solid text-blue-500  fa-user fa-2x"></i>
        )}
      </div>
      <div className="flex-1 space-y-1 min-w-0">
        <p className=" font-medium truncate">
          {name}
        </p>
        <p className=" text-gray-500 truncate">
          {email}
        </p>
      </div>
      <div className="inline-flex items-center text-base font-semibold">
        {roles.length===1?roles:<ShowRolesButton roles={roles} />}
      </div>
    </div>
  );
};

export default StaffCard;
