import { header2 } from "./header2";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../components/store/userSlice";

function HeaderElement({ id, originalId, name, createdAt }) {
  const dispatch = useDispatch();

  return header2(
    <Link
      href={`/instructor/courses/${id}/courseSpecs/part1`}
      onClick={() => {
        dispatch(updateField({ field: "instance_id", value: id }));
        dispatch(updateField({ field: "original_id", value: originalId }));
      }}
    >
      {name}
      <br></br>
      {createdAt}
    </Link>,
    []
  );
}
export default HeaderElement;
