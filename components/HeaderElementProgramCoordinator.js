import { header2 } from "./header2";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../components/store/userSlice";

function HeaderElementProgramCoordinator({ id, code, name }) {
    const dispatch = useDispatch();

    return header2(
        <span>
            {name}
            <br></br>
            {code}
        </span>,
        []
    );
}
export default HeaderElementProgramCoordinator;
