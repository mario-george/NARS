import React from "react";
import Link from "next/link";
import { useRef } from "react";
import InsertDriveFileRounded from "@mui/icons-material/InsertDriveFileRounded";


const solutionFileItem = ({ name, id, possibleMarks, cookies, Mark }) => {
    const mark = useRef();
    async function updateGrades() {
        const r = await fetch(`${process.env.url}api/v1/courses/assignmentSolution/${id}`, {
            method: "PATCH",

            body: JSON.stringify({
                Mark: mark.current.value,
            }),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + cookies.token,
            },
        });

        const resp = await r.json();
        console.log(resp);
    }
    return (
        <div className="fileItem ">
            <span>
                <Link className="fileItem--left" title="Click here to dowload the file" href={`${process.env.url}api/v1/courses/assignmentSolution/${id}`}
                    target="_blank"
                    download>
                    <InsertDriveFileRounded />
                    <p>{name}</p>
                </Link>
                <div className="fileItem--right ">
                    <input
                        type="number"
                        className="w-10 border-1"
                        onChange={updateGrades}
                        ref={mark}
                        defaultValue={Mark}
                    />
                    <p>/</p>
                    <input
                        type="number"
                        className="w-10"
                        value={possibleMarks}
                        disabled
                    />
                </div>
            </span>
        </div>
    );
};

export default solutionFileItem;
