import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";
import { CgLogOut } from "react-icons/cg";

export default function DepartmentAdminDashboard() {
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

      <Link
        className={
          router.pathname === "/departmentadmin/addProgram"
            ? "activeLinkDashboard2"
            : "normalLinkDashboard2"
        }
        href="/departmentadmin/addProgram"
      >
        Create Program
      </Link>
      <Link
        className={
          router.pathname === "/departmentadmin/updateProgram"
            ? "activeLinkDashboard2"
            : "normalLinkDashboard2"
        }
        href="/departmentadmin/updateProgram"
      >
        Update Program
      </Link>
      <Link
        className={
          router.pathname === "/departmentadmin/deleteProgram"
            ? "activeLinkDashboard2"
            : "normalLinkDashboard2"
        }
        href="/departmentadmin/deleteProgram"
      >
        Delete Program
      </Link>
      <Link
        className={
          router.pathname === "/departmentadmin/viewProgram"
            ? "activeLinkDashboard2"
            : "normalLinkDashboard2"
        }
        href="/departmentadmin/viewProgram"
      >
        View Program
      </Link>
      <Link
        className={
          router.pathname === "/departmentadmin/addStaff"
            ? "activeLinkDashboard2"
            : "normalLinkDashboard2"
        }
        href="/departmentadmin/addStaff"
      >
        Add Staff
      </Link>
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
