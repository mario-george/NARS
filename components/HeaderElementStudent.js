import { header2 } from "./header2";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../components/store/userSlice";
import { useEffect, useState, useRef } from "react";
import { MdDone } from "react-icons/md";
import { MdRemoveDone } from "react-icons/md";
import { green } from "@mui/material/colors";

function HeaderElementStudent({ id, originalId, name, createdAt, passed }) {
    const dispatch = useDispatch();
    const [completed, setCompleted] = useState(false);

    return header2(
        
        <Link
            href={`/student/${id}/coursedetails`}
            onClick={() => {
                dispatch(updateField({ field: "instance_id", value: id }));
                dispatch(updateField({ field: "original_id", value: originalId }));
            }}
            className="relative"
        >
        
            <span>{name}</span>   
            {passed?
                <span><MdDone 
                style={{ fontSize: 30, display: "inline", marginBottom: 5 ,position:"absolute",left:130,top:9,color:"green"}}/>
                </span>:
                ""}
            <br></br>
            {createdAt}
        </Link> ,
        []
    );
}
export default HeaderElementStudent;
