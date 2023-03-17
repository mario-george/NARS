import Link from "next/link";
import { useRouter } from "next/router";
import { header } from "./header";
import { userActions } from "./store/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { CgProfile } from 'react-icons/cg'
import { CgLogOut } from 'react-icons/cg'
import { GiTeacher } from 'react-icons/gi'
import { FaUniversity } from 'react-icons/fa'

export default function AdminDashBoard() {
  const router = useRouter();
  // const navStatus = useSelector((s) => s.user.navStatus);
  const navStatus = false;
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
    <a className="link2 focus:text-green-400 " href="/profile">
    <span><CgProfile style={{ fontSize: 30 ,display:"inline",marginBottom:5}}/></span><span className="ml-2">Profile</span>
    </a>

      {header(<span><GiTeacher style={{ fontSize: 30 ,display:"inline",marginBottom:4,marginRight:9}}/>Students</span>, [
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
      {header(<span><FaUniversity style={{ fontSize: 30 ,display:"inline",marginBottom:4,marginRight:9}}/>Staff</span>, [
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
        className="link2 focus:text-green-400 text-left"
        onClick={logoutHandler}
      >
      <span><CgLogOut style={{ fontSize: 30 ,display:"inline",marginBottom:0}}/></span><span className="ml-2">Logout</span>
      </button>
    </nav>
  );
}
