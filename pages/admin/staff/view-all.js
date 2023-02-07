import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import AdminDashBoard from '@/components/AdminDashBoard';
import UserCard from '@/components/user/UserCard';
import UserList from '@/components/user/UserList';

const viewAll = () => {
  const router = useRouter();
  const [staff, setStaff] = useState([]);
  const token = Cookies.get('token');
  useEffect(() => {
    submitHandler();
  }, []);
  const submitHandler = async () => {
    const resp = await fetch(
      'http://ec2-54-158-207-145.compute-1.amazonaws.com/api/v1/users/staff',
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    const data = await resp.json();
    console.log(data.data.data);
    let arr = data.data.data;

    arr=arr.map((e) => {
      return { email: e.email, name: e.name, code: e.role };
    });
    setStaff(arr);
  };

  return (
    <>
      <div className="flex flex-row w-screen h-screen">
        <AdminDashBoard />
        <form
          onSubmit={submitHandler}
          className="bg-sky-50 h-screen w-screen flex flex-col justify-center items-center text-black   ">
            
          <div className="contentAddUser2 overflow-auto flex flex-col gap-10">
            <p>List of all Staff</p>
            {
              // students.map((s) => {
              //   return (
              //     <div className=" w-full flex justify-between bg-sky-500 items-center shadow-md rounded-xl px-[2rem] text-white">
              //       {/* <img
              //         className="h-48 w-48 object-cover rounded-full mx-auto bg-gray-300"
              //         src="https://via.placeholder.com/400x400"
              //         alt="Default Image"
              //       /> */}
              //       <div className="">
              //         <i class="fa-solid fa-user fa-lg "></i>{' '}
              //       </div>
              //       <div className="flex flex-col">
              //         <div>Name : {s.name}</div>
              //         <div>Code : {s.code}</div>
              //         <div>Email : {s.email}</div>
              //       </div>
              //     </div>
              //   );
              // })
            }

            <UserList users={staff} />
          </div>
        </form>
      </div>
    </>
  );
};

export default viewAll;
