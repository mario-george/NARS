import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { createRef, useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import cn from "classnames";
import CustomReactToPdf from "@/pages/pdf2/pdf333";
import { updateField } from "@/components/store/userSlice";
import { getErrorField } from "./errorField";
const useAssessment = ({ courseID, hasClass }) => {
  const userState = useSelector((s) => s.user);
  const [invalid, setInvalid] = useState(false);
  const getInvalidData = (boolean) => {
    setInvalid(boolean);
  };
  const refArray = [
    "written-exams",
    "online-exams",
    "lab-exams",
    "pop-quizzes",
    "in-class-problem-solving",
    "take-home-exam",
    "research-assignments",
    "reporting-assignments",
    "project-assignments",
    "in-class-questions",
  ];
  const cookies = {
    courseSpecs: {
      courseLearningOutcomes: userState.courseLearningOutcomes,
    },
  };
  const d = useDispatch();
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

      const length1 =
        data.data.courseSpecs.courseLearningOutcomes[0].learningOutcomes.length;
      const length2 =
        data.data.courseSpecs.courseLearningOutcomes[1].learningOutcomes.length;
      const length3 =
        data.data.courseSpecs.courseLearningOutcomes[2].learningOutcomes.length;

      try {
        checkboxRefs.current = Array.from({ length: length1 }, () =>
          Array.from({ length: 10 }, () => false)
        );
        checkboxRefs2.current = Array.from({ length: length2 }, () =>
          Array.from({ length: 10 }, () => false)
        );
        checkboxRefs3.current = Array.from({ length: length3 }, () =>
          Array.from({ length: 10 }, () => false)
        );
        setTableData([...checkboxRefs.current]);

        setTableData2([...checkboxRefs2.current]);

        setTableData3([...checkboxRefs3.current]);

        for (let i = 0; i < length1; i++) {
          const mc =
            data.data.courseSpecs.courseLearningOutcomes[0].learningOutcomes[i]
              .studentAssessmentMethods;
          refArray.forEach((c, j) => {
            mc.forEach((e) => {
              if (c == e) {
                checkboxRefs.current[i][j] = true;
                setTableData([...checkboxRefs.current]);
              }
            });
          });
        }

        for (let i = 0; i < length2; i++) {
          const mc =
            data.data.courseSpecs.courseLearningOutcomes[1].learningOutcomes[i]
              .studentAssessmentMethods;
          refArray.forEach((c, j) => {
            mc.forEach((e) => {
              if (c == e) {
                checkboxRefs2.current[i][j] = true;
                setTableData2([...checkboxRefs2.current]);
              }
            });
          });
        }
        for (let i = 0; i < length3; i++) {
          const mc =
            data.data.courseSpecs.courseLearningOutcomes[2].learningOutcomes[i]
              .studentAssessmentMethods;
          refArray.forEach((c, j) => {
            mc.forEach((e) => {
              if (c == e) {
                checkboxRefs3.current[i][j] = true;
                setTableData3([...checkboxRefs3.current]);
              }
            });
          });
        }
        console.log(checkboxRefs.current);
        console.log(checkboxRefs2.current);
        console.log(checkboxRefs3.current);
        setTableData([...checkboxRefs.current]);
        setTableData2([...checkboxRefs2.current]);
        setTableData3([...checkboxRefs3.current]);
      } catch (e) {
        console.log(e);
      }
      let cognitive =
        data.data.courseSpecs.courseLearningOutcomes[0].learningOutcomes;
      let affective =
        data.data.courseSpecs.courseLearningOutcomes[2].learningOutcomes;
      let psychomotor =
        data.data.courseSpecs.courseLearningOutcomes[1].learningOutcomes;

      if (cognitive && affective && psychomotor) {
        try {
          setArrays((prevState) => ({
            LO: cognitive,
            LO2: psychomotor,
            LO3: affective,
          }));
          numRows = cognitive.length;
          numRows2 = psychomotor.length;
          numRows3 = affective.length;
          // checkboxRefs.current = Array.from({ length: numRows }, () =>
          //   Array.from({ length: numCols }, () => false)
          // );

          // checkboxRefs3.current = Array.from({ length: numRows3 }, () =>
          //   Array.from({ length: numCols }, () => false)
          // );

          // checkboxRefs2.current = Array.from({ length: numRows2 }, () =>
          //   Array.from({ length: numCols }, () => false)
          // );
        } catch (error) {
          console.error(`Error parsing cookie: ${error}`);
        }
      } else {
        console.error("Cookie not found");
      }
    };

    getData();
  }, []);
  useEffect(() => {
    console.log(checkboxRefs);
    console.log(checkboxRefs2);
    console.log(checkboxRefs3);
    console.log(checkboxRefs);
    console.log(checkboxRefs2);
    console.log(checkboxRefs3);
    console.log(checkboxRefs);
    console.log(checkboxRefs2);
    console.log(checkboxRefs3);
    console.log(checkboxRefs);
    console.log(checkboxRefs2);
    console.log(checkboxRefs3);
  }, []);

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
      d(updateField({ field: "courseSpecs", value: data.data.courseSpecs }));
    };

    getData();
  }, []);

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
    };

    getData();
  }, []);
  const token = userState.token;

  const [arrays, setArrays] = useState({
    LO: [],
    LO2: [],
    LO3: [],
  });
  useEffect(() => {}, []);

  const numCols = 10;
  let numRows = arrays.LO.length;
  let numRows2 = arrays.LO2.length;
  let numRows3 = arrays.LO3.length;
  let checkboxRefs = useRef(
    Array.from({ length: numRows }, () =>
      Array.from({ length: numCols }, () => false)
    )
  );
  let checkboxRefs2 = useRef(
    Array.from({ length: numRows2 }, () =>
      Array.from({ length: numCols }, () => false)
    )
  );
  let checkboxRefs3 = useRef(
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
      label: "Assessment Methods*",
      className: "horizontal bg-sky-100",
    },
  ];
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

  const handleSubmit = async (CLOS) => {
    const deepCopy = (obj) => {
      if (typeof obj !== "object" || obj === null) {
        return obj;
      }

      let copy;

      if (Array.isArray(obj)) {
        copy = obj.map((item) => deepCopy(item));
      } else {
        copy = {};
        for (let key in obj) {
          if (obj.hasOwnProperty(key)) {
            copy[key] = deepCopy(obj[key]);
          }
        }
      }

      return copy;
    };

    // Usage
    let cp2 = deepCopy(CLOS);
    console.log(CLOS);

    setTableData([...checkboxRefs.current]);
    setTableData2([...checkboxRefs2.current]);
    setTableData3([...checkboxRefs3.current]);
    console.log(CLOS);
    console.log(CLOS);
    console.log(CLOS);
    console.log(CLOS);
    console.log(CLOS);
    console.log("CLOS");
    console.log(CLOS[0].learningOutcomes[0].mappedCompetence);
    console.log(CLOS[0].learningOutcomes[0].mappedCompetence);
    console.log(CLOS[0].learningOutcomes[0].mappedCompetence);
    console.log(CLOS);
    console.log("cp2");
    console.log(cp2);
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

    let courseLearningOutcomes = data.data.courseSpecs.courseLearningOutcomes;
    console.log(cp2);
    console.log(cp2);
    console.log(cp2);

    if (courseLearningOutcomes) {
      try {
        let l1P =
          data.data.courseSpecs.courseLearningOutcomes[0].learningOutcomes;
        let l2P =
          data.data.courseSpecs.courseLearningOutcomes[1].learningOutcomes;
        let l3P =
          data.data.courseSpecs.courseLearningOutcomes[2].learningOutcomes;

        if (
          data.data.courseSpecs.courseLearningOutcomes[0].title == "cognitive"
        ) {
          cp2[0].learningOutcomes = l1P.map((e, i) => {
            return {
              ...e,
              mappedCompetence: CLOS[0].learningOutcomes[i].mappedCompetence,
              studentAssessmentMethods: [...tableData33[0]].filter((e, k) => {
                return checkboxRefs.current[i][k];
              }),
            };
          });
        }
        if (
          data.data.courseSpecs.courseLearningOutcomes[1].title == "psychomotor"
        ) {
          cp2[1].learningOutcomes = l2P.map((e, i) => {
            return {
              ...e,
              mappedCompetence: CLOS[1].learningOutcomes[i].mappedCompetence,
              studentAssessmentMethods: [...tableData33[0]].filter((e, k) => {
                return checkboxRefs2.current[i][k];
              }),
            };
          });
        }
        if (
          data.data.courseSpecs.courseLearningOutcomes[2].title == "affective"
        ) {
          cp2[2].learningOutcomes = l3P.map((e, i) => {
            return {
              ...e,
              mappedCompetence: CLOS[2].learningOutcomes[i].mappedCompetence,
              studentAssessmentMethods: [...tableData33[0]].filter((e, k) => {
                return checkboxRefs3.current[i][k];
              }),
            };
          });
        }

        d(updateField({ field: "cp2", value: cp2 }));
        console.log(cp2);
        console.log(cp2);
        console.log(cp2);
        console.log(cp2);
        console.log(cp2);
        console.log(cp2);
        console.log(cp2);
        return cp2;
      } catch (error) {
        console.error(`Error parsing cookie: ${error}`);
      }
    } else {
      console.error("Cookie not found");
    }
  };

  const tableData22 = [
    [
      " Learning Outcomes",
      "Written Exams",
      "Online Exams",
      "Lab Exam",
      "Pop Quizzes",
      "In-class Problem Solving",
      "Take-Home Exam",
      "Research Assignments",
      "Reporting Assignments",
      "Project Assignments",
      "In-class Questions",
    ],
  ];
  const tableData33 = [
    [
      "written-exams",
      "online-exams",
      "lab-exams",
      "pop-quizzes",
      "in-class-problem-solving",
      "take-home-exam",
      "research-assignments",
      "reporting-assignments",
      "project-assignments",
      "in-class-questions",
    ],
  ];
  let content = (
    <>
      <div className="text-2xl my-4 bg-yellow-200">9- Student Assessment</div>
      <div className="text-xl my-4 bg-[#f0e1c2] ml-4">
        a- Student Assessment Methods
      </div>
      <table className="table-fixed border-collapse mb-[5rem]">
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
                  className={`border text-lg border-gray-500  transistion-all  py-8 px-4${
                    cellIndex === 0
                      ? `text-right text-[#FF0000] text-2xl font-bold py-24 `
                      : ``
                  }`}
                >
                  <div className="transform -rotate-90">{cell}</div>
                </td>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          <tr className="w-full bg-sky-100">
            <th className="border-l px-4 py-2 text-left border-gray-500 ">
              Cognitive domain
            </th>
            <th
              className=" bg-sky-100 border-r border-gray-500"
              colSpan={10}
            ></th>
          </tr>
          {Array.from({ length: numRows }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              <td className="border px-4 py-2 border-gray-500">
                {" "}
                {arrays.LO[rowIndex].code}
              </td>
              {Array.from({ length: numCols }).map((_, colIndex) => (
                <td className="border px-4 py-2 border-gray-500" key={colIndex}>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-600 custom-checkbox"
                      onChange={() => handleCheckboxChange(rowIndex, colIndex)}
                      checked={
                        checkboxRefs.current[rowIndex]?.[colIndex] === true
                      }
                    />
                  </label>
                </td>
              ))}
            </tr>
          ))}
          <tr className="w-full bg-sky-100">
            <th className="border-l px-4 py-2 text-left  border-gray-500">
              Psychomotor domain
            </th>
            <th
              className=" bg-sky-100 border-r border-gray-500"
              colSpan={10}
            ></th>
          </tr>
          {Array.from({ length: numRows2 }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              <td className="border px-4 py-2 border-gray-500">
                {" "}
                {arrays.LO2[rowIndex].code}
              </td>
              {Array.from({ length: numCols }).map((_, colIndex) => (
                <td className="border px-4 py-2 border-gray-500" key={colIndex}>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-600 custom-checkbox"
                      onChange={() => handleCheckboxChange2(rowIndex, colIndex)}
                      checked={
                        checkboxRefs2.current[rowIndex]?.[colIndex] === true
                      }
                    />
                  </label>
                </td>
              ))}
            </tr>
          ))}
          <tr className="w-full bg-sky-100">
            <th className="border-l px-4 py-2 text-left border-gray-500 ">
              Affective domain
            </th>
            <th
              className=" bg-sky-100 border-r border-gray-500"
              colSpan={10}
            ></th>
          </tr>
          {Array.from({ length: numRows3 }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              <td className="border px-4 py-2 border-gray-500">
                {" "}
                {arrays.LO3[rowIndex].code}
              </td>
              {Array.from({ length: numCols }).map((_, colIndex) => (
                <td className="border px-4 py-2 border-gray-500" key={colIndex}>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-600 custom-checkbox"
                      onChange={() => handleCheckboxChange3(rowIndex, colIndex)}
                      checked={
                        checkboxRefs3.current[rowIndex]?.[colIndex] === true
                      }
                    />
                  </label>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
        {invalid &&
        hasClass &&
        getErrorField(
          "Learning outcomes must achieve at least one assessment",
          () => {
            setInvalid(false);
          }
        )}
    </>
  );
  return {
    content,
    handleSubmit,
    numRows,
    numRows2,
    numRows3,
    checkboxRefs,
    checkboxRefs2,
    checkboxRefs3,
    getInvalidData,
  };
};
export default useAssessment;
