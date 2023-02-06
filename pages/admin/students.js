import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';

const Students = () => {
  const router = useRouter();
  const [students, setStudents] = useState([]);
  const token = Cookies.get('token');
  useEffect(() => {
    submitHandler();
  }, []);
  const submitHandler = async () => {
    const resp = await fetch(
      'http://ec2-54-158-207-145.compute-1.amazonaws.com/api/v1/users/students',
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    const data = await resp.json();
    setStudents(data.data.data);
    console.log(data.data.data);
  };

  return (
    <>
      <div className="flex flex-row w-screen h-screen">
        <nav className="nav2">
          <Link className="link2" href="/admin/profile">
            Profile
          </Link>
          <Link className="link22 translate-x-3" href="/admin/profile">
            Profile details
          </Link>
          <Link
            className={
              router.pathname === '/admin/addstaff'
                ? 'activeLinkDashboard2'
                : 'normalLinkDashboard2'
            }
            href="/admin/addstaff">
            Add Staff
          </Link>
          <Link className="link2" href="/admin/students">
            Students
          </Link>{' '}
          <Link
            className={
              router.pathname === '/admin/addstudent'
                ? 'activeLinkDashboard2'
                : 'normalLinkDashboard2'
            }
            href="/admin/addstudent">
            Add Student
          </Link>
          <Link
            className={
              router.pathname === '/admin/students'
                ? 'activeLinkDashboard2'
                : 'normalLinkDashboard2'
            }
            href="/admin/students">
            Students
          </Link>
          <Link
            className={
              router.pathname === '/admin/searchStudent'
                ? 'activeLinkDashboard2'
                : 'normalLinkDashboard2'
            }
            href="/admin/searchStudent">
            Search student
          </Link>
          <Link className="link2" href="/admin/profile">
            Courses
          </Link>{' '}
          <Link className="link2" href="/admin/profile">
            Programs
          </Link>{' '}
          <Link className="link2" href="/admin/profile">
            Add Program
          </Link>{' '}
          <Link className="link2" href="/admin/profile">
            Logout
          </Link>
        </nav>
        <form
          onSubmit={submitHandler}
          className="bg-sky-50 h-screen w-screen flex flex-col justify-center items-center text-black   ">
          <div className="contentAddUser2 flex flex-col gap-10">
            <p>List of all Students</p>
            {students.map((s) => {
              return (
                <div className="w-full flex justify-between bg-sky-500 items-center shadow-md rounded-xl px-[2rem] text-white">
                  {/* <img
                    className="h-48 w-48 object-cover rounded-full mx-auto bg-gray-300"
                    src="https://via.placeholder.com/400x400"
                    alt="Default Image"
                  /> */}
                  <div className="">
                    <i class="fa-solid fa-user fa-lg "></i>{' '}
                  </div>
                  <div className="flex flex-col">
                    <div>Name : {s.name}</div>
                    <div>Code : {s.code}</div>
                    <div>Email : {s.email}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </form>
      </div>
    </>
  );
};

export default Students;
