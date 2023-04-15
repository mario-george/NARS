import React from "react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";
import Attainment from "@/components/chart/Attainment";
import AttainmentPie from "@/components/chart/AttainmentPie";
import Grad2Litter from "@/components/chart/Grad2Litter";
// import CompetenciesBoxPlot from "@/components/chart/CompetenciesBoxPlot";
import CompetenciesQ from "@/components/chart/CompetenciesQ";
import CompetenciesStatisticsTable from "@/components/chart/CompetenciesStatisticsTable";
import CompetenciesBar from "@/components/chart/CompetenciesBar";
import CLOBar from "@/components/chart/CLOBar";
import CLOAttainment from "@/components/chart/CLOAttainment";
import CLOAttainmentPie from "@/components/chart/CLOAttainmentPie";
import CLOStatisticsTable from "@/components/chart/CLOStatisticsTable";
// import CLOBoxPlot from "@/components/chart/CLOBoxPlot";
import CLOQ from "@/components/chart/CLOQ";
import GradPie from "@/components/chart/GradPie";
import getData from "@/components/chart/getData";
import CompetencesTable from "./competencesTable";
import CourseData from "./courseData";
import TopicsTable from "./TopicsTable";
import AssessmentMethodsTable from "./AssessmentMethodsTable";

const courseReport = ({ cookies }) => {
  const router = useRouter();
  //TODO: Most of those states can be just regular variables or useRef (change them at the end)
  const [competenciesMap, setCompetenciesMap] = useState({});
  const [courseCompetences, setCourseCompetences] = useState([]);
  const [avgValues, setAvgValues] = useState({});
  const [learningOutcomes, setLearningOutcomes] = useState({});
  const [courseLearningOutcomes, setCourseLearningOutcomes] = useState({});
  const [questionsGrades, setQuestionsGrades] = useState({});
  const [questions, setQuestions] = useState([]);
  const [mid, setMid] = useState([]);
  const [final, setFinal] = useState([]);
  const [numberOfStudents, setNumberOfStudents] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [studentAssessments, setStudentAssessments] = useState([]);
  const [lectureTopics, setLectureTopics] = useState([]);
  const { courseID } = router.query;

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
      setLearningOutcomes(mappedLearningOutcomes);
      const { competences, examGrades, questionsGrades, numOfStudents } =
        getData(jsonData.data.report.questions);
      setCourseCompetences(jsonData.data.course.competences);
      setNumberOfStudents(numOfStudents);
      setAvgValues(getAvg(jsonData.data.report.avgCompetences));
      const { final, midterm } = examGrades;
      setCompetenciesMap(competences);
      setQuestionsGrades(questionsGrades);
      setQuestions(jsonData.data.report.questions);
      setMid(midterm);
      setFinal(final);
      setStudentAssessments(
        jsonData.data.courseSpecs.studentAssessment.assessmentSchedulesWeight
      );
      setLectureTopics(jsonData.data.courseSpecs.lecturePlan.topics);
      setDataLoaded(true);
    } catch (e) {
      console.log("ERROR", e);
    }
  };

  return (
    <>
      {dataLoaded && (
        <div className="flex flex-row w-screen h-screen mt-2">
          <div className="bg-sky-50 h-screen w-[80%] translate-x-[25%] flex flex-col justify-center items-center text-black ml-1 scrollbar-none">
            <div className="contentAddUser2 flex flex-col gap-10 overflow-auto">
              <CourseData />
              <AssessmentMethodsTable
                questions={questions}
                competences={courseCompetences}
                studentAssessments={studentAssessments}
              />
              {/* <TopicsTable /> */}
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
              <div className="flex flex-col justify-center items-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-2 gap-y-1 w-[90%] h-[30%] mb-20">
                  <p className="grad-title">
                    <span className="md:col-span-2">Midterm Grad</span>
                  </p>
                  <div>
                    <Grad2Litter
                      data={mid}
                      w={100}
                      h={100}
                      grid={15}
                      title="Midterm"
                    />
                  </div>
                  <div>
                    <GradPie
                      data={mid}
                      snum={numberOfStudents}
                      w={500}
                      h={100}
                      title="Midterm"
                    />
                  </div>

                  <p className="grad-title">
                    <span className="md:col-span-2">Final Grad</span>
                  </p>
                  <div>
                    <Grad2Litter
                      data={final}
                      w={100}
                      h={100}
                      grid={15}
                      title="Final"
                    />
                  </div>
                  <div>
                    <GradPie
                      data={final}
                      snum={numberOfStudents}
                      w={500}
                      h={100}
                      title="Final"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-2 gap-y-1 w-[90%] h-[30%] mb-20">
                  <p className="grad-title">
                    <span className="md:col-span-2">
                      Competencies Exam Assessment
                    </span>
                  </p>
                  <div>
                    <CompetenciesQ cmap={competenciesMap} w={20} h={20} />
                  </div>
                  <div>
                    <CompetenciesBar
                      cAvg={avgValues}
                      snum={numberOfStudents}
                      w={20}
                      h={20}
                      grid={10}
                    />
                  </div>
                  <br></br>
                  <div>
                    <Attainment cAvg={avgValues} w={20} h={20} />
                  </div>
                  <div>
                    <AttainmentPie cAvg={avgValues} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-2 gap-y-1 w-[90%] h-[30%] mb-20">
                  <p className="grad-title">
                    <span className="md:col-span-2">LOs Exam Assessment</span>
                  </p>
                  <div>
                    <CLOQ cmap={competenciesMap} clomap={learningOutcomes} />
                  </div>
                  <div>
                    <CLOBar
                      cAvg={avgValues}
                      snum={numberOfStudents}
                      w={20}
                      h={20}
                      grid={10}
                      clomap={learningOutcomes}
                    />
                  </div>
                  <br></br>
                  <div>
                    <CLOAttainment
                      clomap={learningOutcomes}
                      cAvg={avgValues}
                      w={20}
                      h={20}
                    />
                  </div>
                  <div>
                    <CLOAttainmentPie
                      clomap={learningOutcomes}
                      cAvg={avgValues}
                    />
                  </div>
                </div>
                <div className="flex min-h-[80]">
                  <br></br>
                </div>
                {/* Competencies & LOs*/}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default courseReport;
