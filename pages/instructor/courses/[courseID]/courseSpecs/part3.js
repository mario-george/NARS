import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { createRef, useRef, useState, useEffect } from "react";
import Cookies from "js-cookie";
import CustomReactToPdf from "@/pages/pdf2/pdf333";
import BloomTaxonomyInput from "@/pages/pdf2/taxonomy";
import { updateField } from "@/components/store/userSlice";

const part3 = ({ cookies }) => {
  const userState = useSelector((s) => s.user);

  if (userState.role != "instructor" || userState.loggedInStatus != "true") {
    return <div className="error">404 could not found</div>;
  }
  const { cognitiveDomainVerbs } = require("@/components/helpers/domainArrays");
  const { AffectiveDomainVerbs } = require("@/components/helpers/domainArrays");
  const {
    PsychomotorDomainVerbs,
  } = require("@/components/helpers/domainArrays");

  const courseSpecs = cookies.courseSpecs;
  useEffect(() => {
    const getData = async function () {
      const r = await fetch(
        `${process.env.url}api/v1/courses/created-courses/${courseID}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      const data = await r.json();
      console.log(data);
      try {
        // console.log(
        //   data.data.courseSpecs.courseLearningOutcomes[2].learningOutcomes
        // );

        setInputs3(
          data.data.courseSpecs.courseLearningOutcomes[2].learningOutcomes.map(
            (e) => {
              return {
                ref: createRef(),
                code: e.code,
                name: e.code,
                description: e.description,
              };
            }
          )
        );
        setInputs(
          data.data.courseSpecs.courseLearningOutcomes[0].learningOutcomes.map(
            (e) => {
              return {
                ref: createRef(),
                code: e.code,
                name: e.code,
                description: e.description,
              };
            }
          )
        );
        setInputs2(
          data.data.courseSpecs.courseLearningOutcomes[1].learningOutcomes.map(
            (e) => {
              return {
                ref: createRef(),
                code: e.code,
                name: e.code,
                description: e.description,
              };
            }
          )
        );
      } catch (e) {
        console.log(e);
      }
    };

    getData();
  }, []);

  const token = userState.token;

  const [isRunning, setIsRunning] = useState(true);
  const refToImgBlob = useRef();
  const buttonRef = useRef(null);
  function ChildComponent({ toPdf }) {
    const handleClick = async () => {
      try {
        console.log(toPdf);

        const pdfBlob = await toPdf();
        const reader = new FileReader();
        reader.readAsDataURL(pdfBlob);

        reader.onload = () => {
          const pdfBase64 = reader.result.split(",")[1];
          localStorage.setItem("pdf3", pdfBase64);
        };
        // do something with pdfBlob
      } catch (error) {
        console.error("Failed to capture PDF:", error);
      }
    };

    return (
      <>
        {" "}
        <button ref={buttonRef} onClick={handleClick} hidden>
          Capture as PDF
        </button>
      </>
    );
  }

  const removeLO2 = (e, input) => {
    e.preventDefault();
    setInputs2(
      inputs2.filter((e) => {
        return e != input;
      })
    );
  };
  const removeLO3 = (e, input) => {
    e.preventDefault();
    setInputs3(
      inputs3.filter((e) => {
        return e != input;
      })
    );
  };
  const removeLO1 = (e, input) => {
    e.preventDefault();
    setInputs(
      inputs.filter((e) => {
        return e != input;
      })
    );
  };
  const [inputs, setInputs] = useState([]);
  const [inputs2, setInputs2] = useState([]);
  const [inputs3, setInputs3] = useState([]);
  const handleAddInput = (e) => {
    e.preventDefault();
    console.log(inputs);
    setInputs([
      ...inputs,
      {
        ref: createRef(),
        counter: inputs2.length + inputs3.length + inputs.length + 1,
        code:
          "LO" +
          (inputs2.length + inputs3.length + inputs.length + 1).toString(),
        name:
          "LO" +
          (inputs2.length + inputs3.length + inputs.length + 1).toString(),
      },
    ]);
  };
  const handleAddInput2 = (e) => {
    e.preventDefault();
    console.log(inputs2);
    setInputs2([
      ...inputs2,
      {
        ref: createRef(),
        counter: inputs2.length + inputs3.length + inputs.length + 1,
        code:
          "LO" +
          (inputs2.length + inputs3.length + inputs.length + 1).toString(),
        name:
          "LO" +
          (inputs2.length + inputs3.length + inputs.length + 1).toString(),
      },
    ]);
  };
  const d = useDispatch();

  const handleAddInput3 = (e) => {
    e.preventDefault();

    setInputs3([
      ...inputs3,
      {
        ref: createRef(),
        counter: inputs2.length + inputs3.length + inputs.length + 1,
        code:
          "LO" +
          (inputs2.length + inputs3.length + inputs.length + 1).toString(),
        name:
          "LO" +
          (inputs2.length + inputs3.length + inputs.length + 1).toString(),
      },
    ]);
  };
  const handleSubmit = async (e) => {
    console.log(inputs);
    console.log("inp ref");
    const cognitive = inputs.map((input) => {
      return {
        description: input.ref.current.value,
        value: input.ref.current.value,
        counter: input.counter,
        code: input.name,
        name: input.name,
      };
    });
    const psychomotor = inputs2.map((input) => {
      return {
        description: input.ref.current.value,
        value: input.ref.current.value,
        counter: input.counter,
        code: input.name,
        name: input.name,
      };
    });
    const affective = inputs3.map((input) => {
      return {
        description: input.ref.current.value,
        value: input.ref.current.value,

        counter: input.counter,
        code: input.name,
        name: input.name,
      };
    });
    const courseLearningOutcomes = [
      {
        title: "cognitive",
        learningOutcomes: cognitive,
      },
      {
        title: "psychomotor",
        learningOutcomes: psychomotor,
      },
      {
        title: "affective",
        learningOutcomes: affective,
      },
    ];
    d(
      updateField({
        field: "courseLearningOutcomes",
        value: courseLearningOutcomes,
      })
    );
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
          Authorization: "Bearer " + token,
        },
      }
    );
    const resp = await r.json();
    console.log(resp);

    Cookies.set("courseLearningOutcomes", courseLearningOutcomes);

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
  const setIsRunningPromise = () => {
    return new Promise((resolve) => {
      setIsRunning(false);
      resolve();
    });
  };
  const submitHandler = async (e) => {
    await setIsRunningPromise();
    buttonRef.current.click();

    e.preventDefault();
    handleSubmit();

    setTimeout(() => {
      console.log("capturing");
      router.push(`/instructor/courses/${courseID}/courseSpecs/part4`);
    }, 1000);
  };

  return (
    <>
      <CustomReactToPdf targetRef={refToImgBlob} filename="part3.pdf">
        {({ toPdf }) => <ChildComponent toPdf={toPdf} />}
      </CustomReactToPdf>
      <form
        onSubmit={submitHandler}
        className="bg-sky-50 h-auto w-[80%] translate-x-[25%] flex flex-col justify-center items-center text-black ml-1  overflow-auto"
      >
        <div className="contentAddUserFlexible2 flex flex-col gap-10 ">
        <div
          className=" flex flex-col"
          ref={refToImgBlob}
        >
          <div className="flex gap-20 ">
            <div className="flex flex-col mb-[8rem] pb-[7rem] w-full ">
              <label class="label-form md:text-2xl  my-10">
                Learning Outcomes
              </label>
              <div class="flex  items-center justify-between text-lg text-gray-700 capitalize bg-gray-50 dark:bg-gray-700 dark:text-gray-400 my-10">
                <div>Cognitive Domain</div>
                {isRunning && (
                  <button
                    onClick={handleAddInput}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md"
                  >
                    Add
                  </button>
                )}
              </div>
              <div className=" ">
                {inputs.map((input, index) => {
                  console.log(input);
                  return (
                    <div className="flex items-center  space-x-8 relative">
                      <div>{input.code}</div>
                      {/* <input
                        key={index}
                        type="text"
                        placeholder={`LO ${input.counter}`}
                        ref={input.ref}
                        className="input-form w-1/2"
                      /> */}
                      <div className=" w-full ">
                        <BloomTaxonomyInput
                          className="BloomTax "
                          ref={input.ref}
                          key={index}
                          bloomVerbs={cognitiveDomainVerbs}
                          v={input.description}
                          placeholder={`LO ${input.counter}`}
                        />
                      </div>
                      {isRunning && (
                        <button
                          type="button"
                          onClick={(e) => removeLO1(e, input)}
                          className="ml-auto -mx-1.5 -mb-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
                          data-dismiss-target="#alert-border-2"
                          aria-label="Close"
                        >
                          <span className="sr-only">Dismiss</span>
                          <svg
                            aria-hidden="true"
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
              <div class="flex items-center   justify-between text-lg text-gray-700 capitalize bg-gray-50 dark:bg-gray-700 dark:text-gray-400 my-10">
                <div>Psychomotor Domain</div>
                {isRunning && (
                  <button
                    onClick={handleAddInput2}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md"
                  >
                    Add
                  </button>
                )}
              </div>
              <div className="">
                {inputs2.map((input, index) => {
                  {
                    console.log(input.description);
                  }

                  return (
                    <div className="flex items-center  space-x-8 relative ">
                      <div>{input.code}</div>
                      {/* <input
                        key={index}
                        type="text"
                        placeholder={`LO ${input.counter}`}
                        ref={input.ref}
                        className="input-form w-1/2"
                      /> */}
                      <BloomTaxonomyInput
                        className="input-form  "
                        ref={input.ref}
                        key={index}
                        bloomVerbs={PsychomotorDomainVerbs}
                        v={input.description}
                        placeholder={`LO ${input.counter}`}
                      />

                      {isRunning && (
                        <button
                          type="button"
                          onClick={(e) => removeLO2(e, input)}
                          className="ml-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
                          data-dismiss-target="#alert-border-2"
                          aria-label="Close"
                        >
                          <span className="sr-only">Dismiss</span>
                          <svg
                            aria-hidden="true"
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
              <div class="flex items-center  justify-between text-lg text-gray-700 capitalize bg-gray-50 dark:bg-gray-700 dark:text-gray-400 my-10">
                <div>Affective Domain</div>
                {isRunning && (
                  <button
                    onClick={handleAddInput3}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md"
                  >
                    Add
                  </button>
                )}
              </div>
              <div className="">
                {inputs3.map((input, index) => {
                  return (
                    <div className="flex items-center  space-x-8 relative">
                      <div>{input.code}</div>
                      {/* <input
                        key={index}
                        type="text"
                        placeholder={`LO ${input.counter}`}
                        ref={input.ref}
                        className="input-form w-1/2"
                      /> */}
                      <BloomTaxonomyInput
                        className="input-form  
                        "
                        ref={input.ref}
                        key={index}
                        v={input.description}
                        bloomVerbs={AffectiveDomainVerbs}
                        placeholder={`LO ${input.counter}`}
                      />

                      {isRunning && (
                        <button
                          type="button"
                          onClick={(e) => removeLO3(e, input)}
                          className="ml-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
                          data-dismiss-target="#alert-border-2"
                          aria-label="Close"
                        >
                          <span className="sr-only">Dismiss</span>
                          <svg
                            aria-hidden="true"
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
          <div className="flex justify-end ">
            <button
              type="submit"
              class="w-[6rem]  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg px-5 py-2.5 mx-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Next
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
export default part3;
