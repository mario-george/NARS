import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import React from "react";
import ProgramAdminDashboard from "@/components/ProgramAdminDashboard";
const assignprogramqualitycoordinator = () => {
  const router = useRouter();
  const pro = useSelector((s) => s.data.programs);

  const submitHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="flex flex-row w-screen h-screen mt-2">
        <ProgramAdminDashboard />
        <form
          onSubmit={submitHandler}
          className="bg-sky-50 h-screen w-screen flex flex-col justify-center items-center text-black ml-1"
        >
          <div className="contentAddUser2 flex flex-col gap-10">
            <p className="font-normal mb-10">
              Programs {">"} Assign program quality coordinator{" "}
            </p>
            <div className="flex gap-20 ">
              <div className="flex flex-col gap-5 w-1/3">
                <div>Program</div>
                <select
                  id="small"
                  class="block w-full text-xl md:text-lg p-3   text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                >
                  <option selected>Choose a program</option>
                  {/*pro.map((i) => {
                                        <option value={i}>{i}</option>
                                    })*/}
                </select>
              </div>
              <div className="flex flex-col gap-5  w-2/5">
                <div>Program quality coordinator ID</div>
                <input type="text" className="inputAddUser2  w-full" />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                class="w-[6rem]  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg px-5 py-2.5 mx-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Assign
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default assignprogramqualitycoordinator;
