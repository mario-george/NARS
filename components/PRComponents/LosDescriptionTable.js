import {useEffect, useState} from "react";
import MassageAlert from "@/components/MassageAlert";

const LosDescriptionTable = ({ cookies, setAlerts }) => {
  const [learningOutcomes, setLearningOutcomes] = useState([
    "This is the first learning outcome",
    "This is the second learning outcome",
    "This is the third learning outcome",
  ]);

  useEffect(() => {
    const getData = async () => {
      try{
        let r = await fetch(`${process.env.url}api/v1/programs/${cookies.program}/LOS`,
        {
          headers: {
            Authorization: "Bearer " + cookies.token,
          },
        }
        );
    
        
        let LOs = await r.json();
        
        if (LOs.status !== "success") {
          // console.log("kskdfesdsdlslolo;")
          setAlerts([...alerts, <MassageAlert 
            fail={`error with get LOs data`}
            status="fail"
            key={Math.random()} 
        />]);
        }else{
    
          // LOs
          // console.log("LOs.data.programLOs", LOs.data.programLOs, LOs.data)
          setLearningOutcomes(LOs.data.programLOs);
        }
      }catch(e){
        console.log("LOs/", e);
      }
    }

    getData();
  }, [])

  return (
    <>
      {learningOutcomes.length > 0 && (
        <div className="flex flex-col">
          <h2 className="font-bold text-xl mb-2">Learning Outcomes Details</h2>
          <div className="h-0.5 w-full bg-gray-300 mb-2" />
          <table className="border-2 border-collapse mt-6">
            <thead className="bg-blue-50">
              <th className="border-2 p-4">Learning Outcomes</th>
              <th className="border-2 p-4" style={{ width: "75%" }}>
                Description
              </th>
            </thead>
            <tbody>
              {learningOutcomes.map((learningOutcome, index) => (
                <tr className="border-2">
                  <td className="border-2 py-4 text-center">{`LO${
                    index + 1
                  }`}</td>
                  <td className="border-2 py -4 px-8">{learningOutcome}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default LosDescriptionTable;
