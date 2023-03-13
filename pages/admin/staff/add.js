import AdminDashBoard from "@/components/AdminDashBoard";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef,useEffect } from "react";
import { successFailMsg } from "@/components/successFail/success-fail";
import Cookies from "js-cookie";
import { useState } from "react";
import XLSX from "xlsx";
import { read, utils } from "xlsx";
import CircularJSON from "circular-json";
const addStaff = ({ cookies }) => {
  if (cookies.role != "system admin" || cookies.loggedInStatus != "true") {
    return <div className="error">404 could not found</div>;
  }
  useEffect( () => { document.querySelector("body").classList.add("scrollbar-none") } );
  const [exportModalIsOpen, setExportModalIsOpen] = useState(false);
  const [data, setData] = useState([]);

  function handleFile(event) {
    const files = event.target.files;
    const f = files[0];

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = read(data, { type: "array" });
      const firstSheet = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheet];
      const sheetData = utils.sheet_to_json(worksheet);
      console.log(sheetData);
      setData(sheetData);
      setExportModalIsOpen(true);
      document.body.classList.toggle("overflow-hidden");
    };
    reader.readAsArrayBuffer(f);
  }
  function exportHandler() {
    document.body.classList.toggle("overflow-hidden");

    data.forEach((row) => {
      const { name, email, role } = row;
      const obj = { name, email, role };

      const resp = fetch(`${process.env.url}api/v1/users/staff`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(obj),
      });

      console.log(resp);
    });

    setExportModalIsOpen(false);
    setMsg(success);
  }

  const token = Cookies.get("token");
  const router = useRouter();
  const name = useRef();
  const email = useRef();
  const role = useRef();
  const [msg, setMsg] = useState("");
  const closeMsg = () => {
    setMsg("");
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch(`${process.env.url}api/v1/users/staff`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          role: role.current.value,
          name: name.current.value,
          email: email.current.value,
          // faculty:faculty.current.value,
          // department:department.current.value,
          // academicYear:academicYear.current.value,
        }),
      });
      const data = await resp.json();
      console.log(data);
      if (data.status == "success") {
        setMsg(success);
      } else {
        setMsg(fail);
      }
    } catch (e) {
      console.log(e);
    }
  };

  let fail = (
    <div
      id="alert-border-2"
      class="flex p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800"
      role="alert"
    >
      <i class="fa-sharp fa-solid fa-circle-exclamation"></i>
      <div class="ml-3 text-sm font-medium">
        Something went wrong please try again
        <a href="#" class="font-semibold underline hover:no-underline"></a>.
      </div>
      <button
        type="button"
        onClick={closeMsg}
        class="ml-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
        data-dismiss-target="#alert-border-2"
        aria-label="Close"
      >
        <span class="sr-only">Dismiss</span>
        <svg
          aria-hidden="true"
          class="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  );

  let success = (
    <div
      id="alert-border-3"
      class="flex p-4 mb-4 text-green-800 border-t-4 border-green-300 bg-green-50 dark:text-green-400 dark:bg-gray-800 dark:border-green-800"
      role="alert"
    >
      <i class="fa-solid fa-circle-check"></i>
      <div class="ml-3 text-sm font-medium">
        Staff has been added successfully
        <a href="#" class="font-semibold underline hover:no-underline"></a>
      </div>
      <button
        onClick={closeMsg}
        type="button"
        class="ml-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700"
        data-dismiss-target="#alert-border-3"
        aria-label="Close"
      >
        <span class="sr-only">Dismiss</span>
        <svg
          aria-hidden="true"
          class="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  );
  const exportCancel = () => {
    document.body.classList.toggle("overflow-hidden");

    setExportModalIsOpen(false);
  };

  return (
    <>
      {exportModalIsOpen ? (
        <div className="fixed inset-0 flex justify-center items-center z-20 h-screen">
          <div className=" container relative  rounded-lg p-6 w-[40rem]  bg-gray-700 text-white ">
            <button
              onClick={exportCancel}
              className=" bg-red-500 text-white duration-200 transition-all hover:bg-red-600 px-2 rounded absolute top-4 right-4"
            >
              <i class="fa-solid fa-xmark"></i>
            </button>
            <div className="overflow-auto h-64 my-10">
              {data.length > 0 && (
                <table className="relative   w-full text-center">
                  <thead>
                    <tr>
                      {Object.keys(data[0]).map((key) => (
                        <th key={key} className="px-4 py-2">
                          {key}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((row, index) => (
                      <tr key={index}>
                        {Object.values(row).map((value, index) => (
                          <td key={index} className="border px-4 py-2">
                            {value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <div className="flex justify-between items-center">
              <div>Please confirm the data and click submit </div>
              <button
                onClick={() => exportHandler()}
                class=" my-6  px-10 py-3 duration-200 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg  mx-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <div
        className={`flex flex-row w-screen h-screen ${
          exportModalIsOpen ? `bg-black opacity-60 overflow-hidden ` : null
        }`}
      >
        <AdminDashBoard />
        <form
          onSubmit={submitHandler}
          className="bg-sky-50 h-screen w-screen flex flex-col justify-center items-center text-black   "
        >
          <div className="contentAddUser2 flex flex-col gap-10">
            <p>Add Staff</p>
            <div className="flex gap-10 ">
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
            <div className="flex gap-10 flex-1 ">
              <div className="flex flex-col gap-5 w-1/4 ">
                <div>Role</div>

                <select
                  ref={role}
                  id="small"
                  class="choose-form"
                >
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
                    Teaching Assistant{" "}
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
                  className="inputAddUser2  w-full "
                />
              </div>
            </div>
            <div className="flex gap-10 flex-1 -mt-24 ">
              <div className="flex flex-col gap-5 w-1/4 ">
              <div>Department </div>
                <input type="text" className="inputAddUser2 w-full" />
              </div>
              <div className="flex justify-end w-3/4 space-x-8 items-center -mt-24 ">
                {<div className="w-1/2 ">{msg}</div>}
                <input
                  type="file"
                  id="selectFile"
                  class="hidden"
                  onChange={handleFile}
                />
                <label
                  for="selectFile"
                  class=" my-6  px-10 py-3 duration-200 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm md:text-lg  mx-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
                >
                  Import
                </label>
                <button
                  type="submit"
                  class=" my-6  px-10 py-3 duration-200 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg  mx-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              </div>
            </div>
            {/* <div className="flex ">
              <div className="flex flex-col">
                <div>Department </div>
                <input type="text" className="inputAddUser2 w-full" />
              </div>
              <div className="flex justify-end w-full space-x-8 items-center">
                {<div className="w-1/2 ">{msg}</div>}
                <input
                  type="file"
                  id="selectFile"
                  class="hidden"
                  onChange={handleFile}
                />
                <label
                  for="selectFile"
                  class=" my-6  px-10 py-3 duration-200 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm md:text-lg  mx-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
                >
                  Import
                </label>
                <button
                  type="submit"
                  class=" my-6  px-10 py-3 duration-200 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg  mx-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              </div>
            </div> */}
          </div>
        </form>
      </div>
    </>
  );
};
export default addStaff;
