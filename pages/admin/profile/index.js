import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useRef } from "react";
import AdminDashBoard from "@/components/AdminDashBoard";
const profile = ({ cookies }) => {
  const globalStateCookies = useSelector((s) => s.user.cookies);
  console.log(cookies);
  if (cookies.role != "system admin" || cookies.loggedInStatus != "true") {
    if (
      globalStateCookies.role != "system admin" ||
      globalStateCookies.loggedInStatus != "true"
    ) {
      setTimeout(() => {
        return <div className="error">404 could not found</div>;
      }, 1500);
    }
  }

  const router = useRouter();
  const userName = useSelector((s) => s.user.data.name);
  const code = useSelector((s) => s.user.data.code);
  const email = useSelector((s) => s.user.data.email);
  const id = useSelector((s) => s.user.data._id);
  const name = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className="flex flex-row w-screen h-screen mt-2 bg-sky-50">
        <AdminDashBoard />
        <form
          onSubmit={submitHandler}
          className="bg-sky-50 h-screen w-screen flex flex-col justify-center items-center text-black ml-1"
        >
          <div className="contentAddUser2 flex flex-col gap-10">
            <p className=" mb-1">Profile details:</p>
            <div className="flex w-full justify-center gap-20 ">
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
            <div className="flex w-full justify-center gap-20 ">
              <div className="flex flex-col gap-5  w-2/5">
                <div> Edu mail </div>
                <input
                  defaultValue={cookies.email}

                  type="text"
                  className="inputAddUser2  w-full"
                  value={email}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                class="w-[6rem]  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg px-5 py-2.5 mx-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Edit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default profile;
