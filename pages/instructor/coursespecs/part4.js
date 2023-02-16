import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { createRef, useRef, useState } from "react";
import Cookies from "js-cookie";
import InstructorDashboard from "@/components/InstructorDashboard";

const part4 = ({ cookies }) => {
  const data = [{ competences: ["A1", "A2", "A3"] }];

  if (cookies.role != "instructor" || cookies.loggedInStatus != "true") {
    return <div className="error">404 could not found</div>;
  }

  //   const [inputs, setInputs] = useState([]);
  //   const [inputs2, setInputs2] = useState([]);
  //   const [inputs3, setInputs3] = useState([]);
  //   const handleAddInput = () => {
  //     setInputs([
  //       ...inputs,
  //       {
  //         ref: createRef(),
  //         counter: inputs2.length + inputs3.length + inputs.length + 1,
  //       },
  //     ]);
  //   };
  //   const handleAddInput2 = () => {
  //     setInputs2([
  //       ...inputs2,
  //       {
  //         ref: createRef(),
  //         counter: inputs2.length + inputs3.length + inputs.length + 1,
  //       },
  //     ]);
  //   };
  //   const handleAddInput3 = () => {
  //     setInputs3([
  //       ...inputs3,
  //       {
  //         ref: createRef(),
  //         counter: inputs2.length + inputs3.length + inputs.length + 1,
  //       },
  //     ]);
  //   };

  const router = useRouter();
  const submitHandler = async (e) => {
    e.preventDefault();
    // router.push("//instructor/coursespecs/part4");
  };
  return (
    <>
      <div className="flex flex-row w-screen h-screen mt-2">
        <InstructorDashboard />
        <form
          onSubmit={submitHandler}
          className="bg-sky-50 h-screen w-screen flex flex-col justify-center items-center text-black ml-1"
        >
          <div className="contentAddUser2 flex flex-col gap-10 overflow-auto">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 capitalize bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  
                  <tr>
                  <th>LO/Competences</th>
                  {data[0].competences.map((e) => {
                    return <th>{e}</th>;
                  })}
                  </tr>
                </thead>
                <tbody>
                  {/* {LOarr.map((e) => {
                    return e;
                  })} */}
                  {/* {rowArray.map((e, i) => {
                    return e;
                  })} */}
                  {/* {loArray.loArray.map((e, i) => {
                    return e;
                  })} */}
                </tbody>
              </table>

            <div className="flex justify-end">
              <button
                type="submit"
                class="w-[6rem]  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg px-5 py-2.5 mx-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Next
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default part4;
