import React from "react";
import { useEffect, useRef, useState } from "react";
import Attainment from "@/components/chart/Attainment";
import CoursesAttainment from "@/components/chart/CoursesAttainment";
import CoursesBar from "@/components/chart/CoursesBar";
import CompBar from "@/components/chart/CompBar";
import FillPie from "@/components/chart/FillPie";

const CoursesCompetences = ({ cookies }) => {
  const [courses, setCourses] = useState([]);
  const [comp, setComp] = useState({});
  const [coursesAvg, setCoursesAvg] = useState({});
  const [numSpecs, setNumSpecs] = useState([0, 0]); // [fill, not]
  const [numReport, setNumReport] = useState([0, 0]);
  const checkboxRefs = useRef([[]]);


  checkboxRefs.current = Array.from({ length: courses.length }, () =>
    Array.from({ length: comp.length }, () => false)
  );

  useEffect(() => {
    const get_courses = async (e) => {
      if (e) {
        e.preventDefault();
      }
      try {
        const resp = await fetch(
          `${process.env.url}api/v1/courses/original-courses?program=${cookies.program}`,
          {
            headers: {
              Authorization: "Bearer " + cookies.token,
            },
          }
        );
        const data = await resp.json();
        let arr = data.data;
        arr = arr.map((e) => {
          return {
            id: e._id,
            name: e.name,
            code: e.code,
            competences: e.competences,
          };
        });
        setCourses(arr);
      } catch (e) {
        console.log(e);
      }
    };

    const get_comp = async (e) => {
      if (e) {
        e.preventDefault();
      }
      try {
        const resp2 = await fetch(
          `${process.env.url}api/v1/programs/viewComp/${cookies.program}`,
          {
            headers: {
              Authorization: "Bearer " + cookies.token,
            },
          }
        );
        const data2 = await resp2.json();
        let arr2 = data2.facultyComp;
        let arr3 = data2.departmentComp;
        let arr4 = data2.programComp;
        setComp([...arr2, ...arr3, ...arr4]);
      } catch (e) {
        console.log(e);
      }
    };
    // get_comp();
    // get_courses();
    setComp({
      "A1" : {
        "direct" : 40,
        "indirect" : 60,
        "avg" : 50
      },
      "B2" : {
        "direct" : 70,
        "indirect" : 80,
        "avg" : 75
      }
    })
    setCoursesAvg({
      "Pro" : {
        "direct" : 40,
        "indirect" : 60,
        "avg" : 50
      },
      "Lite" : {
        "direct" : 70,
        "indirect" : 80,
        "avg" : 75
      }
    })
    setNumReport([3, 2])
    setNumSpecs([2, 3])
  }, []);

  // //to check the boxes for the given competences of courses
  // courses.map((course, i) => {
  //   let comps = course.competences;
  //   checkboxRefs.current[i].forEach((isChecked, index) => {
  //     comps.map((e) => {
  //       if (e.code === comp[index].code) {
  //         checkboxRefs.current[i][index] = true;
  //       }
  //     });
  //   });
  // });

  return (
    <>
      {courses.length > 0 && comp.length > 0 && (
        <div className="flex flex-col w-full items-start">
        <h2 className="font-bold text-xl mb-2">
          Learning Outcomes & Competences Overall Achievement
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
              num={numSpecs}
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
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-2 gap-y-1 w-[90%]"> */}
          <div>
            <CoursesAttainment
              target={target}
              cAvg={avgValues}
              w={20}
              h={20}
              title={"Survey"}
              />
          </div>
        {/* </div> */}
        
      </div>
    </div>
      )}
    </>
  );
};

export default CoursesCompetences;
