import Link from "next/link";
import { useRouter } from "next/router";
import { header } from "./header";
import { userActions } from "./store/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { CgProfile } from "react-icons/cg";
import { CgLogOut } from "react-icons/cg";
import { GiTeacher } from "react-icons/gi";
import { FaUniversity } from "react-icons/fa";
import { TiGroupOutline } from "react-icons/ti";

export default function AdminDashBoard() {
  const router = useRouter();
  const navStatus = useSelector((s) => s.user.navStatus);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    router.push('/logout')

    //window.location.href = "/logout";
  };
  return (
    <nav
      className={`nav2 transition-all duration-300 transform ${navStatus ? ` -translate-x-full` : `translate-x-0 `
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
          <GiTeacher
            style={{
              fontSize: 30,
              display: "inline",
              marginBottom: 4,
              marginRight: 9,
            }}
          />
          Students
        </span>,
        [
          <Link
            className={
              router.pathname === "/admin/student/add"
                ? "activeLinkDashboard2"
                : "normalLinkDashboard2"
            }
            href="/admin/student/add"
          >
            Add Student
          </Link>,
          <Link
            className={
              router.pathname === "/admin/student/view-all"
                ? "activeLinkDashboard2 w-full"
                : "normalLinkDashboard2 w-full"
            }
            href="/admin/student/view-all"
          >
            Students
          </Link>,
          <Link
            className={
              router.pathname === "/admin/student/search-student"
                ? "activeLinkDashboard2"
                : "normalLinkDashboard2"
            }
            href="/admin/student/search-student"
          >
            Search student
          </Link>,
        ]
      )}
      {header(
        <span>
          <TiGroupOutline
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
              router.pathname === "/admin/staff/add"
                ? "activeLinkDashboard2"
                : "normalLinkDashboard2"
            }
            href="/admin/staff/add"
          >
            Add Staff
          </Link>,
          <Link
            className={
              router.pathname === "/admin/staff/view-all"
                ? "activeLinkDashboard2"
                : "normalLinkDashboard2"
            }
            href="/admin/staff/view-all"
          >
            Staff
          </Link>,
          <Link
            className={
              router.pathname === "/admin/staff/search-staff"
                ? "activeLinkDashboard2"
                : "normalLinkDashboard2"
            }
            href="/admin/staff/search-staff"
          >
            Search staff
          </Link>,
          <Link
            className={
              router.pathname === "/admin/staff/staffroles"
                ? "activeLinkDashboard2"
                : "normalLinkDashboard2"
            }
            href="/admin/staff/staffroles"
          >
            Add roles
          </Link>,
          <Link
            className={
              router.pathname === "/admin/staff/removeroles"
                ? "activeLinkDashboard2"
                : "normalLinkDashboard2"
            }
            href="/admin/staff/removeroles"
          >
            Remove roles
          </Link>,
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
          Faculty
        </span>,
        [
          <Link
            className={
              router.pathname === "/admin/faculty/addfaculty"
                ? "activeLinkDashboard2"
                : "normalLinkDashboard2"
            }
            href="/admin/faculty/addfaculty"
          >
            Add Faculty
          </Link>,
          <Link
            className={
              router.pathname === "/admin/faculty/updatefaculty"
                ? "activeLinkDashboard2"
                : "normalLinkDashboard2"
            }
            href="/admin/faculty/updatefaculty"
          >
            Update Faculty
          </Link>,
          <Link
            className={
              router.pathname === "/admin/faculty/deletefaculty"
                ? "activeLinkDashboard2"
                : "normalLinkDashboard2"
            }
            href="/admin/faculty/deletefaculty"
          >
            Delete Faculty
          </Link>,
          <Link
            className={
              router.pathname === "/admin/faculty/viewfaculty"
                ? "activeLinkDashboard2"
                : "normalLinkDashboard2"
            }
            href="/admin/faculty/viewfaculty"
          >
            View Faculties
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
