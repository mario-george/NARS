import React from "react";
import Link from "next/link";
import { useRef,useEffect ,useState} from "react";
import InsertDriveFileRounded from "@mui/icons-material/InsertDriveFileRounded";


const solutionFileItemStudent = ({ name, id, cookies, Mark, Assignment }) => {
    const [assignment, setAssignments] = useState([]);
    useEffect(() => {
        getGrade();
    }, []);
    async function getGrade() {
        const r = await fetch(`${process.env.url}api/v1/courses/assignment?_id=${Assignment}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + cookies.token,
            },
        });
        const data = await r.json();
        // console.log("dataaaaaaa",data);
        let arr = data.data;

        arr = arr.map((e) => {
            return {
                possibleMarks: e.possibleMarks,
            };
        });
        setAssignments(arr);

    }
    var marks;
    assignment.map((e)=>(marks=e.possibleMarks));
    console.log("marksssssssss",marks);
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
                        defaultValue={Mark}
                        disabled
                    />
                    <p>/</p>
                    <input
                        type="number"
                        className="w-10"
                        value={marks}
                        disabled
                    />
                </div>
            </span>
        </div>
    );
};

export default solutionFileItemStudent;
