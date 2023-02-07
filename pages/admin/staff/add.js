import AdminDashBoard from '@/components/AdminDashBoard';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef } from 'react';

const addStaff = () => {
  const router = useRouter();
  const name = useRef();
  const email = useRef();
  const role = useRef();
  const submitHandler = async (e) => {
    e.preventDefault();
    const resp = await fetch(
      'http://ec2-54-158-207-145.compute-1.amazonaws.com/api/v1/users/staff',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({
          role: role.current.value,
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
  };
  return (
    <>
      <div className="flex flex-row w-screen h-screen">
        <AdminDashBoard />
        <form
          onSubmit={submitHandler}
          className="bg-sky-50 h-screen w-screen flex flex-col justify-center items-center text-black   ">
          <div className="contentAddUser2 flex flex-col gap-10">
            <p>Add Staff</p>
            <div className="flex gap-20 ">
              <div className="flex flex-col gap-5  w-1/4">
                <div> Name</div>
                <input
                  ref={name}
                  type="text"
                  className="inputAddUser2  w-full"
                />
              </div>
              <div className="flex flex-col gap-5  w-1/2 ">
                <div> Email </div>
                <input
                  ref={email}
                  type="text"
                  className="inputAddUser2   w-full "
                />
              </div>
            </div>
            <div className="flex gap-20 flex-1 ">
              <div className="flex flex-col gap-5 w-1/4 ">
                <div>Role</div>

                <select
                  ref={role}
                  id="small"
                  class="block w-full text-xl md:text-lg p-3   text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ">
                  <option selected>Choose a role</option>

                  <option value="instructor">Instructor</option>
                  <option value="quality coordinator">
                    Quality Coordinator
                  </option>
                  <option value="program  coordinator">
                    Program Coordinator
                  </option>
                  <option value="dean">Dean</option>
                  <option value="teaching assistant">
                    Teaching Assistant{' '}
                  </option>
                  <option value="faculty admin">Faculty Admin </option>
                  <option value="program admin">Program Admin</option>
                  <option value="department admin">Department Admin</option>
                </select>
              </div>
              <div className="flex flex-col gap-5  w-1/2 ">
                <div> Faculty </div>
                <input
                  type="text"
                  className="inputAddUser2  w-full translate-y-[1rem]"
                />
              </div>
            </div>
            <div className="flex gap-20 items-center ">
              <div className="flex flex-col gap-5">
                <div>Department </div>
                <input type="text" className="inputAddUser2 w-full" />
              </div>
              <div className="flex justify-end w-full ">
                <button
                  type="button"
                  class=" my-6  px-10 py-3 duration-200 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg  mx-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default addStaff;
