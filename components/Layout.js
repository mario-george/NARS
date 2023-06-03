import { useDispatch, useSelector } from "react-redux";
import MainHeader from "./shared/MainHeader";
import { userActions } from "./store/userSlice";
import SideDashboard from "./shared/SideDashboard";

export default function Layout({ children, cookies }) {
  const d = useDispatch();
  d(userActions.setCookies(cookies));

  return (
    <>
      <MainHeader />
      <div className="mt-2">
        <SideDashboard className="" />
        <div className=" mt-12 ">{children}</div>
      </div>
    </>
  );
}
