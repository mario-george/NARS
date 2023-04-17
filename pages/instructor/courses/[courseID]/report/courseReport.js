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

const courseReport = ({ cookies }) => {
  const router = useRouter();
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
      tempIt.push(getAvg(jsonData.data.report.avgCompetences));
      setAvgValues(getAvg(jsonData.data.report.avgCompetences));
      tempIt.push(getAvg(jsonData.data.report.avgCompetencesInDirect));
      setAvgValuesSurvey(getAvg(jsonData.data.report.avgCompetencesInDirect));
      tempIt.push(getAvgLOs(jsonData.data.report.avgLOSInDirect));
      setAvgValuesLOs(getAvgLOs(jsonData.data.report.avgLOSInDirect));
      tempIt.push([
        jsonData.data.course.target.min,
        jsonData.data.course.target.max,
      ]);
      setTarget([
        jsonData.data.course.target.min,
        jsonData.data.course.target.max,
      ]);
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
      tempIt.push();
      let myTemp = [jsonData.data.report.questions];
      if (Object.keys(tempIt[0]).length && !tempIt[4][0]) {
        myTemp.push("Direct Assessment isn't Completed yet");
      }
      if (!tempIt[3][0]) {
        myTemp.push("Target isn't given");
      }
      if (!Object.keys(tempIt[1]).length && !Object.keys(tempIt[2]).length) {
        myTemp.push("Indirect Assessment isn't Completed yet");
      }
      if (jsonData.data.courseSpecsCompleted) {
        myTemp.push("Course Specs isn't Completed yet");
      }
      setWantedData(myTemp);
    } catch (e) {
      console.log("ERROR", e);
    }
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
            <div className="flex flex-row w-screen h-screen mt-2">
              <div className="bg-sky-50 h-screen w-[80%] translate-x-[25%] flex flex-col justify-center items-center text-black ml-1 scrollbar-none">
                <div className="contentAddUser2 flex flex-col gap-10 overflow-auto">
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
                  <div className="flex flex-col justify-center items-center">
                    <ExamGrades
                      mid={mid}
                      final={final}
                      numberOfStudents={numberOfStudents}
                    />
                    <CompetencesLosAchievement
                      target={target}
                      competenciesMap={competenciesMap}
                      avgValues={avgValues}
                      numberOfStudents={numberOfStudents}
                      learningOutcomes={learningOutcomes}
                    />
                    <CompetencesLosGrades
                      numberOfStudents={numberOfStudents}
                      avgValues={avgValues}
                      competenciesMap={competenciesMap}
                      learningOutcomes={learningOutcomes}
                    />
                    <CompetencesLosAchievementSurvey
                      target={target}
                      competenciesMap={competenciesMap}
                      avgValues={avgValuesSurvey}
                      avgLOS={avgValuesLOs}
                      numberOfStudents={numberOfStudents}
                      learningOutcomes={learningOutcomes}
                    />
                    <CompetencesLosSurvey
                      numberOfStudents={numberOfStudents}
                      avgLOS={avgValuesLOs}
                      avgValues={avgValuesSurvey}
                      learningOutcomes={learningOutcomes}
                    />
                    <CompetencesLosAchievementOVerall
                      target={target}
                      competenciesMap={competenciesMap}
                      avgLOS={avgValuesLOs}
                      avgValues={avgValues}
                      avgValuesSurvey={avgValuesSurvey}
                      numberOfStudents={numberOfStudents}
                      learningOutcomes={learningOutcomes}
                    />
                    <CompetencesLosOverall
                      numberOfStudents={numberOfStudents}
                      avgLOS={avgValuesLOs}
                      avgValues={avgValues}
                      avgValuesSurvey={avgValuesSurvey}
                      learningOutcomes={learningOutcomes}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default courseReport;