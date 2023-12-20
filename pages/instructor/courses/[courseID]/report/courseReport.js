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
import { CompetencesLosAchievement } from "@/components/reportComponents/CompetencesLosAchievement";
import { CompetencesLosGrades } from "@/components/reportComponents/CompetencesLosGrades";
import { CompetencesLosAchievementSurvey } from "@/components/reportComponents/CompetencesLosAchievementSurvey";
import { CompetencesLosSurvey } from "@/components/reportComponents/CompetencesLosSurvey";
import { CompetencesLosAchievementOVerall } from "@/components/reportComponents/CompetencesLosAchievementOverall";
import { CompetencesLosOverall } from "@/components/reportComponents/CompetencesLosOverall";
import CustomReactToPdf from "@/components/pdf2/pdf333";
import mergeTest from "../../../../../components/getPdf/MERGEONLYONE.js/test";
import { saveAs } from "file-saver";
import ReportNotComplete from "./ReportNotComplete";
import { isIndexSignatureDeclaration } from "typescript";
import DefaultPage from "@/components/helper/DefaultPageCourseReport";

const courseReport = ({ cookies }) => {
  useEffect(() => {
    useEffect(() => {
      if (typeof window !== 'undefined') {
          // document.body.classList.add("resize-none");
      }
  }, []);

    return () => {
      useEffect(() => {
        if (typeof window !== 'undefined') {
            // document.body.classList.remove("resize-none");
        }
    }, []);
    };
  }, []);
  async function downloadPdf(e) {
    e.preventDefault();
    const blob = pdfBlob;
    const url = window.URL.createObjectURL(new Blob([blob]));

    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    let replacedIns = instanceName;
    replacedIns = replacedIns.replace(/\n$/, "");
    downloadLink.download = replacedIns + ".pdf";

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    window.URL.revokeObjectURL(url);
  }
  const sendPdfBlob = async (blob) => {
    const formData = new FormData();

    formData.append("courseInstance", courseID);
    formData.append("courseReport", blob, "mypdf.pdf");
    try {
      const r = await fetch(`${process.env.url}api/v1/courses/reportPdf/`, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/form-data",
          Authorization: "Bearer " + cookies.token,
        },
      });

      const resp = await r.json();
      console.log(resp);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    const getData = async function () {
      const r2 = await fetch(
        `${process.env.url}api/v1/courses/reportPdf/${courseID}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + cookies.token,
          },
        }
      );
      if (r2.status === 200) {
        // PDF is found
        const blobpdfFile = await r2.blob();

        setpdfBlob(blobpdfFile);
        setBlobIsFound(true);
      }
    };
    getData();
  }, []);
  const [instanceName, setInstanceName] = useState("Course Report");
  const [courseCode, setCourseCode] = useState("");

  const [pdfBlob, setpdfBlob] = useState();
  const [blobIsFound, setBlobIsFound] = useState(false);
  const router = useRouter();
  const buttonRef = useRef(null);
  const buttonRef2 = useRef(null);
  const buttonRef3 = useRef(null);
  const buttonRef4 = useRef(null);
  const buttonRef5 = useRef(null);
  const buttonRef6 = useRef(null);
  const buttonRef7 = useRef(null);
  const buttonRef8 = useRef(null);
  const buttonRef9 = useRef(null);
  const buttonRef10 = useRef(null);
  const buttonRef11 = useRef(null);
  const buttonRef12 = useRef(null);
  const buttonRef13 = useRef(null);
  const buttonRef14 = useRef(null);
  const buttonRef15 = useRef(null);
  const buttonRef16 = useRef(null);
  useEffect(() => {
    localStorage.removeItem("courseReport1");
    localStorage.removeItem("courseReport2");
    localStorage.removeItem("courseReport3");
    localStorage.removeItem("courseReport4");
    localStorage.removeItem("courseReport5");
    localStorage.removeItem("courseReport6");
    localStorage.removeItem("courseReport7");
    localStorage.removeItem("courseReport8");
    localStorage.removeItem("courseReport9");
    localStorage.removeItem("courseReport10");
    localStorage.removeItem("courseReport11");
    localStorage.removeItem("courseReport12");
    localStorage.removeItem("courseReport13");
    localStorage.removeItem("courseReport14");
    localStorage.removeItem("courseReport15");
    localStorage.removeItem("courseReport16");
  }, []);
  const downloadMergedPDF = async (boolean) => {
    const pdfBase64 = localStorage.getItem("courseReport1");
    const pdfBase64_2 = localStorage.getItem("courseReport2");
    const pdfBase64_22 = localStorage.getItem("courseReport3");
    const pdfBase64_222 = localStorage.getItem("courseReport4");
    const pdfBase64_33 = localStorage.getItem("courseReport5");
    const pdfBase64_233 = localStorage.getItem("courseReport6");
    const pdfBase64_244 = localStorage.getItem("courseReport7");
    const pdfBase64_part8 = localStorage.getItem("courseReport8");
    const pdfBase64_part9 = localStorage.getItem("courseReport9");
    const pdfBase64_part10 = localStorage.getItem("courseReport10");
    const pdfBase64_part11 = localStorage.getItem("courseReport11");
    const pdfBase64_part12 = localStorage.getItem("courseReport12");
    const pdfBase64_part13 = localStorage.getItem("courseReport13");
    const pdfBase64_part14 = localStorage.getItem("courseReport14");
    const pdfBase64_part15 = localStorage.getItem("courseReport15");
    const pdfBase64_part16 = localStorage.getItem("courseReport16");

    const binaryData = atob(pdfBase64);
    const binaryData2 = atob(pdfBase64_2);
    const binaryData3 = atob(pdfBase64_22);
    const binaryData4 = atob(pdfBase64_222);
    const binaryData5 = atob(pdfBase64_33);
    const binaryData6 = atob(pdfBase64_233);
    const binaryData7 = atob(pdfBase64_244);
    const binaryData8 = atob(pdfBase64_part8);
    const binaryData9 = atob(pdfBase64_part9);
    const binaryData10 = atob(pdfBase64_part10);
    const binaryData11 = atob(pdfBase64_part11);
    const binaryData12 = atob(pdfBase64_part12);
    const binaryData13 = atob(pdfBase64_part13);
    const binaryData14 = atob(pdfBase64_part14);
    const binaryData15 = atob(pdfBase64_part15);
    const binaryData16 = atob(pdfBase64_part16);

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
    const array9 = new Uint8Array(binaryData9.length);
    for (let i = 0; i < binaryData9.length; i++) {
      array9[i] = binaryData9.charCodeAt(i);
    }
    const array10 = new Uint8Array(binaryData10.length);
    for (let i = 0; i < binaryData10.length; i++) {
      array10[i] = binaryData10.charCodeAt(i);
    }
    const array11 = new Uint8Array(binaryData11.length);
    for (let i = 0; i < binaryData11.length; i++) {
      array11[i] = binaryData11.charCodeAt(i);
    }
    const array12 = new Uint8Array(binaryData12.length);
    for (let i = 0; i < binaryData12.length; i++) {
      array12[i] = binaryData12.charCodeAt(i);
    }
    const array13 = new Uint8Array(binaryData13.length);
    for (let i = 0; i < binaryData13.length; i++) {
      array13[i] = binaryData13.charCodeAt(i);
    }
    const array14 = new Uint8Array(binaryData14.length);
    for (let i = 0; i < binaryData14.length; i++) {
      array14[i] = binaryData14.charCodeAt(i);
    }
    const array15 = new Uint8Array(binaryData15.length);
    for (let i = 0; i < binaryData15.length; i++) {
      array15[i] = binaryData15.charCodeAt(i);
    }
    const array16 = new Uint8Array(binaryData16.length);
    for (let i = 0; i < binaryData16.length; i++) {
      array16[i] = binaryData16.charCodeAt(i);
    }

    const blob = new Blob([array], { type: "image/jpeg" });
    const blob2 = new Blob([array2], { type: "image/jpeg" });
    const blob3 = new Blob([array3], { type: "image/jpeg" });
    const blob4 = new Blob([array4], { type: "image/jpeg" });
    const blob5 = new Blob([array5], { type: "image/jpeg" });
    const blob6 = new Blob([array6], { type: "image/jpeg" });
    const blob7 = new Blob([array7], { type: "image/jpeg" });
    const blob8 = new Blob([array8], { type: "image/jpeg" });
    const blob9 = new Blob([array9], { type: "image/jpeg" });
    const blob10 = new Blob([array10], { type: "image/jpeg" });
    const blob11 = new Blob([array11], { type: "image/jpeg" });
    const blob12 = new Blob([array12], { type: "image/jpeg" });
    const blob13 = new Blob([array13], { type: "image/jpeg" });
    const blob14 = new Blob([array14], { type: "image/jpeg" });
    const blob15 = new Blob([array15], { type: "image/jpeg" });
    const blob16 = new Blob([array16], { type: "image/jpeg" });

    const ImgBlobs = [
      blob,
      blob2,
      blob3,
      blob4,
      blob5,
      blob6,
      blob7,
      blob8,
      blob9,
      blob10,
      blob11,
      blob12,
      blob13,
      blob14,
      blob15,
      blob16,
    ];
    const mergedBlob = await mergeTest(ImgBlobs);
    sendPdfBlob(mergedBlob);
    if (boolean) {
      saveAs(mergedBlob, "CourseReport.pdf");
    }
  };
  const refToImgBlob = useRef();
  const refToImgBlob2 = useRef();
  const refToImgBlob3 = useRef();
  const refToImgBlob4 = useRef();
  const refToImgBlob5 = useRef();
  const refToImgBlob6 = useRef();
  const refToImgBlob7 = useRef();
  const refToImgBlob8 = useRef();
  const refToImgBlob9 = useRef();
  const refToImgBlob10 = useRef();
  const refToImgBlob11 = useRef();
  const refToImgBlob12 = useRef();
  const refToImgBlob13 = useRef();
  const refToImgBlob14 = useRef();
  const refToImgBlob15 = useRef();
  const refToImgBlob16 = useRef();

  const [competenciesMap, setCompetenciesMap] = useState({});
  const [courseCompetences, setCourseCompetences] = useState([]);
  const [avgValues, setAvgValues] = useState({});
  const [avgValuesSurvey, setAvgValuesSurvey] = useState({});
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
  const [reportCompleted, setReportCompleted] = useState(false);
  const [courseFullMark, setCourseFullMark] = useState(0);
  const { courseID } = router.query;

  const isDirectAssessmentComplete = useRef(false);
  const isInDirectAssessmentComplete = useRef(false);
  const isCourseSpecsComplete = useRef(false);
  const doesCourseHaveCompetences = useRef(false);
  const doesCourseHaveTarget = useRef(false);

  function CustomChildComponent({ toPdf, buttonRef, nameOfpdfItem }) {
    const handleClick = async () => {
      try {
        console.log(toPdf);
        const pdfBlob = await toPdf();
        const reader = new FileReader();
        reader.readAsDataURL(pdfBlob);

        reader.onload = () => {
          const pdfBase64 = reader.result.split(",")[1];
          localStorage.setItem(nameOfpdfItem, pdfBase64);
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

  const submitHandler = async (e) => {
    await buttonRef.current.click();
    await buttonRef2.current.click();
    await buttonRef3.current.click();
    await buttonRef4.current.click();
    await buttonRef5.current.click();
    await buttonRef6.current.click();
    await buttonRef7.current.click();
    await buttonRef8.current.click();
    await buttonRef9.current.click();
    await buttonRef10.current.click();
    await buttonRef11.current.click();
    await buttonRef12.current.click();
    await buttonRef13.current.click();
    await buttonRef14.current.click();
    await buttonRef15.current.click();
    await buttonRef16.current.click();

    e.preventDefault();

    // send courseRep to save to the backend
    setTimeout(() => {
      downloadMergedPDF(false);
    }, 2000);
  };
  const downloadOnly = async (e) => {
    if (e) {
      e.preventDefault();
    }
    await buttonRef.current.click();
    await buttonRef2.current.click();
    await buttonRef3.current.click();
    await buttonRef4.current.click();
    await buttonRef5.current.click();
    await buttonRef6.current.click();
    await buttonRef7.current.click();
    await buttonRef8.current.click();
    await buttonRef9.current.click();
    await buttonRef10.current.click();
    await buttonRef11.current.click();
    await buttonRef12.current.click();
    await buttonRef13.current.click();
    await buttonRef14.current.click();
    await buttonRef15.current.click();
    await buttonRef16.current.click();

    setTimeout(() => {
      downloadMergedPDF(true);
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
  async function downloadPdf(e) {
    if (e) {
      e.preventDefault();
    }
    const blob = pdfBlob;
    const url = window.URL.createObjectURL(new Blob([blob]));

    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    let replacedIns = instanceName;
    replacedIns = replacedIns.replace(/\n$/, "");
    downloadLink.download = replacedIns + ".pdf";

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    window.URL.revokeObjectURL(url);
  }
  useEffect(() => {
    const getNameCode = async function () {
      const getNameCodeReq = await fetch(
        `${process.env.url}api/v1/courses/created-courses/?_id=${courseID}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + cookies.token,
          },
        }
      );
      const dataGetNameCodeReq = await getNameCodeReq.json();

      setInstanceName(dataGetNameCodeReq.data[0].course.name);
      setCourseCode(dataGetNameCodeReq.data[0].course.code);
    };
    getNameCode();
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

      isDirectAssessmentComplete.value =
        jsonData.data.report.questions &&
        jsonData.data.report.questions.length > 0;
      isInDirectAssessmentComplete.value =
        jsonData.data.report.avgCompetencesInDirect &&
        jsonData.data.report.avgCompetencesInDirect.length > 0;
      isCourseSpecsComplete.value = jsonData.data.courseSpecsCompleted;
      doesCourseHaveCompetences.value =
        jsonData.data.course.competences &&
        jsonData.data.course.competences.length > 0;
      doesCourseHaveTarget.value =
        jsonData.data.course.minTarget && jsonData.data.course.maxTarget;
      setReportCompleted(
        isDirectAssessmentComplete.value &&
          isInDirectAssessmentComplete.value &&
          isCourseSpecsComplete.value &&
          doesCourseHaveCompetences &&
          doesCourseHaveTarget
      );

      const learningOutcomes = jsonData.data.courseSpecs.courseLearningOutcomes;
      if (learningOutcomes && learningOutcomes.length > 0) {
        setCourseLearningOutcomes(learningOutcomes);
        const mappedLearningOutcomes = {};
        learningOutcomes.forEach((learningOutcomeDomain) => {
          if (learningOutcomeDomain.learningOutcomes) {
            learningOutcomeDomain.learningOutcomes.forEach(
              (learningOutcome) => {
                if (!learningOutcome.code || !learningOutcome.mappedCompetence)
                  return;
                mappedLearningOutcomes[learningOutcome.code] =
                  learningOutcome.mappedCompetence;
              }
            );
          }
        });
        setLearningOutcomes(mappedLearningOutcomes);
      } else {
        console.log("ERROR", "NO LEARNING OUTCOMES FOUND");
      }

      setCourseData(jsonData.data);
      setCourseFullMark(parseInt(jsonData.data.course.fullMark));
      const courseSpecs = jsonData.data.courseSpecs;
      if (
        courseSpecs &&
        courseSpecs.studentAssessment &&
        courseSpecs.studentAssessment.assessmentSchedulesWeight
      ) {
        setStudentAssessments(
          jsonData.data.courseSpecs.studentAssessment.assessmentSchedulesWeight
        );
      }
      if (courseSpecs.lecturePlan && courseSpecs.lecturePlan.topics) {
        setLectureTopics(jsonData.data.courseSpecs.lecturePlan.topics);
      }
      setCourseCompetences(jsonData.data.course.competences);

      if (jsonData.data.course.minTarget && jsonData.data.course.maxTarget) {
        setTarget([
          jsonData.data.course.minTarget,
          jsonData.data.course.maxTarget,
        ]);
      } else {
        console.log("ERROR", "COURSE DOES NOT HAVE A TARGET");
      }

      if (isDirectAssessmentComplete.value) {
        const { competences, examGrades, questionsGrades, numOfStudents } =
          getData(jsonData.data.report.questions);

        setNumberOfStudents(numOfStudents);
        setAvgValues(getAvg(jsonData.data.report.avgCompetences));
        setAvgValuesSurvey(getAvg(jsonData.data.report.avgCompetencesInDirect));
        setAvgValuesLOs(getAvgLOs(jsonData.data.report.avgLOSInDirect));

        const { final, midterm } = examGrades;
        setCompetenciesMap(competences);
        console.log("COMPETNECES MAP IS ", JSON.stringify(competences));
        setQuestionsGrades(questionsGrades);
        setQuestions(jsonData.data.report.questions);
        setMid(midterm);
        setFinal(final);
      }

      setDataLoaded(true);
      console.log(jsonData.data);
    } catch (e) {
      console.log("ERROR", e);
    }
  };
  if (blobIsFound) {
    return (
      <DefaultPage
        downloadPdf={downloadPdf}
        cookies={cookies}
        courseID={courseID}
        instanceName={instanceName}
        courseCode={courseCode}
        setBlobIsFound={setBlobIsFound}
      />
    );
  }
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
                {({ toPdf }) => (
                  <CustomChildComponent
                    toPdf={toPdf}
                    buttonRef={buttonRef}
                    nameOfpdfItem={`courseReport1`}
                  />
                )}
              </CustomReactToPdf>
              <CustomReactToPdf targetRef={refToImgBlob2} filename="part2.pdf">
                {({ toPdf }) => (
                  <CustomChildComponent
                    toPdf={toPdf}
                    buttonRef={buttonRef2}
                    nameOfpdfItem={`courseReport2`}
                  />
                )}
              </CustomReactToPdf>
              <CustomReactToPdf targetRef={refToImgBlob3} filename="part3.pdf">
                {({ toPdf }) => (
                  <CustomChildComponent
                    toPdf={toPdf}
                    buttonRef={buttonRef3}
                    nameOfpdfItem={`courseReport3`}
                  />
                )}
              </CustomReactToPdf>
              <CustomReactToPdf targetRef={refToImgBlob4} filename="part4.pdf">
                {({ toPdf }) => (
                  <CustomChildComponent
                    toPdf={toPdf}
                    buttonRef={buttonRef4}
                    nameOfpdfItem={`courseReport4`}
                  />
                )}
              </CustomReactToPdf>
              <CustomReactToPdf targetRef={refToImgBlob5} filename="part5.pdf">
                {({ toPdf }) => (
                  <CustomChildComponent
                    toPdf={toPdf}
                    buttonRef={buttonRef5}
                    nameOfpdfItem={`courseReport5`}
                  />
                )}
              </CustomReactToPdf>
              <CustomReactToPdf targetRef={refToImgBlob6} filename="part6.pdf">
                {({ toPdf }) => (
                  <CustomChildComponent
                    toPdf={toPdf}
                    buttonRef={buttonRef6}
                    nameOfpdfItem={`courseReport6`}
                  />
                )}
              </CustomReactToPdf>{" "}
              <CustomReactToPdf targetRef={refToImgBlob7} filename="part7.pdf">
                {({ toPdf }) => (
                  <CustomChildComponent
                    toPdf={toPdf}
                    buttonRef={buttonRef7}
                    nameOfpdfItem={`courseReport7`}
                  />
                )}
              </CustomReactToPdf>{" "}
              <CustomReactToPdf targetRef={refToImgBlob8} filename="part8.pdf">
                {({ toPdf }) => (
                  <CustomChildComponent
                    toPdf={toPdf}
                    buttonRef={buttonRef8}
                    nameOfpdfItem={`courseReport8`}
                  />
                )}
              </CustomReactToPdf>{" "}
              <CustomReactToPdf targetRef={refToImgBlob9} filename="part9.pdf">
                {({ toPdf }) => (
                  <CustomChildComponent
                    toPdf={toPdf}
                    buttonRef={buttonRef9}
                    nameOfpdfItem={`courseReport9`}
                  />
                )}
              </CustomReactToPdf>{" "}
              <CustomReactToPdf
                targetRef={refToImgBlob10}
                filename="part10.pdf"
              >
                {({ toPdf }) => (
                  <CustomChildComponent
                    toPdf={toPdf}
                    buttonRef={buttonRef10}
                    nameOfpdfItem={`courseReport10`}
                  />
                )}
              </CustomReactToPdf>{" "}
              <CustomReactToPdf
                targetRef={refToImgBlob11}
                filename="part11.pdf"
              >
                {({ toPdf }) => (
                  <CustomChildComponent
                    toPdf={toPdf}
                    buttonRef={buttonRef11}
                    nameOfpdfItem={`courseReport11`}
                  />
                )}
              </CustomReactToPdf>{" "}
              <CustomReactToPdf
                targetRef={refToImgBlob12}
                filename="part12.pdf"
              >
                {({ toPdf }) => (
                  <CustomChildComponent
                    toPdf={toPdf}
                    buttonRef={buttonRef12}
                    nameOfpdfItem={`courseReport12`}
                  />
                )}
              </CustomReactToPdf>{" "}
              <CustomReactToPdf
                targetRef={refToImgBlob13}
                filename="part13.pdf"
              >
                {({ toPdf }) => (
                  <CustomChildComponent
                    toPdf={toPdf}
                    buttonRef={buttonRef13}
                    nameOfpdfItem={`courseReport13`}
                  />
                )}
              </CustomReactToPdf>{" "}
              <CustomReactToPdf
                targetRef={refToImgBlob14}
                filename="part14.pdf"
              >
                {({ toPdf }) => (
                  <CustomChildComponent
                    toPdf={toPdf}
                    buttonRef={buttonRef14}
                    nameOfpdfItem={`courseReport14`}
                  />
                )}
              </CustomReactToPdf>{" "}
              <CustomReactToPdf
                targetRef={refToImgBlob15}
                filename="part15.pdf"
              >
                {({ toPdf }) => (
                  <CustomChildComponent
                    toPdf={toPdf}
                    buttonRef={buttonRef15}
                    nameOfpdfItem={`courseReport15`}
                  />
                )}
              </CustomReactToPdf>{" "}
              <CustomReactToPdf
                targetRef={refToImgBlob16}
                filename="part16.pdf"
              >
                {({ toPdf }) => (
                  <CustomChildComponent
                    toPdf={toPdf}
                    buttonRef={buttonRef16}
                    nameOfpdfItem={`courseReport16`}
                  />
                )}
              </CustomReactToPdf>{" "}
              <div className="flex flex-row w-auto h-auto ">
                {reportCompleted ? (
                  <div className="bg-sky-50 h-auto w-[80%] translate-x-[25%] flex flex-col justify-center items-center text-black ml-1 scrollbar-x-none resize-none  ">
                    <div className="container contentAddUserFlexible2 flex flex-col gap-10  ">
                      <div ref={refToImgBlob}>
                        <CourseData createdCourse={courseData} />
                      </div>
                      <div ref={refToImgBlob2}>
                        <AssessmentMethodsTable
                          questions={questions}
                          competences={courseCompetences}
                          studentAssessments={studentAssessments}
                          courseFullMark={courseFullMark}
                        />
                      </div>

                      <div ref={refToImgBlob3}>
                        <CompetencesTable
                          courseCompetences={courseCompetences}
                          learningOutcomes={courseLearningOutcomes}
                        />
                      </div>
                      <div ref={refToImgBlob4}>
                        <TopicsTable
                          lectureTopics={lectureTopics}
                          learningOutcomes={courseLearningOutcomes}
                          courseID={courseID}
                          token={cookies.token}
                        />
                      </div>

                      <div className="flex flex-col justify-center items-center">
                        <div className="w-full">
                          <ExamGrades
                            mid={mid}
                            final={final}
                            numberOfStudents={numberOfStudents}
                            refToImgBlob6={refToImgBlob6}
                            refToImgBlob5={refToImgBlob5}
                          />
                        </div>
                        <div className="w-full">
                          <CompetencesLosGrades
                            numberOfStudents={numberOfStudents}
                            avgValues={avgValues}
                            competenciesMap={competenciesMap}
                            learningOutcomes={learningOutcomes}
                            refToImgBlob7={refToImgBlob7}
                            refToImgBlob8={refToImgBlob8}
                          />
                        </div>
                        <div className="w-full">
                          <CompetencesLosAchievement
                            refToImgBlob9={refToImgBlob9}
                            refToImgBlob10={refToImgBlob10}
                            target={target}
                            competenciesMap={competenciesMap}
                            avgValues={avgValues}
                            numberOfStudents={numberOfStudents}
                            learningOutcomes={learningOutcomes}
                          />
                        </div>
                        <div className="w-full" ref={refToImgBlob11}>
                          <CompetencesLosSurvey
                            numberOfStudents={numberOfStudents}
                            avgLOS={avgValuesLOs}
                            avgValues={avgValuesSurvey}
                            learningOutcomes={learningOutcomes}
                          />
                        </div>
                        <div className="w-full">
                          <CompetencesLosAchievementSurvey
                            target={target}
                            competenciesMap={competenciesMap}
                            avgValues={avgValuesSurvey}
                            avgLOS={avgValuesLOs}
                            numberOfStudents={numberOfStudents}
                            learningOutcomes={learningOutcomes}
                            refToImgBlob13={refToImgBlob13}
                            refToImgBlob12={refToImgBlob12}
                          />
                        </div>
                        <div className="w-full" ref={refToImgBlob14}>
                          <CompetencesLosOverall
                            numberOfStudents={numberOfStudents}
                            avgLOS={avgValuesLOs}
                            avgValues={avgValues}
                            avgValuesSurvey={avgValuesSurvey}
                            learningOutcomes={learningOutcomes}
                          />
                        </div>
                        <div className="w-full">
                          <CompetencesLosAchievementOVerall
                            target={target}
                            competenciesMap={competenciesMap}
                            avgLOS={avgValuesLOs}
                            avgValues={avgValues}
                            avgValuesSurvey={avgValuesSurvey}
                            numberOfStudents={numberOfStudents}
                            learningOutcomes={learningOutcomes}
                            refToImgBlob15={refToImgBlob15}
                            refToImgBlob16={refToImgBlob16}
                          />
                        </div>
                        <div className="flex justify-end w-full">
                          <button
                            onClick={downloadOnly}
                            class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg px-5 py-2.5 mx-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                          >
                            Download Pdf
                          </button>
                          <button
                            onClick={submitHandler}
                            class="  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg px-5 py-2.5 mx-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-sky-50 h-[100%] w-[80%] translate-x-[25%] flex flex-col justify-center items-center text-black ml-1 scrollbar-x-none ">
                    <ReportNotComplete
                      isInDirectAssessmentComplete={
                        isInDirectAssessmentComplete.value
                      }
                      isDirectAssessmentComplete={
                        isDirectAssessmentComplete.value
                      }
                      isCourseSpecsComplete={isCourseSpecsComplete.value}
                      doesCourseHaveCompetences={
                        doesCourseHaveCompetences.value
                      }
                      doesCourseHaveTarget={doesCourseHaveTarget.value}
                    />
                  </div>
                )}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default courseReport;
