import Link from 'next/link';
import { useRouter } from 'next/router';
import { header } from './header';
export default function AdminDashBoard() {
  const router = useRouter();
  return (
    <nav className="nav2">
      {header('Profile', [
        <Link className="link22 translate-x-3" href="/admin/profile">
          Profile details
        </Link>,
        <Link
          className={
            router.pathname === '/admin/addstaff'
              ? 'activeLinkDashboard2'
              : 'normalLinkDashboard2'
          }
          href="/admin/addstaff">
          Add Staff
        </Link>,
      ])}

      {header('Students', [
        <Link
          className={
            router.pathname === '/admin/student/add'
              ? 'activeLinkDashboard2'
              : 'normalLinkDashboard2'
          }
          href="/admin/student/add">
          Add Student
        </Link>,
        <Link
          className={
            router.pathname === '/admin/student/view-all'
              ? 'activeLinkDashboard2'
              : 'normalLinkDashboard2'
          }
          href="/admin/student/view-all">
          Students
        </Link>,
        <Link
          className={
            router.pathname === '/admin/searchStudent'
              ? 'activeLinkDashboard2'
              : 'normalLinkDashboard2'
          }
          href="/admin/searchStudent">
          Search student
        </Link>,
      ])}
      {header('Staff', [
        <Link
          className={
            router.pathname === '/admin/staff/add'
              ? 'activeLinkDashboard2'
              : 'normalLinkDashboard2'
          }
          href="/admin/staff/add">
          Add Staff
        </Link>,
        <Link
          className={
            router.pathname === '/admin/staff/view-all'
              ? 'activeLinkDashboard2'
              : 'normalLinkDashboard2'
          }
          href="/admin/staff/view-all">
          Staff
        </Link>,
        <Link
          className={
            router.pathname === '/admin/search-staff'
              ? 'activeLinkDashboard2'
              : 'normalLinkDashboard2'
          }
          href="/admin/search-staff">
          Search staff
        </Link>,
      ])}
      {header('Courses', [])}
      {header('Programs', [
        <Link className="link2" href="/admin/profile">
          Add Program
        </Link>,
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
      <Link className="link2" href="/admin/profile">
        Logout
      </Link>
    </nav>
  );
}
