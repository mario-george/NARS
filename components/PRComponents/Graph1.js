import React from "react";
import { useEffect, useRef, useState } from "react";
import CoursesAttainment from "@/components/chart/CoursesAttainment";
import CoursesBar from "@/components/chart/CoursesBar";
import CompBar from "@/components/chart/CompBar";
import FillPie from "@/components/chart/FillPie";
// import programAvg from "@/common/programAvg";

const programAvg = require("@/common/programAvg");

const CoursesCompetences = ({ cookies }) => {
  const [comp, setComp] = useState({});
  const [coursesAvg, setCoursesAvg] = useState({});
  const [alerts, setAlerts] = useState([]);
  const [target, setTarget] = useState([0, 0]);
  const [numSpecs, setNumSpecs] = useState([0, 0]); // [fill, not]
  const [numReport, setNumReport] = useState([0, 0]);

  useEffect(() => {
    const get_comp = async (e) => {
      if (e) {
        e.preventDefault();
      }

      const avgs = await programAvg(
        cookies.program,
        setComp,
        setCoursesAvg,
        setAlerts
      )

      console.log("11")
      console.log("coAng, cmAvg", avgs.compAvg["B2"]['direct'] /= avgs.compAvg["B2"]['numCourses'], avgs);
      console.log("12")

      try {
        const resp4 = await fetch(
          `${process.env.url}api/v1/programs/${cookies.program}/percentageSpecsAndReports`,
          {
            headers: {
              Authorization: "Bearer " + cookies.token,
            },
          }
        );
        const data4 = await resp4.json();
        let specs = data4.data.percentageOfFillingSpecs * 100;
        let report = data4.data.percentageOfFillingReport * 100;
        
        setNumSpecs([specs, 100 - specs]);
        setNumReport([report, 100 - report]);
      } catch (e) {
        console.log("rr4", e);
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
        <h1>
          {JSON.stringify(comp)}
        </h1>
        <h1>
          {JSON.stringify(coursesAvg)}
        </h1>
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
