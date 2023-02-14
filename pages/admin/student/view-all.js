import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import AdminDashBoard from "@/components/AdminDashBoard";
import UserCard from "@/components/user/UserCard";
import UserList from "@/components/user/UserList";

const Students = ({ cookies }) => {
  if (cookies.role != "system admin" || cookies.loggedInStatus != "true") {
    return <div className="error">404 could not found</div>;
  }

  const router = useRouter();
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const token = Cookies.get("token");
  useEffect(() => {
    submitHandler();
  }, []);
  const submitHandler = async () => {
    const resp = await fetch(
      "http://ec2-52-3-250-20.compute-1.amazonaws.com/api/v1/users/students",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    const data = await resp.json();
    setStudents(data.data.data);
    setFilteredStudents(data.data.data);

    console.log(data.data.data);
  };
  const filterStudents = (event) => {
    let a = students.filter((e) => {
      return e.code.startsWith(event.target.value);
    });
    setFilteredStudents(a);
  };

  return (
    <>
      <div className="flex flex-row w-screen h-screen">
        <AdminDashBoard />
        <form
          onSubmit={submitHandler}
          className=" bg-sky-50 h-screen w-screen flex flex-col justify-center items-center text-black   "
        >
          <div className=" contentAddUser2 overflow-auto flex flex-col gap-10">
            <div className="flex w-full">
              <div className="">List of all Students</div>
              {/* <div className="flex justify-end w-full gap-6">
                <div className="">Search By Code:</div>
                <input
                  type="text"
                  className="inputAddUser2 -translate-y-4 translate-x-3"
                  onChange={filterStudents}
                />
              </div> */}
            </div>
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

            {filteredStudents ? (
              <UserList users={filteredStudents} />
            ) : (
              <div>No Students found</div>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default Students;
