import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import Cookies from "js-cookie";
import Modal from "@/components/Modal";

const profile = ({ cookies }) => {
  useEffect(() => {
    document.querySelector("body").classList.add("scrollbar-none");
  });
  const globalState = useSelector((s) => s.user);
  if (globalState.loggedInStatus != "true") {
    return <div className="error">404 could not found</div>;
  }

  useEffect(() => {
    console.log("MOHAMED ROLE IS ", globalState.role);
  }, []);

  const passowrdHandler = async (e) => {
    if (e) {
      e.preventDefault();
    }
    try {
      const r = await fetch(
        `${process.env.url}api/v1/users/staff/updatePassword/${globalState._id}`,
        {
          method: "PATCH",

          body: JSON.stringify({
            passwordCurrent: oldPassowrd.current.value,
            password: newPassowrd.current.value,
            passwordConfirm: cnfrmPassowrd.current.value,
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/form-data",
            Authorization: "Bearer " + globalState.token,
          },
        }
      );
      const resp = await r.json();
      console.log(resp);
      setErrormsg(resp.message);
      console.log(errorMsg);
      if (resp.status == "success") {
        setInvalidData(false);
      } else {
        setInvalidData(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("photo", selectedFile);
    data.append("name", name.current.value);

    try {
      const r = await fetch(
        `${process.env.url}api/v1/users/staff/updateMe/${globalState._id}`,
        {
          method: "PATCH",
          body: data,
          headers: {
            Accept: "application/form-data",
            Authorization: "Bearer " + globalState.token,
          },
        }
      );

      const resp = await r.json();
      console.log(resp);

      if (resp.status == "success") {
        setMsg(success);
        Cookies.set("name", name.current.value);
        cookies.set("photo", selectedFile);
      } else {
        setMsg(fail);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const [errorMsg, setErrormsg] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const name = useRef();
  const oldPassowrd = useRef();
  const newPassowrd = useRef();
  const cnfrmPassowrd = useRef();
  const [msg, setMsg] = useState("");
  const closeMsg = () => {
    setMsg("");
  };

  if (cookies.role === "system admin") {
    useEffect(() => {
      setAdmin(true);
    }, []);
  } else if (cookies.role === "instructor") {
    useEffect(() => {
      // setInstructor(true);
    }, []);
  } else if (cookies.role === "program admin") {
    useEffect(() => {
      setProgadmin(true);
    }, []);
  } else if (cookies.role === "faculty admin") {
    useEffect(() => {
      setFacadmin(true);
    }, []);
  } else if (cookies.role === "quality coordinator") {
    console.log("HEEEEEEEEEEEEEEEEEERE");
    useEffect(() => {
      setQualityCoo(true);
    }, []);
  }
  let fail = (
    <div
      id="alert-border-2"
      class="flex p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800"
      role="alert"
    >
      <i class="fa-sharp fa-solid fa-circle-exclamation"></i>
      <div class="ml-3 text-sm font-medium">
        Failed to update your information
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
        Your information has been updated successfully
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
  const [showModal, setShowModal] = useState(false);
  const [invalidData, setInvalidData] = useState(false);

  return (
    <>
      <form
        onSubmit={submitHandler}
        className="bg-sky-50 h-screen w-[80%]  translate-x-[25%]  flex flex-col justify-center items-center text-black ml-1 rounded-2xl"
      >
        <div className="contentAddUser2 flex flex-col gap-10">
          <p className="underline mb-1">Profile details:</p>
          <div className="flex gap-20 ">
            <div className="flex flex-col gap-5 w-1/3">
              <div>Role</div>
              <input
                type="text"
                className="inputAddUser2 w-full"
                value={cookies.role}
                disabled
              />
            </div>
            <div className="flex flex-col gap-5  w-2/5">
              <div> Name</div>
              <input
                type="text"
                className="inputAddUser2  w-full"
                defaultValue={cookies.name}
                ref={name}
              />
            </div>
          </div>
          <div className="flex gap-20 ">
            <div className="flex flex-col gap-5  w-1/3">
              <div> Email </div>
              <input
                type="text"
                className="inputAddUser2  w-full"
                value={cookies.email}
                disabled
              />
            </div>
            <div className="flex flex-col gap-5  w-2/5">
              <div> select photo:</div>
              <input
                type="file"
                class="text-sm text-grey-500
                            file:mr-5 file:py-3 file:px-10
                            file:rounded-full file:border-0
                            file:text-sm file:font-medium
                            file:bg-gray-200 file:text-gray-700
                            hover:file:cursor-pointer hover:file:bg-amber-50
                            hover:file:text-amber-700
                            "
                onChange={(e) => setSelectedFile(e.target.files[0])}
              />
            </div>
          </div>

          <div className="flex gap-20 ">
            {<div className="w-1/2 mt-10">{msg}</div>}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              class="  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg px-5 py-2.5 mx-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Update
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowModal(true);
              }}
              class="  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg px-5 py-2.5 mx-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              password
            </button>
          </div>
        </div>
      </form>

      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <div className="py-6 px-6 lg:px-8 text-left">
          <h3 className="mb-4 text-xl font-medium text-gray-900">
            Change your password
          </h3>
          <form className="space-y-6" onSubmit={passowrdHandler}>
            <div>
              <label
                for="oldPassowrd"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Old password
              </label>
              <input
                type={"password"}
                name="oldPassowrd"
                id="oldPassowrd"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
                rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
                required
                ref={oldPassowrd}
              />
            </div>
            <div>
              <label
                for="newPassowrd"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                New passowrd
              </label>
              <input
                type="password"
                name="newPassowrd"
                id="newPassowrd"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
                                            rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
                required
                ref={newPassowrd}
              />
            </div>
            <div>
              <label
                for="cnfrmPassowrd"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                New passowrd
              </label>
              <input
                type="password"
                name="cnfrmPassowrd"
                id="cnfrmPassowrd"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
                rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
                required
                ref={cnfrmPassowrd}
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800
              focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium
              rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Update your password
            </button>
            {invalidData && (
              <div className="text-red-500 flex justify-center">{errorMsg}</div>
            )}
          </form>
        </div>
      </Modal>
    </>
  );
};
export default profile;
