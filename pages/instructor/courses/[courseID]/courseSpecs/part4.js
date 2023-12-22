import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { createRef, useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import CustomReactToPdf from "@/components/pdf2/pdf333";
import { updateField } from "@/components/store/userSlice";
import MappingLOs from "@/components/helper/MappingLO's";
import LecturePlan from "@/components/helper/LecturePlan";
import useAssessment from "@/components/helper/useAssessment";
import useTeachingMethods from "@/components/helper/useTeachingMethods";
import useAssessmentSchedule from "@/components/helper/useAssessmentSchedule";
import useFacility from "@/components/helper/useFacility";
import useListOfReferences from "@/components/helper/useListOfReferences";

const part4 = ({ cookies }) => {
  const [errors, setErrors] = useState([]);
  const [invalidTopicsRefs, setInvalidTopicsRefs] = useState(false);
  const [CompetencesInvalid, setCompetencesInvalid] = useState(false);

  const [invalidEmptyTopic, setInvalidEmptyTopic] = useState(false);
  const [invalidPlannedHours, setInvalidPlannedHours] = useState(false);
  const [invalidExpectedHours, setInvalidExpectedHours] = useState(false);
  const [errorPlannedHours, setErrorPlannedHours] = useState("");
  const [errorTopcsRefs, setErrorTopicsRefs] = useState("");
  const [errorEmptyTopics, setErrorEmptyTopic] = useState("");
  const [errorExpectedHours, setErrorExpectedHours] = useState("");
  const passInvalidEmptyTopic = ({ boolean, error }) => {
    if (error) {
      setErrorEmptyTopic(error);
    }
    if (boolean == false) {
      setInvalidEmptyTopic(false);
    }
    if (boolean == true) {
      setInvalidEmptyTopic(true);
    }
  };
  const passInvalidExpectedHours = ({ boolean, error }) => {
    if (error) {
      setErrorExpectedHours(error);
    }
    if (boolean == false) {
      setInvalidExpectedHours(false);
    }
    if (boolean == true) {
      setInvalidExpectedHours(true);
    }
  };
  const passInvalidTopicsRefs = ({ boolean, error }) => {
    if (error) {
      setErrorTopicsRefs(error);
    }
    if (boolean == false) {
      setInvalidTopicsRefs(false);
    }
    if (boolean == true) {
      setInvalidTopicsRefs(true);
    }
  };
  const passInvalidPlannedHours = ({ boolean, error }) => {
    if (error) {
      setErrorPlannedHours(error);
    }
    if (boolean == false) {
      setInvalidPlannedHours(false);
    }
    if (boolean == true) {
      setInvalidPlannedHours(true);
    }
  };
  useEffect(() => {
    localStorage.removeItem("pdf4");
    localStorage.removeItem("pdf5");
    localStorage.removeItem("pdf6");
    localStorage.removeItem("pdf7");
    localStorage.removeItem("pdf8");
    localStorage.removeItem("pdf9");
    localStorage.removeItem("pdf10");
  }, []);
  const d = useDispatch();
  const expectedStudyingHoursPerWeek = useRef();
  let a = [];
  const [hasClass, setHasClass] = useState(true);
  const [specs, setSpecs] = useState({});
  const [outcomes, setoutcomes] = useState([]);
  const [t, setT] = useState(true);
  const [competences, setComp] = useState([]);
  const checkboxRefsLecturePlan = useRef(
    Array.from({ length: outcomes.length }, () =>
      Array.from({ length: outcomes.length }, () => false)
    )
  );
  const userState = useSelector((s) => s.user);
  const other = useRef();

  if (userState.role != "instructor" || userState.loggedInStatus != "true") {
    return <div className="error">404 could not found</div>;
  }
  const [addWeek, setAddWeek] = useState(0);
  const topicsRefs = useRef(
    Array.from({ length: outcomes.length }, () => false)
  );
  const HoursRefs = useRef(Array.from({ length: outcomes.length }, () => 0));

  const [tableDataLecturePlan, setTableDataLecturePlan] = useState(
    checkboxRefsLecturePlan.current
  );
  const [hoursData, setHoursData] = useState(HoursRefs.current);
  const [topicsData, setTopicsData] = useState(topicsRefs.current);

  const handleCheckboxChangeLecturePlan = (rowIndex, colIndex) => {
    checkboxRefsLecturePlan.current[rowIndex][colIndex] =
      !checkboxRefsLecturePlan.current[rowIndex][colIndex];
    setTableDataLecturePlan([...checkboxRefsLecturePlan.current]);
  };
  const handleHoursChange = (rowIndex, e) => {
    const { value } = e.target;

    HoursRefs.current[rowIndex] = value;
  };
  const handleTopicChange = (rowIndex, e) => {
    // const updatedValue = e.target.value;
    console.log(e);
    console.log(rowIndex);
    topicsRefs.current[rowIndex] = e;
  };
  const addRowWeek = (e) => {
    e.preventDefault();

    setAddWeek(addWeek + 1);
    checkboxRefsLecturePlan.current = [
      ...checkboxRefsLecturePlan.current,
      Array.from({ length: a.length }, () => false),
    ];
    topicsRefs.current = [...topicsRefs.current, ""];
    HoursRefs.current = [...HoursRefs.current, ""];
  };
  const removeRowHandler = (e) => {
    e.preventDefault();

    setAddWeek(addWeek - 1);
    checkboxRefsLecturePlan.current = checkboxRefsLecturePlan.current.slice(
      0,
      -1
    );
    topicsRefs.current = topicsRefs.current.slice(0, -1);
    HoursRefs.current = HoursRefs.current.slice(0, -1);
  };
  useEffect(() => {
    const getData = async () => {
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
      let cognitive =
        data.data.courseSpecs.courseLearningOutcomes[0].learningOutcomes;
      let psychomotor =
        data.data.courseSpecs.courseLearningOutcomes[1].learningOutcomes;
      let affective =
        data.data.courseSpecs.courseLearningOutcomes[2].learningOutcomes;

      if (cognitive && affective && psychomotor) {
        try {
          a = [];
          cognitive.map((e) => {
            a.push(e.code);
          });

          psychomotor.map((e) => {
            a.push(e.code);
          });
          affective.map((e) => {
            a.push(e.code);
          });
          console.log(a);
          checkboxRefsLecturePlan.current = Array.from(
            { length: addWeek },
            () => Array.from({ length: a.length }, () => false)
          );
          if (!HoursRefs.current) {
            HoursRefs.current = Array.from(
              { length: outcomes.length },
              () => 0
            );
          }
          topicsRefs.current = Array.from({ length: addWeek }, () => null);
          setoutcomes((prevState) => a);
          console.log(outcomes);
        } catch (error) {
          console.error(`Error parsing cookie: ${error} lol`);
        }
      }
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
      d(updateField({ field: "courseSpecs", value: data.data.courseSpecs }));
      setSpecs(data.data);
      const length1 =
        data.data.courseSpecs.courseLearningOutcomes[0].learningOutcomes.length;
      const length2 =
        data.data.courseSpecs.courseLearningOutcomes[1].learningOutcomes.length;
      const length3 =
        data.data.courseSpecs.courseLearningOutcomes[2].learningOutcomes.length;

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

        for (let i = 0; i < length1; i++) {
          const mc =
            data.data.courseSpecs.courseLearningOutcomes[0].learningOutcomes[i]
              .mappedCompetence;
          competences.forEach((c, j) => {
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
              .mappedCompetence;
          competences.forEach((c, j) => {
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
              .mappedCompetence;
          competences.forEach((c, j) => {
            mc.forEach((e) => {
              if (c == e) {
                checkboxRefs3.current[i][j] = true;
                setTableData3([...checkboxRefs3.current]);
              }
            });
          });
        }
      } catch (e) {
        console.log(e);
      }
      try {
        setAddWeek(data.data.courseSpecs.lecturePlan.topics.length);
        if (t) {
          checkboxRefsLecturePlan.current = Array.from(
            { length: data.data.courseSpecs.lecturePlan.topics.length },
            () => Array.from({ length: a.length }, () => false)
          );
          setTableDataLecturePlan([...checkboxRefsLecturePlan.current]);
          setT(false);
        }
        if (data.data.courseSpecs.lecturePlan.expectedStudyingHoursPerWeek) {
          expectedStudyingHoursPerWeek.current.value =
            data.data.courseSpecs.lecturePlan.expectedStudyingHoursPerWeek;
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
              ] != null &&
              data.data.courseSpecs.lecturePlan.topics[i]?.learningOutcomes[j]
                .selected
            ) {
              checkboxRefsLecturePlan.current[i][j] = true;
            }
          }
        }
      } catch (e) {
        console.log(e);
      }
      let cognitive =
        data.data.courseSpecs.courseLearningOutcomes[0].learningOutcomes;
      let psychomotor =
        data.data.courseSpecs.courseLearningOutcomes[1].learningOutcomes;
      let affective =
        data.data.courseSpecs.courseLearningOutcomes[2].learningOutcomes;
      if (cognitive && affective && psychomotor) {
        try {
          let FetchedOutcomes = [];
          cognitive.map((e) => {
            FetchedOutcomes.push(e.code);
          });

          psychomotor.map((e) => {
            FetchedOutcomes.push(e.code);
          });
          affective.map((e) => {
            FetchedOutcomes.push(e.code);
          });

          setoutcomes(FetchedOutcomes);
          console.log(outcomes);
        } catch (error) {
          console.error(`Error parsing cookie: ${error}`);
        }
      }
    };

    getData();
  }, [competences]);
  const token = userState.token;
  const [isRunning, setIsRunning] = useState(true);
  const refToImgBlob = useRef();
  const refToImgBlob2 = useRef();
  const refToImgBlob3 = useRef();
  const refToImgBlob4 = useRef();
  const refToImgBlob5 = useRef();
  const refToImgBlob6 = useRef();
  const refToImgBlob7 = useRef();
  const buttonRef = useRef(null);
  const buttonRef2 = useRef(null);
  const buttonRef3 = useRef(null);
  const buttonRef4 = useRef(null);
  const buttonRef5 = useRef(null);
  const buttonRef6 = useRef(null);
  const buttonRef7 = useRef(null);

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
  function ChildComponent2({ toPdf }) {
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
      } catch (error) {
        console.error("Failed to capture PDF:", error);
      }
    };

    return (
      <>
        {" "}
        <button ref={buttonRef2} onClick={handleClick} hidden>
          Capture as PDF
        </button>
      </>
    );
  }
  function ChildComponent3({ toPdf }) {
    const handleClick = async () => {
      try {
        console.log(toPdf);
        const pdfBlob = await toPdf();
        const reader = new FileReader();
        reader.readAsDataURL(pdfBlob);

        reader.onload = () => {
          const pdfBase64 = reader.result.split(",")[1];
          localStorage.setItem("pdf6", pdfBase64);
        };
      } catch (error) {
        console.error("Failed to capture PDF:", error);
      }
    };

    return (
      <>
        {" "}
        <button ref={buttonRef3} onClick={handleClick} hidden>
          Capture as PDF
        </button>
      </>
    );
  }
  function ChildComponent4({ toPdf }) {
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
      } catch (error) {
        console.error("Failed to capture PDF:", error);
      }
    };

    return (
      <>
        {" "}
        <button ref={buttonRef4} onClick={handleClick} hidden>
          Capture as PDF
        </button>
      </>
    );
  }
  function ChildComponent5({ toPdf }) {
    const handleClick = async () => {
      try {
        console.log(toPdf);
        const pdfBlob = await toPdf();
        const reader = new FileReader();
        reader.readAsDataURL(pdfBlob);

        reader.onload = () => {
          const pdfBase64 = reader.result.split(",")[1];
          localStorage.setItem("pdf8", pdfBase64);
        };
      } catch (error) {
        console.error("Failed to capture PDF:", error);
      }
    };

    return (
      <>
        {" "}
        <button ref={buttonRef5} onClick={handleClick} hidden>
          Capture as PDF
        </button>
      </>
    );
  }
  function ChildComponent6({ toPdf }) {
    const handleClick = async () => {
      try {
        console.log(toPdf);
        const pdfBlob = await toPdf();
        const reader = new FileReader();
        reader.readAsDataURL(pdfBlob);

        reader.onload = () => {
          const pdfBase64 = reader.result.split(",")[1];
          localStorage.setItem("pdf9", pdfBase64);
        };
      } catch (error) {
        console.error("Failed to capture PDF:", error);
      }
    };

    return (
      <>
        {" "}
        <button ref={buttonRef6} onClick={handleClick} hidden>
          Capture as PDF
        </button>
      </>
    );
  }
  function ChildComponent7({ toPdf }) {
    const handleClick = async () => {
      try {
        console.log(toPdf);
        const pdfBlob = await toPdf();
        const reader = new FileReader();
        reader.readAsDataURL(pdfBlob);

        reader.onload = () => {
          const pdfBase64 = reader.result.split(",")[1];
          localStorage.setItem("pdf10", pdfBase64);
        };
      } catch (error) {
        console.error("Failed to capture PDF:", error);
      }
    };

    return (
      <>
        {" "}
        <button ref={buttonRef7} onClick={handleClick} hidden>
          Capture as PDF
        </button>
      </>
    );
  }
  const router = useRouter();

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
      <div className="ml-3  font-medium">
        Course data has been submitted successfully!
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
  const assessmentHandler = useAssessment({
    courseID,
    cookies,
    courseSpecs: specs,
    hasClass,
  });
  const ListOfReferencesHandler = useListOfReferences({
    courseID,
    cookies,
    hasClass,
  });
  const referencesContent = ListOfReferencesHandler.content;
  const assessmentScheduleHandler = useAssessmentSchedule({
    courseID,
    cookies,
    specs,
    hasClass,
  });
  const assessmentScheduleContent = assessmentScheduleHandler.content;
  const facilityHandler = useFacility({
    courseID: courseID,
    cookies: cookies,
    hasClass,
  });

  const facilityHandlerContent = facilityHandler.content;
  const teachingMethodsHandler = useTeachingMethods({
    courseID: courseID,
    cookies: cookies,
    courseSpecs: specs,
    hasClass,
  });
  const teachingMethodsContent = teachingMethodsHandler.content;
  const assessmentContent = assessmentHandler.content;
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
    return data.data.courseSpecs.courseLearningOutcomes;
  };

  const [arrays, setArrays] = useState({
    LO: [],
    LO2: [],
    LO3: [],
  });

  useEffect(() => {
    const fetchingData = async () => {
      const CLO = await getComp();

      let cognitive = CLO[0].learningOutcomes;
      let psychomotor = CLO[1].learningOutcomes;
      let affective = CLO[2].learningOutcomes;

      if (cognitive && affective && psychomotor) {
        try {
          setArrays((prevState) => ({
            LO: cognitive,
            LO2: psychomotor,
            LO3: affective,
          }));
          numCols = competences.length;
          numRows = cognitive.length;
          numRows2 = psychomotor.length;
          numRows3 = affective.length;
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
    };
    fetchingData();
  }, []);

  let affectiveMap;
  let b = [];
  let numColsLecturePlan = outcomes.length;
  let numRowsLecturePlan = addWeek;
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

    const r2 = await fetch(
      `${process.env.url}api/v1/courses/created-courses/${courseID}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    const data = await r2.json();
    console.log(data);
    let courseLearningOutcomes = data.data.courseSpecs.courseLearningOutcomes;
    let cp2;
    if (courseLearningOutcomes) {
      try {
        let courseLearningOutcomesParsed =
          data.data.courseSpecs.courseLearningOutcomes;

        let l1P =
          data.data.courseSpecs.courseLearningOutcomes[0].learningOutcomes;
        let l2P =
          data.data.courseSpecs.courseLearningOutcomes[1].learningOutcomes;
        let l3P =
          data.data.courseSpecs.courseLearningOutcomes[2].learningOutcomes;

        cp2 = JSON.parse(JSON.stringify(courseLearningOutcomes));
        console.log(cp2);
        console.log(cp2);
        console.log(cp2);

        if (
          data.data.courseSpecs.courseLearningOutcomes[0].title == "cognitive"
        ) {
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
            return {
              ...e,
              mappedCompetence: [...competences].filter((e, k) => {
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
              mappedCompetence: [...competences].filter((e, k) => {
                return checkboxRefs3.current[i][k];
              }),
            };
          });
        }

        //         combined = [];
        //         cp2[2].learningOutcomes[0].mappedCompetence.map((e) => {
        //           combined.push(e);
        //         });
        //         cp2[0].learningOutcomes[0].mappedCompetence.map((e) => {
        //           combined.push(e);
        //         });
        //         cp2[1].learningOutcomes[0].mappedCompetence.map((e) => {
        //           combined.push(e);
        //         });
        // console.log(cp2)
        // console.log(cp2)
        // console.log(cp2)
        // console.log(cp2)
        function removeDuplicates(array) {
          return array.filter((item, index) => array.indexOf(item) === index);
        }
        // combined = removeDuplicates(combined);
      } catch (error) {
        console.error(`Error parsing cookie: ${error} 123`);
      }
    } else {
      console.error("Cookie not found");
    }
    try {
      setTableDataLecturePlan([...checkboxRefsLecturePlan.current]);
      setHoursData([...HoursRefs.current]);
      setTopicsData([...topicsRefs.current]);

      let lecturePlan = {
        expectedStudyingHoursPerWeek:
          expectedStudyingHoursPerWeek.current.value,
        topics: [],
      };
      lecturePlan.topics = [];
      lecturePlan.expectedStudyingHoursPerWeek =
        expectedStudyingHoursPerWeek.current.value;
      for (let i = 0; i < numRowsLecturePlan; i++) {
        let elem = [...outcomes].map((e, k) => {
          if (checkboxRefsLecturePlan.current[i][k]) {
            return { code: outcomes[k], selected: true };
          } else {
            return { code: outcomes[k], selected: false };
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
      lecturePlan.expectedStudyingHoursPerWeek =
        expectedStudyingHoursPerWeek.current.value;
      console.log(lecturePlan);
      console.log(lecturePlan);
      console.log(lecturePlan);
      console.log(lecturePlan);
      console.log(lecturePlan);
      console.log(lecturePlan);
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
      setTimeout(() => {
        facilityHandler.submitHandler();
      }, 500);
      console.log(cp2);
      console.log(cp2);
      console.log(cp2);
      console.log(cp2);
      console.log(cp2);
      console.log(cp2);
      console.log(cp2);
      const newCLOS = await assessmentHandler.handleSubmit(cp2);
      const newCLOS2 = await teachingMethodsHandler.handleSubmit(newCLOS);

      const r2 = await fetch(
        `${process.env.url}api/v1/courses/created-courses/${courseID}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            courseSpecs: {
              courseLearningOutcomes: newCLOS2,
            },
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      const resp2 = await r2.json();
    } catch (e) {
      console.log(e);
    }

    try {
      assessmentScheduleHandler.submitHandler();
    } catch (e) {
      console.log(e);
    }
  };
  const [
    isexpectedStudyingHoursPerWeekInvalid,
    setIsexpectedStudyingHoursPerWeekInvalid,
  ] = useState(false);

  const submitHandler = async (e) => {
    console.log(HoursRefs.current);
    console.log(HoursRefs.current);
    console.log(HoursRefs.current);
    console.log(HoursRefs.current);
    console.log(topicsRefs.current);
    console.log(topicsRefs.current);
    console.log(topicsRefs.current);
    console.log(topicsRefs.current);

    const { selectedItems, handler } = facilityHandler.validate();
    const { notes, books, Rbooks, websites } =
      ListOfReferencesHandler.validate();
    console.log(books);
    console.log(Rbooks);
    console.log(websites);
    console.log(notes);

    console.log(assessmentScheduleHandler.getInvalidData());
    console.log(assessmentScheduleHandler.getInvalidData());
    console.log(assessmentScheduleHandler.getInvalidData());
    console.log(assessmentScheduleHandler.getInvalidData());
    console.log(HoursRefs.current);
    console.log(HoursRefs.current);
    console.log(HoursRefs.current);
    console.log(HoursRefs.current);
    console.log(HoursRefs.current);
    console.log(assessmentScheduleHandler.getInvalidData().validation);

    function testArray(array) {
      for (let i = 0; i < array.length; i++) {
        if (array[i] === "" || array[i] === null || array[i] === undefined) {
          return false;
        }
      }
      return true;
    }

    function checkAllNumbers(array) {
      const digitRegex = /^\d+$/;
      for (let i = 0; i < array.length; i++) {
        if (!digitRegex.test(array[i]) || array[i] <= 0) {
          return false;
        }
      }
      return true;
    }

    console.log(topicsRefs.current);
    e.preventDefault();
    const findInvalidElement = (array) => {
      const index = array.findIndex((element) =>
        element.every((value) => value === false)
      );
      if (index !== -1) {
        return { index };
      }
      return null;
    };
    const cognitiveAssessmentCheckedForErrors = findInvalidElement(
      assessmentHandler.checkboxRefs.current
    );
    const topicsRefsCheckedForErrors = findInvalidElement(
      checkboxRefsLecturePlan.current
    );
    const psychomotorAssessmentCheckedForErrors = findInvalidElement(
      assessmentHandler.checkboxRefs2.current
    );
    const affectiveAssessmentCheckedForErrors = findInvalidElement(
      assessmentHandler.checkboxRefs3.current
    );

    const cognitiveTeachingMethodsCheckedForErrors = findInvalidElement(
      teachingMethodsHandler.checkboxRefs.current
    );
    const psychomotorTeachingMethodsCheckedForErrors = findInvalidElement(
      teachingMethodsHandler.checkboxRefs2.current
    );
    const affectiveTeachingMethodsCheckedForErrors = findInvalidElement(
      teachingMethodsHandler.checkboxRefs3.current
    );

    const newErrors = [];
    if (!testArray(topicsRefs.current)) {
      newErrors.push("Topics can't be empty.");
      const error = "Topics can't be empty.";
      passInvalidEmptyTopic({ boolean: true, error });
    } else {
      passInvalidEmptyTopic({ boolean: false });
    }
    if (!checkAllNumbers(HoursRefs.current)) {
      newErrors.push(
        "Planned Hours should be positive non zero number and should not be empty."
      );
      const error =
        "Planned Hours should be positive non zero number and should not be empty.";
      passInvalidPlannedHours({ boolean: true, error });
    } else {
      passInvalidPlannedHours({ boolean: false });
    }
    const dynamicArray = competences.filter((competence, index) => {
      const ref1 = checkboxRefs.current.map((row) => row[index]);
      const ref2 = checkboxRefs2.current.map((row) => row[index]);
      const ref3 = checkboxRefs3.current.map((row) => row[index]);

      if (
        ref1.some((value) => value) ||
        ref2.some((value) => value) ||
        ref3.some((value) => value)
      ) {
        return true;
      }

      return false;
    });

    console.log(dynamicArray);
    const areAllCompetencesAchieved = competences.every((competence) =>
      dynamicArray.includes(competence)
    );

    if (areAllCompetencesAchieved) {
      // setMsg(success);
    } else {
      setCompetencesInvalid(true);

      newErrors.push("Competences is not met. please review the entered data");
    }
    if (topicsRefsCheckedForErrors) {
      newErrors.push("Each Topic must achieve at least one Learning Outcome.");
      const error = "Each Topic must achieve at least one Learning Outcome.";
      passInvalidTopicsRefs({ boolean: true, error });
    } else {
      passInvalidTopicsRefs({ boolean: false });
    }
    if (!assessmentScheduleHandler.getInvalidData().validation) {
      newErrors.push(
        `Total Weight must achieve the Full Mark of the course : ${
          assessmentScheduleHandler.getInvalidData().fullMark
        } `
      );
      assessmentScheduleHandler.passInvalidTotal(true);
    } else {
      assessmentScheduleHandler.passInvalidTotal(false);
    }
    if (!handler && selectedItems.length == 0) {
      newErrors.push("At least one facility are needed for this course.");
      facilityHandler.getInvalidData(true);
    } else {
      facilityHandler.getInvalidData(false);
    }
    if (books === "" || !books) {
      newErrors.push("Books should not be empty.");
      ListOfReferencesHandler.passInvalid({ boolean: true, error: "books" });
    } else {
      ListOfReferencesHandler.passInvalid({ boolean: false, error: "books" });
    }
    if (websites.length === 0) {
      newErrors.push("Websites should not be empty.");
      ListOfReferencesHandler.passInvalid({ boolean: true, error: "websites" });
    } else {
      ListOfReferencesHandler.passInvalid({
        boolean: false,
        error: "websites",
      });
    }
    if (notes === "" || !notes) {
      newErrors.push("Notes should not be empty.");
      ListOfReferencesHandler.passInvalid({ boolean: true, error: "notes" });
    } else {
      ListOfReferencesHandler.passInvalid({ boolean: false, error: "notes" });
    }
    if (Rbooks.length === 0) {
      newErrors.push("Reference Books should not be empty.");
      ListOfReferencesHandler.passInvalid({
        boolean: true,
        error: "referencebooks",
      });
    } else {
      ListOfReferencesHandler.passInvalid({
        boolean: false,
        error: "referencebooks",
      });
    }
    if (
      cognitiveAssessmentCheckedForErrors ||
      psychomotorAssessmentCheckedForErrors ||
      affectiveAssessmentCheckedForErrors
    ) {
      newErrors.push("Learning outcomes must achieve at least one assessment");
      assessmentHandler.getInvalidData(true);
    } else {
      assessmentHandler.getInvalidData(false);
    }
    if (
      cognitiveTeachingMethodsCheckedForErrors ||
      psychomotorTeachingMethodsCheckedForErrors ||
      affectiveTeachingMethodsCheckedForErrors
    ) {
      newErrors.push(
        "Learning outcomes must achieve at least one teaching method"
      );
      teachingMethodsHandler.getInvalidData(true);
    } else {
      teachingMethodsHandler.getInvalidData(false);
    }
    if (
      isNaN(Number(expectedStudyingHoursPerWeek.current?.value)) ||
      expectedStudyingHoursPerWeek.current?.value.trim() === "" ||
      Number(expectedStudyingHoursPerWeek.current?.value) <= 0
    ) {
      const error =
        "Private Expected Studying Hours Per week should not be empty and Positive non-zero value.";
      newErrors.push(error);
      passInvalidExpectedHours({ boolean: true, error });
      setIsexpectedStudyingHoursPerWeekInvalid(true);
    } else {
      setIsexpectedStudyingHoursPerWeekInvalid(false);
      passInvalidExpectedHours({ boolean: false });

      const errorToRemove =
        "Private Expected Studying Hours Per week should not be empty.";

      setErrors((prevErrors) =>
        prevErrors.filter((error) => error !== errorToRemove)
      );
    }
    if (newErrors.length === 0) {
      setErrors([]);

      setHasClass(false);
      ListOfReferencesHandler.submitHandler();
      await buttonRef.current.click();
      await buttonRef2.current.click();
      await buttonRef3.current.click();
      await buttonRef4.current.click();
      await buttonRef5.current.click();
      await buttonRef6.current.click();
      await buttonRef7.current.click();
      handleSubmit();

      setTimeout(() => {
        facilityHandler.downloadMergedPDF();
        setMsg(success);
      }, 2000);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <>
      <div className="flex flex-row w-screen h-auto">
        <CustomReactToPdf targetRef={refToImgBlob} filename="part4.pdf">
          {({ toPdf }) => <ChildComponent toPdf={toPdf} />}
        </CustomReactToPdf>
        <CustomReactToPdf targetRef={refToImgBlob2} filename="part5.pdf">
          {({ toPdf }) => <ChildComponent2 toPdf={toPdf} />}
        </CustomReactToPdf>
        <CustomReactToPdf targetRef={refToImgBlob3} filename="part6.pdf">
          {({ toPdf }) => <ChildComponent3 toPdf={toPdf} />}
        </CustomReactToPdf>
        <CustomReactToPdf targetRef={refToImgBlob4} filename="part7.pdf">
          {({ toPdf }) => <ChildComponent4 toPdf={toPdf} />}
        </CustomReactToPdf>
        <CustomReactToPdf targetRef={refToImgBlob5} filename="part8.pdf">
          {({ toPdf }) => <ChildComponent5 toPdf={toPdf} />}
        </CustomReactToPdf>
        <CustomReactToPdf targetRef={refToImgBlob6} filename="part9.pdf">
          {({ toPdf }) => <ChildComponent6 toPdf={toPdf} />}
        </CustomReactToPdf>
        <CustomReactToPdf targetRef={refToImgBlob7} filename="part10.pdf">
          {({ toPdf }) => <ChildComponent7 toPdf={toPdf} />}
        </CustomReactToPdf>
        <form
          onSubmit={submitHandler}
          className="bg-sky-50 h-auto w-[80%] translate-x-[25%] flex flex-col justify-center items-center text-black ml-1  "
        >
          <div className="contentAddUserFlexible2 flex flex-col gap-10">
            <div className=" flex flex-col" ref={refToImgBlob}>
              <MappingLOs
                CompetencesInvalid={CompetencesInvalid}
                setCompetencesInvalid={setCompetencesInvalid}
                competences={competences}
                numRows={numRows}
                numRows2={numRows2}
                numRows3={numRows3}
                arrays={arrays}
                numCols={numCols}
                checkboxRefs={checkboxRefs}
                checkboxRefs2={checkboxRefs2}
                checkboxRefs3={checkboxRefs3}
                handleCheckboxChange={handleCheckboxChange}
                handleCheckboxChange2={handleCheckboxChange2}
                handleCheckboxChange3={handleCheckboxChange3}
                hasClass={hasClass}
              />
            </div>
            <div className="flex flex-col" ref={refToImgBlob2}>
              <LecturePlan
              setErrorExpectedHours={setErrorExpectedHours}
                setInvalidEmptyTopic={setInvalidEmptyTopic}
                setInvalidPlannedHours={setInvalidPlannedHours}
                setInvalidTopicsRefs={setInvalidTopicsRefs}
                errorEmptyTopics={errorEmptyTopics}
                errorPlannedHours={errorPlannedHours}
                errorTopicsRefs={errorTopcsRefs}
                errorExpectedHours={errorExpectedHours}
                invalidEmptyTopic={invalidEmptyTopic}
                invalidPlannedHours={invalidPlannedHours}
                invalidTopicsRefs={invalidTopicsRefs}
                isexpectedStudyingHoursPerWeekInvalid={
                  isexpectedStudyingHoursPerWeekInvalid
                }
                setIsexpectedStudyingHoursPerWeekInvalid={
                  setIsexpectedStudyingHoursPerWeekInvalid
                }
                expectedStudyingHoursPerWeek={expectedStudyingHoursPerWeek}
                topicsRefs={topicsRefs}
                HoursRefs={HoursRefs}
                outcomes={outcomes}
                hasClass={hasClass}
                addRowWeek={addRowWeek}
                numColsLecturePlan={numColsLecturePlan}
                checkboxRefsLecturePlan={checkboxRefsLecturePlan}
                numRowsLecturePlan={numRowsLecturePlan}
                handleCheckboxChangeLecturePlan={
                  handleCheckboxChangeLecturePlan
                }
                handleHoursChange={handleHoursChange}
                handleTopicChange={handleTopicChange}
                removeRowHandler={removeRowHandler}
              />
            </div>
            <div className=" flex flex-col" ref={refToImgBlob3}>
              {teachingMethodsContent}
            </div>
            <div className="flex flex-col" ref={refToImgBlob4}>
              {assessmentContent}
            </div>
            <div className=" flex flex-col" ref={refToImgBlob5}>
              {assessmentScheduleContent}
            </div>
            <div className=" flex flex-col" ref={refToImgBlob6}>
              {facilityHandlerContent}
            </div>
            <div className=" flex flex-col" ref={refToImgBlob7}>
              {referencesContent}
            </div>

            <div className="flex justify-between">
              <div>{msg}</div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    router.back();
                  }}
                  class="  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg px-5 py-2.5 mx-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Previous
                </button>
                <button
                  type="submit"
                  class="  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg px-5 py-2.5 mx-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              </div>
            </div>
            {errors.length > 0 && (
              <div className="mt-4 bg-red-200 text-red-700 p-4 rounded">
                <p className="font-bold">Invalid Input:</p>
                <ul>
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default part4;
