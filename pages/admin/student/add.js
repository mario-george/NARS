import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { handleFile } from "../../../common/uploadFile";
import { useSelector } from "react-redux";

const addStudent = ({ cookies }) => {
  const userState = useSelector((s) => s.user);
  const [departments, setDepartments] = useState([]);

  if (userState.role != "system admin" || userState.loggedInStatus != "true") {
    return <div className="error">404 could not found</div>;
  }
 const [aY,setAy]=useState([])
const handleAcademicYearChange=()=>{
  const selectedElements = getSelectedElements(["prep","first","second","third","fourth","fifth","sixth"], academicYear.current.value);
setAy(selectedElements)
}
function getSelectedElements(array, selectedValue) {
  const selectedIndex = array.indexOf(selectedValue);
  if (selectedIndex === -1) {
    return [];
  }
  return array.slice(selectedIndex);
}

  const handleFacultyChange = async () => {
    const selectedFacultyId = faculty.current.value;
    console.log(selectedFacultyId);

    const resp = await fetch(
      `${process.env.url}api/v1/faculty/${selectedFacultyId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userState.token,
        },
      }
    );
    let tempArray = [];
    const data = await resp.json();

    data.data.departments.map(async (d) => {
      const resp = await fetch(
        `${process.env.url}api/v1/department/?name=${d}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userState.token,
          },
        }
      );
      const data = await resp.json();
      console.log(data)
      console.log(data)
      console.log(data)
      console.log(data)
      console.log(data)
      tempArray.push({ name: data.data[0].name, id: data.data[0]._id });
    console.log(tempArray);

    });
    console.log(tempArray);
    console.log(data);
    console.log(data);
    console.log(data);
    console.log(data);
    console.log(data);
    console.log(data);
    console.log(data);
    setTimeout(() => {
      setDepartments(tempArray);
    }, 500);
  };
  useEffect(() => {
    async function doThis() {
      const resp = await fetch(`${process.env.url}api/v1/faculty/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userState.token,
        },
      });
      const data = await resp.json();
      console.log(data);
      const newData = data.data.map((e) => {
        return { name: e.name, id: e._id };
      });
      setFaculty(newData);
    }
    doThis();
  }, []);
  const [exportModalIsOpen, setExportModalIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const token = Cookies.get("token");
  const router = useRouter();
  const name = useRef();
  const code = useRef();
  const email = useRef();
  const academicYear = useRef();
  const department = useRef();
  const faculty = useRef();
  const [msg, setMsg] = useState("");
  const [facultyArr, setFaculty] = useState([]);
  const closeMsg = () => {
    setMsg("");
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
        Student has been added successfully
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

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(faculty.current.value);
    console.log(aY);
    console.log(aY);
    console.log(aY);
    console.log(department.current.value);
    console.log(department.current.value);
    console.log(department.current.value);
    console.log(department.current.value);
    console.log(department.current.value);
    console.log(department.current.value);
    console.log(department.current.value);
    const resp = await fetch(`${process.env.url}api/v1/users/students`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userState.token,
      },
      body: JSON.stringify({
        code: code.current.value,
        name: name.current.value,
        email: email.current.value,
        faculty: faculty.current.value,
        department: department.current.value,
        academicYear: aY,
      }),
    });
    const data = await resp.json();
    console.log(data);
    if (data.status == "success") {
      setMsg(success);
    } else {
      setMsg(fail);
    }
  };
  const exportCancel = () => {
    document.body.classList.toggle("overflow-hidden");

    setExportModalIsOpen(false);
  };
  function exportHandler() {
    document.body.classList.toggle("overflow-hidden");

    data.forEach((row) => {
      const { name, email, code, faculty, academicYear,department } = row;
      const obj = { name, email, code, academicYear:academicYear.split(",").map(e=>e.trim()), faculty ,department};

      const resp = fetch(`${process.env.url}api/v1/users/students`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + userState.token,
        },
        body: JSON.stringify(obj),
      });

      console.log(resp);
    });

    setExportModalIsOpen(false);
    setMsg(success);
  }

  return (
    <>
      {exportModalIsOpen ? (
        <div className="fixed inset-0 flex justify-center items-center z-20 h-screen">
          <div className=" container relative  rounded-lg p-6 w-[40rem]  bg-white text-black border-2 shadow-xl border-black ">
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
      <div className="flex flex-row w-screen h-screen">
        <form
          onSubmit={submitHandler}
          className="bg-sky-50 h-screen w-[80%]  translate-x-[25%]  flex flex-col justify-center items-center text-black ml-1 rounded-2xl"
        >
          <div className="contentAddUser2 flex flex-col gap-10 py-20">
            <div className=" ">Add Student</div>

            <div className="flex gap-20 ">
              <div className="flex flex-col gap-5">
                <div>Student Code</div>
                <input
                  type="text"
                  className="inputAddUser2 w-full"
                  ref={code}
                  placeholder={`Student code`}
                />
              </div>
              <div className="flex flex-col gap-5  w-1/2">
                <div> Name</div>
                <input
                  type="text"
                  className="inputAddUser2  w-full"
                  ref={name}
                  placeholder={`Student name`}

                />
              </div>
            </div>
            <div className="flex gap-20 ">
              <div className="flex flex-col gap-5">
                <div>Academic year</div>
                <select
                  ref={academicYear}
                  id="small"
                  class="choose-form w-full px-14"
                  onChange={handleAcademicYearChange}

                >
                  <option className="text-left" value="" disabled selected>
                    Choose a year
                  </option>
                  <option value="prep">Prep</option>
                  <option value="first">First</option>
                  <option value="second">Second</option>
                  <option value="third">Third</option>
                  <option value="fourth">Fourth</option>
                  <option value="fifth">Fifth</option>
                  <option value="sixth">Sixth</option>
                </select>
              </div>
              <div className="flex flex-col gap-5  w-1/2">
                <div> Email </div>
                <input
                  type="text"
                  className="inputAddUser2  w-full"
                  ref={email}
                  placeholder={`Student Email`}

                />
              </div>
            </div>
            <div className="flex gap-20 ">
              <div className="flex flex-col gap-5  ">
                <div> Faculty</div>
                <select
                  ref={faculty}
                  id="small"
                  class="choose-form w-full px-10"
                  onChange={handleFacultyChange}

                >
                  <option className="text-left" disabled selected>
                    Choose a Faculty
                  </option>
                  {facultyArr.map((e) => {
                    return <option value={e.id}>{e.name}</option>;
                  })}{" "}
                </select>
              </div>
              <div className="flex flex-col gap-5  w-1/2">
                <div>Department</div>
                <select
                  id="department"
                  className="choose-form w-full"
                  disabled={!departments.length}
                  ref={department}
                >
                  <option value="" disabled selected>
                    {departments.length
                      ? "Choose a Department"
                      : "Select a Faculty first"}
                  </option>
                  {departments.map((department) => (
                    <option value={department.id} key={department.id}>
                      {department.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-between items-center">
              {<div>{msg}</div>}

              <div className="flex items-center space-x-8 justify-center">
                <input
                  type="file"
                  id="selectFile"
                  class="hidden"
                  onChange={(e) =>
                    handleFile(e, (data) => {
                      setData(data);
                      setExportModalIsOpen(true);
                      document.body.classList.toggle("overflow-hidden");
                    })
                  }
                />
                <label
                  for="selectFile"
                  class="  px-10 py-3 duration-200 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm md:text-lg  mx-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
                >
                  Import
                </label>
                <button
                  type="submit"
                  class="   px-10 py-3 duration-200 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg  mx-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
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
export default addStudent;
