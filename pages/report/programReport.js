import {useState} from "react";
import CoursesCompetences from "../../components/PRComponents/CoursesCompetences";
import LosDescriptionTable from "../../components/PRComponents/LosDescriptionTable";
import Graph1 from '../../components/PRComponents/Graph1';
import ProgramData from "@/components/PRComponents/ProgramData";

const programReport = ({ cookies }) => {

  if ((cookies.role != "program coordinator" && cookies.role != "quality coordinator") || cookies.loggedInStatus != "true") {
    return <div className="error">404 could not found</div>;
  }

  const [alerts, setAlerts] = useState([]);

  return (
    <div>
      <div className="flex flex-row w-screen h-screen mt-2">
        <form className="bg-sky-50 h-screen w-[80%]  translate-x-[25%]  flex flex-col justify-center items-center text-black ml-1 rounded-2xl">
          <div className="contentAddUser2 flex flex-col gap-10 overflow-auto scrollbar-none">
            <label class="label-form md:text-2xl text-center">
              Program Report
            </label>
            <ProgramData cookies={cookies} setAlerts={setAlerts}/>
            <CoursesCompetences cookies={cookies} setAlerts={setAlerts}/>
            {/* <LosDescriptionTable cookies={cookies} setAlerts={setAlerts}/> */}
            <Graph1 cookies={cookies} setAlerts={setAlerts}/>
          </div>
          {<div className="w-1/2 mt-10">{alerts.map(s => s)}</div>}
        </form>
      </div>
    </div>
  );
};

export default programReport;
