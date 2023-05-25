import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";
import { CgLogOut } from "react-icons/cg";
import { header } from "./header";
import { FaUniversity } from "react-icons/fa";
import { MdOutlineAdminPanelSettings } from "react-icons/md";


export default function DepartmentHeadDashboard() {
  const router = useRouter();
  const navStatus = useSelector((s) => s.navStatus);
  const logoutHandler = () => {
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
              router.pathname === "/departmenthead/viewProgram"
                ? "activeLinkDashboard2"
                : "normalLinkDashboard2"
            }
            href="/departmenthead/viewProgram"
          >
            View Program
          </Link>
        ]
      )}

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
          Staff
        </span>,
        [
          <Link
            className={
              router.pathname === "/departmentadmin/viewStaff"
                ? "activeLinkDashboard2"
                : "normalLinkDashboard2"
            }
            href="/departmentadmin/viewStaff"
          >
            View Staff
          </Link>
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
