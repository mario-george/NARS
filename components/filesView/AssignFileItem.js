import React from "react";
import Link from "next/link";

import InsertDriveFileRounded from "@mui/icons-material/InsertDriveFileRounded";

const AssignFileItem = ({ name, id, dueTo }) => {
  return (
    <div className="fileItem ">
      <Link
        href={`${process.env.url}api/v1/courses/assignment/${id}`}
        target="_blank"
        download
      >
        <div className="fileItem--left" title="Click here to dowload the file">
          <InsertDriveFileRounded />
          <p>{name}</p>
        </div>
        <div className="fileItem--right">
          <p>{dueTo}</p>
        </div>
      </Link>
    </div>
  );
};

export default AssignFileItem;
