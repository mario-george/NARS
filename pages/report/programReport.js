import React from "react";
import CoursesCompetences from "../../components/PRComponents/CoursesCompetences";
import LosDescriptionTable from "../../components/PRComponents/LosDescriptionTable";
import Graph1 from '../../components/PRComponents/Graph1';

const programReport = ({ cookies }) => {
  return (
    <div>
      <div className="flex flex-row w-screen h-screen mt-2">
        <form className="bg-sky-50 h-screen w-[80%]  translate-x-[25%]  flex flex-col justify-center items-center text-black ml-1 rounded-2xl">
          <div className="contentAddUser2 flex flex-col gap-10 overflow-auto scrollbar-none">
            <label class="label-form md:text-2xl text-center">
              Program Report
            </label>
            <CoursesCompetences cookies={cookies} />
            <LosDescriptionTable />
            <Graph1 cookies={cookies}/>
          </div>
        </form>
      </div>
    </div>
  );
};

export default programReport;
