import { useEffect, useRef, useState } from "react";
import QualityCoordinatorDashboard from "@/components/QualityCoordinatorDashboard";
import { useSelector } from "react-redux";

const coursecomp = ({ cookies }) => {
  if (
    cookies.role != "quality coordinator" ||
    cookies.loggedInStatus != "true"
  ) {
    return <div className="error">404 could not found</div>;
  }
  const userState = useSelector((s) => s.user);
  useEffect(() => {
    document.querySelector("body").classList.add("scrollbar-none");
  });
  const [courses, setCourses] = useState([]);
  const [comp, setComp] = useState([]);
  const numRows = courses.length;
  const numCols = comp.length;
  const [msg, setMsg] = useState("");
  const closeMsg = () => {
    setMsg("");
  };

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
  const checkboxRefs = useRef([[]]);

  checkboxRefs.current = Array.from({ length: courses.length }, () =>
    Array.from({ length: comp.length }, () => false)
  );

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

  const handleCheckboxChange = (rowIndex, colIndex, value) => {
    checkboxRefs.current[rowIndex][colIndex] = value;
  };

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }
    courses.map(async (course, index) => {
      const comps = [];
      checkboxRefs.current[index].forEach((isChecked, index) => {
        if (isChecked) {
          comps.push({
            code: comp[index].code,
            description: comp[index].description,
          });
        }
      });
      try {
        const r = await fetch(
          `${process.env.url}api/v1/courses/original-courses/${course.id}`,
          {
            method: "PATCH",

            body: JSON.stringify({
              competences: comps,
            }),

            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + cookies.token,
            },
          }
        );
        const resp3 = await r.json();
        if (resp3.status == "success") {
          setMsg(success);
        } else {
          setMsg(fail);
        }
        console.log(resp3);
      } catch (e) {
        console.log(e);
      }
    });
  };

  let fail = (
    <div
      id="alert-border-2"
      class="flex p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800"
      role="alert"
    >
      <i class="fa-sharp fa-solid fa-circle-exclamation"></i>
      <div class="ml-3 text-sm font-medium">
        Failed to assign the competences
        <a href="#" class="font-semibold underline hover:no-underline"></a>.
      </div>
      <button
        type="button"
        onClick={closeMsg}
        class="ml-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
        data-dismiss-target="#alert-border-2"
        aria-label="Close"
      >
        <span class="sr-only">Dismiss</span>
        <svg
          aria-hidden="true"
          class="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  );

  let success = (
    <div
      id="alert-border-3"
      class="flex p-4 mb-4 text-green-800 border-t-4 border-green-300 bg-green-50 dark:text-green-400 dark:bg-gray-800 dark:border-green-800"
      role="alert"
    >
      <i class="fa-solid fa-circle-check"></i>
      <div class="ml-3 text-sm font-medium">
        Competences has been assigned successfully
        <a href="#" class="font-semibold underline hover:no-underline"></a>
      </div>
      <button
        onClick={closeMsg}
        type="button"
        class="ml-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700"
        data-dismiss-target="#alert-border-3"
        aria-label="Close"
      >
        <span class="sr-only">Dismiss</span>
        <svg
          aria-hidden="true"
          class="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  );

  const submitHandler = async (e) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <>
      <div className="flex flex-row w-screen h-screen mt-2">
        <form className="bg-sky-50 h-screen w-[80%]  translate-x-[25%]  flex flex-col justify-center items-center text-black ml-1 rounded-2xl">
          <div className="contentAddUser2 flex flex-col gap-10 overflow-auto scrollbar-none">
            <label class="label-form md:text-2xl text-center">
              Matrix of Program's Courses Vs Program's Competences
            </label>
            <table className="table-auto mt-8">
              <thead>
                <tr>
                  <th className="border-2 px-4 py-2">Course code</th>
                  <th className="border-2 px-4 py-2">Course name</th>
                  {comp.map((e, i) => (
                    <th
                      key={i}
                      className="border-2 px-4 py-2"
                      title={e.description}
                    >
                      {e.code}
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
                            onChange={(e) =>
                              handleCheckboxChange(
                                rowIndex,
                                colIndex,
                                e.target.checked
                              )
                            }
                            defaultChecked={
                              checkboxRefs.current[rowIndex][colIndex]
                            }
                          />
                        </label>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex gap-20 ">
              {<div className="w-1/2 mt-10">{msg}</div>}
            </div>
            <div className="flex justify-end">
              <button
                onClick={submitHandler}
                class="w-[6rem]  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg px-5 py-2.5 mx-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Assign
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default coursecomp;
