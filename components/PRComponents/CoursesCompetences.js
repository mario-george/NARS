import React from "react";
import { useEffect, useRef, useState } from "react";

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
        // let arr2 = data2.facultyComp;
        // let arr3 = data2.departmentComp;
        let arr4 = data2.programComp;
        setComp([...arr4]);
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
        <div className="flex flex-col">
          <h2 className="font-bold text-xl mb-2">
            Matrix of Courses & Competences
          </h2>
          <div className="h-0.5 w-full bg-gray-300 mb-2" />

          <table className="table-auto mt-6">
            <thead className="bg-blue-50">
              <tr>
                <th className="border-2 px-4 py-2">Course code</th>
                <th className="border-2 px-4 py-2">Course name</th>
                {comp.map((e, i) => (
                  <th
                    key={i}
                    className="border-2 px-4 py-2"
                    title={e.description}
                  >
                    {e.code.toUpperCase()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {courses.map((e, rowIndex) => (
                <tr key={rowIndex}>
                  <td className="border-2 px-4 py-2">{e.code}</td>
                  <td className="border-2 px-4 py-2">{e.name}</td>
                  {Array.from({ length: comp.length }).map((_, colIndex) => (
                    <td className="border-2 px-4 py-2" key={colIndex}>
                      <label
                        className="inline-flex items-center justify-center"
                        key={colIndex}
                      >
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 text-blue-600 custom-checkbox cursor-pointer"
                          checked={checkboxRefs.current[rowIndex][colIndex]}
                          readOnly={true}
                        />
                      </label>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default CoursesCompetences;
