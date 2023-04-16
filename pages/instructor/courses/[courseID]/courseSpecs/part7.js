import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { createRef, useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import cn from "classnames";
import CustomReactToPdf from "@/pages/pdf2/pdf333";

const part8 = ({ cookies }) => {
  const userState = useSelector((s) => s.user);

  if (userState.role != "instructor" || userState.loggedInStatus != "true") {
    return <div className="error">404 could not found</div>;
  }
  const token = userState.token;
  useEffect(() => {
    document.querySelector("body").classList.add("scrollbar-none");
  });
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
          localStorage.setItem("pdf7", pdfBase64);
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
  const competences = ["A1", "A2", "A3"];
  const router = useRouter();
  const { courseID } = router.query;
  const numCols = 10;
  let cognitive = Cookies.get("cognitive");
  let affective = Cookies.get("affective");
  let psychomotor = Cookies.get("psychomotor");
  const [arrays, setArrays] = useState({
    LO: [],
    LO2: [],
    LO3: [],
  });
  useEffect(() => {
    if (cognitive && affective && psychomotor) {
      try {
        congitiveParsed = JSON.parse(cognitive);
        psychomotorParsed = JSON.parse(psychomotor);
        affectiveParsed = JSON.parse(affective);
        courseLearningOutcomes = JSON.parse(cookies.courseLearningOutcomes);
        console.log(congitiveParsed);
        console.log(psychomotorParsed);
        console.log(affectiveParsed);

        setArrays((prevState) => ({
          LO: congitiveParsed,
          LO2: psychomotorParsed,
          LO3: affectiveParsed,
        }));
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
  }, []);
  let congitiveParsed;
  let psychomotorParsed;
  let affectiveParsed;
  let courseLearningOutcomes;
  let numRows = arrays.LO.length;
  let numRows2 = arrays.LO2.length;
  let numRows3 = arrays.LO3.length;
  const checkboxRefs = useRef(
    Array.from({ length: numRows }, () =>
      Array.from({ length: numCols }, () => false)
    )
  );
  const checkboxRefs2 = useRef(
    Array.from({ length: numRows2 }, () =>
      Array.from({ length: numCols }, () => false)
    )
  );
  const checkboxRefs3 = useRef(
    Array.from({ length: numRows3 }, () =>
      Array.from({ length: numCols }, () => false)
    )
  );

  const [tableData, setTableData] = useState(checkboxRefs.current);
  const [tableData2, setTableData2] = useState(checkboxRefs2.current);
  const [tableData3, setTableData3] = useState(checkboxRefs3.current);
  const tableHeader = [
    {
      colspan: 10,
      label: "Teaching and Learning Methods",
      className: "horizontal bg-sky-50",
    },
  ];
  const handleCheckboxChange = (rowIndex, colIndex) => {
    checkboxRefs.current[rowIndex][colIndex] =
      !checkboxRefs.current[rowIndex][colIndex];
  };
  const handleCheckboxChange2 = (rowIndex, colIndex) => {
    checkboxRefs2.current[rowIndex][colIndex] =
      !checkboxRefs2.current[rowIndex][colIndex];
  };
  const handleCheckboxChange3 = (rowIndex, colIndex) => {
    checkboxRefs3.current[rowIndex][colIndex] =
      !checkboxRefs3.current[rowIndex][colIndex];
  };

  const handleSubmit = async () => {
    let cp2;
    setTableData([...checkboxRefs.current]);
    setTableData2([...checkboxRefs2.current]);
    setTableData3([...checkboxRefs3.current]);
    let courseLearningOutcomes = Cookies.get("courseLearningOutcomes");
    if (courseLearningOutcomes) {
      try {
        let courseLearningOutcomesParsed = JSON.parse(
          cookies.courseLearningOutcomes
        );
        console.log(courseLearningOutcomesParsed);
        console.log(typeof courseLearningOutcomesParsed);

        console.log(courseLearningOutcomesParsed[0].title);

        let l1 = JSON.stringify(arrays.LO);
        let l2 = JSON.stringify(arrays.LO2);
        let l3 = JSON.stringify(arrays.LO3);

        let l1P = JSON.parse(l1);
        let l2P = JSON.parse(l2);
        let l3P = JSON.parse(l3);
        // console.log(l1P);
        // console.log(typeof l1P);

        // courseLearningOutcomes[0].learningOutcomes =[]
        cp2 = JSON.parse(courseLearningOutcomes);
        //         console.log(Array.isArray(cp2));
        //         console.log(Array.isArray(l1P));
        //         console.log(l1P.length);
        // console.log(l1P)

        if (courseLearningOutcomesParsed[0].title == "cognitive") {
          cp2[0].learningOutcomes = l1P.map((e, i) => {
            return {
              ...e,
              learningTeachingMethods: [...tableData33[0]].filter((e, k) => {
                return checkboxRefs.current[i][k];
                // if (checkboxRefs.current[i][k]) {
                //   return;
                // } else {
                //   return competences[k];
                // }
              }),
            };
          });
        }
        if (courseLearningOutcomesParsed[1].title == "psychomotor") {
          cp2[1].learningOutcomes = l2P.map((e, i) => {
            // console.log(e);
            return {
              ...e,
              learningTeachingMethods: [...tableData33[0]].filter((e, k) => {
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
        if (courseLearningOutcomesParsed[2].title == "affective") {
          cp2[2].learningOutcomes = l3P.map((e, i) => {
            // console.log(e);
            return {
              ...e,
              learningTeachingMethods: [...tableData33[0]].filter((e, k) => {
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
        const cp2Stringified = JSON.stringify(cp2);
        Cookies.set("courseLearningOutcomes", cp2Stringified);
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
  };

  const submitHandler = async (e) => {
    buttonRef.current.click();
    e.preventDefault();
    handleSubmit();

    // window.location.href="/instructor/coursespecs/part8"
    setTimeout(() => {
      // window.location.href = `/instructor/courses/${courseID}/courseSpecs/part8`;
      router.push(`/instructor/courses/${courseID}/courseSpecs/part8`);
    }, 1000);
  };
  const tableData22 = [
    [
      " Learning Outcomes",
      "Face-to-face Lecture",
      "Online Lectures",

      "Tutorial / Exercise",
      "Group Discussions",
      "Laboratory",
      "Self-Reading",
      "Presentation",
      "Collaborate Learning (Team Project)",
      "Research and Reporting",
      "Brain Storming ",
    ],
  ];
  const tableData33 = [
    [
      "face-to-face-lecture",
      "online-lecture",
      "tutorial-exercise",
      "group-discussions",
      "laboratory",
      "self-reading",
      "presentation",
      "team-project",
      "research-and-reporting",
      "brainstorming",
    ],
  ];
  return (
    <>
      <div className="flex flex-row w-screen h-auto mt-2">
        <CustomReactToPdf targetRef={refToImgBlob} filename="part7.pdf">
          {({ toPdf }) => <ChildComponent toPdf={toPdf} />}
        </CustomReactToPdf>
        <form
          onSubmit={submitHandler}
          className="bg-sky-50 h-screen w-[80%] translate-x-[25%] flex flex-col justify-center items-center text-black ml-1 scrollbar-none relative overflow-auto "
        >
          <div
            className="contentAddUser2 flex flex-col gap-1 mb-24 py-20 scrollbar-none "
            ref={refToImgBlob}
          >
            <table className="table-fixed border-collapse mb-[10rem]">
              <thead>
                <tr>
                  <th
                    className="border border-gray-500 border-b-gray-50 p-2"
                    rowSpan={2}
                  ></th>
                  {tableHeader.map((header, index) => (
                    <th
                      key={index}
                      className={cn({
                        border: true,
                        "border-gray-500": true,
                        "p-2": true,
                        [header.className]: true,
                        "text-center": true,
                      })}
                      rowSpan={header.rowspan}
                      colSpan={header.colspan}
                    >
                      {header.label}
                    </th>
                  ))}
                </tr>
                <tr className="border px-4 py-2"></tr>
                {tableData22.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className={`border border-gray-500 p-2 transistion-all  py-8 px-3${
                          cellIndex === 0
                            ? `text-right text-red-500 text-xl`
                            : ``
                        }`}
                        // className={cn({
                        //   border: true,
                        //   "border-gray-500": true,
                        //   "p-2": true,
                        //   vertical: true,
                        //   "text-right": cellIndex == 0,
                        //   "text-red-500": cellIndex == 0,
                        //   "text-xl": cellIndex == 0,
                        // })}
                      >
                        {/* {cell} */}
                        <div className="transform -rotate-90">{cell}</div>
                      </td>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                <tr className="w-full bg-sky-50">
                  <th className="border-l px-4 py-2 text-left border-gray-500 ">
                    Cognitive domain
                  </th>
                  <th
                    className=" bg-sky-50 border-r border-gray-500"
                    colSpan={10}
                  ></th>
                </tr>
                {Array.from({ length: numRows }).map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    <td className="border px-4 py-2 border-gray-500">
                      {" "}
                      {arrays.LO[rowIndex].name}
                    </td>
                    {Array.from({ length: numCols }).map((_, colIndex) => (
                      <td
                        className="border px-4 py-2 border-gray-500"
                        key={colIndex}
                      >
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-blue-600 custom-checkbox"
                            onChange={() =>
                              handleCheckboxChange(rowIndex, colIndex)
                            }
                          />
                        </label>
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="w-full bg-sky-50">
                  <th className="border-l px-4 py-2 text-left  border-gray-500">
                    Psychomotor domain
                  </th>
                  <th
                    className=" bg-sky-50 border-r border-gray-500"
                    colSpan={10}
                  ></th>
                </tr>
                {Array.from({ length: numRows2 }).map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    <td className="border px-4 py-2 border-gray-500">
                      {" "}
                      {arrays.LO2[rowIndex].name}
                    </td>
                    {Array.from({ length: numCols }).map((_, colIndex) => (
                      <td
                        className="border px-4 py-2 border-gray-500"
                        key={colIndex}
                      >
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-blue-600 custom-checkbox"
                            onChange={() =>
                              handleCheckboxChange2(rowIndex, colIndex)
                            }
                          />
                        </label>
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="w-full bg-sky-50">
                  <th className="border-l px-4 py-2 text-left border-gray-500 ">
                    Affective domain
                  </th>
                  <th
                    className=" bg-sky-50 border-r border-gray-500"
                    colSpan={10}
                  ></th>
                </tr>
                {Array.from({ length: numRows3 }).map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    <td className="border px-4 py-2 border-gray-500">
                      {" "}
                      {arrays.LO3[rowIndex].name}
                    </td>
                    {Array.from({ length: numCols }).map((_, colIndex) => (
                      <td
                        className="border px-4 py-2 border-gray-500"
                        key={colIndex}
                      >
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-blue-600 custom-checkbox"
                            onChange={() =>
                              handleCheckboxChange3(rowIndex, colIndex)
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

          <div className="flex w-full justify-end  absolute bottom-[9rem] right-[6rem]">
            <button
              type="submit"
              class="w-[6rem]  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg px-5 py-2.5 mx-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default part8;
