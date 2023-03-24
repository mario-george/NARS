import React from "react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import InstructorDashboard from "@/components/InstructorDashboard";
import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";
// import {
//   Chart as ChartJS,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";

// ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const courseReport = ({ cookies }) => {
  const userState = useSelector((s) => s.user);

  if (userState.role != "instructor" || userState.loggedInStatus != "true") {
    return <div className="error">404 could not found</div>;
  }
  useEffect(() => {
    document.querySelector("body").classList.add("scrollbar-none");
  });
  //const router = useRouter();
  const token = userState.token;
  const [competence, setCompetences] = useState([]);
  const [courseLearningOutcomes, setcourseLearningOutcomes] = useState([]);
  const router = useRouter();
  //const { courseID } = router.query;
  const { courseID } = router.query;
  let cognitive;
  let affective;
  let psychomotor;
  let numCols;
  let numRows;
  let numRows2;
  let numRows3;
  const getCompetences = async () => {
    try {
      const resp = await fetch(
        `${process.env.url}api/v1/courses/created-courses/${courseID}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const jsonData = await resp.json();
      // console.log("hereeeeeeeeeeee", jsonData);
      const competencesData = jsonData.data.avgCompetences.map(
        (comp) => comp.code
      );
      const courseLearningOutcomesData =
        jsonData.data.courseSpecs.courseLearningOutcomes.map((e) => {
          return { name: e.title, learningOutcomes: e.learningOutcomes };
        });
      setCompetences(competencesData);
      setcourseLearningOutcomes(courseLearningOutcomesData);

      cognitive = courseLearningOutcomes[0];
      affective = courseLearningOutcomes[1];
      psychomotor = courseLearningOutcomes[2];
    } catch (e) {}
  };
  const [arrays, setArrays] = useState({
    LO: [],
    LO2: [],
    LO3: [],
  });
  console.log("hereeeeeeeee", courseLearningOutcomes);
  useEffect(() => {
    getCompetences();
    console.log("hereeeeeeeeee", courseLearningOutcomes);
    // cognitive = courseLearningOutcomes[0];
    // affective = courseLearningOutcomes[1];
    // psychomotor = courseLearningOutcomes[2];
    // if (cognitive && affective && psychomotor) {
    //   try {
    //     setArrays((prevState) => ({
    //       LO: cognitive,
    //       LO2: psychomotor,
    //       LO3: affective,
    //     }));
    //     numCols = competence.length;
    //     numRows = cognitive.length;
    //     numRows2 = psychomotor.length;
    //     numRows3 = affectiveParsed.length;
    //     checkboxRefs.current = Array.from({ length: numRows }, () =>
    //       Array.from({ length: numCols }, () => false)
    //     );

    //     checkboxRefs3.current = Array.from({ length: numRows3 }, () =>
    //       Array.from({ length: numCols }, () => false)
    //     );

    //     checkboxRefs2.current = Array.from({ length: numRows2 }, () =>
    //       Array.from({ length: numCols }, () => false)
    //     );
    //   } catch (error) {
    //     console.error(`Error parsing cookie: ${error}`);
    //   }
    // } else {
    //   console.error("Cookie not found");
    // }
    // // numCols = competence.length;
    // // numRows = arrays.LO.length;
    // // numRows2 = arrays.LO2.length;
    // // numRows3 = arrays.LO3.length;
    // console.log("hereeeeeeeeeee", numRows);
  }, []);
  cognitive = courseLearningOutcomes[0];
  affective = courseLearningOutcomes[1];
  psychomotor = courseLearningOutcomes[2];
  if (cognitive && affective && psychomotor) {
    try {
      setArrays((prevState) => ({
        LO: cognitive,
        LO2: psychomotor,
        LO3: affective,
      }));
      numCols = competence.length;
      numRows = cognitive.length;
      numRows2 = psychomotor.length;
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
  // numCols = competence.length;
  // numRows = arrays.LO.length;
  // numRows2 = arrays.LO2.length;
  // numRows3 = arrays.LO3.length;
  console.log("hereeeeeeeeeee", numRows);

  return (
    <div className="flex flex-row w-screen h-screen mt-2">
      <div className="bg-sky-50 h-screen w-[80%] translate-x-[25%] flex flex-col justify-center items-center text-black ml-1 scrollbar-none">
        <div className="contentAddUser2 flex flex-col gap-10 overflow-auto">
          <Navbar cookies={cookies} />
          <div className="w-full h-full flex justify-center items-center"></div>
        </div>
      </div>
    </div>
  );
};

// const Graph = ({ competence, avgValues }) => {
//   const data = {
//     labels: competence,
//     datasets: [
//       {
//         data: avgValues,
//         backgroundColor: "aqua",
//         borderColor: "black",
//         borderWidth: 1,
//       },
//     ],
//   };
//   const options = {};
//   return (
//     <div className="flex w-2/3 h-2/3  ">
//       <Bar data={data} options={options}></Bar>
//     </div>
//   );
// };

export default courseReport;
