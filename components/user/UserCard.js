import React from "react";

const UserCard = ({ name, email, code, image }) => {
  return (
    <div className="bg-gray-700 text-white shadow rounded-lg p-6 flex flex-col items-center">
      {image ? (
        <img
          src={image || "https://via.placeholder.com/150"}
          alt={name}
          className="h-32 w-32 rounded-full o-bject-cover mb-6"
        />
      ) : (
        <i class="fa-solid fa-user fa-4x"></i>
      )}
      <h2 className="text-lg font-medium mt-2 mb-2">{name}</h2>
      <p className="text-white mb-2">{email}</p>
      <p className="text-wh-700">{code}</p>
    </div>
  );
};

export default UserCard;