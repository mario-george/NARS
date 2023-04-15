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
import ExamGrades from "./ExamGrades";
import { CompetencesExamAssessment } from "./CompetencesExamAssessment";
import { LoExamAssessment } from "./LoExamAssessment";

const courseReport = ({ cookies }) => {
  const router = useRouter();
  //TODO: Most of those states can be just regular variables or useRef (change them at the end)
  const [competenciesMap, setCompetenciesMap] = useState({});
  const [courseCompetences, setCourseCompetences] = useState([]);
  const [avgValues, setAvgValues] = useState({});
  const [learningOutcomes, setLearningOutcomes] = useState({});
  const [courseLearningOutcomes, setCourseLearningOutcomes] = useState({});
  const [questionsGrades, setQuestionsGrades] = useState({});
  const [courseData, setCourseData] = useState({});
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
      setCourseData(jsonData.data);
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
              <CourseData createdCourse={courseData} />
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
                <ExamGrades
                  mid={mid}
                  final={final}
                  numberOfStudents={numberOfStudents}
                />
                <CompetencesExamAssessment
                  competenciesMap={competenciesMap}
                  avgValues={avgValues}
                  numberOfStudents={numberOfStudents}
                />
                <LoExamAssessment
                  numberOfStudents={numberOfStudents}
                  avgValues={avgValues}
                  competenciesMap={competenciesMap}
                  learningOutcomes={learningOutcomes}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default courseReport;
