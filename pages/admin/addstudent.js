import Link from 'next/link';
import { useRouter } from 'next/router';

const addStudent = () => {
  const router = useRouter();

  return (
    <>
      <div className="flex flex-row w-screen h-screen">
        <nav className="nav1">
          <Link className="link" href="/admin/profile">
            Profile
          </Link>
          <Link className="linkpt2 translate-x-3" href="/admin/profile">
            Profile details
          </Link>
          <Link
            className={
              router.pathname === '/admin/addstudent'
                ? 'activeLinkDashboard'
                : 'normalLinkDashboard'
            }
            href="/admin/addstudent">
            Add Student
          </Link>
          <Link
            className={
              router.pathname === '/admin/addstaff'
                ? 'activeLinkDashboard'
                : 'normalLinkDashboard'
            }
            href="/admin/addstaff">
            Add Staff
          </Link>
          <Link className="link" href="/admin/profile">
            Courses
          </Link>{' '}
          <Link className="link" href="/admin/profile">
            Programs
          </Link>{' '}
          <Link className="link" href="/admin/profile">
            Add Program
          </Link>{' '}
          <Link className="link" href="/admin/profile">
            Logout
          </Link>
        </nav>
        <div className="bg-sky-50 h-screen w-screen flex flex-col justify-center items-center text-black   ">
          <div className="contentAddUser flex flex-col gap-10">
            <p>Add Student</p>
            <div className="flex gap-20 ">
              <div className="flex flex-col gap-5">
                <div>Student Code</div>
                <input type="text" className="inputAddUser w-full" />
              </div>
              <div className="flex flex-col gap-5  w-1/2">
                <div> Name</div>
                <input type="text" className="inputAddUser  w-full" />
              </div>
            </div>
            <div className="flex gap-20 ">
              <div className="flex flex-col gap-5">
                <div>Academic year</div>
                <input type="text" className="inputAddUser w-full" />
              </div>
              <div className="flex flex-col gap-5  w-1/2">
                <div> Email </div>
                <input type="text" className="inputAddUser  w-full" />
              </div>
            </div>
            <div className="flex gap-20 ">
              <div className="flex flex-col gap-5  ">
                <div> Faculty</div>
                <input type="text" className="inputAddUser  w-full" />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                class="w-[6rem]  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg px-5 py-2.5 mx-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default addStudent;
