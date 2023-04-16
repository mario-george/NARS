import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { createRef, useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import CustomReactToPdf from "@/pages/pdf2/pdf333";

const part69 = ({ cookies }) => {
  const [isRunning, setIsRunning] = useState(true);
  const userState = useSelector((s) => s.user);

  if (userState.role != "instructor" || userState.loggedInStatus != "true") {
    return <div className="error">404 could not found</div>;
  }
  const token = userState.token;
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
          localStorage.setItem("pdf5", pdfBase64);
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
  useEffect(() => {
    document.querySelector("body").classList.add("scrollbar-none");
  });
  const [hoursValue, setHoursValue] = useState("");
  const [outcomes, setoutcomes] = useState([]);
  let a = [];
  const [addWeek, setAddWeek] = useState(1);
  useEffect(() => {
    console.log(checkboxRefs);

    checkboxRefs.current = Array.from({ length: addWeek }, () =>
      Array.from({ length: a.length }, () => false)
    );
  }, [addWeek]);
  const addRowWeek = (e) => {
    e.preventDefault();
    // checkboxRefs.current = Array.from({ length: addWeek }, () =>
    // Array.from({ length: a.length }, () => false)
    // );
    setAddWeek(addWeek + 1);
  };
  // const outcomes = ['LO1', 'LO2', 'LO3', 'LO4', 'LO5', 'LO6']
  let cognitive = Cookies.get("cognitive");
  let affective = Cookies.get("affective");
  let psychomotor = Cookies.get("psychomotor");
  let numCols = outcomes.length;
  let numRows = addWeek;
  const router = useRouter();
  const { courseID } = router.query;
  const checkboxRefs = useRef(
    Array.from({ length: outcomes.length }, () =>
      Array.from({ length: outcomes.length }, () => false)
    )
  );

  const topicsRefs = useRef(
    Array.from({ length: outcomes.length }, () => false)
  );
  const HoursRefs = useRef(Array.from({ length: outcomes.length }, () => 0));

  const [tableData, setTableData] = useState(checkboxRefs.current);
  const [hoursData, setHoursData] = useState(HoursRefs.current);
  const [topicsData, setTopicsData] = useState(topicsRefs.current);

  const handleCheckboxChange = (rowIndex, colIndex) => {
    checkboxRefs.current[rowIndex][colIndex] =
      !checkboxRefs.current[rowIndex][colIndex];
  };
  const handleHoursChange = (rowIndex, e) => {
    const { value } = e.target;
    // setHoursValue(value);

    HoursRefs.current[rowIndex] = value;
  };
  const handleTopicChange = (rowIndex, e) => {
    topicsRefs.current[rowIndex] = e.target.value;
  };
  let congitiveParsed;
  let psychomotorParsed;
  let affectiveParsed;
  let courseLearningOutcomes;
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
        a = [];
        congitiveParsed.map((e) => {
          a.push(e.name);
        });

        psychomotorParsed.map((e) => {
          a.push(e.name);
        });
        affectiveParsed.map((e) => {
          a.push(e.name);
        });
        console.log(a);
        console.log(Array.isArray(congitiveParsed));

        checkboxRefs.current = Array.from({ length: addWeek }, () =>
          Array.from({ length: a.length }, () => false)
        );
        if (!HoursRefs.current) {
          HoursRefs.current = Array.from({ length: outcomes.length }, () => 0);
        }
        topicsRefs.current = Array.from({ length: a.length }, () => null);
        setoutcomes((prevState) => a);
      } catch (error) {
        console.error(`Error parsing cookie: ${error}`);
      }
    } else {
      console.error("Cookie not found");
    }
  }, []);

  const handleSubmit = async () => {
    setTableData([...checkboxRefs.current]);
    setHoursData([...HoursRefs.current]);
    setTopicsData([...topicsRefs.current]);
    console.log(checkboxRefs.current[0][0]);
    console.log(outcomes);
    let lecturePlan = {
      expectedStudyingHoursePerWeek: 5,
      topics: [],
    };
    lecturePlan.topics = [];

    console.log(lecturePlan);
    console.log(tableData);
    console.log(topicsData);
    console.log(hoursData);
    for (let i = 0; i < numRows; i++) {
      let elem = [...outcomes].map((e, k) => {
        if (checkboxRefs.current[i][k]) {
          return { code: outcomes[k] };
        } else {
          return;
        }
      });
      let topic = {
        week: i + 1,
        topics: [`${topicsRefs.current[i]}`],
        plannedHours: HoursRefs.current[i]
          ? `${Number(HoursRefs.current[i])}`
          : 0,
        learningOutcomes: elem,
      };
      lecturePlan.topics.push(topic);
    }
    console.log(lecturePlan);

    const lecturePlanStringified = JSON.stringify(lecturePlan);
    Cookies.set("lecturePlan", lecturePlanStringified);
    const r = await fetch(
      `${process.env.url}api/v1/courses/created-courses/${courseID}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          courseSpecs: {
            lecturePlan: lecturePlan,
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
    setIsRunning(false);
    buttonRef.current.click();

    e.preventDefault();
    handleSubmit();

    // window.location.href="/instructor/coursespecs/part6"

    // window.location.href = `/instructor/courses/${courseID}/courseSpecs/part6`;
    router.push(`/instructor/courses/${courseID}/courseSpecs/part6`);
  };
  return (
    <>
      <div className="flex flex-row w-screen h-auto  mt-2">
        <CustomReactToPdf targetRef={refToImgBlob} filename="part5.pdf">
          {({ toPdf }) => <ChildComponent toPdf={toPdf} />}
        </CustomReactToPdf>
        <form
          onSubmit={submitHandler}
          className="bg-sky-50 h-screen w-[80%] translate-x-[25%] flex flex-col justify-center items-center text-black ml-1 scrollbar-none relative"
        >
          <div
            className="contentAddUser2 flex flex-col gap-10"
            ref={refToImgBlob}
          >
            <table className="table-auto mb-[35rem] ">
              <thead>
                <tr>
                  <th className="border-2 px-4 py-2">Week</th>
                  <th className="border-2 px-4 py-2">Topics</th>
                  <th className="border-2 px-4 py-2">
                    Planned <br /> Hours
                  </th>
                  {outcomes.map((e, i) => (
                    <th key={i} className="border-2 px-4 py-2">
                      {e}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: numRows }).map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    <td className="border-2 px-4 py-2"> {[rowIndex + 1]}</td>
                    <td className="border-2 px-4 py-2 ">
                      <input
                        type="text"
                        name="topic"
                        className="w-full"
                        onChange={(e) => handleTopicChange(rowIndex, e)}
                      />
                    </td>
                    <td className="border-2 px-4 py-2 ">
                      <input
                        name="hours"
                        type="number"
                        className="w-full"
                        onChange={(e) => handleHoursChange(rowIndex, e)}
                      />
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
                          />
                        </label>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end absolute  right-24">
            <button
              onClick={addRowWeek}
              class="w-[7rem]  font-Roboto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base  px-5 py-2.5 mx-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Add Row
            </button>
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
export default part69;
