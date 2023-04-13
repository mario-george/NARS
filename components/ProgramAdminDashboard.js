import Link from "next/link";
import { useRouter } from "next/router";
import { header } from "./header";
import { userActions } from "./store/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { CgProfile } from "react-icons/cg";
import { CgLogOut } from "react-icons/cg";
import { BsBook } from "react-icons/bs";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

export default function ProgramAdminDashboard() {
  const router = useRouter();
  const navStatus = useSelector((s) => s.navStatus);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(userActions.logOut());
   // window.location.href = "/logout";
   router.push("/logout");
  };
  return (
    <nav
      className={`nav2 transition-all duration-300 transform ${
        navStatus ? ` -translate-x-full` : `translate-x-0 `
      }`}
    >
      <Link className="link2 focus:text-green-400 " href="/profile">
        <span>
          <CgProfile
            style={{ fontSize: 30, display: "inline", marginBottom: 5 }}
          />
        </span>
        <span className="ml-2">Profile</span>
      </Link>
      {header(
        <span>
          <MdOutlineAdminPanelSettings
            style={{
              fontSize: 30,
              display: "inline",
              marginBottom: 0,
              marginRight: 9,
            }}
          />
          Programs
        </span>,
        [
          <Link
            className={
              router.pathname === "/programadmin/assignprogramcoordinator"
                ? "activeLinkDashboard2"
                : "normalLinkDashboard2"
            }
            href="/programadmin/assignprogramcoordinator"
          >
            Assign program coordinator
          </Link>,
          <Link
            className={
              router.pathname ===
              "/programadmin/assignprogramqualitycoordinator"
                ? "activeLinkDashboard2"
                : "normalLinkDashboard2"
            }
            href="/programadmin/assignprogramqualitycoordinator"
          >
            Assign program quality coordinator
          </Link>,
        ]
      )}
      {header(
        <span>
          <BsBook
            style={{
              fontSize: 30,
              display: "inline",
              marginBottom: 0,
              marginRight: 9,
            }}
          />
          courses
        </span>,
        [
          <Link
            className={
              router.pathname === "/programadmin/addcourse"
                ? "activeLinkDashboard2"
                : "normalLinkDashboard2"
            }
            href="/programadmin/addcourse"
          >
            Create course
          </Link>,
          <Link
            className={
              router.pathname === "/programadmin/getcourse"
                ? "activeLinkDashboard2"
                : "normalLinkDashboard2"
            }
            href="/programadmin/getcourse"
          >
            View courses
          </Link>,
          <Link
            className={
              router.pathname === "/programadmin/assigninstructor"
                ? "activeLinkDashboard2"
                : "normalLinkDashboard2"
            }
            href="/programadmin/assigninstructor"
          >
            Assign instructor
          </Link>,
          <Link
            className={
              router.pathname === "/programadmin/assignta"
                ? "activeLinkDashboard2"
                : "normalLinkDashboard2"
            }
            href="/programadmin/assignta"
          >
            Assign TA
          </Link>,
        ]
      )}
      <button
        className="link2 focus:text-green-400 text-left"
        onClick={logoutHandler}
      >
        <span>
          <CgLogOut
            style={{ fontSize: 30, display: "inline", marginBottom: 0 }}
          />
        </span>
        <span className="ml-2">Logout</span>
      </button>
    </nav>
  );
}
