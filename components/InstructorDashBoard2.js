import Link from 'next/link';
import { useRouter } from 'next/router';
import { header } from './header';
import {userActions} from './store/userSlice.js'
import { useDispatch, useSelector } from 'react-redux';
export default function InstructorDashBoard() {
  const router = useRouter();
  const navStatus=useSelector(s=>s.user.navStatus)
const dispatch =useDispatch()
  const logoutHandler=()=>{
    dispatch(userActions.logOut())
    router.push('/login')
  }
  return (
    <nav className={`nav2 transition-all duration-300 transform ${navStatus ? ` -translate-x-full`: `translate-x-0 `}`}>
      {header('Profile', [
        <Link
          className={
            router.pathname === '/instructor/profile'
              ? 'activeLinkDashboard2'
              : 'normalLinkDashboard2'
          }
          href="/instructor/profile">
          Profile details
        </Link>,
      ])}

      {/* {header('Students', [
        <Link
          className={
            router.pathname === '/instructor/student/add'
              ? 'activeLinkDashboard2'
              : 'normalLinkDashboard2'
          }
          href="/instructor/student/add">
          Add Student
        </Link>,
        <Link
          className={
            router.pathname === '/instructor/student/view-all'
              ? 'activeLinkDashboard2 w-full'
              : 'normalLinkDashboard2 w-full'
          }
          href="/instructor/student/view-all">
          Students
        </Link>,
        <Link
          className={
            router.pathname === '/instructor/student/search-student'
              ? 'activeLinkDashboard2'
              : 'normalLinkDashboard2'
          }
          href="/instructor/student/search-student">
          Search student
        </Link>,
      ])} */}
      {/* {header('Staff', [
        <Link
          className={
            router.pathname === '/instructor/staff/add'
              ? 'activeLinkDashboard2'
              : 'normalLinkDashboard2'
          }
          href="/instructor/staff/add">
          Add Staff
        </Link>,
        <Link
          className={
            router.pathname === '/instructor/staff/view-all'
              ? 'activeLinkDashboard2'
              : 'normalLinkDashboard2'
          }
          href="/instructor/staff/view-all">
          Staff
        </Link>,
        <Link
          className={
            router.pathname === '/instructor/staff/search-staff'
              ? 'activeLinkDashboard2'
              : 'normalLinkDashboard2'
          }
          href="/instructor/staff/search-staff">
          Search staff
        </Link>,
      ])} */}
      {header('Courses', [ <Link
          className={
            router.pathname === '/instructor/courses/details'
              ? 'activeLinkDashboard2'
              : 'normalLinkDashboard2'
          }
          href="/instructor/staff/add">
          Course Details
        </Link>])}
      {header('Programs', [
        <Link className="link2" href="/instructor/profile">
          Add Program
        </Link>,
      ])}
      {/* <Link className="link2" href="/instructor/profile">
        Courses
      </Link>{' '}
      <Link className="link2" href="/instructor/profile">
        Programs
      </Link>{' '}
      <Link className="link2" href="/instructor/profile">
        Add Program
      </Link>{' '} */}
      <button className="link2 focus:text-green-400 text-left mx-2" onClick={logoutHandler}>
        Logout
      </button>
    </nav>
  );
}
