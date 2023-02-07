import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import Cookies from 'js-cookie';
import AdminDashBoard from '@/components/AdminDashBoard';
const addStudent = () => {
  const token = Cookies.get('token');
  const router = useRouter();
  const name = useRef();
  const code = useRef();
  const email = useRef();
  const academicYear = useRef();
  const department = useRef();
  const faculty = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();

    const resp = await fetch(
      'http://ec2-54-158-207-145.compute-1.amazonaws.com/api/v1/users/students',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({
          code: code.current.value,
          name: name.current.value,
          email: email.current.value,
          // faculty:faculty.current.value,
          // department:department.current.value,
          // academicYear:academicYear.current.value,
        }),
      }
    );
    const data = resp.json();
    console.log(data);
    alert(data);
  };
  return (
    <>
      <div className="flex flex-row w-screen h-screen">
      <AdminDashBoard/>
        <form
          onSubmit={submitHandler}
          className=" bg-sky-50 h-screen w-screen flex flex-col justify-center items-center text-black   ">
          <div className="contentAddUser2 flex flex-col gap-10">
            <div className=' '>Add Student</div>
         
            <div className="flex gap-20 ">
              <div className="flex flex-col gap-5">
                <div>Student Code</div>
                <input
                  type="text"
                  className="inputAddUser2 w-full"
                  ref={code}
                />
              </div>
              <div className="flex flex-col gap-5  w-1/2">
                <div> Name</div>
                <input
                  type="text"
                  className="inputAddUser2  w-full"
                  ref={name}
                />
              </div>
            </div>
            <div className="flex gap-20 ">
              <div className="flex flex-col gap-5">
                <div>Academic year</div>
                <input
                  type="text"
                  className="inputAddUser2 w-full"
                  ref={academicYear}
                />
              </div>
              <div className="flex flex-col gap-5  w-1/2">
                <div> Email </div>
                <input
                  type="text"
                  className="inputAddUser2  w-full"
                  ref={email}
                />
              </div>
            </div>
            <div className="flex gap-20 ">
              <div className="flex flex-col gap-5  ">
                <div> Faculty</div>
                <input
                  type="text"
                  className="inputAddUser2  w-full"
                  ref={faculty}
                />
              </div>
              <div className="flex flex-col gap-5  w-1/2">
                <div> Department </div>
                <input
                  type="text"
                  className="inputAddUser2  w-full"
                  ref={department}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                class="w-[6rem]  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg px-5 py-2.5 mx-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default addStudent;
