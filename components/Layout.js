import { useDispatch, useSelector } from "react-redux";
import MainHeader from "./shared/MainHeader";
import { userActions } from "./store/userSlice";
import SideDashboard from "./shared/SideDashboard";

export default function Layout({ children, cookies }) {
  const d = useDispatch();
  d(userActions.setCookies(cookies));

  return (
    <>
      <div className="layout ">
        <div className="flex justify-between items-center md:mx-[3rem] h-[5rem]">
          <div className="flex space-x-8 items-center justify-center ">
            <div className="flex flex-col space-y-2">
              <div className="text ">NARQA </div>
              <div className="text  ">Quality Assurance</div>
            </div>
          </div>
          <MainHeader />
        </div>
      </div>
      <div className="h-screen w-screen flex flex-row ">
        <SideDashboard className="w-100" />
        <div className=""> {children}</div>
      </div>
    </>
  );
}
