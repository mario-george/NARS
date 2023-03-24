import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
const create = ({ cookies }) => {
  const userState = useSelector((s) => s.user);
  if (userState.role != "instructor" || userState.loggedInStatus != "true") {
    return <div className="error">404 could not found</div>;
  }
  const router = useRouter();
  const [coursesTitles, setCoursesTitles] = useState([]);
  const courseId = useRef();
  useEffect(() => {
    let courses = userState.courses;
    let coursesParsed;
    if (courses) {
      try {
        coursesParsed = JSON.parse(userState.courses);
      } catch (e) {
        console.log(e);
      }
    }
    async function getCoursesNames() {
      const d = await fetch(
        `${process.env.url}api/v1/courses/original-courses`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userState.token,
          },
        }
      );
      const data = await d.json();

      console.log(data);
      const newArr = data.data.filter((e) => {
        return coursesParsed.map((id) => {
          id === e._id;
        });
      });
      setCoursesTitles(newArr);
    }
    getCoursesNames();
    console.log(coursesParsed);
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    createCourses();
    console.log(courseId.current.value);
    console.log(cookies._id);
    console.log(cookies);
    async function createCourses() {
      console.log(courseId.current.value);
      console.log(typeof courseId.current.value);

      const obj = {
        course: courseId.current.value,
        instructor: cookies._id,
      };

      let resp = await fetch(
        `${process.env.url}api/v1/courses/created-courses`,
        {
          method: "POST",
          body: JSON.stringify(obj),

          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + userState.token,
          },
        }
      );
      let data = await resp.json();
      console.log(data);
      window.location.reload();
      // courses.map(async (c) => {
      // });
    }
  };

  //   if(role!='instructor'){

  //     return <div className="flex justify-center w-full">
  // <div className="font-bold">404 page could not found</div>
  //     </div>
  //   }
  return (
    <>
      <div className="flex flex-row w-screen h-screen mt-2">
        <form
          onSubmit={submitHandler}
          className="bg-sky-50 h-screen w-[80%] translate-x-[25%] flex flex-col justify-center items-center text-black ml-1 scrollbar-none"
        >
          <div className="contentAddUser2 flex flex-col gap-10">
            <p className="underline mb-1">Create course:</p>
            <div className="flex gap-20 ">
              <div className="flex flex-col gap-5 w-1/3">
                <div>Course </div>
                <select ref={courseId} id="small" class=" choose-form">
                  <option selected>Choose a course</option>
                  {coursesTitles.map((e) => {
                    return <option value={e._id}>{e.name}</option>;
                  })}
                </select>
              </div>
            </div>
            <div className="flex gap-20 "></div>
            <div className="flex justify-end">
              <button
                type="submit"
                class="w-[6rem]  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg px-5 py-2.5 mx-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default create;
