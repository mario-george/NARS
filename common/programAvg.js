import token from "./token";
import MassageAlert from "@/components/MassageAlert";

const programAvg = async(
  programID,
  setCompAvg,
  setCourseAvg,
  setAlerts
) => {
  let courses = [];
  let compAvg = {};
  let courseAvg = {};

  // console.log("programID", programID);

  try{
    let rComp = await fetch(`${process.env.url}api/v1/programs/viewComp/${programID}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
    );

    
    let competences = await rComp.json();
    
    if (competences.status !== "success") {
      setAlerts([...alerts, <MassageAlert 
        fail={`error with get competences data`}
        status="fail"
        key={Math.random()} 
    />]);
    }else{
      competences.programComp.forEach(comp => {
        compAvg[comp.code] = {
          "direct": 0,
          "indirect": 0,
          "avg": 0,
          "numCourses": 0
        };

        // console.log("blo", compAvg[comp.code], comp.code);
      });
    }
  }catch(e){
    console.log("programs/viewComp/", e);
  }

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
      setAlerts([...alerts, <MassageAlert 
        fail={`error with get original courses data`}
        status="fail"
        key={Math.random()} 
        />]);
    }else{
      ogCourses.data.forEach(course => {

        courses.push([course.name, course._id])
      });
    }
  }catch(e){
    console.log("courses/original-courses/?program=", e);
  }

  try{
    courses.forEach(async course => {
      let rCourse = await fetch(`${process.env.url}api/v1/courses/created-courses/?course=${course[1]}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
      );
      
      let ceCourses = await rCourse.json();
      // console.log("ceCourses", course[0], ceCourses);

      if(ceCourses.results){

        courseAvg[course[0]] = {
          "direct": 0,
          "indirect": 0,
          "avg": 0
        };


        let wantedCourse = ceCourses.data.map(c => {
          // if(c.active){
            return c
          // }[0];
        })[0]
  
        if (ceCourses.status !== "success") {
          setAlerts([...alerts, <MassageAlert 
            fail={`error with get created courses data`}
            status="fail"
            key={Math.random()} 
        />]);
        }else{
          let wCourse = await fetch(`${process.env.url}api/v1/courses/created-courses/${wantedCourse._id}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
          );
  
          let weCourse = await wCourse.json();
  
          if (weCourse.status !== "success") {
            setAlerts([...alerts, <MassageAlert 
              fail={`error with get ${course[0]} data`}
              status="fail"
              key={Math.random()} 
          />]);
          }else{
            let direct = weCourse.data.report.avgCompetences;
            let indirect = weCourse.data.report.avgCompetencesInDirect;

            // console.log("direct", direct);
  
            direct.forEach((elm, i) => {

              let c = elm.code;

              if(direct[i].avg){
                courseAvg[course[0]]['direct'] += direct[i].avg;
                
                // console.log(`rto ${c} > 1`, direct[i].avg, compAvg[c]['direct'])
                if(isNaN(compAvg[c]['direct'])){
                  // console.log("blolo");
                  compAvg[c]['direct'] = direct[i].avg;
                }else{
                  // console.log("blolopo", c);
                  compAvg[c]['direct'] += direct[i].avg;
                }
                // console.log(`rto ${c} > 2`, direct[i].avg, compAvg[c]['direct'])
              }

              if(indirect[i].avg){
                courseAvg[course[0]]['indirect'] += indirect[i].avg;

                // compAvg[c]['indirect'] += indirect[i].avg;
                // console.log(`rto ${c} > 1`, indirect[i].avg, compAvg[c]['indirect'])
                compAvg[c]['indirect'] += indirect[i].avg;
                // console.log(`rto ${c} > 2`, indirect[i].avg, compAvg[c]['indirect'])
              }

              compAvg[c]['numCourses'] += 1;
            });

            courseAvg[course[0]]['direct'] /= direct.length;
            courseAvg[course[0]]['indirect'] /= indirect.length;
  
            courseAvg[course[0]]['avg'] = (courseAvg[course[0]]['direct'] + courseAvg[course[0]]['indirect']) / 2;
          }
        }
      }else{
        // console.log("course[0]", course[0]);
        delete courseAvg[course[0]];
      }
    })
  }catch(e){
    console.log("courses/created-courses/?course=$", e);
  }

  // Object.keys(compAvg).forEach(c => {
  //   console.log("git int u", c, compAvg[c]['direct'], compAvg[c]);
  //   if(compAvg[c]['numCourses']){
  //     console.log("c", c);
  //     compAvg[c]['direct'] /= compAvg[c]['numCourses'];
  //     compAvg[c]['indirect'] /= compAvg[c]['numCourses'];
  //     compAvg[c]['avg'] = (compAvg[c]['direct'] + compAvg[c]['indirect']) / 2;
  //   }
    

  // });

  console.log("compAvg", compAvg);
  console.log("courseAvg", Object.keys(courseAvg), courseAvg);

  setCompAvg(compAvg);
  setCourseAvg(courseAvg);

  return {
    compAvg: compAvg,
    courseAvg: courseAvg
  }

}

module.exports = programAvg;