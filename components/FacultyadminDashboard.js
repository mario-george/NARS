import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { userActions } from "./store/userSlice.js";
import { useDispatch } from "react-redux";
import { header } from "./header";
import { CgProfile } from "react-icons/cg";
import { CgLogOut } from "react-icons/cg";
import { FaUniversity } from "react-icons/fa";

export default function FacultyadminDashboard() {
  const router = useRouter();
  const navStatus = useSelector((s) => s.navStatus);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(userActions.logOut());
    window.location.href = "/logout";
  };
  return (
    <nav className="nav2">
      <a className="link2 focus:text-green-400 " href="/admin/profile">
        <span>
          <CgProfile
            style={{ fontSize: 30, display: "inline", marginBottom: 5 }}
          />
        </span>
        <span className="ml-2">Profile</span>
      </a>
      {header(
        <span>
          <FaUniversity
            style={{
              fontSize: 30,
              display: "inline",
              marginBottom: 4,
              marginRight: 9,
            }}
          />
          Faculty
        </span>,
        [
          <a
            className={
              router.pathname === "/facultyadmin/addfaculty"
                ? "activeLinkDashboard2"
                : "normalLinkDashboard2"
            }
            href="/facultyadmin/addfaculty"
          >
            Add Faculty
          </a>,
          <a
            className={
              router.pathname === "/facultyadmin/updatefaculty"
                ? "activeLinkDashboard2"
                : "normalLinkDashboard2"
            }
            href="/facultyadmin/updatefaculty"
          >
            Update Faculty
          </a>,
          <a
            className={
              router.pathname === "/facultyadmin/deletefaculty"
                ? "activeLinkDashboard2"
                : "normalLinkDashboard2"
            }
            href="/facultyadmin/deletefaculty"
          >
            Delete Faculty
          </a>,
          <a
            className={
              router.pathname === "/facultyadmin/viewfaculty"
                ? "activeLinkDashboard2"
                : "normalLinkDashboard2"
            }
            href="/facultyadmin/viewfaculty"
          >
            View Faculties
          </a>,
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
