import { useState } from "react";

function DropdownRoles({
  selectedRoles,
  handleRoleChange,
  toggleDropdown,
  dropdownOpen,
  handleDivClick,
  edit,
}) {
  return (
    <div className={`relative flex flex-col gap-5  ${edit ? `w-full`:`w-1/4`}`}>
      <div>{edit ? <p>Roles</p>  : <p>Role</p>}</div>

      <button
        className="flex justify-between text-white duration-200 transition-all bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg py-1 px-4  text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        onClick={toggleDropdown}
      >
        <div>Select Role</div>
        <div>
          <i
            className={`fa-solid duration-200 transition-all fa-angle-up transform   ${
              dropdownOpen ? `-rotate-180` : ``
            } fa-2x`}
          ></i>
        </div>
      </button>

      <div
        className={`z-10 ${
          dropdownOpen ? "absolute top-24" : "hidden"
        } bg-white divide-y divide-gray-100 rounded-lg shadow w-full border-2 shadow-xl dark:bg-gray-700 dark:divide-gray-600`}
      >
        <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200">
          <li onClick={handleDivClick}>
            <div className="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  value="instructor"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  onChange={handleRoleChange}
                  checked={selectedRoles.includes("instructor")}
                />
              </div>
              <div className="ml-2 text-sm">
                <label className="font-medium text-gray-900 dark:text-gray-300">
                  instructor
                </label>
              </div>
            </div>
          </li>
          <li onClick={handleDivClick}>
            <div className="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  value="program coordinator"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  onChange={handleRoleChange}
                  checked={selectedRoles.includes("program coordinator")}
                />
              </div>
              <div className="ml-2 text-sm">
                <label className="font-medium text-gray-900 dark:text-gray-300">
                  Program Coordinator
                </label>
              </div>
            </div>
          </li>
          <li onClick={handleDivClick}>
            <div className="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  value="quality coordinator"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  onChange={handleRoleChange}
                  checked={selectedRoles.includes("quality coordinator")}
                />
              </div>
              <div className="ml-2 text-sm">
                <label className="font-medium text-gray-900 dark:text-gray-300">
                  Quality Coordinator
                </label>
              </div>
            </div>
          </li>
          <li onClick={handleDivClick}>
            <div className="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  value="system admin"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  onChange={handleRoleChange}
                  checked={selectedRoles.includes("system admin")}
                />
              </div>
              <div className="ml-2 text-sm">
                <label className="font-medium text-gray-900 dark:text-gray-300">
                  System Admin
                </label>
              </div>
            </div>
          </li>
          <li onClick={handleDivClick}>
            <div className="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  value="dean"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  onChange={handleRoleChange}
                  checked={selectedRoles.includes("dean")}
                />
              </div>
              <div className="ml-2 text-sm">
                <label className="font-medium text-gray-900 dark:text-gray-300">
                  Dean
                </label>
              </div>
            </div>
          </li>
          <li onClick={handleDivClick}>
            <div className="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  value="teaching assistant"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  onChange={handleRoleChange}
                  checked={selectedRoles.includes("teaching assistant")}
                />
              </div>
              <div className="ml-2 text-sm">
                <label className="font-medium text-gray-900 dark:text-gray-300">
                  Teaching Assistant
                </label>
              </div>
            </div>
          </li>
          <li onClick={handleDivClick}>
            <div className="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  value="program admin"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  onChange={handleRoleChange}
                  checked={selectedRoles.includes("program admin")}
                />
              </div>
              <div className="ml-2 text-sm">
                <label className="font-medium text-gray-900 dark:text-gray-300">
                  Program Admin
                </label>
              </div>
            </div>
          </li>
          <li onClick={handleDivClick}>
            <div className="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  value="department admin"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  onChange={handleRoleChange}
                  checked={selectedRoles.includes("department admin")}
                />
              </div>
              <div className="ml-2 text-sm">
                <label className="font-medium text-gray-900 dark:text-gray-300">
                  Department Admin
                </label>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default DropdownRoles;
