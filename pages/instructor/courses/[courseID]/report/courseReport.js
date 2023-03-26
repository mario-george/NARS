import React from "react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";
import InstructorDashBoard from "@/components/InstructorDashBoard2";
import Attainment from '@/components/chart/Attainment';
import Grad2Litter from '@/components/chart/Grad2Litter'
import StudentScatter from '@/components/chart/StudentScatter';
import CompetenciesBoxPlot from '@/components/chart/CompetenciesBoxPlot';
import CompetenciesQ from '@/components/chart/CompetenciesQ';
import CompetenciesAttainment from '@/components/chart/CompetenciesAttainment';
import CompetenciesStatisticsTable from '@/components/chart/CompetenciesStatisticsTable';
import CompetenciesBar from '@/components/chart/CompetenciesBar';
import CLOBar from '@/components/chart/CLOBar';
import CLOAttainment from '@/components/chart/CLOAttainment';
import CLOStatisticsTable from '@/components/chart/CLOStatisticsTable';
import CLOBoxPlot from '@/components/chart/CLOBoxPlot';
import CLOTable from '@/components/chart/CLOTable';
import GradHist from "@/components/chart/GradHist";
import getData from "@/components/chart/getData";

const courseReport = ({ cookies }) => {
  const router = useRouter();
  const [competenciesMap, setCompetenciesMap] = useState({});
  const [avgValues, setAvgValues] = useState({});
  const [qs, setQs] = useState({});
  const [quiz, setQuiz] = useState([]);
  const [mid, setMid] = useState([]);
  const [final, setFinal] = useState([]);
  const [sNum, setSNum] = useState(0);
  const { courseID } = router.query;

  const getAvg = (avgs) => {
    return avgs.map(elm => {
      let out = {};
      out[elm.code.toUpperCase()] = elm.avg;
      return out;
    });
  }

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
      const [competenciesMapData, exams, qsData, sNumData] = getData(jsonData.data.report.questions);
      setSNum(sNumData);
      setAvgValues(getAvg(jsonData.data.report.avgCompetences))
      const [finalData, midData, quizData] = exams;
      setCompetenciesMap(competenciesMapData);
      setQs(qsData);
      setQuiz(quizData);
      setMid(midData);
      setFinal(finalData);
    } catch (e) {}
  };

  return (
    <div className="flex flex-row w-screen h-screen mt-2">
      <div className="bg-sky-50 h-screen w-[80%] translate-x-[25%] flex flex-col justify-center items-center text-black ml-1 scrollbar-none">
        <div className="contentAddUser2 flex flex-col gap-10 overflow-auto">
          <Navbar cookies={cookies} />
          <div className="w-full h-full flex justify-center items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-3">
              <p className="grad-title">
                <span className="md:col-span-2">
                    Quiz Grad
                </span>
              </p>
              <Grad2Litter data={quiz} w={100} h={100} grid={15} title="Quiz"/>
              <GradHist data={quiz} snum={sNnum} w={500} h={100} grid={15}/>

                <p className="grad-title">
                  <span className="md:col-span-2">
                    Midterm Grad
                  </span>
                </p>
              <Grad2Litter data={mid} w={100} h={100} grid={15} title="Midterm"/>
              <GradHist data={mid} snum={sNnum} w={500} h={100} grid={15}/>

                <p className="grad-title">
                  <span className="md:col-span-2">
                    Final Grad
                  </span>
                </p>
              <Grad2Litter data={final} w={100} h={100} grid={15} title="Final"/>
              <GradHist data={final} snum={sNnum} w={500} h={100} grid={15}/>
            </div>
            {/* Competencies & LOs*/}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-3">
              <p className="grad-asm">
                <span className="md:col-span-3">
                    Competencies Exam Assessment
                </span>
              </p>
              <CompetenciesQ cmap={competenciesMap} w={60} h={60} />
              <CompetenciesBar cmap={avgValues} snum={sNum} w={60} h={60} grid={10}/>
              <CompetenciesBoxPlot qs={qs} cmap={competenciesMap} snum={sNum} w={60} h={60} />

              <div className="md:col-span-3">
                <CompetenciesStatisticsTable qs={qs} cmap={competenciesMap} snum={sNum} w={20} h={10} />
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
                  <span className="md:col-span-3">
                    LOs Exam Assessment
                  </span>
                </p>
                <CLOQ cmap={competenciesMap} clomap={CLO} />
                <CLOBar cmap={avgValues} snum={sNum} w={20} h={10} grid={10} clomap={CLO} />
                <CLOBoxPlot qs={qs} cmap={competenciesMap} snum={sNum} w={20} h={10} clomap={CLO} />

                <div className="md:col-span-3">
                  <CLOStatisticsTable clomap={CLO} qs={qs} cmap={competenciesMap} snum={sNum} w={20} h={10} />
                </div>
                <CLOAttainment clomap={CLO} cmap={avgValues} snum={sNum} w={20} h={10} />

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
  );
};

export default courseReport;
