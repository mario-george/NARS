import Cookies from "js-cookie";
import { updateField } from "@/components/store/userSlice";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { userActions } from "@/components/store/userSlice";
export default function Logout() {
  const r = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.logOut());
    r.push("/login");
  }, []);

  return <></>;
}

Logout.getPageLayout = function PageLayout(page) {
  return <div className=" flex flex-col">{page}</div>;
};
