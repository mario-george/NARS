import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CreateSurvey from "./components/CreateSurvey";
import ViewSurveys from "./components/ViewSurveys";

const Surveys = ({ cookies }) => {
  const [courses, setCourses] = useState([]);
  const [allSurveys, setAllSurveys] = useState([]);

  const currentDate = Date.now();

  useEffect(() => {
    getCreatedCoursesForInstructor();
  }, []);

  useEffect(() => {
    if (courses.length > 0) {
      getSurveys();
    }
  }, [courses]);

  async function getCreatedCoursesForInstructor() {
    try {
      const data = await fetch(
        `${process.env.url}api/v1/courses/created-courses?instructor=${cookies._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + cookies.token,
          },
        }
      );

      const resp = await data.json();

      setCourses(resp.data);
      console.log("JUST SET COURSES AGAIN");
    } catch (e) {
      console.log(e);
    }
  }

  async function getSurveys() {
    const requests = courses.map((course) => {
      console.log("GETTING A SURVEY");
      return fetch(
        `${process.env.url}api/v1/surveys/?courseInstance=${course._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + cookies.token,
          },
        }
      ).then((result) => result.json());
    });
    Promise.all(requests)
      .then((value) => {
        const surveys = [];
        value.forEach((surveyRes) => {
          if (surveyRes.status === "success" && surveyRes.data.length > 0) {
            surveyRes.data.forEach((survey) => {
              surveys.push(survey);
            });
          }
        });
        setAllSurveys(surveys);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <div className="flex flex-row w-screen h-screen mt-2">
        <div className="bg-sky-50 h-screen w-[80%] translate-x-[25%] flex flex-col justify-center items-center text-black ml-1 scrollbar-none">
          <div className="contentAddUser2 flex flex-col gap-10 overflow-auto">
            {courses.length > 0 && (
              <>
                <CreateSurvey
                  courses={courses}
                  token={cookies.token}
                  onSurveyAdded={(data) => {
                    getSurveys();
                  }}
                />
                {allSurveys.length > 0 && (
                  <ViewSurveys surveys={allSurveys} token={cookies.token} />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Surveys;
