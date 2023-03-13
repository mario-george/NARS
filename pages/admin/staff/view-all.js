import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import AdminDashBoard from "@/components/AdminDashBoard";
import UserList from "@/components/user/UserList2";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
const viewAll = ({ cookies }) => {
  if (cookies.role != "system admin" || cookies.loggedInStatus != "true") {
    return <div className="error">404 could not found</div>;
  }
  useEffect( () => { document.querySelector("body").classList.add("scrollbar-none") } );
  const handleClick = () => {
    const header = ["name", "role", "email"];
    const rows = staff.map((item) => [item.name, item.role, item.email]);

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
    saveAs(file, "staff.xlsx");
  };

  console.log(cookies.token);
  const router = useRouter();
  const [staff, setStaff] = useState([]);
  useEffect(() => {
    submitHandler();
  }, []);
  const submitHandler = async (e) => {
    if (e) {
      e.preventDefault();
    }
    try {
      const resp = await fetch(`${process.env.url}api/v1/users/staff`, {
        headers: {
          Authorization: "Bearer " + cookies.token,
        },
      });
      const data = await resp.json();
      console.log(data.data);
      let arr = data.data;

      arr = arr.map((e) => {
        return { email: e.email, name: e.name, role: e.role };
      });
      setStaff(arr);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="flex flex-row w-screen h-screen">
        <AdminDashBoard />
        <form
          onSubmit={submitHandler}
          className="bg-sky-50 h-screen w-screen flex flex-col justify-center items-center text-black   "
        >
          <div className="contentAddUser2 overflow-auto flex flex-col gap-10">
            <div className="flex items-center justify-between">
              <p>List of all Staff</p>
              <button
                onClick={handleClick}
                className="transition-all duration-200 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Download Excel
              </button>
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

            <UserList users={staff} />
          </div>
        </form>
      </div>
    </>
  );
};

export default viewAll;
