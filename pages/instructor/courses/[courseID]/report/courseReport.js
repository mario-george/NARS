import React from "react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";
import Attainment from "@/components/chart/Attainment";
import Grad2Litter from "@/components/chart/Grad2Litter";
import StudentScatter from "@/components/chart/StudentScatter";
import CompetenciesBoxPlot from "@/components/chart/CompetenciesBoxPlot";
import CompetenciesQ from "@/components/chart/CompetenciesQ";
import CompetenciesAttainment from "@/components/chart/CompetenciesAttainment";
import CompetenciesStatisticsTable from "@/components/chart/CompetenciesStatisticsTable";
import CompetenciesBar from "@/components/chart/CompetenciesBar";
import CLOBar from "@/components/chart/CLOBar";
import CLOAttainment from "@/components/chart/CLOAttainment";
import CLOStatisticsTable from "@/components/chart/CLOStatisticsTable";
import CLOBoxPlot from "@/components/chart/CLOBoxPlot";
import CLOTable from "@/components/chart/CLOTable";
import CLOQ from "@/components/chart/CLOQ";
import GradHist from "@/components/chart/GradHist";
import getData from "@/components/chart/getData";

const courseReport = ({ cookies }) => {
  const router = useRouter();
  const [competenciesMap, setCompetenciesMap] = useState({});
  const [avgValues, setAvgValues] = useState({});
  const [learningOutcomes, setLearningOutcomes] = useState({});
  const [questionsGrades, setQuestionsGrades] = useState({});
  const [quiz, setQuiz] = useState([]);
  const [mid, setMid] = useState([]);
  const [final, setFinal] = useState([]);
  const [numberOfStudents, setNumberOfStudents] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);
  const { courseID } = router.query;

  const getAvg = (avgs) => {
    return avgs.map((elm) => {
      let out = {};
      out[elm.code.toUpperCase()] = elm.avg;
      return out;
    });
  };

  useEffect(() => {
    getCourse();
  }, []);

  const getCourse = async () => {
    try {
      console.log("GETTIN COURSES", courseID);
      const resp = await fetch(
        `${process.env.url}api/v1/courses/created-courses/${courseID}`,
        {
          headers: {
            Authorization: "Bearer " + cookies.token,
          },
        }
      );
      const jsonData = await resp.json();
      console.log("DATA IS ", jsonData.data);
      const learningOutcomes = jsonData.data.courseSpecs.courseLearningOutcomes;
      const mappedLearningOutcomes = {};
      learningOutcomes.forEach((learningOutcomeDomain, index) => {
        learningOutcomeDomain.learningOutcomes.forEach((learningOutcome) => {
          mappedLearningOutcomes[learningOutcome.code] =
            learningOutcome.mappedCompetence;
        });
      });
      setLearningOutcomes(mappedLearningOutcomes);
      const { competences, examGrades, questionsGrades, numOfStudents } =
        getData(jsonData.data.report.questions);
      console.log("DATA COMPETENCES", JSON.stringify(competences));
      console.log("DATA EXAMS", JSON.stringify(examGrades));
      console.log("DATA QUESTIONS GRADES", JSON.stringify(questionsGrades));
      console.log("DATA NUMBER OF STUDENT", JSON.stringify(numOfStudents));
      setNumberOfStudents(numOfStudents);
      setAvgValues(getAvg(jsonData.data.report.avgCompetences));
      const { final, midterm, quiz } = examGrades;
      setCompetenciesMap(competences);
      setQuestionsGrades(questionsGrades);
      setQuiz(quiz);
      setMid(midterm);
      setFinal(final);
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
              <div className="flex flex-col justify-center items-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-2 gap-y-1 w-[90%] h-[30%] mb-80">
                  <p className="grad-title">
                    <span className="md:col-span-2">Quiz Grad</span>
                  </p>
                  <div>
                    <Grad2Litter
                      data={quiz}
                      w={100}
                      h={100}
                      grid={15}
                      title="Quiz"
                    />
                  </div>
                  <div>
                    <GradHist
                      data={quiz}
                      snum={numberOfStudents}
                      w={500}
                      h={100}
                      grid={15}
                    />
                  </div>

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
                    <GradHist
                      data={mid}
                      snum={numberOfStudents}
                      w={500}
                      h={100}
                      grid={15}
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
                    <GradHist
                      data={final}
                      snum={numberOfStudents}
                      w={500}
                      h={100}
                      grid={15}
                    />
                  </div>
                </div>
                <div className="flex min-h-[80]">
                  <br></br>
                </div>
                {/* Competencies & LOs*/}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-2 gap-y-1 w-[90%] h-[70%] mt-96">
                  <p className="grad-asm">
                    <span className="md:col-span-3">
                      Competencies Exam Assessment
                    </span>
                  </p>
                  <div>
                    <CompetenciesQ cmap={competenciesMap} w={60} h={60} />
                  </div>
                  <div>
                    <CompetenciesBar
                      cmap={avgValues}
                      snum={numberOfStudents}
                      w={60}
                      h={60}
                      grid={10}
                    />
                  </div>
                  <CompetenciesBoxPlot
                    qs={questionsGrades}
                    cmap={competenciesMap}
                    snum={numberOfStudents}
                    w={60}
                    h={60}
                  />

                  <div className="md:col-span-3">
                    <CompetenciesStatisticsTable
                      qs={questionsGrades}
                      cmap={competenciesMap}
                      snum={numberOfStudents}
                    />
                  </div>

                  {/* <p className="grad-asm">
              <span className="md:col-span-3">
                Competencies Survey Assessment
              </span>
            </p>
            <CompetenciesQ cmap={competenciesMap} w={60} h={60} title="Survey" />
            <CompetenciesBar cmap={avgValues} snum={sNum} w={60} h={60} grid={10} title="Survey" />
            <CompetenciesBoxPlot qs={qs} cmap={competenciesMap} snum={sNum} w={60} h={60} title="Survey" />

            <div className="md:col-span-3">
              <CompetenciesStatisticsTable qs={qs} cmap={competenciesMap} snum={sNum} w={20} h={10} title="Survey" />
            </div> */}

                  <p className="grad-asm">
                    <span className="md:col-span-3">LOs Exam Assessment</span>
                  </p>
                  <div>
                    <CLOQ cmap={competenciesMap} clomap={learningOutcomes} />
                  </div>
                  <div>
                    <CLOBar
                      cmap={avgValues}
                      snum={numberOfStudents}
                      w={20}
                      h={10}
                      grid={10}
                      clomap={learningOutcomes}
                    />
                  </div>
                  <div>
                    <CLOBoxPlot
                      qs={questionsGrades}
                      cmap={competenciesMap}
                      snum={numberOfStudents}
                      w={20}
                      h={10}
                      clomap={learningOutcomes}
                    />
                  </div>

                  <div className="md:col-span-3">
                    <CLOStatisticsTable
                      clomap={learningOutcomes}
                      qs={questionsGrades}
                      cmap={competenciesMap}
                      snum={numberOfStudents}
                      w={20}
                      h={10}
                    />
                  </div>
                  {/* <div className="flex flex-col "> */}
                  <CLOAttainment
                    clomap={learningOutcomes}
                    cmap={avgValues}
                    snum={numberOfStudents}
                    w={20}
                    h={10}
                  />
                  {/* </div> */}

                  {/* <p className="grad-asm">
              <span className="md:col-span-3">
                LOs Survey Assessment
              </span>
            </p>
            <CLOQ cmap={competenciesMap} clomap={CLO} />
            <CLOBar cmap={avgValues} snum={sNum} w={20} h={10} grid={10} clomap={CLO} />
            <CLOBoxPlot qs={qs} cmap={competenciesMap} snum={sNum} w={20} h={10} clomap={CLO} />

            <div className="md:col-span-3">
              <CLOStatisticsTable clomap={CLO} qs={qs} cmap={competenciesMap} snum={sNum} w={20} h={10} />
            </div>
            <CLOAttainment clomap={CLO} cmap={avgValues} snum={sNum} w={20} h={10} /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default courseReport;
