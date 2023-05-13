import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { createRef, useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import CustomReactToPdf from "@/pages/pdf2/pdf333";

const part4 = ({ cookies }) => {
  const [competences, setComp] = useState([]);

  const userState = useSelector((s) => s.user);

  if (userState.role != "instructor" || userState.loggedInStatus != "true") {
    return <div className="error">404 could not found</div>;
  }

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
      console.log(cookies.courseLearningOutcomes[0].learningOutcomes.length);
      console.log(cookies.courseLearningOutcomes[1].learningOutcomes.length);
      console.log(cookies.courseLearningOutcomes[2].learningOutcomes.length);
      console.log(competences.length);
      console.log(competences);
      const length1 = cookies.courseLearningOutcomes[0].learningOutcomes.length;
      const length2 = cookies.courseLearningOutcomes[1].learningOutcomes.length;
      const length3 = cookies.courseLearningOutcomes[2].learningOutcomes.length;

      try {
        checkboxRefs.current = Array.from({ length: length1 }, () =>
          Array.from({ length: competences.length }, () => false)
        );
        checkboxRefs2.current = Array.from({ length: length2 }, () =>
          Array.from({ length: competences.length }, () => false)
        );
        checkboxRefs3.current = Array.from({ length: length3 }, () =>
          Array.from({ length: competences.length }, () => false)
        );
        setTableData([...checkboxRefs.current]);

        setTableData2([...checkboxRefs2.current]);

        setTableData3([...checkboxRefs3.current]);

   
        console.log(
          data.data.courseSpecs.courseLearningOutcomes[0].learningOutcomes[0]
            .mappedCompetence
        );
        for (let i = 0; i < length1; i++) {
          const mc =
            data.data.courseSpecs.courseLearningOutcomes[0].learningOutcomes[i]
              .mappedCompetence;
          console.log(
            data.data.courseSpecs.courseLearningOutcomes[0].learningOutcomes[i]
              .mappedCompetence
          );
          for (let j = 0; j < mc.length; j++) {
            const ind = competences.indexOf(mc[j]);
            checkboxRefs.current[i][ind] = !checkboxRefs.current[i][ind];
            setTableData([...checkboxRefs.current]);

          }
          for (
            let j = 0;
            j <
            data.data.courseSpecs.lecturePlan.topics[0].learningOutcomes.length;
            j++
          ) {
            if (
              data.data.courseSpecs.lecturePlan.topics[i]?.learningOutcomes[
                j
              ] != null
            ) {
              checkboxRefs.current[i][j] = true;
            }
          }
        }
        for (let i = 0; i < length2; i++) {
          const mc =
            data.data.courseSpecs.courseLearningOutcomes[1].learningOutcomes[i]
              .mappedCompetence;
       
          for (let j = 0; j < mc.length; j++) {
            const ind = competences.indexOf(mc[j]);
            checkboxRefs2.current[i][ind] = !checkboxRefs2.current[i][ind];
            setTableData2([...checkboxRefs2.current]);

          }
          for (
            let j = 0;
            j <
            data.data.courseSpecs.lecturePlan.topics[0].learningOutcomes.length;
            j++
          ) {
            if (
              data.data.courseSpecs.lecturePlan.topics[i]?.learningOutcomes[
                j
              ] != null
            ) {
              checkboxRefs.current[i][j] = true;
            }
          }
        }
        for (let i = 0; i < length3; i++) {
          const mc =
            data.data.courseSpecs.courseLearningOutcomes[2].learningOutcomes[i]
              .mappedCompetence;
        
          for (let j = 0; j < mc.length; j++) {
            const ind = competences.indexOf(mc[j]);
            checkboxRefs3.current[i][ind] = !checkboxRefs3.current[i][ind];
            setTableData3([...checkboxRefs3.current]);

          }
          for (
            let j = 0;
            j <
            data.data.courseSpecs.lecturePlan.topics[0].learningOutcomes.length;
            j++
          ) {
            if (
              data.data.courseSpecs.lecturePlan.topics[i]?.learningOutcomes[
                j
              ] != null
            ) {
              checkboxRefs.current[i][j] = true;
            }
          }
        }
        console.log(checkboxRefs.current[0]);
      } catch (e) {
        console.log(e);
      }
    };

    getData();
  }, [competences]);
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
          localStorage.setItem("pdf4", pdfBase64);
        };
        // do something with pdfBlob
      } catch (error) {
        console.error("Failed to capture PDF:", error);
      }
      setTimeout(() => {
        setIsRunning(false);
      }, 300);
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
  const router = useRouter();
  useEffect(() => {
    document.querySelector("body").classList.add("scrollbar-none");
  });
  const closeMsg = () => {
    setMsg("");
  };
  const [msg, setMsg] = useState("");
  let fail = (
    <div
      id="alert-border-2"
      className="flex p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800"
      role="alert"
    >
      <i className="fa-sharp fa-solid fa-circle-exclamation"></i>
      <div className="ml-3 text-sm font-medium">
        Competences is not met. please review the entered data
        <a href="#" className="font-semibold underline hover:no-underline"></a>.
      </div>
      <button
        type="button"
        onClick={closeMsg}
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
    </div>
  );

  let success = (
    <div
      id="alert-border-3"
      className="flex p-4 mb-4 text-green-800 border-t-4 border-green-300 bg-green-50 dark:text-green-400 dark:bg-gray-800 dark:border-green-800"
      role="alert"
    >
      <i className="fa-solid fa-circle-check"></i>
      <div className="ml-3 text-sm font-medium">
        Competences has been achieved successfully!
        <a href="#" className="font-semibold underline hover:no-underline"></a>
      </div>
      <button
        onClick={closeMsg}
        type="button"
        className="ml-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700"
        data-dismiss-target="#alert-border-3"
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
    </div>
  );
  const { courseID } = router.query;
  console.log(cookies.courseLearningOutcomes);

  // const competences = ["A1", "A2", "A3"];
  const getComp = async () => {
    const resp = await fetch(
      `${process.env.url}api/v1/courses/created-courses/${courseID}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    const data = await resp.json();
    const createdCourse = data.data;
    const c = createdCourse.course.competences;
    console.log(c);
    let comp = [];
    c.map((e) => {
      comp.push(e.code);
    });
    console.log(comp);

    setComp(comp);
    console.log(competences);
    console.log(competences.length);
    return comp;
  };

  let cognitive = cookies.courseLearningOutcomes[0].learningOutcomes;
  let affective = cookies.courseLearningOutcomes[2].learningOutcomes;
  let psychomotor = cookies.courseLearningOutcomes[1].learningOutcomes;
  console.log(cognitive);
  const [arrays, setArrays] = useState({
    LO: [],
    LO2: [],
    LO3: [],
  });
  // let congitiveParsed=JSON.parse(cognitive)
  // let psychomotorParsed=JSON.parse(psychomotor)
  // let affectiveParsed=JSON.parse(affective)
  let congitiveParsed;
  let psychomotorParsed;
  let affectiveParsed;
  let courseLearningOutcomes;

  useEffect(() => {
    getComp();
    if (cognitive && affective && psychomotor) {
      try {
        congitiveParsed = cognitive;
        psychomotorParsed = psychomotor;
        affectiveParsed = affective;
        courseLearningOutcomes = cookies.courseLearningOutcomes;
        console.log(congitiveParsed);
        console.log(psychomotorParsed);
        console.log(affectiveParsed);

        setArrays((prevState) => ({
          LO: congitiveParsed,
          LO2: psychomotorParsed,
          LO3: affectiveParsed,
        }));
        numCols = competences.length;
        numRows = congitiveParsed.length;
        numRows2 = psychomotorParsed.length;
        numRows3 = affectiveParsed.length;
        checkboxRefs.current = Array.from({ length: numRows }, () =>
          Array.from({ length: numCols }, () => false)
        );

        checkboxRefs3.current = Array.from({ length: numRows3 }, () =>
          Array.from({ length: numCols }, () => false)
        );

        checkboxRefs2.current = Array.from({ length: numRows2 }, () =>
          Array.from({ length: numCols }, () => false)
        );
      } catch (error) {
        console.error(`Error parsing cookie: ${error}`);
      }
    } else {
      console.error("Cookie not found");
    }
    // getComp();
  }, []);

  // console.log(affectiveParsed)
  // console.log(psychomotorParsed)
  // console.log(congitiveParsed)
  // let cognitiveMap = cognitive.map(e=>{
  //   return{name:e.name}
  // })

  // let psychomotorMap = psychomotor?.map(e=>{
  //   return `${e.name}`
  // })
  let affectiveMap;
  let a;
  let b = [];

  // const LO = ["LO1", "LO2"];
  // const LO2 = ["LO3", "LO4"];
  // const LO3 = [];
  let numCols = competences.length;
  let numRows = arrays.LO.length;
  let numRows2 = arrays.LO2.length;
  let numRows3 = arrays.LO3.length;
  let checkboxRefs = useRef(
    Array.from({ length: arrays.LO.length }, () =>
      Array.from({ length: numCols }, () => false)
    )
  );
  let checkboxRefs2 = useRef(
    Array.from({ length: arrays.LO2.length }, () =>
      Array.from({ length: numCols }, () => false)
    )
  );
  let checkboxRefs3 = useRef(
    Array.from({ length: arrays.LO3.length }, () =>
      Array.from({ length: numCols }, () => false)
    )
  );

  // let [done,setDone]=useState(false)
  // if (typeof affective !== 'undefined') {
  //   a = JSON.parse(affective);
  //   console.log(a)
  //   console.log(typeof a)

  //    affectiveMap = a.map((e)=>{
  //     LO3.push(e.name)
  //   })

  //   console.log(affectiveMap )
  //   setDone(true)
  // }

  const [tableData, setTableData] = useState(checkboxRefs.current);
  const [tableData2, setTableData2] = useState(checkboxRefs2.current);
  const [tableData3, setTableData3] = useState(checkboxRefs3.current);

  const handleCheckboxChange = (rowIndex, colIndex) => {
    checkboxRefs.current[rowIndex][colIndex] =
      !checkboxRefs.current[rowIndex][colIndex];
    setTableData([...checkboxRefs.current]);
  };
  const handleCheckboxChange2 = (rowIndex, colIndex) => {
    checkboxRefs2.current[rowIndex][colIndex] =
      !checkboxRefs2.current[rowIndex][colIndex];
    setTableData2([...checkboxRefs2.current]);
  };
  const handleCheckboxChange3 = (rowIndex, colIndex) => {
    checkboxRefs3.current[rowIndex][colIndex] =
      !checkboxRefs3.current[rowIndex][colIndex];
    setTableData3([...checkboxRefs3.current]);
  };

  const handleSubmit = async () => {
    let combined;
    setTableData([...checkboxRefs.current]);
    setTableData2([...checkboxRefs2.current]);
    setTableData3([...checkboxRefs3.current]);
    let courseLearningOutcomes = cookies.courseLearningOutcomes;
    let cp2;
    if (courseLearningOutcomes) {
      try {
        let courseLearningOutcomesParsed = cookies.courseLearningOutcomes;
        console.log(courseLearningOutcomesParsed);
        console.log(typeof courseLearningOutcomesParsed);

        console.log(courseLearningOutcomesParsed[0].title);

        let l1P = cookies.courseLearningOutcomes[0].learningOutcomes;
        let l2P = cookies.courseLearningOutcomes[1].learningOutcomes;
        let l3P = cookies.courseLearningOutcomes[2].learningOutcomes;
        // console.log(l1P);
        // console.log(typeof l1P);
        l1P.map((e, k) => {
          console.log("dfhgsdfhswftreyhewarhgeg");
        });
        // courseLearningOutcomes[0].learningOutcomes =[]
        cp2 = JSON.parse(JSON.stringify(courseLearningOutcomes));
        //         console.log(Array.isArray(cp2));
        //         console.log(Array.isArray(l1P));
        //         console.log(l1P.length);
        // console.log(l1P)

        if (cookies.courseLearningOutcomes[0].title == "cognitive") {
          cp2[0].learningOutcomes = l1P.map((e, i) => {
            console.log(e);
            return {
              ...e,
              mappedCompetence: competences.filter((e, k) => {
                return checkboxRefs.current[i][k];
              }),
            };
          });
        }
        if (courseLearningOutcomesParsed[1].title == "psychomotor") {
          cp2[1].learningOutcomes = l2P.map((e, i) => {
            // console.log(e);
            return {
              ...e,
              mappedCompetence: [...competences].filter((e, k) => {
                return checkboxRefs2.current[i][k];
                // if (checkboxRefs.current[i][k]) {
                //   return;
                // } else {
                //   return competences[k];
                // }
              }),
            };
          });
        }
        if (cookies.courseLearningOutcomes[2].title == "affective") {
          cp2[2].learningOutcomes = l3P.map((e, i) => {
            // console.log(e);
            return {
              ...e,
              mappedCompetence: [...competences].filter((e, k) => {
                return checkboxRefs3.current[i][k];
                // if (checkboxRefs.current[i][k]) {
                //   return;
                // } else {
                //   return competences[k];
                // }
              }),
            };
          });
        }
        console.log(cp2[0]);
        console.log(cp2[1]);
        console.log(cp2[2]);
        console.log(cp2);

        combined = [];
        console.log(cp2[2].learningOutcomes);
        cp2[2].learningOutcomes[0].mappedCompetence.map((e) => {
          combined.push(e);
        });
        cp2[0].learningOutcomes[0].mappedCompetence.map((e) => {
          combined.push(e);
        });
        cp2[1].learningOutcomes[0].mappedCompetence.map((e) => {
          combined.push(e);
        });

        function removeDuplicates(array) {
          return array.filter((item, index) => array.indexOf(item) === index);
        }
        combined = removeDuplicates(combined);

        console.log(combined);
        const cm = competences.map((e) => {
          return { code: e };
        });
        console.log(cm);
        const resp = await fetch(
          `${process.env.url}api/v1/courses/checkComp/${courseID}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + token,
            },
            body: JSON.stringify({ competences: cm }),
          }
        );
        const data = await resp.json();
        console.log(combined);

        console.log(data);
        if (data.status === "success") {
          setMsg(success);
          // window.location.href = `/instructor/courses/${courseID}/courseSpecs/part5`;
          router.push(`/instructor/courses/${courseID}/courseSpecs/part5`);
        } else {
          setMsg(fail);
        }
      } catch (error) {
        console.error(`Error parsing cookie: ${error}`);
      }
    } else {
      console.error("Cookie not found");
    }
    const r = await fetch(
      `${process.env.url}api/v1/courses/created-courses/${courseID}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          courseSpecs: {
            courseLearningOutcomes: cp2,
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
    console.log("cognitive");
    console.log(tableData);
    console.log("psychomotor");
    console.log(tableData2);
    console.log("affective");
    console.log(tableData3);
  };

  const submitHandler = async (e) => {
    buttonRef.current.click();
    e.preventDefault();
    handleSubmit();
    // window.location.href="/instructor/coursespecs/part5"
  };
  // affective ? (a = Object.entries(JSON.parse(affective))) : null;
  // affective ? (console.log(Object.entries(JSON.parse(affective)))) : null;
  // affective
  //   ? a.map((e) => {
  //       e.map((el2, key) => {
  //         if (key == 0) {
  //           return;
  //         } else {
  //           return b.push(el2.name);
  //         }
  //       });
  //     })
  //   : null;
  return (
    <>
      <div className="flex flex-row w-screen h-auto">
        <CustomReactToPdf targetRef={refToImgBlob} filename="part4.pdf">
          {({ toPdf }) => <ChildComponent toPdf={toPdf} />}
        </CustomReactToPdf>
        <form
          onSubmit={submitHandler}
          className="bg-sky-50 h-screen w-[80%] translate-x-[25%] flex flex-col justify-center items-center text-black ml-1 scrollbar-none relative"
        >
          <div className="contentAddUser2">
          <div className=" flex flex-col" ref={refToImgBlob}>
            <table className="table-auto my-8">
              <thead>
                <tr>
                  <th className="border-2 px-4 py-2">LO/Competences</th>
                  {competences.map((e, i) => (
                    <th key={i} className="border-2 px-4 py-2">
                      {e}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="w-full bg-sky-50">
                  <th className="border-l px-4 py-2 text-left ">
                    Cognitive domain
                  </th>
                  <th className=" bg-sky-50"></th>
                  <th className=" "></th>
                  <th className=" border-r"></th>
                </tr>
                {Array.from({ length: numRows }).map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    <td className="border-2 px-4 py-2">
                      {" "}
                      {arrays.LO[rowIndex].name}
                    </td>
                    {Array.from({ length: numCols }).map((_, colIndex) => (
                      <td className="border-2 px-4 py-2" key={colIndex}>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-blue-600 custom-checkbox"
                            onChange={() =>
                              handleCheckboxChange(rowIndex, colIndex)
                            }
                            checked={
                              checkboxRefs.current[rowIndex]?.[colIndex] ===
                              true
                            }
                          />
                        </label>
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="w-full bg-sky-50">
                  <th className="border-l px-4 py-2 text-left ">
                    Psychomotor domain
                  </th>
                  <th className=" bg-sky-50"></th>
                  <th className=" "></th>
                  <th className=" border-r"></th>
                </tr>
                {Array.from({ length: numRows2 }).map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    <td className="border-2 px-4 py-2">
                      {" "}
                      {arrays.LO2[rowIndex].name}
                    </td>
                    {Array.from({ length: numCols }).map((_, colIndex) => (
                      <td className="border-2 px-4 py-2" key={colIndex}>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-blue-600 custom-checkbox"
                            onChange={() =>
                              handleCheckboxChange2(rowIndex, colIndex)
                            }
                            checked={
                              checkboxRefs2.current[rowIndex]?.[colIndex] ===
                              true
                            }
                          />
                        </label>
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="w-full bg-sky-50">
                  <th className="border-l px-4 py-2 text-left ">
                    Affective domain
                  </th>
                  <th className=" bg-sky-50"></th>
                  <th className=" "></th>
                  <th className=" border-r"></th>
                </tr>
                {Array.from({ length: numRows3 }).map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    <td className="border-2 px-4 py-2">
                      {" "}
                      {arrays.LO3[rowIndex].name}
                    </td>
                    {Array.from({ length: numCols }).map((_, colIndex) => (
                      <td className="border-2 px-4 py-2" key={colIndex}>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-blue-600 custom-checkbox"
                            onChange={() =>
                              handleCheckboxChange3(rowIndex, colIndex)
                            }
                            checked={
                              checkboxRefs3.current[rowIndex]?.[colIndex] ===
                              true
                            }
                          />
                        </label>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between">
            <div>{msg}</div>
            <div className="flex justify-end">
              <button
                type="submit"
                class="w-[6rem]  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg px-5 py-2.5 mx-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Next
              </button>
            </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

// export async function getServerSideProps(context) {
//   let cookies = context.req.cookies;
//   let LO33 = [];
//   let cognitive = Cookies.get("cognitive");
//   let affective = Cookies.get("affective");
//   let psychomotor = Cookies.get("psychomotor");

// let congitiveParsed=JSON.parse(cognitive)
// let psychomotorParsed=JSON.parse(psychomotor)
// let affectiveParsed=JSON.parse(affective)

//   let a;
//   let b=[]
//   affective ? (a = Object.entries(JSON.parse(affective))) : null;
//   affective ? (console.log(Object.entries(JSON.parse(affective)))) : null;
//   affective
//     ? a.map((e) => {
//         e.map((el2, key) => {
//           if (key == 0) {
//             return;
//           } else {
//             return b.push(el2.name);
//           }
//         });
//       })
//     : null;
//   return {
//     props: {
//       LO33:b,
//     },
//   };
// }
export default part4;
