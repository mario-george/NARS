import React from 'react';
import UserCard from './UserCard';

const UserList = ({ users }) => {
  return (
    <div className="flex flex-wrap -mx-6">
      {users.map((user) => (
        <div className="w-1/3 px-6 mb-6" key={user.email}>
          <UserCard {...user} />
        </div>
      ))}
    </div>
  );
};

export default UserList;
