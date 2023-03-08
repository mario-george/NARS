import Link from "next/link";
import { useRouter } from "next/router";
import { header } from "./header";
import { userActions } from "./store/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
export default function AdminDashBoard() {
  const router = useRouter();
  const navStatus = useSelector((s) => s.user.navStatus);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(userActions.logOut());
    window.location.href = "/logout";
  };
  return (
    <nav
      className={`nav2 transition-all duration-300 transform ${
        navStatus ? ` -translate-x-full` : `translate-x-0 `
      }`}
    >
      {header("Profile", [
        <a
          className={
            router.pathname === "/admin/profile"
              ? "activeLinkDashboard2"
              : "normalLinkDashboard2"
          }
          href="/admin/profile"
        >
          Profile details
        </a>,
      ])}

      {header("Students", [
        <a
          className={
            router.pathname === "/admin/student/add"
              ? "activeLinkDashboard2"
              : "normalLinkDashboard2"
          }
          href="/admin/student/add"
        >
          Add Student
        </a>,
        <a
          className={
            router.pathname === "/admin/student/view-all"
              ? "activeLinkDashboard2 w-full"
              : "normalLinkDashboard2 w-full"
          }
          href="/admin/student/view-all"
        >
          Students
        </a>,
        <a
          className={
            router.pathname === "/admin/student/search-student"
              ? "activeLinkDashboard2"
              : "normalLinkDashboard2"
          }
          href="/admin/student/search-student"
        >
          Search student
        </a>,
      ])}
      {header("Staff", [
        <a
          className={
            router.pathname === "/admin/staff/add"
              ? "activeLinkDashboard2"
              : "normalLinkDashboard2"
          }
          href="/admin/staff/add"
        >
          Add Staff
        </a>,
        <a
          className={
            router.pathname === "/admin/staff/view-all"
              ? "activeLinkDashboard2"
              : "normalLinkDashboard2"
          }
          href="/admin/staff/view-all"
        >
          Staff
        </a>,
        <a
          className={
            router.pathname === "/admin/staff/search-staff"
              ? "activeLinkDashboard2"
              : "normalLinkDashboard2"
          }
          href="/admin/staff/search-staff"
        >
          Search staff
        </a>,
      ])}

      {/* <Link className="link2" href="/admin/profile">
        Courses
      </Link>{' '}
      <Link className="link2" href="/admin/profile">
        Programs
      </Link>{' '}
      <Link className="link2" href="/admin/profile">
        Add Program
      </Link>{' '} */}
      <button
        className="link2 focus:text-green-400 text-left mx-2"
        onClick={logoutHandler}
      >
        Logout
      </button>
    </nav>
  );
}
