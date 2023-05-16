import React from "react";
import Link from "next/link";
import InsertDriveFileRounded from "@mui/icons-material/InsertDriveFileRounded";


const AssignFileItem = ({ name, id, dueTo, courseID, possibleMarks }) => {
    console.log("nameeee", name)
    return (
        <div className="fileItem ">
            <span>
                <Link href={`${process.env.url}api/v1/courses/assignment/${id}`}
                    target="_blank"
                    download className="fileItem--left" title="Click here to dowload the file">
                    <InsertDriveFileRounded />
                    <p>{name}</p>
                </Link>
                <div className="fileItem--right ">
                    <p>
                        <Link
                            href={{
                                pathname: `/instructor/courses/${courseID}/assignment/viewsolution`,
                                query: {
                                    assignmentID: id,
                                    possibleMarks: possibleMarks
                                },
                            }}
                            className="hover:underline hover:text-green-400"
                        >
                            view solution
                        </Link>
                    </p>
                </div>
                <div className="fileItem--right ">
                    <p>{dueTo}</p>
                </div>
            </span>
        </div>
    );
};

export default AssignFileItem;
