import {useEffect, useState} from "react";
import MassageAlert from "@/components/MassageAlert";
import ObjectHasData from "../helper/objectHasData";

const ProgramData = ({ cookies, setAlerts }) => {
  const [programData, setProgramData] = useState({
    faculty: "farouk",
    department: "brquke",
    name: "haquna bmtata"
  });

  useEffect(() => {
    const getData = async () => {
      let value = [];
      try{
        let r = await fetch(`${process.env.url}api/v1/programs/${cookies.program}`,
        {
          headers: {
            Authorization: "Bearer " + cookies.token,
          },
        }
        );
    
        
        let program = await r.json();
        
        if (program.status !== "success") {
          setAlerts(alerts => [...alerts, <MassageAlert 
            fail={`error with get program data`}
            status="fail"
            key={Math.random()} 
        />]);
        }else{
    
        value.push(program.data.name)
        }
      }catch(e){
        console.log("program data/", e);
      }

      // department
      try{
        let r = await fetch(`${process.env.url}api/v1/department/${cookies.department}`,
        {
          headers: {
            Authorization: "Bearer " + cookies.token,
          },
        }
        );
    
        
        let department = await r.json();
        
        if (department.status !== "success") {
          setAlerts(alerts => [...alerts, <MassageAlert 
            fail={`error with get department data`}
            status="fail"
            key={Math.random()} 
        />]);
        }else{

          value.push(department.data.name)
        }
      }catch(e){
        console.log("department data/", e);
      }

      //faculty
      try{
        let r = await fetch(`${process.env.url}api/v1/faculty/${cookies.faculty}`,
        {
          headers: {
            Authorization: "Bearer " + cookies.token,
          },
        }
        );
    
        
        let faculty = await r.json();
        
        if (faculty.status !== "success") {
          setAlerts(alerts => [...alerts, <MassageAlert 
            fail={`error with get LOs data`}
            status="fail"
            key={Math.random()} 
        />]);
        }else{

          value.push(faculty.data.name)
        }
      }catch(e){
        console.log("faculy data/", e);
      }

      setProgramData({
        name: value[0],
        department: value[1],
        faculty: value[2]
      })
    }

    getData();
  }, [])

  return (
    <>
      {ObjectHasData(programData) && (
        <div className="flex flex-col">
          <h2 className="font-bold text-xl mb-2">Learning Outcomes Details</h2>
          <div className="h-0.5 w-full bg-gray-300 mb-2" />
          <table className="border-2 border-collapse mt-6">
            <thead className="bg-blue-50">
              <th className="border-2 p-4">Name</th>
              <th className="border-2 p-4">Department</th>
              <th className="border-2 p-4">Faculty</th>
            </thead>
            <tbody>
              <td className="border-2 p-4">{programData["name"]}</td>
              <td className="border-2 p-4">{programData["department"]}</td>
              <td className="border-2 p-4">{programData["faculty"]}</td>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default ProgramData;
