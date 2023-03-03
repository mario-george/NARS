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
  const handleAddInput = (e) => {
    e.preventDefault();

    setInputs([
      ...inputs,
      {
        ref: createRef(),
        counter: inputs2.length + inputs3.length + inputs.length + 1,
        name:
          "LO" +
          (inputs2.length + inputs3.length + inputs.length + 1).toString(),
      },
    ]);
  };
  const handleAddInput2 = (e) => {
    e.preventDefault();

    setInputs2([
      ...inputs2,
      {
        ref: createRef(),
        counter: inputs2.length + inputs3.length + inputs.length + 1,
        name:
          "LO" +
          (inputs2.length + inputs3.length + inputs.length + 1).toString(),
      },
    ]);
  };
  const handleAddInput3 = (e) => {
    e.preventDefault();

    setInputs3([
      ...inputs3,
      {
        ref: createRef(),
        counter: inputs2.length + inputs3.length + inputs.length + 1,
        name:
          "LO" +
          (inputs2.length + inputs3.length + inputs.length + 1).toString(),
      },
    ]);
  };
  const handleSubmit = async (e) => {
    const cognitive = inputs.map((input) => {
      return {
        value: input.ref.current.value,
        counter: input.counter,
        name: input.name,
      };
    });
    const psychomotor = inputs2.map((input) => {
      return {
        value: input.ref.current.value,
        counter: input.counter,
        name: input.name,
      };
    });
    const affective = inputs3.map((input) => {
      return {
        value: input.ref.current.value,
        counter: input.counter,
        name: input.name,
      };
    });
    const courseLearningOutcomes = [
      {
        title: "cognitive",
        learningOutcomes: [
          cognitive.map((e) => {
            return {
              code: e.name,
              description: e.value,
            };
          }),
        ],
      },
      {
        title: "psychomotor",
        learningOutcomes: [
          psychomotor.map((e) => {
            return {
              code: e.name,
              description: e.value,
            };
          }),
        ],
      },
      {
        title: "affective",
        learningOutcomes: [
          affective.map((e) => {
            return {
              code: e.name,
              description: e.value,
            };
          }),
        ],
      },
    ];
    const stringifiedCourseLearningOutcomes = JSON.stringify(
      courseLearningOutcomes
    );
    const r = await fetch(
      `${process.env.url}api/v1/courses/created-courses/${courseID}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          courseSpecs: {
            courseLearningOutcomes: courseLearningOutcomes,
          },
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + cookies.token,
        },
      }
    );
    const resp = await r.json();
    console.log(resp);

    Cookies.set("courseLearningOutcomes", stringifiedCourseLearningOutcomes);

    const stringifiedCognitive = JSON.stringify(cognitive);
    const stringifiedPsychomotor = JSON.stringify(psychomotor);
    const stringifiedAffective = JSON.stringify(affective);

    Cookies.set("cognitive", stringifiedCognitive);
    Cookies.set("psychomotor", stringifiedPsychomotor);
    Cookies.set("affective", stringifiedAffective);
    // console.log(cognitive);
    // console.log(psychomotor);
    // console.log(affective);
    console.log(courseLearningOutcomes);
  };

  const router = useRouter();
  const { courseID } = router.query;

  const submitHandler = async (e) => {
    e.preventDefault();
    handleSubmit();

    // window.location.href="/instructor/coursespecs/part4"
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
