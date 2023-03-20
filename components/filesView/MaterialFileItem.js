import React from "react";
import Link from "next/link";

import InsertDriveFileRounded from "@mui/icons-material/InsertDriveFileRounded";

const MaterialFileItem = ({ title, caption, id, cookies }) => {
  return (
    <div className="fileItem ">
      <Link
        href={`${process.env.url}api/v1/courses/original-courses/getMaterials/${cookies.original_id}/${id}`}
        target="_blank"
        download
      >
        <div className="fileItem--left" title="Click here to dowload the file">
          <InsertDriveFileRounded />
          <p>{title}</p>
        </div>
        <div className="fileItem--right">
          <p>{caption}</p>
        </div>
      </Link>
    </div>
  );
};

export default MaterialFileItem;
