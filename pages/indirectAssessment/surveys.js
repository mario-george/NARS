import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CreateSurvey from "./components/CreateSurvey";
import ViewSurveys from "./components/ViewSurveys";

const Surveys = ({ cookies }) => {
  const [courses, setCourses] = useState([]);
  const [allSurveys, setAllSurveys] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [studentSubmissions, setStudentSubmissions] = useState([]);

  const currentDate = Date.now();

  const router = useRouter();
  const { role } = router.query;

  useEffect(() => {
    getCreatedCoursesForInstructor();
  }, []);

  //when the courses are ready, get the surveys
  useEffect(() => {
    if (courses.length > 0) {
      getSurveys();
    }
  }, [courses]);

  //when we get the surveys, we then get the student submissions
  useEffect(() => {
    if (allSurveys.length > 0) {
      if (role === "isStudent") {
        getStudentSubmissions(allSurveys);
      } else {
        //this means, there's nothing else to load
        setDataLoaded(true);
      }
    }
  }, [allSurveys]);

  async function getCreatedCoursesForInstructor() {
    console.log("IDDDDD", cookies._id);
    const url = `${
      role === "isStudent"
        ? `${process.env.url}api/v1/users/students/getCourses/${cookies._id}`
        : `${process.env.url}api/v1/courses/created-courses?instructor=${cookies._id}`
    }`;
    try {
      const data = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + cookies.token,
        },
      });

      const resp = await data.json();

      if (role === "isStudent") {
        console.log("COURSES", JSON.stringify(resp));
        const courses = resp.courses.map((item) => item.course);
        setCourses(courses);
      } else {
        setCourses(resp.data);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function getSurveys() {
    const requests = courses.map((course) => {
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

  async function getStudentSubmissions(surveys) {
    const url = `${process.env.url}api/v1/surveys/student-submissions?studentId=${cookies._id}`;
    try {
      const data = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + cookies.token,
        },
      });

      const resp = await data.json();
      const submissions = resp.data;

      surveys.map((survey) => {
        if (submissions.length > 0) {
          if (submissions.map((sub) => sub.survey._id).includes(survey._id)) {
            survey.submitted = true;
          } else {
            survey.submitted = false;
          }
        }
      });
      surveys.sort(function (a, b) {
        return new Date(b.dueTo) - new Date(a.dueTo);
      });

      console.log("SRUVEYS", JSON.stringify(surveys));

      setStudentSubmissions(resp.data);
      setAllSurveys(surveys);
      // setTimeout(() => {
      setDataLoaded(true);
      // }, 3000);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <div className="flex flex-row w-screen h-screen mt-2">
        <div className="bg-sky-50 h-screen w-[80%] translate-x-[25%] flex flex-col justify-center items-center text-black ml-1 scrollbar-none">
          <div className="contentAddUser2 flex flex-col gap-10 overflow-auto">
            {courses.length > 0 && (
              <>
                {role !== "isStudent" && (
                  <CreateSurvey
                    courses={courses}
                    token={cookies.token}
                    onSurveyAdded={(data) => {
                      getSurveys();
                    }}
                  />
                )}
                {dataLoaded && (
                  <ViewSurveys
                    surveys={allSurveys}
                    token={cookies.token}
                    role={role}
                    submissions={studentSubmissions}
                  />
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
