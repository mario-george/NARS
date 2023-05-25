import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { createRef, useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import CustomReactToPdf from "@/pages/pdf2/pdf333";
import { updateField } from "@/components/store/userSlice";

const part69 = ({ cookies }) => {
  const [isRunning, setIsRunning] = useState(true);
  const userState = useSelector((s) => s.user);
  const d = useDispatch();

  if (userState.role != "instructor" || userState.loggedInStatus != "true") {
    return <div className="error">404 could not found</div>;
  }
  const token = userState.token;
  const refToImgBlob = useRef();
  const buttonRef = useRef(null);
  const [t, setT] = useState(true);
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

      try {
        setAddWeek(data.data.courseSpecs.lecturePlan.topics.length);
        if (t) {
          checkboxRefs.current = Array.from(
            { length: data.data.courseSpecs.lecturePlan.topics.length },
            () => Array.from({ length: a.length }, () => false)
          );
          setTableData([...checkboxRefs.current]);
          setT(false);
        }

        for (
          let i = 0;
          i < data.data.courseSpecs.lecturePlan.topics.length;
          i++
        ) {
          if (data.data.courseSpecs.lecturePlan.topics[i].topics[0]) {
            topicsRefs.current[i] =
              data.data.courseSpecs.lecturePlan.topics[i].topics[0];
          }
          if (data.data.courseSpecs.lecturePlan.topics[i].plannedHours != 0) {
            HoursRefs.current[i] =
              data.data.courseSpecs.lecturePlan.topics[i].plannedHours;
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
      } catch (e) {
        console.log(e);
      }
    };

    getData();
  }, []);
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

  const [hoursValue, setHoursValue] = useState("");
  const [outcomes, setoutcomes] = useState([]);
  let a = [];
  const [addWeek, setAddWeek] = useState(1);

  // useEffect(() => {
  //   checkboxRefs.current = [
  //     ...checkboxRefs.current,
  //     Array.from({ length: a.length }, () => false),
  //   ];
  // }, [addWeek]);
  const addRowWeek = (e) => {
    e.preventDefault();

    setAddWeek(addWeek + 1);
    checkboxRefs.current = [
      ...checkboxRefs.current,
      Array.from({ length: a.length }, () => false),
    ];
  };
  const removeRowHandler = (e) => {
    e.preventDefault();

    setAddWeek(addWeek - 1);
    checkboxRefs.current = checkboxRefs.current.slice(0, -1);


  };
  let cognitive =
    cookies.courseSpecs.courseLearningOutcomes[0].learningOutcomes;
  let affective =
    cookies.courseSpecs.courseLearningOutcomes[2].learningOutcomes;
  let psychomotor =
    cookies.courseSpecs.courseLearningOutcomes[1].learningOutcomes;
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
    setTableData([...checkboxRefs.current]);
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
        congitiveParsed = cognitive;
        psychomotorParsed = psychomotor;
        affectiveParsed = affective;
        courseLearningOutcomes = cookies.courseSpecs.courseLearningOutcomes;

        a = [];
        congitiveParsed.map((e) => {
          a.push(e.code);
        });

        psychomotorParsed.map((e) => {
          a.push(e.code);
        });
        affectiveParsed.map((e) => {
          a.push(e.code);
        });


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
   
    let lecturePlan = {
      expectedStudyingHoursePerWeek: 5,
      topics: [],
    };
    lecturePlan.topics = [];

  
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
  const useDynamicHeight = () => {
    const contentRef = useRef(null);

    useEffect(() => {
      const adjustHeight = () => {
        const contentElement = contentRef.current;
        const contentHeight = contentElement.offsetHeight;
        const windowHeight = window.innerHeight;
        const maxContentHeight = Math.max(contentHeight, windowHeight);
        contentElement.style.height = maxContentHeight + "px";
        console.log(contentElement);
      };

      adjustHeight();

      const observer = new ResizeObserver(adjustHeight);
      observer.observe(contentRef.current);

      return () => {
        observer.disconnect();
      };
    }, [contentRef.current?.style.height]);

    return contentRef;
  };
  const contentRef = useDynamicHeight();

  const submitHandler = async (e) => {
    setIsRunning(false);
    buttonRef.current.click();

    e.preventDefault();
    handleSubmit();


    router.push(`/instructor/courses/${courseID}/courseSpecs/part6`);
  };
  return (
    <>
      <div className="flex flex-row w-auto h-auto  space-x-0">
        <CustomReactToPdf targetRef={refToImgBlob} filename="part5.pdf">
          {({ toPdf }) => <ChildComponent toPdf={toPdf} />}
        </CustomReactToPdf>
        <form
          onSubmit={submitHandler}
          className="bg-sky-50 h-auto w-[80%] translate-x-[25%] flex flex-col justify-center items-center text-black "
        >
          <div
            className="contentAddUserFlexible2  flex flex-col gap-10"
            ref={contentRef}
          >
            <div ref={refToImgBlob}>
              <table className="table-auto w-full ">
                <thead>
                  <tr className="   bg-gray-300">
                    <th className=" border-t-2 border-r-2 border-t-black border-l-black border-r-black  border-l-2 px-4 ">
                      Week
                    </th>
                    <th className="border-t-2 border-r-2 border-t-black border-l-black border-r-black  border-l-2 px-4">
                      Topics
                    </th>
                    <th
                      className="border-t-2 border-r-2 border-t-black border-l-black border-r-black  border-l-2 "
                      style={{ width: "80px" }}
                    >
                      Planned <br /> Hours
                    </th>
                    <th
                      colSpan={outcomes.length}
                      className="border-t-2 border-r-2 border-t-black border-b-black border-b-2 border-l-black border-r-black  border-l-2 px-4 py-2 text-center"
                    >
                      Learning Outcomes
                      <br />
                    </th>
                  </tr>

                  <tr className="bg-gray-300">
                    <th className=" px-4 border-r-2  border-l-black border-b-black border-b-2 border-r-black  border-l-2  "></th>
                    <th className=" px-4 border-r-2  border-l-black border-b-black border-b-2 border-r-black  border-l-2 "></th>
                    <th className=" px-4 border-r-2  border-l-black border-b-black border-b-2 border-r-black  border-l-2  "></th>
                    {outcomes.map((e, i) => (
                      <th
                        key={i}
                        className="border-r-2 border-b-black border-b-2  border-l-black border-r-black  border-l-2  px-4"
                      >
                        {e}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: numRows }).map((_, rowIndex) => (
                    <tr key={rowIndex}>
                      <td className="border-2 border-black px-4 py-2">
                        {" "}
                        {[rowIndex + 1]}
                      </td>
                      <td className="border-2 px-4 py-2 border-black ">
                        <input
                          type="text"
                          name="topic"
                          className="w-full"
                          onChange={(e) => handleTopicChange(rowIndex, e)}
                          defaultValue={topicsRefs.current[rowIndex]}
                        />
                      </td>
                      <td className="border-2 border-black px-4 py-2 ">
                        <input
                          name="hours"
                          type="number"
                          className="w-full"
                          onChange={(e) => handleHoursChange(rowIndex, e)}
                          defaultValue={HoursRefs.current[rowIndex]}
                        />
                      </td>
                      {Array.from({ length: numCols }).map((_, colIndex) => (
                        <td
                          className="border-2 border-black px-4 py-2"
                          key={colIndex}
                        >
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
                </tbody>
              </table>
            </div>
            <div className="flex justify-end ">
              <button
                onClick={addRowWeek}
                class="w-[7rem]  font-Roboto text-blue-500  py-2 px-4 rounded-md   text-xl mx-2 mb-2 "
              >
                Add
              </button>
              <button
                onClick={removeRowHandler}
                class="w-[7rem]  font-Roboto text-blue-500  py-2 px-4 rounded-md   text-xl mx-2 mb-2 "
              >
                Remove
              </button>
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
export default part69;
