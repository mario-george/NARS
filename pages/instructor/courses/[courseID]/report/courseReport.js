import React from "react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";
import GradPie from "@/components/chart/GradPie";
import getData from "@/components/chart/getData";
import CompetencesTable from "./competencesTable";
import CourseData from "./courseData";
import TopicsTable from "./TopicsTable";
import AssessmentMethodsTable from "./AssessmentMethodsTable";
import ExamGrades from "./ExamGrades";
import { CompetencesLosAchievement } from "./CompetencesLosAchievement";
import { CompetencesLosGrades } from "./CompetencesLosGrades";
import { CompetencesLosAchievementSurvey } from "./CompetencesLosAchievementSurvey";
import { CompetencesLosSurvey } from "./CompetencesLosSurvey";
import { CompetencesLosAchievementOVerall } from "./CompetencesLosAchievementOverall";
import { CompetencesLosOverall } from "./CompetencesLosOverall";
import CustomReactToPdf from "@/pages/pdf2/pdf333";
import mergeTest from "../getPdf/courseReportPdf";
import { saveAs } from "file-saver";

const courseReport = ({ cookies }) => {
  const router = useRouter();
  const buttonRef2 = useRef(null);
  const buttonRef22 = useRef(null);
  const buttonRef3 = useRef(null);
  const buttonRef4 = useRef(null);
  const buttonRef5 = useRef(null);
  const buttonRef6 = useRef(null);
  const buttonRef7 = useRef(null);
  const buttonRef8 = useRef(null);

  const buttonRef = useRef(null);
  const downloadMergedPDF = async () => {
    const pdfBase64 = localStorage.getItem("courseReport1");
    const pdfBase64_2 = localStorage.getItem("courseReport2");
    const pdfBase64_22 = localStorage.getItem("courseReport3");
    const pdfBase64_222 = localStorage.getItem("courseReport4");
    const pdfBase64_33 = localStorage.getItem("courseReport5");
    const pdfBase64_233 = localStorage.getItem("courseReport6");
    const pdfBase64_244 = localStorage.getItem("courseReport7");
    const pdfBase64_2444 = localStorage.getItem("courseReport8");

    const binaryData = atob(pdfBase64);
    const binaryData2 = atob(pdfBase64_2);
    const binaryData3 = atob(pdfBase64_22);
    const binaryData4 = atob(pdfBase64_222);
    const binaryData5 = atob(pdfBase64_33);
    const binaryData6 = atob(pdfBase64_233);
    const binaryData7 = atob(pdfBase64_244);
    const binaryData8 = atob(pdfBase64_2444);

    const array = new Uint8Array(binaryData.length);
    for (let i = 0; i < binaryData.length; i++) {
      array[i] = binaryData.charCodeAt(i);
    }
    const array2 = new Uint8Array(binaryData2.length);
    for (let i = 0; i < binaryData2.length; i++) {
      array2[i] = binaryData2.charCodeAt(i);
    }

    const array3 = new Uint8Array(binaryData3.length);
    for (let i = 0; i < binaryData3.length; i++) {
      array3[i] = binaryData3.charCodeAt(i);
    }
    const array4 = new Uint8Array(binaryData4.length);
    for (let i = 0; i < binaryData4.length; i++) {
      array4[i] = binaryData4.charCodeAt(i);
    }

    const array5 = new Uint8Array(binaryData5.length);
    for (let i = 0; i < binaryData5.length; i++) {
      array5[i] = binaryData5.charCodeAt(i);
    }

    const array6 = new Uint8Array(binaryData6.length);
    for (let i = 0; i < binaryData6.length; i++) {
      array6[i] = binaryData6.charCodeAt(i);
    }

    const array7 = new Uint8Array(binaryData7.length);
    for (let i = 0; i < binaryData7.length; i++) {
      array7[i] = binaryData7.charCodeAt(i);
    }
    const array8 = new Uint8Array(binaryData8.length);
    for (let i = 0; i < binaryData8.length; i++) {
      array8[i] = binaryData8.charCodeAt(i);
    }

    const blob = new Blob([array], { type: "image/jpeg" });
    const blob2 = new Blob([array2], { type: "image/jpeg" });
    const blob3 = new Blob([array3], { type: "image/jpeg" });
    const blob4 = new Blob([array4], { type: "image/jpeg" });
    const blob5 = new Blob([array5], { type: "image/jpeg" });
    const blob6 = new Blob([array6], { type: "image/jpeg" });
    const blob7 = new Blob([array7], { type: "image/jpeg" });
    const blob8 = new Blob([array8], { type: "image/jpeg" });

    const mergedPdf1 = await mergeTest([blob, blob2]);
    const mergedPdf2 = await mergeTest([blob3, blob4]);
    const mergedPdf3 = await mergeTest([blob5, blob6]);
    const mergedPdf4 = await mergeTest([blob7, blob8]);

    const blobs = [mergedPdf1, mergedPdf2, mergedPdf3, mergedPdf4];
    const ImgBlobs = [
      blob,
      blob2,
      blob3,
      blob4,
      blob5,
      blob6,
      blob7,
      blob8,

    ];
    const mergedBlob = await mergeTest(ImgBlobs);

    saveAs(mergedBlob, "CourseReport.pdf");
  };
  const refToImgBlob = useRef();
  const refToImgBlob2 = useRef();
  const refToImgBlob3 = useRef();
  const refToImgBlob4 = useRef();
  const refToImgBlob5 = useRef();
  const refToImgBlob6 = useRef();
  const refToImgBlob7 = useRef();
  const refToImgBlob8 = useRef();

  const [competenciesMap, setCompetenciesMap] = useState({});
  const [courseCompetences, setCourseCompetences] = useState([]);
  const [avgValues, setAvgValues] = useState({});
  const [avgValuesSurvey, setAvgValuesSurvey] = useState({});
  const [avgAvg, setAvgAvg] = useState({});
  const [avgValuesLOs, setAvgValuesLOs] = useState({});
  const [learningOutcomes, setLearningOutcomes] = useState({});
  const [courseLearningOutcomes, setCourseLearningOutcomes] = useState({});
  const [target, setTarget] = useState([]);
  const [questionsGrades, setQuestionsGrades] = useState({});
  const [courseData, setCourseData] = useState({});
  const [questions, setQuestions] = useState([]);
  const [mid, setMid] = useState([]);
  const [final, setFinal] = useState([]);
  const [numberOfStudents, setNumberOfStudents] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [wantedData, setWantedData] = useState([]);
  const [studentAssessments, setStudentAssessments] = useState([]);
  const [lectureTopics, setLectureTopics] = useState([]);
  const { courseID } = router.query;
  function ChildComponent({ toPdf }) {
    const handleClick = async () => {
      try {
        console.log(toPdf);
        const pdfBlob = await toPdf();
        const reader = new FileReader();
        reader.readAsDataURL(pdfBlob);

        reader.onload = () => {
          const pdfBase64 = reader.result.split(",")[1];
          localStorage.setItem("courseReport1", pdfBase64);
        };
        // do something with pdfBlob
      } catch (error) {
        console.error("Failed to capture PDF:", error);
      }
      setTimeout(() => {}, 300);
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
          localStorage.setItem("courseReport2", pdfBase64);
        };
        // do something with pdfBlob
      } catch (error) {
        console.error("Failed to capture PDF:", error);
      }
      setTimeout(() => {}, 300);
    };

    return (
      <>
        {" "}
        <button ref={buttonRef22} onClick={handleClick} hidden>
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
          localStorage.setItem("courseReport3", pdfBase64);
        };
        // do something with pdfBlob
      } catch (error) {
        console.error("Failed to capture PDF:", error);
      }
      setTimeout(() => {}, 300);
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
          localStorage.setItem("courseReport4", pdfBase64);
        };
        // do something with pdfBlob
      } catch (error) {
        console.error("Failed to capture PDF:", error);
      }
      setTimeout(() => {}, 300);
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
          localStorage.setItem("courseReport5", pdfBase64);
        };
        // do something with pdfBlob
      } catch (error) {
        console.error("Failed to capture PDF:", error);
      }
      setTimeout(() => {}, 300);
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
          localStorage.setItem("courseReport6", pdfBase64);
        };
        // do something with pdfBlob
      } catch (error) {
        console.error("Failed to capture PDF:", error);
      }
      setTimeout(() => {}, 300);
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
          localStorage.setItem("courseReport7", pdfBase64);
        };
        // do something with pdfBlob
      } catch (error) {
        console.error("Failed to capture PDF:", error);
      }
      setTimeout(() => {}, 300);
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
  function ChildComponent8({ toPdf }) {
    const handleClick = async () => {
      try {
        console.log(toPdf);
        const pdfBlob = await toPdf();
        const reader = new FileReader();
        reader.readAsDataURL(pdfBlob);

        reader.onload = () => {
          const pdfBase64 = reader.result.split(",")[1];
          localStorage.setItem("courseReport8", pdfBase64);
        };
        // do something with pdfBlob
      } catch (error) {
        console.error("Failed to capture PDF:", error);
      }
      setTimeout(() => {}, 300);
    };

    return (
      <>
        {" "}
        <button ref={buttonRef8} onClick={handleClick} hidden>
          Capture as PDF
        </button>
      </>
    );
  }

  const submitHandler = async (e) => {
    await  buttonRef.current.click();
    await buttonRef22.current.click();
    await buttonRef3.current.click();
    await buttonRef4.current.click();
    await buttonRef5.current.click();
    await buttonRef6.current.click();
    await buttonRef7.current.click();
    await buttonRef8.current.click();

    e.preventDefault();

    setTimeout(() => {
      // window.location.href = `/instructor/courses/${courseID}/courseSpecs/Pdf`;

      downloadMergedPDF();
    }, 2000);
  };
  const getAvg = (avgs) => {
    const cAvg = {};
    let tempAvg = avgs.map((elm) => {
      let out = {};
      out[elm.code.toUpperCase()] = elm.avg;
      return out;
    });
    tempAvg.forEach((elm) => {
      let temp = Object.keys(elm)[0];
      cAvg[temp] = elm[temp];
    });
    console.log("ORIGINAL AVG VALUES", JSON.stringify(avgs));
    console.log("CALCULATED AVG VALUES", JSON.stringify(cAvg));
    return cAvg;
  };
  

  const getAvgLOs = (avgs) => {
    const cAvg = {};
    let tempAvg = avgs.map((elm) => {
      let out = {};
      out[elm.LO.toUpperCase()] = elm.avg;
      return out;
    });
    tempAvg.forEach((elm) => {
      let temp = Object.keys(elm)[0];
      cAvg[temp] = elm[temp];
    });
    return cAvg;
  };

  useEffect(() => {
    getCourse();
  }, []);

  const getCourse = async () => {
    try {
      const resp = await fetch(
        `${process.env.url}api/v1/courses/created-courses/${courseID}`,
        {
          headers: {
            Authorization: "Bearer " + cookies.token,
          },
        }
      );
      const jsonData = await resp.json();
      const learningOutcomes = jsonData.data.courseSpecs.courseLearningOutcomes;
      setCourseLearningOutcomes(learningOutcomes);
      const mappedLearningOutcomes = {};
      learningOutcomes.forEach((learningOutcomeDomain) => {
        learningOutcomeDomain.learningOutcomes.forEach((learningOutcome) => {
          mappedLearningOutcomes[learningOutcome.code] =
            learningOutcome.mappedCompetence;
        });
      });
      let tempIt = [];
      setCourseData(jsonData.data);
      setLearningOutcomes(mappedLearningOutcomes);
      const { competences, examGrades, questionsGrades, numOfStudents } =
        getData(jsonData.data.report.questions);
      setCourseCompetences(jsonData.data.course.competences);
      setNumberOfStudents(numOfStudents);
      let compD = getAvg(jsonData.data.report.avgCompetences);
      let compI = getAvg(jsonData.data.report.avgCompetencesInDirect)
      console.log(compI)
      tempIt.push(compD);
      setAvgValues(compD);
      tempIt.push(compI);
      setAvgValuesSurvey(compI);
      let avo = {};
      Object.keys(compD).forEach(elm => {
        avo[elm] = (compD[elm] + compI[elm]) / 2
      });
      setAvgAvg(avo);
      tempIt.push(getAvgLOs(jsonData.data.report.avgLOSInDirect));
      setAvgValuesLOs(getAvgLOs(jsonData.data.report.avgLOSInDirect));
      console.log("jsonData.data.report.avgLOSInDirect",
      jsonData.data.report.avgLOSInDirect)
      console.log("jsonData.data.report.avgCompetencesInDirect",
      jsonData.data.report.avgCompetencesInDirect)
      tempIt.push([
        jsonData.data.course.minTarget,
        jsonData.data.course.maxTarget,
      ]);
      setTarget([
        jsonData.data.course.minTarget,
        jsonData.data.course.maxTarget,
      ]);
      const { final, midterm } = examGrades;
      console.log("final ", JSON.stringify(final));
      console.log("midterm ", JSON.stringify(midterm));
      setCompetenciesMap(competences);
      setQuestionsGrades(questionsGrades);
      setQuestions(jsonData.data.report.questions);
      setMid(midterm);
      setFinal(final);
      setStudentAssessments(
        jsonData.data.courseSpecs.studentAssessment.assessmentSchedulesWeight
      );
      setLectureTopics(jsonData.data.courseSpecs.lecturePlan.topics);
      tempIt.push(jsonData.data.report.questions);
      let myTemp = [];
      if (
        typeof(tempIt[1]) == "undefined" ||
        typeof(tempIt[4]) == "undefined"
      ) {
        myTemp.push("Direct Assessment isn't Completed yet");
      }
      if (!tempIt[3][1]) {
        myTemp.push("Target isn't given");
      }
      if (
        typeof(tempIt[1]) == "undefined" ||
        typeof(tempIt[2]) == "undefined"
      ) {
        myTemp.push("Indirect Assessment isn't Completed yet");
      }
      if (!jsonData.data.courseSpecsCompleted) {
        myTemp.push("Course Specs isn't Completed yet");
      }
      setWantedData(myTemp);
      console.log(jsonData.data)
    } catch (e) {
      console.log("ERROR", e);
    }
    setDataLoaded(true);
  };

  

  return (
    <>
      {wantedData[0] ? (
        <div className="items-center text-center">
          {wantedData.map((elm) => (
            <h1 className="text-red">{elm}</h1>
          ))}
        </div>
      ) : (
        <>
          {dataLoaded && (
            <>
              <CustomReactToPdf targetRef={refToImgBlob} filename="part1.pdf">
                {({ toPdf }) => <ChildComponent toPdf={toPdf} />}
              </CustomReactToPdf>
              <CustomReactToPdf targetRef={refToImgBlob2} filename="part2.pdf">
                {({ toPdf }) => <ChildComponent2 toPdf={toPdf} />}
              </CustomReactToPdf>
              <CustomReactToPdf targetRef={refToImgBlob3} filename="part3.pdf">
                {({ toPdf }) => <ChildComponent3 toPdf={toPdf} />}
              </CustomReactToPdf>
              <CustomReactToPdf targetRef={refToImgBlob4} filename="part4.pdf">
                {({ toPdf }) => <ChildComponent4 toPdf={toPdf} />}
              </CustomReactToPdf>
              <CustomReactToPdf targetRef={refToImgBlob5} filename="part5.pdf">
                {({ toPdf }) => <ChildComponent5 toPdf={toPdf} />}
              </CustomReactToPdf>
              <CustomReactToPdf targetRef={refToImgBlob6} filename="part6.pdf">
                {({ toPdf }) => <ChildComponent6 toPdf={toPdf} />}
              </CustomReactToPdf>{" "}
              <CustomReactToPdf targetRef={refToImgBlob7} filename="part7.pdf">
                {({ toPdf }) => <ChildComponent7 toPdf={toPdf} />}
              </CustomReactToPdf>{" "}
              <CustomReactToPdf targetRef={refToImgBlob8} filename="part8.pdf">
                {({ toPdf }) => <ChildComponent8 toPdf={toPdf} />}
              </CustomReactToPdf>{" "}

              <div className="flex flex-row w-auto h-auto ">
                <div className="bg-sky-50 h-auto w-[80%] translate-x-[25%] flex flex-col justify-center items-center text-black ml-1 scrollbar-x-none ">
                  <div className="contentAddUserFlexible2 flex flex-col gap-10  ">
                    <div ref={refToImgBlob}>
                      <CourseData createdCourse={courseData} />
                      <AssessmentMethodsTable
                        questions={questions}
                        competences={courseCompetences}
                        studentAssessments={studentAssessments}
                      />

                      <CompetencesTable
                        className="flex justify-center items-center m-20"
                        courseCompetences={courseCompetences}
                        learningOutcomes={courseLearningOutcomes}
                      />
                      <TopicsTable
                        lectureTopics={lectureTopics}
                        learningOutcomes={courseLearningOutcomes}
                        courseID={courseID}
                        token={cookies.token}
                      />
                    </div>

                    <div className="flex flex-col justify-center items-center">
                      <div className="w-full" ref={refToImgBlob2}>
                        <ExamGrades
                          mid={mid}
                          final={final}
                          numberOfStudents={numberOfStudents}
                        />
                      </div>
                      <div className="w-full" ref={refToImgBlob4}>
                        <CompetencesLosGrades
                          numberOfStudents={numberOfStudents}
                          avgValues={avgValues}
                          competenciesMap={competenciesMap}
                          learningOutcomes={learningOutcomes}
                        />
                      </div>
                      <div className="w-full" ref={refToImgBlob3}>
                        <CompetencesLosAchievement
                          target={target}
                          competenciesMap={competenciesMap}
                          avgValues={avgValues}
                          numberOfStudents={numberOfStudents}
                          learningOutcomes={learningOutcomes}
                        />
                      </div>
                      <div className="w-full" ref={refToImgBlob6}>
                        <CompetencesLosSurvey
                          numberOfStudents={numberOfStudents}
                          avgLOS={avgValuesLOs}
                          avgValues={avgValuesSurvey}
                          learningOutcomes={learningOutcomes}
                        />
                      </div>
                      <div className="w-full" ref={refToImgBlob5}>
                        <CompetencesLosAchievementSurvey
                          target={target}
                          competenciesMap={competenciesMap}
                          avgValues={avgValuesSurvey}
                          avgLOS={avgValuesLOs}
                          numberOfStudents={numberOfStudents}
                          learningOutcomes={learningOutcomes}
                        />
                      </div>
                      <div className="w-full" ref={refToImgBlob8}>
                        <CompetencesLosOverall
                          numberOfStudents={numberOfStudents}
                          avgLOS={avgValuesLOs}
                          avgValues={avgValues}
                          avgValuesSurvey={avgValuesSurvey}
                          learningOutcomes={learningOutcomes}
                        />
                      </div>
                      <div className="w-full" ref={refToImgBlob7}>
                        <CompetencesLosAchievementOVerall
                          target={target}
                          competenciesMap={competenciesMap}
                          avgLOS={avgValuesLOs}
                          avgValues={avgValues}
                          avgValuesSurvey={avgValuesSurvey}
                          numberOfStudents={numberOfStudents}
                          learningOutcomes={learningOutcomes}
                          avgAvg={avgAvg}
                        />
                      </div>
                      <div className="w-full" ref={refToImgBlob8}>
                        <CompetencesLosOverall
                          numberOfStudents={numberOfStudents}
                          avgLOS={avgValuesLOs}
                          avgValues={avgValues}
                          avgValuesSurvey={avgValuesSurvey}
                          learningOutcomes={learningOutcomes}
                          avgAvg={avgAvg}
                        />
                      </div>

                      <button
                        ref={buttonRef2}
                        onClick={submitHandler}
                        class="w-[6rem]  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg px-5 py-2.5 mx-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      >
                        Export
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default courseReport;
