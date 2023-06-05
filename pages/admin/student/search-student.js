import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState, useEffect } from "react";
import Cookies from "js-cookie";
import UserList from "@/components/user/UserList";
import UserCard from "@/components/user/UserCard";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "@/components/store/userSlice";
const SearchStudent = ({ cookies }) => {
  const userState = useSelector((s) => s.user);
  if (userState.role != "system admin" || userState.loggedInStatus != "true") {
    return <div className="error">404 could not found</div>;
  }

  const [faculyTitles, setFacultyTitles] = useState([]);

  const [facultyValue, setFacultyValue] = useState("null");

  useEffect(() => {
    async function getFacultyNames() {
      const d = await fetch(`${process.env.url}api/v1/faculty/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookies.token,
        },
      });

      const data = await d.json();
      let a = data.data.map((e) => {
        return { name: e.name, id: e._id };
      });

      setFacultyTitles(a);
    }
    getFacultyNames();
  }, []);
  const [choosenCode, setChoosenCode] = useState("null");
  const handleCodeField = (event) => {
    const selectedCode = code.current?.value;
    console.log(selectedCode);
    console.log(event.target.value);
    console.log(selectedCode);
    console.log(selectedCode);
    console.log(selectedCode);

    if (selectedCode == "") {
      setChoosenCode("null");
      return;
    }
    console.log(selectedCode);
    setChoosenCode(selectedCode);
  };
  const router = useRouter();
  const [student, setStudent] = useState([]);
  const [tobeEdited, setTobeEdited] = useState();
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [invalidData, setInvalidData] = useState(false);
  const d = useDispatch();
  useEffect(() => {
    if (editModalIsOpen) {
      d(updateField({ field: "modalOpen", value: true }));
    } else {
      d(updateField({ field: "modalOpen", value: false }));
    }
  }, [editModalIsOpen]);
  const code = useRef();
  const name = useRef();
  const email = useRef();
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const academicYear = useRef();
  const department = useRef();
  const faculty = useRef();
  const [tobeDeleted, setTobeDeleted] = useState();
  const [emptyArray, setEmptyArray] = useState(false);
  const [departments, setDepartments] = useState([]);
  const handleFacultyChange = async () => {
    const selectedFaculty = faculty.current.value;
    setFacultyValue(selectedFaculty);
  };
  const [noStudents, setNoStudents] = useState(false);
  const [invalidInput, setInvalidInput] = useState(false);
  const submitHandler = async (e) => {
    if (e) {
      e.preventDefault();
    }
    console.log(code.current);
    console.log(code.current?.value);
    if (
      facultyValue == "null" ||
      (!anyStudent && code.current?.value == null) ||
      (!anyStudent && code.current?.value == "")
    ) {
      console.log("error");
      setStudent([]);
      setInvalidInput(true);
      return;
    } else {
      setInvalidInput(false);
    }
    try {
      let url = `${process.env.url}api/v1/users/students/?code=${code.current?.value}&faculty=${facultyValue}`;
      if (facultyValue == "all" && anyStudent) {
        url = `${process.env.url}api/v1/users/students/`;
      }
      if (facultyValue != "all" && anyStudent) {
        url = `${process.env.url}api/v1/users/students/?faculty=${facultyValue}`;
      }
      if (facultyValue == "all" && !anyStudent) {
        url = `${process.env.url}api/v1/users/students/?code=${code.current?.value}`;
      }
      console.log(url);
      const resp = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userState.token,
        },
      });
      const data = await resp.json();
      console.log(data);
      if (data.data.length == 0) {
      setStudent([]);

        setNoStudents(true);
        return;
      } else {
        setNoStudents(false);
      }
      setStudent(data.data);

      console.log(data.data[0].name);
      if (data.data.length === 0) {
        setEmptyArray(true);
        return;
      }
    } catch (e) {
      console.log(e);
    }
  };

  const deleteConfirm = (s) => {
    setDeleteModalIsOpen(true);
    setTobeDeleted(s);
    document.body.classList.toggle("overflow-hidden");
  };
  const deleteCancel = () => {
    document.body.classList.toggle("overflow-hidden");

    setDeleteModalIsOpen(false);
  };
  const [anyStudent, setAnyStudent] = useState(false);
  const deleteHandler = async (e) => {
    if (e) {
      e.preventDefault();
    }
    console.log(tobeDeleted);
    try {
      const resp = await fetch(
        `${process.env.url}api/v1/users/students/${tobeDeleted._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + userState.token,
          },
        }
      );
    } catch (e) {
      console.log(e);
    }

    submitHandler();
    setDeleteModalIsOpen(false);
    document.body.classList.toggle("overflow-hidden");
  };
  const editHandler = async (e) => {
    if (e) {
      e.preventDefault();
    }
    try {
      const resp = await fetch(
        `${process.env.url}api/v1/users/students/${tobeEdited._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + userState.token,
          },
          body: JSON.stringify({
            name: name.current.value,
            email: email.current.value,
            code: code.current?.value,
          }),
        }
      );
      const data = await resp.json();
      console.log(data);
    } catch (e) {
      console.log(e);
    }
    setEditModalIsOpen(false);
    document.body.classList.toggle("overflow-hidden");

    submitHandler();
  };
  const editConfirm = (s) => {
    setEditModalIsOpen(true);
    setTobeEdited(s);
    document.body.classList.toggle("overflow-hidden");
  };
  const editCancel = () => {
    document.body.classList.toggle("overflow-hidden");

    setEditModalIsOpen(false);
  };
  return (
    <>
      {deleteModalIsOpen ? (
        <div>
          <div className="fixed overflow-hidden z-10 top-0 left-0 right-0 bottom-0  opacity-100   w-screen h-screen ">
            <div className=" mt-16 ">
              <div className="p-4 m-auto max-w-sm rounded  relative  ">
                <div className="flex flex-col justify-center items-center gap-10 w-full mt-10 ">
                  <form className="text-xl border-2 border-none shadow-2xl rounded-2xl px-7 py-4 gap-10 w-[150%] relative bg-white">
                    <button
                      onClick={deleteCancel}
                      className=" text-gray-700 duration-200 transition-all hover:bg-gray-400 px-2 rounded absolute top-4 right-4 py-1"
                    >
                      <i class="fa-solid fa-xmark fa-lg"></i>
                    </button>
                    <div className="mb-8 text-2xl ">Delete Student:</div>

                    <div className="flex w-full h-full items-center justify-center text-red-800">
                      Are you sure you want to delete this user
                    </div>
                    <button
                      onClick={deleteHandler}
                      class="w-full text-center bg-gray-300 text-red-500 hover:text-white duration-200 transition-all hover:bg-red-600 px-4 py-3 rounded-lg my-5"
                    >
                      Confirm
                    </button>

                    {invalidData && (
                      <span className="text-red-500 flex justify-center">
                        Invalid input{" "}
                      </span>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {editModalIsOpen ? (
        <div>
          <div className="fixed overflow-hidden z-10 top-0 left-0 right-0 bottom-0  opacity-100   w-screen h-screen ">
            <div className=" mt-16 ">
              <div className="p-4 m-auto max-w-sm rounded  relative  ">
                <div className="flex flex-col justify-center items-center gap-10 w-full mt-10 ">
                  <form className="text-xl border-2 border-none shadow-2xl rounded-2xl px-7 py-4 gap-10 w-[150%] relative bg-white">
                    <button
                      onClick={editCancel}
                      className=" text-gray-700 duration-200 transition-all hover:bg-gray-400 px-2 rounded absolute top-4 right-4 py-1"
                    >
                      <i class="fa-solid fa-xmark fa-lg"></i>
                    </button>
                    <div className="mb-8 text-2xl">Edit Student Info:</div>
                    <label for="email" className="  ">
                      Edu Email
                    </label>
                    <div class="my-5">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="editField"
                        placeholder=""
                        defaultValue={tobeEdited.email}
                        ref={email}
                      />
                    </div>
                    <label for="role" className=" ">
                      Name
                    </label>
                    <div class="flex-for-reg my-5">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="editField"
                        defaultValue={tobeEdited.name}
                        placeholder="name"
                        ref={name}
                      />
                    </div>
                    <label for="code" className=" mr-10">
                      Code
                    </label>
                    <div class="my-5">
                      <input
                        type="text"
                        id="code"
                        name="code"
                        className="editField"
                        placeholder=""
                        defaultValue={tobeEdited.code}
                        ref={code}
                      />
                    </div>
                    <button
                      onClick={editHandler}
                      class="w-full text-center bg-blue-500 text-white duration-200 transition-all hover:bg-blue-600 px-4 py-3 rounded-lg my-5"
                    >
                      Confirm
                    </button>

                    {invalidData && (
                      <span className="text-red-500 flex justify-center">
                        Invalid input{" "}
                      </span>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div
        className={`flex flex-row w-screen h-screen ${
          deleteModalIsOpen ? `bg-white opacity-60 overflow-hidden ` : null
        } ${editModalIsOpen ? `bg-white opacity-60 overflow-hidden ` : null}`}
      >
        <form
          onSubmit={submitHandler}
          className="bg-sky-50 h-screen w-[80%]  translate-x-[25%]  flex flex-col justify-center items-center text-black ml-1 rounded-2xl"
        >
          <div className="overflow-auto contentAddUser2 flex flex-col gap-10">
            <div className=" ">Search Student</div>
            <div className="flex gap-20 items-center  ">
              <div className="flex gap-20 w-full items-center">
                <div className="flex flex-col  gap-5 w-1/2">
                  <div className="flex flex-col space-y-3">
                    <div></div>
                    <div className="">Student Code</div>
                    <div>
                      <input
                        type="text"
                        className="inputAddUser2"
                        ref={code}
                        onChange={handleCodeField}
                        disabled={anyStudent}
                        placeholder={anyStudent ? 'Input disabled (Search all students selected)' : 'Enter code'}

                      />
                    </div>
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        onChange={() => setAnyStudent(!anyStudent)}
                        checked={anyStudent}
                      />{" "}
                      <div>Search all students</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-5 w-1/2  pb-10 ">
                  <div className=""> Faculty</div>
                  <select
                    ref={faculty}
                    id="small"
                    class="choose-form w-full px-10"
                    onChange={handleFacultyChange}
                  >
                    <option
                      className="text-left"
                      value="null"
                      disabled
                      selected
                    >
                      Choose a Faculty
                    </option>
                    <option className="text-left" value="all">
                      All Faculities
                    </option>
                    {faculyTitles.map((e) => {
                      return <option value={e.id}>{e.name}</option>;
                    })}{" "}
                  </select>
                </div>

                <button
                  type="submit"
                  class="px-10 py-3 duration-200 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Search
                </button>
              </div>
            </div>
            <div className="flex justify-center w-full">
              <div className="w-3/5 h-[5rem] flex flex-col ">
                {invalidInput && (
                  <div>
                    You must choose a faculty and either enter student code or
                    check the all students checkbox
                  </div>
                )}
                {noStudents && <div>No students found</div>}
                {student.map((s) => {
                  return (
                    <div className="flex w-full space-x-5 justify-between ">
                      <UserCard name={s.name} code={s.code} email={s.email} />
                      <div className="flex justify-center items-center space-x-3">
                        <button
                          onClick={() => editConfirm(s)}
                          type="submit"
                          class="  text-white bg-blue-500 transition-all duration-200  hover:bg-blue-600  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg px-5 py-2.5 mx-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                          <i class="fa-solid fa-pen-to-square"></i>{" "}
                        </button>
                        <button
                          onClick={() => deleteConfirm(s)}
                          type="submit"
                          class="  text-white bg-[#FF0000] duration-200 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm md:text-lg px-5 py-2.5 mx-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                        >
                          <i class="fa-solid fa-delete-left"></i>{" "}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default SearchStudent;
