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
      setCourseData(jsonData.data);
      setLearningOutcomes(mappedLearningOutcomes);
      const { competences, examGrades, questionsGrades, numOfStudents } =
        getData(jsonData.data.report.questions);
      setCourseCompetences(jsonData.data.course.competences);
      setNumberOfStudents(numOfStudents);
      setAvgValues(getAvg(jsonData.data.report.avgCompetences));
      setAvgValuesSurvey(getAvg(jsonData.data.report.avgCompetencesInDirect));
      setAvgValuesLOs(getAvgLOs(jsonData.data.report.avgLOSInDirect));
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
  );
};

export default courseReport;
