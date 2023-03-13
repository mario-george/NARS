import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { createRef, useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import InstructorDashboard from "@/components/InstructorDashboard";

const part4 = ({ cookies }) => {
  console.log(cookies.courseLearningOutcomes);
  const competences = ["A1", "A2", "A3"];
  let cognitive = Cookies.get("cognitive");
  let affective = Cookies.get("affective");
  let psychomotor = Cookies.get("psychomotor");
  const [arrays, setArrays] = useState({
    LO: [],
    LO2: [],
    LO3: [],
  });
  // let congitiveParsed=JSON.parse(cognitive)
  // let psychomotorParsed=JSON.parse(psychomotor)
  // let affectiveParsed=JSON.parse(affective)
  let congitiveParsed;
  let psychomotorParsed;
  let affectiveParsed;
  let courseLearningOutcomes;
  useEffect(() => {
    if (cognitive && affective && psychomotor) {
      try {
        congitiveParsed = JSON.parse(cognitive);
        psychomotorParsed = JSON.parse(psychomotor);
        affectiveParsed = JSON.parse(affective);
        courseLearningOutcomes = JSON.parse(cookies.courseLearningOutcomes);
        console.log(congitiveParsed);
        console.log(psychomotorParsed);
        console.log(affectiveParsed);

        setArrays((prevState) => ({
          LO: congitiveParsed,
          LO2: psychomotorParsed,
          LO3: affectiveParsed,
        }));
        numCols = competences.length;
        numRows = congitiveParsed.length;
        numRows2 = psychomotorParsed.length;
        numRows3 = affectiveParsed.length;
        checkboxRefs.current = Array.from({ length: numRows }, () =>
          Array.from({ length: numCols }, () => false)
        );

        checkboxRefs3.current = Array.from({ length: numRows3 }, () =>
          Array.from({ length: numCols }, () => false)
        );

        checkboxRefs2.current = Array.from({ length: numRows2 }, () =>
          Array.from({ length: numCols }, () => false)
        );
      } catch (error) {
        console.error(`Error parsing cookie: ${error}`);
      }
    } else {
      console.error("Cookie not found");
    }
  }, []);

  // console.log(affectiveParsed)
  // console.log(psychomotorParsed)
  // console.log(congitiveParsed)
  // let cognitiveMap = cognitive.map(e=>{
  //   return{name:e.name}
  // })

  // let psychomotorMap = psychomotor?.map(e=>{
  //   return `${e.name}`
  // })
  let affectiveMap;
  let a;
  let b = [];

  // const LO = ["LO1", "LO2"];
  // const LO2 = ["LO3", "LO4"];
  // const LO3 = [];
  let numCols = competences.length;
  let numRows = arrays.LO.length;
  let numRows2 = arrays.LO2.length;
  let numRows3 = arrays.LO3.length;
  let checkboxRefs = useRef(
    Array.from({ length: arrays.LO.length }, () =>
      Array.from({ length: numCols }, () => false)
    )
  );
  let checkboxRefs2 = useRef(
    Array.from({ length: arrays.LO2.length }, () =>
      Array.from({ length: numCols }, () => false)
    )
  );
  let checkboxRefs3 = useRef(
    Array.from({ length: arrays.LO3.length }, () =>
      Array.from({ length: numCols }, () => false)
    )
  );

  // let [done,setDone]=useState(false)
  // if (typeof affective !== 'undefined') {
  //   a = JSON.parse(affective);
  //   console.log(a)
  //   console.log(typeof a)

  //    affectiveMap = a.map((e)=>{
  //     LO3.push(e.name)
  //   })

  //   console.log(affectiveMap )
  //   setDone(true)
  // }

  const [tableData, setTableData] = useState(checkboxRefs.current);
  const [tableData2, setTableData2] = useState(checkboxRefs2.current);
  const [tableData3, setTableData3] = useState(checkboxRefs3.current);

  const handleCheckboxChange = (rowIndex, colIndex) => {
    checkboxRefs.current[rowIndex][colIndex] =
      !checkboxRefs.current[rowIndex][colIndex];
  };
  const handleCheckboxChange2 = (rowIndex, colIndex) => {
    checkboxRefs2.current[rowIndex][colIndex] =
      !checkboxRefs2.current[rowIndex][colIndex];
  };
  const handleCheckboxChange3 = (rowIndex, colIndex) => {
    checkboxRefs3.current[rowIndex][colIndex] =
      !checkboxRefs3.current[rowIndex][colIndex];
  };

  const handleSubmit = () => {
    setTableData([...checkboxRefs.current]);
    setTableData2([...checkboxRefs2.current]);
    setTableData3([...checkboxRefs3.current]);
    let courseLearningOutcomes = Cookies.get("courseLearningOutcomes");
    if (courseLearningOutcomes) {
      try {
        let courseLearningOutcomesParsed = JSON.parse(
          cookies.courseLearningOutcomes
        );
        console.log(courseLearningOutcomesParsed);
        console.log(typeof courseLearningOutcomesParsed);

        console.log(courseLearningOutcomesParsed[0].title);

        let l1 = JSON.stringify(arrays.LO);
        let l2 = JSON.stringify(arrays.LO2);
        let l3 = JSON.stringify(arrays.LO3);

        let l1P = JSON.parse(l1);
        let l2P = JSON.parse(l2);
        let l3P = JSON.parse(l3);
        // console.log(l1P);
        // console.log(typeof l1P);
        l1P.map((e, k) => {
          console.log("dfhgsdfhswftreyhewarhgeg");
        });
        // courseLearningOutcomes[0].learningOutcomes =[]
        let cp2 = JSON.parse(courseLearningOutcomes);
        //         console.log(Array.isArray(cp2));
        //         console.log(Array.isArray(l1P));
        //         console.log(l1P.length);
        // console.log(l1P)
        console.log(checkboxRefs.current[0][1]);
        console.log(checkboxRefs.current[1][1]);
        if (courseLearningOutcomesParsed[0].title == "cognitive") {
          cp2[0].learningOutcomes = l1P.map((e, i) => {
            console.log(e);
            return {
              ...e,
              mappedCompetence: [...competences].filter((e, k) => {
                return checkboxRefs.current[i][k];
                // if (checkboxRefs.current[i][k]) {
                //   return;
                // } else {
                //   return competences[k];
                // }
              }),
            };
          });
        }
        if (courseLearningOutcomesParsed[1].title == "psychomotor") {
          cp2[1].learningOutcomes = l2P.map((e, i) => {
            // console.log(e);
            return {
              ...e,
              mappedCompetence: [...competences].filter((e, k) => {
                return checkboxRefs2.current[i][k];
                // if (checkboxRefs.current[i][k]) {
                //   return;
                // } else {
                //   return competences[k];
                // }
              }),
            };
          });
        }
        if (courseLearningOutcomesParsed[2].title == "affective") {
          cp2[2].learningOutcomes = l3P.map((e, i) => {
            // console.log(e);
            return {
              ...e,
              mappedCompetence: [...competences].filter((e, k) => {
                return checkboxRefs3.current[i][k];
                // if (checkboxRefs.current[i][k]) {
                //   return;
                // } else {
                //   return competences[k];
                // }
              }),
            };
          });
        }
        console.log(cp2[0]);
        console.log(cp2[1]);
        console.log(cp2[2]);
        console.log(cp2);
        const cp2Stringified = JSON.stringify(cp2);
        Cookies.set("courseLearningOutcomes", cp2Stringified);
      } catch (error) {
        console.error(`Error parsing cookie: ${error}`);
      }
    } else {
      console.error("Cookie not found");
    }

    console.log("cognitive");
    console.log(tableData);
    console.log("psychomotor");
    console.log(tableData2);
    console.log("affective");
    console.log(tableData3);
  };
  if (cookies.role != "instructor" || cookies.loggedInStatus != "true") {
    return <div className="error">404 could not found</div>;
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    handleSubmit();
    window.location.href = "/instructor/coursespecs/part5";
  };
  // affective ? (a = Object.entries(JSON.parse(affective))) : null;
  // affective ? (console.log(Object.entries(JSON.parse(affective)))) : null;
  // affective
  //   ? a.map((e) => {
  //       e.map((el2, key) => {
  //         if (key == 0) {
  //           return;
  //         } else {
  //           return b.push(el2.name);
  //         }
  //       });
  //     })
  //   : null;
  return (
    <>
      <div className="flex flex-row w-screen h-screen mt-2">
        <InstructorDashboard />
        <form
          onSubmit={submitHandler}
          className="bg-sky-50 h-screen w-screen flex flex-col justify-center items-center text-black ml-1"
        >
          <div className="contentAddUser2 flex flex-col gap-10 overflow-auto">
            <table className="table-auto">
              <thead>
                <tr>
                  <th className="border px-4 py-2">LO/Competences</th>
                  {competences.map((e, i) => (
                    <th key={i} className="border px-4 py-2">
                      {e}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="w-full bg-sky-50">
                  <th className="border-l px-4 py-2 text-left ">
                    Cognitive domain
                  </th>
                  <th className=" bg-sky-50"></th>
                  <th className=" "></th>
                  <th className=" border-r"></th>
                </tr>
                {Array.from({ length: numRows }).map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    <td className="border px-4 py-2">
                      {" "}
                      {arrays.LO[rowIndex].name}
                    </td>
                    {Array.from({ length: numCols }).map((_, colIndex) => (
                      <td className="border px-4 py-2" key={colIndex}>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-blue-600 custom-checkbox"
                            onChange={() =>
                              handleCheckboxChange(rowIndex, colIndex)
                            }
                          />
                        </label>
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="w-full bg-sky-50">
                  <th className="border-l px-4 py-2 text-left ">
                    Psychomotor domain
                  </th>
                  <th className=" bg-sky-50"></th>
                  <th className=" "></th>
                  <th className=" border-r"></th>
                </tr>
                {Array.from({ length: numRows2 }).map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    <td className="border px-4 py-2">
                      {" "}
                      {arrays.LO2[rowIndex].name}
                    </td>
                    {Array.from({ length: numCols }).map((_, colIndex) => (
                      <td className="border px-4 py-2" key={colIndex}>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-blue-600 custom-checkbox"
                            onChange={() =>
                              handleCheckboxChange2(rowIndex, colIndex)
                            }
                          />
                        </label>
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="w-full bg-sky-50">
                  <th className="border-l px-4 py-2 text-left ">
                    Affective domain
                  </th>
                  <th className=" bg-sky-50"></th>
                  <th className=" "></th>
                  <th className=" border-r"></th>
                </tr>
                {Array.from({ length: numRows3 }).map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    <td className="border px-4 py-2">
                      {" "}
                      {arrays.LO3[rowIndex].name}
                    </td>
                    {Array.from({ length: numCols }).map((_, colIndex) => (
                      <td className="border px-4 py-2" key={colIndex}>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-blue-600 custom-checkbox"
                            onChange={() =>
                              handleCheckboxChange3(rowIndex, colIndex)
                            }
                          />
                        </label>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                class="w-[6rem]  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg px-5 py-2.5 mx-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Next
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

// export async function getServerSideProps(context) {
//   let cookies = context.req.cookies;
//   let LO33 = [];
//   let cognitive = Cookies.get("cognitive");
//   let affective = Cookies.get("affective");
//   let psychomotor = Cookies.get("psychomotor");

// let congitiveParsed=JSON.parse(cognitive)
// let psychomotorParsed=JSON.parse(psychomotor)
// let affectiveParsed=JSON.parse(affective)

//   let a;
//   let b=[]
//   affective ? (a = Object.entries(JSON.parse(affective))) : null;
//   affective ? (console.log(Object.entries(JSON.parse(affective)))) : null;
//   affective
//     ? a.map((e) => {
//         e.map((el2, key) => {
//           if (key == 0) {
//             return;
//           } else {
//             return b.push(el2.name);
//           }
//         });
//       })
//     : null;
//   return {
//     props: {
//       LO33:b,
//     },
//   };
// }
export default part4;
