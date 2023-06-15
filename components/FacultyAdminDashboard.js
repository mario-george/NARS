import Link from "next/link";
import { useRouter } from "next/router";
import { CgProfile } from "react-icons/cg";
import { CgLogOut } from "react-icons/cg";
import { header } from "./header";
import { FaUniversity } from "react-icons/fa";
import { FaBlackTie } from "react-icons/fa";

export default function FacultyAdminDashboard() {
  const router = useRouter();
  const logoutHandler = () => {
    router.push("/logout");
  };
  return (
    <nav className="nav2">
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
          <FaBlackTie
            style={{
              fontSize: 30,
              display: "inline",
              marginBottom: 4,
              marginRight: 9,
            }}
          />
          Departments
        </span>,
        [
          <Link
            className={
              router.pathname === "/facultyadmin/addDepartment"
                ? "activeLinkDashboard2"
                : "normalLinkDashboard2"
            }
            href="/facultyadmin/addDepartment"
          >
            Add Department
          </Link>,
          <Link
            className={
              router.pathname === "/facultyadmin/updateDepartment"
                ? "activeLinkDashboard2"
                : "normalLinkDashboard2"
            }
            href="/facultyadmin/updateDepartment"
          >
            Update Department
          </Link>,
          <Link
            className={
              router.pathname === "/facultyadmin/deleteDepartment"
                ? "activeLinkDashboard2"
                : "normalLinkDashboard2"
            }
            href="/facultyadmin/deleteDepartment"
          >
            Delete Department
          </Link>,
          <Link
            className={
              router.pathname === "/facultyadmin/viewDepartment"
                ? "activeLinkDashboard2"
                : "normalLinkDashboard2"
            }
            href="/facultyadmin/viewDepartment"
          >
            View Department
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
              router.pathname === "/facultyadmin/addStaff"
                ? "activeLinkDashboard2"
                : "normalLinkDashboard2"
            }
            href="/facultyadmin/addStaff"
          >
            Add Staff
          </Link>,
          <Link
            className={
              router.pathname === "/facultyadmin/viewStaff"
                ? "activeLinkDashboard2"
                : "normalLinkDashboard2"
            }
            href="/facultyadmin/viewStaff"
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