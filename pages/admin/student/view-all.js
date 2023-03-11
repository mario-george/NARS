import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import AdminDashBoard from "@/components/AdminDashBoard";
import UserCard from "@/components/user/UserCard";
import UserList from "@/components/user/UserListStudent";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
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
  const submitHandler = async (e) => {
    if (e) {
      e.preventDefault();
    }
    try {
      const resp = await fetch(`${process.env.url}api/v1/users/students`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const data = await resp.json();
      setStudents(data.data);
      setFilteredStudents(data.data);

      console.log(data.data);
    } catch (e) {
      console.log(e);
    }
  };
  const handleClick = () => {
    const header = ["name", "code", "email", "faculty", "academicYear"];
    const rows = students.map((item) => [
      item.name,
      item.code,
      item.email,
      item.faculty,
      item.academicYear,
    ]);

    const worksheet = XLSX.utils.aoa_to_sheet([header, ...rows]);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const fileBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const file = new Blob([fileBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(file, "students.xlsx");
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
              <div className="flex items-center justify-between w-full">
                <div className="">List of all Students</div>
                <button
                  onClick={handleClick}
                  className="transition-all duration-200 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Download Excel
                </button>
              </div>
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
              <>
                <h1 className="text-3xl font-bold my-4">Student List</h1>
                <UserList users={filteredStudents} />
              </>
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