import token from "./token";
import MassageAlert from "@/components/MassageAlert";

const programAvg1 = async(
  programID,
  setCompAvg,
  setCourseAvg,
  setAlerts
) => {
  let compAvg = {};
  let courseAvg = {};

  // console.log("programID", programID);

  // indirect
  try{
    let rComp = await fetch(`${process.env.url}api/v1/programs/${programID}/indirectAssessment`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
    );

    
    let indirect = await rComp.json();
    
    if (indirect.status !== "success") {
      setAlerts([...alerts, <MassageAlert 
        fail={`error with get indirect assessment data`}
        status="fail"
        key={Math.random()} 
    />]);
    }else{

      // competences
      indirect.data.report.programCompAvgsIndirect.forEach(comp => {
        if(comp.avg){
          compAvg[comp.code] = {
            "indirect": comp.avg,
          };
        }else{
          compAvg[comp.code] = {
            "indirect": 0,
          };
        }
        

        // console.log("blo", compAvg[comp.code], comp.code);
      });

      // courses
      indirect.data.report.courseAvgIndirect.forEach(course => {
        if(course.avg){
          courseAvg[course.name] = {
            "indirect": course.avg,
          };
        }else{
          courseAvg[course.name] = {
            "indirect": 0,
          };
        }
        

        // console.log("blo", compAvg[comp.code], comp.code);
      });
    }
  }catch(e){
    console.log("indirect/", e);
  }

  // direct
  try{
    let rComp = await fetch(`${process.env.url}api/v1/programs/${programID}/directAssessment`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
    );

    
    let direct = await rComp.json();
    
    if (direct.status !== "success") {
      setAlerts([...alerts, <MassageAlert 
        fail={`error with get direct assessment data`}
        status="fail"
        key={Math.random()} 
    />]);
    }else{

      // competences
      direct.data.report.programCompAvgs.forEach(comp => {
        if(comp.avg){
          // console.log(`ssko ${comp.code} ${typeof comp.code}`, comp.avg)
          compAvg[comp.code]["direct"] = comp.avg;
          compAvg[comp.code]['avg'] = (comp.avg + compAvg[comp.code]["indirect"]) / 2
          // console.log(`ssko;p ${comp.code} ${typeof comp.code}`, comp.avg, compAvg[comp.code])
        }else{
          compAvg[comp.code]["direct"] = 0;
          compAvg[comp.code]['avg'] = compAvg[comp.code]["indirect"] / 2
        }
        

        // console.log("blo", compAvg[comp.code], comp.code);
      });

      // courses
      direct.data.report.courseAvgIndirect.forEach(course => {
        if(course.avg){
          courseAvg[course.name]["direct"] = course.avg;
          courseAvg[course.name]['avg'] = (course.avg + courseAvg[course.name]["indirect"]) / 2
        }else{
          courseAvg[course.name]["direct"] = 0;
          courseAvg[course.name]['avg'] = courseAvg[course.name]["indirect"] / 2
        }
        

        // console.log("blo", compAvg[comp.code], comp.code);
      });
    }
  }catch(e){
    console.log("direct/", e);
  }

  
  // Object.keys(compAvg).forEach(c => {
  //   // console.log("git int u", c, compAvg[c]['direct'], compAvg[c]);
  //   console.log("c", c);
  //   compAvg[c]['avg'] = (compAvg[c]['direct'] + compAvg[c]['indirect']) / 2;
  // });

  // Object.keys(compAvg).forEach(c => {
  //   // console.log("git int u", c, compAvg[c]['direct'], compAvg[c]);
  //   console.log("c", c);
  //   courseAvg[course.name]['avg'] = (course.avg + compAvg[c]["indirect"]) / 2
  // });

  // console.log("compAvg", compAvg);
  // console.log("courseAvg", Object.keys(courseAvg), courseAvg);

  setCompAvg(compAvg);
  setCourseAvg(courseAvg);

  return {
    compAvg: compAvg,
    courseAvg: courseAvg
  }

}

module.exports = programAvg1;