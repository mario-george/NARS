import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { createRef, useRef, useState } from "react";
import Cookies from "js-cookie";
import InstructorDashboard from "@/components/InstructorDashboard";

const part3 = ({ cookies }) => {
  if (cookies.role != "instructor" || cookies.loggedInStatus != "true") {
    return <div className="error">404 could not found</div>;
  }
  const [inputs, setInputs] = useState([]);
  const [inputs2, setInputs2] = useState([]);
  const [inputs3, setInputs3] = useState([]);
  const handleAddInput = () => {
    setInputs([
      ...inputs,
      {
        ref: createRef(),
        counter: inputs2.length + inputs3.length + inputs.length + 1,
      },
    ]);
  };
  const handleAddInput2 = () => {
    setInputs2([
      ...inputs2,
      {
        ref: createRef(),
        counter: inputs2.length + inputs3.length + inputs.length + 1,
      },
    ]);
  };
  const handleAddInput3 = () => {
    setInputs3([
      ...inputs3,
      {
        ref: createRef(),
        counter: inputs2.length + inputs3.length + inputs.length + 1,
      },
    ]);
  };
  const handleSubmit = () => {
    const cognitive = inputs.map((input) => {
      return { value: input.ref.current.value, counter: input.counter };
    });
    const psychomotor = inputs2.map((input) => {
      return { value: input.ref.current.value, counter: input.counter };
    }); 
    const affective = inputs3.map((input) => {
      return { value: input.ref.current.value, counter: input.counter };
    });
    Cookies.set('cognitive',cognitive)
    Cookies.set('psychomotor',psychomotor)
    Cookies.set('affective',affective)
    console.log(cognitive);
    console.log(psychomotor);
    console.log(affective);
    // do something with the values
  };

  const router = useRouter();
  const submitHandler = async (e) => {
    e.preventDefault();
    handleSubmit();
    window.location.href="/instructor/coursespecs/part4"
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
            <div className="flex gap-20 ">
              <div className="flex flex-col space-y-1 w-full">
                <label class="label-form md:text-2xl font-bold">
                  Learning Outcomes
                </label>
                <div class="flex items-center justify-between text-lg text-gray-700 capitalize bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <div>Cognitive Domain</div>
                  <button
                    onClick={handleAddInput}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md"
                  >
                    Add
                  </button>
                </div>
                {inputs.map((input, index) => {
                  return (
                    <div className="flex items-center  space-x-8 ">
                      <div>LO{input.counter}</div>
                      <input
                        key={index}
                        type="text"
                        placeholder={`LO ${input.counter}`}
                        ref={input.ref}
                        className="input-form w-1/2"
                      />
                    </div>
                  );
                })}
                <div class="flex items-center justify-between text-lg text-gray-700 capitalize bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <div>Psychomotor Domain</div>
                  <button
                    onClick={handleAddInput2}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md"
                  >
                    Add
                  </button>
                </div>
                {inputs2.map((input, index) => {
                  return (
                    <div className="flex items-center  space-x-8 ">
                      <div>LO{input.counter}</div>
                      <input
                        key={index}
                        type="text"
                        placeholder={`LO ${input.counter}`}
                        ref={input.ref}
                        className="input-form w-1/2"
                      />
                    </div>
                  );
                })}
                <div class="flex items-center justify-between text-lg text-gray-700 capitalize bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <div>Affective Domain</div>
                  <button
                    onClick={handleAddInput3}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md"
                  >
                    Add
                  </button>
                </div>
                {inputs3.map((input, index) => {
                  return (
                    <div className="flex items-center  space-x-8 ">
                      <div>LO{input.counter }</div>
                      <input
                        key={index}
                        type="text"
                        placeholder={`LO ${input.counter }`}
                        ref={input.ref}
                        className="input-form w-1/2"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

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
export default part3;
