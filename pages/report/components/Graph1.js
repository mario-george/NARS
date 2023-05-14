import React from "react";
import { useEffect, useRef, useState } from "react";
import Attainment from "@/components/chart/Attainment";

const CoursesCompetences = ({ cookies }) => {
  const [courses, setCourses] = useState([]);
  const [comp, setComp] = useState([]);
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
    get_comp();
    get_courses();
  }, []);

  //to check the boxes for the given competences of courses
  courses.map((course, i) => {
    let comps = course.competences;
    checkboxRefs.current[i].forEach((isChecked, index) => {
      comps.map((e) => {
        if (e.code === comp[index].code) {
          checkboxRefs.current[i][index] = true;
        }
      });
    });
  });

  return (
    <>
      {courses.length > 0 && comp.length > 0 && (
        <div className="flex flex-col w-full items-start">
        <h2 className="font-bold text-xl mb-2">
          Learning Outcomes & Competences Overall Achievement
        </h2>
        <div className="h-0.5 w-full bg-gray-300 mb-2" />
        <div className="flex flex-col w-full items-center">
          <label className="mt-12">Competences Achievement</label>
          <div>
            <Attainment
              target={target}
              cAvg={avgAvg}
              avgS={[
                avgValues,
                avgValuesSurvey,
              ]}
              w={20}
              h={20}
              title={"All Assessment"}
            />
          </div>
          <label className="mt-12">Courses Achievement</label>
          <Attainment
              target={target}
              cAvg={avgAvg}
              avgS={[
                avgValues,
                avgValuesSurvey,
              ]}
              w={20}
              h={20}
              title={"All Assessment"}
            />
        </div>
      </div>
      )}
    </>
  );
};

export default CoursesCompetences;
