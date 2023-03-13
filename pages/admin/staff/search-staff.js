import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import Cookies from "js-cookie";
import AdminDashBoard from "@/components/AdminDashBoard";
import UserList from "@/components/user/UserList";
import UserCard from "@/components/user/UserCard";
const SearchStudent = ({ cookies }) => {
  if (cookies.role != "system admin" || cookies.loggedInStatus != "true") {
    return <div className="error">404 could not found</div>;
  }

  const token = Cookies.get("token");
  const router = useRouter();
  const [staff, setStaff] = useState([]);
  const [invalidData, setInvalidData] = useState(false);
  const role = useRef();
  const name = useRef();
  const role2 = useRef();
  const email = useRef();
  const [tobeDeleted, setTobeDeleted] = useState();
  const [tobeEdited, setTobeEdited] = useState();
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);

  const academicYear = useRef();
  const department = useRef();
  const faculty = useRef();
  const deleteConfirm = (s) => {
    setDeleteModalIsOpen(true);
    setTobeDeleted(s);
    document.body.classList.toggle("overflow-hidden");
  };
  const deleteCancel = () => {
    document.body.classList.toggle("overflow-hidden");

    setDeleteModalIsOpen(false);
  };
  const editCancel = () => {
    document.body.classList.toggle("overflow-hidden");

    setEditModalIsOpen(false);
  };
  const editConfirm = (s) => {
    setEditModalIsOpen(true);
    setTobeEdited(s);
    document.body.classList.toggle("overflow-hidden");
  };
  const deleteHandler = async (staff) => {
    try {
      const resp = await fetch(
        `${process.env.url}api/v1/users/staff/${tobeDeleted._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      const data = await resp.json();
      console.log(data);
    } catch (e) {
      console.log(e);
    }
    setDeleteModalIsOpen(false);
    document.body.classList.toggle("overflow-hidden");

    submitHandler();
  };
  const editHandler = async (e) => {
    if (e) {
      e.preventDefault();
    }
    try {
      const resp = await fetch(
        `${process.env.url}api/v1/users/staff/${tobeEdited._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            name: name.current.value,
            email: email.current.value,
          }),
        }
      );
      const data = await resp.json();
      console.log(data);
    } catch (e) {
      console.log(e);`http://ec2-52-3-250-20.compute-1.amazonaws.com/api/v1/users/staff/?role=${role.current.value}`
    }
    setEditModalIsOpen(false);
    document.body.classList.toggle("overflow-hidden");

    submitHandler();
  };
  const submitHandler = async (e) => {
    if (e) {
      e.preventDefault();
    }
    try {
      const resp = await fetch(
        `${process.env.url}api/v1/users/staff/?role=${role.current.value}`
        ,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
            // 'Custom-Header':code.current.value,
          },
          // body: JSON.stringify({
          //   code: code.current.value,

          // }),
        }
      );
      const data = await resp.json();
      setStaff(data.data);
      // console.log(data.data.data[0].name);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      {deleteModalIsOpen ? (
        <div>
          <div className="fixed overflow-hidden z-10 top-0 left-0 right-0 bottom-0  opacity-100 w-screen h-screen">
            <div className=" mt-16 ">
              <div className="p-4 m-auto max-w-sm bg-blue-200 rounded-xl  relative  ">
                <button
                  onClick={deleteCancel}
                  className="bg-red-500 text-white duration-200 transition-all hover:bg-red-600 px-2 rounded absolute top-4 right-4"
                >
                  <i class="fa-solid fa-xmark"></i>
                </button>
                <p className="text-center font-Rubik font-bold text-gray-700 p-2 my-20">
                  Are you sure you want to delete this user
                </p>
                <button
                  onClick={deleteHandler}
                  className="bg-red-500 text-white duration-200 transition-all hover:bg-red-600 p-2 rounded absolute bottom-4 right-4"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {editModalIsOpen ? (
        <div>
          <div className="fixed overflow-hidden z-10 top-0 left-0 right-0 bottom-0  opacity-100 w-screen h-screen">
            <div className=" mt-16 ">
              <div className="p-4 m-auto max-w-sm rounded-xl  relative  ">
                <div className="flex flex-col justify-center items-center gap-10 w-full mt-10 ">
                  <form className="text-1xl border-2  border-none shadow-2xl rounded-2xl px-7 py-4  gap-10 relative bg-sky-300">
                    <button
                      onClick={editCancel}
                      className="bg-red-500 text-white duration-200 transition-all hover:bg-red-600 px-2 rounded absolute top-4 right-4"
                    >
                      <i class="fa-solid fa-xmark"></i>
                    </button>
                    <label for="email" className="font-bold mr-10">
                      Edu Email
                    </label>
                    <div class="my-5">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="button"
                        placeholder=""
                        defaultValue={tobeEdited.email}
                        ref={email}
                      />
                    </div>
                    <label for="role" className="font-bold ">
                      Name
                    </label>
                    <div class="flex-for-reg mt-5">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="button"
                        defaultValue={tobeEdited.name}
                        placeholder="name"
                        ref={name}
                      />
                    </div>
                    <button
                      onClick={editHandler}
                      class="w-full  text-center home-btn1 my-5"
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
          deleteModalIsOpen ? `bg-gray-500 opacity-60 overflow-hidden ` : null
        } ${
          editModalIsOpen ? `bg-gray-500 opacity-60 overflow-hidden ` : null
        } `}
      >
        <AdminDashBoard />
        <form
          onSubmit={submitHandler}
          className="  bg-sky-50 h-screen w-screen flex flex-col justify-center items-center text-black   "
        >
          <div className="overflow-auto contentAddUser2 flex flex-col gap-10">
            <div className=" ">Search Staff</div>
            <div className="flex gap-20 ">
              <div className="flex gap-20 w-full items-center">
                <div className=" font-normal">Select role</div>
                {/* <input type="text" className="inputAddUser2" ref={role} /> */}
                <select
                  ref={role}
                  id="small"
                  class="block text-xl md:text-lg p-3     text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
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
                  <option value="system admin">System Admin</option>
                </select>
                <button
                  type="submit"
                  class="px-10 py-3 duration-200 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Search
                </button>
              </div>
            </div>
            <div className="flex justify-center w-full ">
              <div className="w-2/5 h-[5rem]">
                {staff.map((s) => {
                  return (
                    <>
                      <UserCard name={s.name} code={s.role} email={s.email} />
                      <div className="flex w-full justify-center">
                        <button
                          onClick={() => editConfirm(s)}
                          class="w-[6rem]  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg px-5 py-2.5 mx-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteConfirm(s)}
                          class="w-[6rem]  text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm md:text-lg px-5 py-2.5 mx-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                        >
                          Delete
                        </button>
                      </div>
                    </>
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
