import React from "react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import InstructorDashboard from "@/components/InstructorDashboard";
import Link from "next/link";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const courseReport = ({ cookies }) => {
  const router = useRouter();
  const [competence, setCompetences] = useState([]);
  const [avgValues, setAvgValues] = useState([]);
  const { courseID } = router.query;

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
      const competencesData = jsonData.data.avgCompetences.map(
        (comp) => comp.code
      );
      const avgValuesData = jsonData.data.avgCompetences.map(
        (comp) => comp.avg
      );
      setCompetences(competencesData);
      setAvgValues(avgValuesData);
    } catch (e) {}
  };

  return (
    <div className="flex flex-row w-screen h-screen mt-2">
      <InstructorDashboard />
      <div className="bg-sky-50 h-screen w-screen flex flex-col mt-2 items-center justify-center">
        {/* {codes && codes.competences && codes.competences.length > 0 && ( */}
        {/* )} */}
        <Graph competence={competence} avgValues={avgValues} />
      </div>
    </div>
  );
};

const Graph = ({ competence, avgValues }) => {
  const data = {
    labels: competence,
    datasets: [
      {
        data: avgValues,
        backgroundColor: "aqua",
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };
  const options = {};
  return (
    <div className="flex w-2/3 h-2/3  ">
      <Bar data={data} options={options}></Bar>
    </div>
  );
};

export default courseReport;
