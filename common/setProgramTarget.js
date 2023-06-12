import token from "./token";
import MassageAlert from "@/components/MassageAlert";

const setProgramTarget = async(
  programID,
  setTarget,
  setAlerts
) => {
  // console.log("programID", programID);

  try{
    let rCourse = await fetch(`${process.env.url}api/v1/courses/original-courses/?program=${programID}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
    );

    let ogCourses = await rCourse.json();

    if (ogCourses.status !== "success") {
      setAlerts(alerts => [...alerts, <MassageAlert 
        fail={`error with get original courses data`}
        status="fail"
        key={Math.random()} 
        />]);
    }else{
      setTarget([
        ogCourses.data[0].minTarget,
        ogCourses.data[0].maxTarget
      ])
    }
  }catch(e){
    console.log("courses/original-courses/?program=", e);
  }

  

}

export default setProgramTarget;