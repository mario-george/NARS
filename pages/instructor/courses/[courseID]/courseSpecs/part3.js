import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { createRef, useRef, useState, useEffect } from "react";
import Cookies from "js-cookie";
import InstructorDashboard from "@/components/InstructorDashboard";
import CustomReactToPdf from "@/pages/pdf2/pdf333";
import BloomTaxonomyInput from "@/pages/pdf2/taxonomy";
import { updateField } from "@/components/store/userSlice";

const part3 = ({ cookies }) => {
  const userState= useSelector(s=>s.user)

  if (userState.role != "instructor" || userState.loggedInStatus != "true") {
    return <div className="error">404 could not found</div>;
  }
  const token = userState.token
  const cognitiveDomainVerbs = [
    'add', 'acquire', 'analyze', 'abstract', 'appraise',
    'define', 'approximate', 'adapt', 'audit', 'animate', 'assess',
    'describe', 'articulate', 'allocate', 'blueprint', 'arrange', 'compare',
    'draw', 'associate', 'alphabetize', 'breadboard', 'assemble', 'conclude',
    'enumerate', 'characterize', 'apply', 'break down', 'budget', 'contrast',
    'identify', 'clarify', 'ascertain', 'characterize', 'categorize', 'counsel',
    'index', 'classify', 'assign', 'classify', 'code', 'criticize',
    'Indicate', 'compare', 'attain', 'compare', 'combine', 'critique',
    'label', 'compute', 'avoid', 'confirm', 'compile', 'defend',
    'list', 'contrast', 'back up', 'contrast', 'compose', 'determine',
    'match', 'convert', 'calculate', 'correlate', 'construct', 'discriminate',
    'meet', 'defend', 'capture', 'detect', 'cope', 'estimate',
    'name', 'describe', 'change', 'diagnose', 'correspond', 'evaluate',
    'outline', 'detail', 'classify', 'diagram', 'create', 'explain',
    'point', 'differentiate', 'complete', 'differentiate', 'cultivate', 'grade',
    'quote', 'discuss', 'compute', 'discriminate', 'debug', 'hire',
    'read', 'distinguish', 'construct', 'dissect', 'depict', 'interpret',
    'recall', 'elaborate', 'customize', 'distinguish', 'design', 'judge',
    'recite', 'estimate', 'demonstrate', 'document', 'develop', 'justify',
    'recognize', 'example', 'depreciate', 'ensure', 'devise', 'measure',
    'record', 'explain', 'derive', 'examine', 'dictate', 'predict',
    'repeat', 'express', 'determine', 'explain', 'enhance', 'prescribe',
    'reproduce', 'extend', 'diminish', 'explore', 'explain', 'rank',
    'review', 'extrapolate', 'discover', 'figure out', 'facilitate', 'rate',
    'select', 'factor', 'draw', 'file', 'format', 'recommend',
    'state', 'generalize', 'employ', 'group', 'formulate', 'release',
    'study', 'give', 'examine', 'identify', 'generalize', 'select',
    'tabulate', 'infer', 'exercise', 'illustrate', 'generate', 'summarize',
    'trace', 'interact', 'explore', 'infer', 'handle', 'support',
    'write', 'interpolate', 'expose', 'interrupt', 'import', 'test',
    'interpret', 'express', 'inventory', 'improve', 'validate',
    'observe', 'factor', 'investigate', 'incorporate', 'verify',
    'paraphrase', 'figure', 'lay out', 'integrate',
    'picture', 'graphically', 'graph', 'manage', 'interface',
    'predict', 'handle', 'maximize', 'join',
    'review', 'illustrate', 'minimize', 'lecture',
    'rewrite', 'interconvert', 'optimize', 'model',
    'subtract', 'investigate', 'order', 'modify',
    'summarize', 'manipulate', 'outline', 'network',
    'translate', 'modify', 'point out', 'organize',
    'visualize', 'operate', 'prioritize', 'outline',
    'personalize', 'proofread', 'overhaul',
    'plot', 'query', 'plan',
    'practice', 'relate', 'portray',
    'predict', 'select', 'prepare',
    'prepare', 'separate', 'prescribe',
    'price', 'size up', 'produce',
    'process', 'subdivide', 'program',
    'produce', 'train', 'rearrange',
    'project', 'transform', 'reconstruct',
    'protect', 'refer',
    'provide', 'relate',
    'relate', 'reorganize',
    'round off', 'revise',
    'sequence', 'rewrite',
    'show', 'specify',
    'simulate', 'summarize',
    'sketch', 'write',
    'solve', 'subscribe',
    'tabulate', 'transcribe',
    'translate', 'use'
  ];

  const PsychomotorDomainVerbs = [
    'activate', 'adjust', 'align', 'apply', 'arrange', 'assemble', 'balance',
    'break down', 'build', 'calibrate', 'change', 'clean', 'close', 'combine',
    'compose', 'connect', 'construct', 'design', 'dismantle', 'drill', 'fasten',
    'fix', 'follow', 'grip', 'grind', 'hammer', 'heat', 'hook', 'identify',
    'load', 'locate', 'loosen', 'make', 'manipulate', 'mend', 'mix', 'nail',
    'operate', 'paint', 'press', 'produce', 'pull', 'push', 'remove', 'replace',
    'rotate', 'sand', 'saw', 'sew', 'set', 'sharpen', 'start', 'stir', 'transfer',
    'tune', 'type', 'use', 'weigh', 'wrap'
  ];

  const AffectiveDomainVerbs = [
    'Receiving',
    'Responding',
    'Valuing',
    'Organization',
    'Internalizing',
    'ask',
    'accept responsibility',
    'associate with',
    'adhere to',
    'act',
    'choose',
    'answer',
    'assume responsibility',
    'alter',
    'change behavior',
    'follow',
    'assist',
    'believe in',
    'arrange',
    'develop code of behavior',
    'give',
    'comply',
    'be convinced',
    'classify',
    'develop philosophy',
    'hold',
    'conform',
    'complete',
    'combine',
    'influence',
    'select',
    'enjoy',
    'describe',
    'defend',
    'judge problems/issues',
    'show interest',
    'greet',
    'differentiate',
    'establish',
    'listen',
    'help',
    'have faith in',
    'form judgments',
    'propose',
    'obey',
    'initiate',
    'identify with',
    'qualify',
    'perform',
    'invite',
    'integrate',
    'question',
    'practice',
    'join',
    'organize',
    'serve',
    'present',
    'justify',
    'weigh alternatives',
    'show mature attitude',
    'report',
    'participate',
    'solve',
    'select',
    'propose',
    'verify',
    'tell',
    'select',
    'share',
    'subscribe to',
    'work'
  ];

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
    console.log(inputs2);
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
  const d = useDispatch()

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

    Cookies.set("courseLearningOutcomes", stringifiedCourseLearningOutcomes);
    d(updateField({field:"courseLearningOutcomes",value:stringifiedCourseLearningOutcomes}))

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
    buttonRef.current.click()

    e.preventDefault();
    handleSubmit();

    // window.location.href="/instructor/coursespecs/part4"
    setTimeout(() => {
      console.log('capturing')
      // window.location.href = `/instructor/courses/${courseID}/courseSpecs/part4`;
    router.push(`/instructor/courses/${courseID}/courseSpecs/part4`);

    }, 1000)
  };

  return (
    <>
      <div className="flex flex-row w-screen h-screen mt-2">
        <InstructorDashboard />
        <CustomReactToPdf targetRef={refToImgBlob} filename="part3.pdf">
          {({ toPdf }) => <ChildComponent toPdf={toPdf} />}
        </CustomReactToPdf>
        <form
          onSubmit={submitHandler}
          className="bg-sky-50 h-screen w-screen flex flex-col justify-center items-center text-black ml-1 rounded-2xl overflow-auto"
        >
          <div className="contentAddUser2 flex flex-col gap-10 mt-[5rem] mb-[20rem] py-[8rem] " ref={refToImgBlob} >
            <div className="flex gap-20 ">
              <div className="flex flex-col space-y-[2rem] mb-[5rem] w-full">
                <label class="label-form md:text-2xl  my-10">
                  Learning Outcomes
                </label>
                <div class="flex space-y-[1rem] items-center justify-between text-lg text-gray-700 capitalize bg-gray-50 dark:bg-gray-700 dark:text-gray-400 my-10">
                  <div>Cognitive Domain</div>
                  {isRunning &&

                    <button
                      onClick={handleAddInput}
                      className="bg-blue-500 text-white py-2 px-4 rounded-md"
                    >
                      Add
                    </button>
                  }
                </div>
                <div className="space-y-[.5rem] ">

                  {inputs.map((input, index) => {
                    return (
                      <div className="flex items-center  space-x-8 relative">
                        <div>LO{input.counter}</div>
                        {/* <input
                        key={index}
                        type="text"
                        placeholder={`LO ${input.counter}`}
                        ref={input.ref}
                        className="input-form w-1/2"
                      /> */}
                        <div className="space-y-[.5rem] w-full ">

                          <BloomTaxonomyInput className="input-form  space-y-[.5rem]" ref={input.ref} key={index} bloomVerbs={cognitiveDomainVerbs} placeholder={`LO ${input.counter}`} />
                        </div>
                        {isRunning &&
                          <button
                            type="button"
                            onClick={(e) => removeLO1(e, input)}
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
                        }
                      </div>
                    );
                  })}
                </div>
                <div class="flex items-center justify-between text-lg text-gray-700 capitalize bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <div>Psychomotor Domain</div>
                  {isRunning &&


                    <button
                      onClick={handleAddInput2}
                      className="bg-blue-500 text-white py-2 px-4 rounded-md"
                    >
                      Add
                    </button>
                  }

                </div>
                <div className="space-y-[.5rem]">


                  {inputs2.map((input, index) => {
                    return (
                      <div className="flex items-center  space-x-8 relative">
                        <div>LO{input.counter}</div>
                        {/* <input
                        key={index}
                        type="text"
                        placeholder={`LO ${input.counter}`}
                        ref={input.ref}
                        className="input-form w-1/2"
                      /> */}
                        <BloomTaxonomyInput className="input-form  space-y-[.5rem]" ref={input.ref} key={index} bloomVerbs={PsychomotorDomainVerbs} placeholder={`LO ${input.counter}`} />

                        {isRunning &&
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
                        }
                      </div>
                    );
                  })}
                </div>
                <div class="flex items-center justify-between text-lg text-gray-700 capitalize bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <div>Affective Domain</div>
                  {isRunning &&

                    <button
                      onClick={handleAddInput3}
                      className="bg-blue-500 text-white py-2 px-4 rounded-md"
                    >
                      Add
                    </button>
                  }

                </div>
                <div className="space-y-[.5rem]">

                  {inputs3.map((input, index) => {
                    return (
                      <div className="flex items-center  space-x-8 relative">
                        <div>LO{input.counter}</div>
                        {/* <input
                        key={index}
                        type="text"
                        placeholder={`LO ${input.counter}`}
                        ref={input.ref}
                        className="input-form w-1/2"
                      /> */}
                        <BloomTaxonomyInput className="input-form  space-y-[.5rem]" ref={input.ref} key={index} bloomVerbs={AffectiveDomainVerbs} placeholder={`LO ${input.counter}`} />

                        {isRunning &&
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
                        }
                      </div>
                    );
                  })}
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
      </div>
    </>
  );
};
export default part3;
