import React from "react";
import PropTypes from "prop-types";

function UserList({ users }) {
  console.log(users);

  return (
    <div className="container mx-auto my-4">
      <table className="w-full text-left border rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 font-bold border">Name</th>
            <th className="px-4 py-2 font-bold border">Role</th>
            <th className="px-4 py-2 font-bold border">Email</th>
            <th className="px-4 py-2 font-bold border">Faculty</th>
            <th className="px-4 py-2 font-bold border">Department</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.email}>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.role}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.faculty}</td>
                <td className="border px-4 py-2">{user.department}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}


export default UserList;
