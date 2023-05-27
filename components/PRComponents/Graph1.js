import React from "react";
import { useEffect, useRef, useState } from "react";
import CoursesAttainment from "@/components/chart/CoursesAttainment";
import CoursesBar from "@/components/chart/CoursesBar";
import CompBar from "@/components/chart/CompBar";
import FillPie from "@/components/chart/FillPie";

const CoursesCompetences = ({ cookies }) => {
  const [comp, setComp] = useState({});
  const [coursesAvg, setCoursesAvg] = useState({});
  const [target, setTarget] = useState([0, 0]);
  const [numSpecs, setNumSpecs] = useState([0, 0]); // [fill, not]
  const [numReport, setNumReport] = useState([0, 0]);

  useEffect(() => {
    const get_comp = async (e) => {
      if (e) {
        e.preventDefault();
      }
      try {
        const resp2 = await fetch(
          `${process.env.url}api/v1/programs/${cookies.program}/inDirectAssessment`,
          {
            headers: {
              Authorization: "Bearer " + cookies.token,
            },
          }
        );
        const data2 = await resp2.json();
        let comp1 = data2.data.report.programCompAvgs;
        let courses = data2.data.report.courseAvgDirect;
        let compTemp = {};
        let coursesTemp = {};
        comp1.forEach(elm => {
          if(elm.avg){
            compTemp[elm.code] = {
              "direct" : elm.avg,
            };
          }else{
            compTemp[elm.code] = {
              "direct" : 0,
            };
          }
        });
        courses.forEach(elm => {
          if(elm.avg){
            coursesTemp[elm.name] = {
              "direct" : elm.avg,
            };
          }else{
            coursesTemp[elm.name] = {
              "direct" : elm.avg,
            };
          }
        });
        console.log('data2', data2)
        // console.log('compTemp', compTemp);
        console.log('data2.data.report.programCompAvgsIndirect', data2.data.report.programCompAvgsIndirect)
        //indirect
        comp1 = data2.data.report.programCompAvgsIndirect;
        courses = data2.data.report.courseAvgIndirect;
        comp1.forEach(elm => {
          console.log("der0")
          if(elm.avg){
            console.log("der1")
            compTemp[elm.code]["indirect"] = elm.avg;
            compTemp[elm.code]['avg'] = (elm.avg + compTemp[elm.code]["indirect"]) / 2;
          }else{
            console.log("der2")
            compTemp[elm.code]["indirect"] = 0;
            compTemp[elm.code]['avg'] = (0 + compTemp[elm.code]["indirect"]) / 2;
          }
        });
        courses.forEach(elm => {
          if(elm.avg){
            oursesTemp[elm.name]["indirect"] = elm.avg;
            coursesTemp[elm.name]['avg'] = (elm.avg + coursesTemp[elm.name]["indirect"]) / 2;
          }else{
            oursesTemp[elm.name]["indirect"] = 0;
            coursesTemp[elm.name]['avg'] = (0 + coursesTemp[elm.name]["indirect"]) / 2;
          }
        });
        setComp(compTemp);
        setCoursesAvg(coursesTemp);

        const resp3 = await fetch(
          `${process.env.url}api/v1/programs/${cookies.program}/percentageSpecsAndReports`,
          {
            headers: {
              Authorization: "Bearer " + cookies.token,
            },
          }
        );
        const data3 = await resp3.json();
        let specs = Math.round(data3.data.percentageOfFillingSpecs * 100);
        let report = Math.round(data3.data.percentageOfFillingReport * 100);
        
        setNumSpecs([specs, 100 - specs]);
        setNumReport([report, 100 - report]);
      } catch (e) {
        console.log("rr", e);
      }
    };
    get_comp();
    
    // setNumReport([3, 2])
    // setNumSpecs([2, 3])
    setTarget([30, 70])
  }, []);

  return (
    <>
      {1 && (
        <div className="flex flex-col w-full items-start">
        <h2 className="font-bold text-xl mb-2">
          Courses & Competences Review
        </h2>
        <div className="h-0.5 w-full bg-gray-300 mb-2" />
        <div className="flex flex-col w-full items-center">
        <label className="mt-12">Courses Specs and Report Filled</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-2 gap-y-1 w-[90%] mb-10">
          <div>
            <FillPie
              title={"Filed Course Specs"}
              title2={"Course Specs"}
              num={numSpecs}
              w={60}
              h={60}
            />
          </div>
          <div>
            <FillPie
              title={"Filed Course Report"}
              title2={"Course Report"}
              num={numReport}
              w={60}
              h={60}
            />
          </div>
        </div>
        <label className="mt-12">Courses and Competences Achievement</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-2 gap-y-1 w-[90%] mb-10">
          <div>
            <CoursesBar
              courses={coursesAvg}
              w={60}
              h={60}
            />
          </div>
          <div>
            <CompBar
              comp={comp}
              w={60}
              h={60}
            />
          </div>
        </div>
        <label className="mt-12">Courses Attainment</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-2 gap-y-1 w-[90%]">
          <div>
            <CoursesAttainment
              target={target}
              courses={coursesAvg}
              w={20}
              h={20}
              title={"Survey"}
              />
          </div>
        </div>
        
      </div>
    </div>
      )}
    </>
  );
};

export default CoursesCompetences;
