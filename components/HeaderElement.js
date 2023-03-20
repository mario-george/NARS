import { header2 } from "./header2";
import Cookies from "js-cookie";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../components/store/userSlice";
import { updateField } from "../components/store/userSlice";

const { useState } = require("react");
function HeaderElement({ id, name, createdAt, cookies }) {
  const dispatch = useDispatch();
  // Call your Hook here
  async function get_id(e, cookies) {
    try {
      const resp = await fetch(
        `${process.env.url}api/v1/courses/created-courses/${e}`,
        {
          headers: {
            Authorization: "Bearer " + cookies.token,
          },
        }
      );

      const dt = await resp.json();
      Cookies.set("original_id", dt.data.course._id);
      dispatch(
        updateField({ field: "instance_id", value: dt.data.course._id })
      );
      //console.log(dt.data.course);
    } catch (e) {
      console.log(e);
    }
  }
  const handel_set_cookies = (e, cookies) => {
    get_id(e, cookies);
    Cookies.set("instance_id", e);
    dispatch(updateField({ field: "instance_id", value: e }));
  };
  return header2(
    <Link
      href={`/instructor/courses/${id}/courseSpecs/part1`}
      onClick={handel_set_cookies(id, cookies)}
    >
      {name}
      <br></br>
      {createdAt}
    </Link>,
    []
  );
}
export default HeaderElement;
