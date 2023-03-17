import Cookies from "js-cookie";
import { updateField } from "@/components/store/userSlice";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
export default function Logout() {
  const r = useRouter();
  const dispatch = useDispatch();
  setTimeout(()=>{
  Cookies.remove("token");
  Cookies.remove("data");
  Cookies.remove("loggedInStatus");
  Cookies.remove("role");
  Cookies.remove("name");
  Cookies.remove("email");
  Cookies.remove("_id");
  Cookies.remove("photo");
  Cookies.remove("original_id");
  Cookies.remove("courses");
  Cookies.remove("jwt");
  Cookies.remove("instance_id");

  dispatch(updateField({ field: "courses", value: "null" }));
  dispatch(updateField({ field: "loggedInStatus", value: "false" }));
  dispatch(updateField({ field: "role", value: "null" }));
  dispatch(updateField({ field: "_id", value: "null" }));
  dispatch(updateField({ field: "email", value: "null" }));
  dispatch(updateField({ field: "jwt", value: "null" }));
  dispatch(updateField({ field: "token", value: "null" }));
  dispatch(updateField({ field: "name", value: "null" }));

  r.push("/login");


  },[1000])
  return <div>Logging out ...</div>;
}
