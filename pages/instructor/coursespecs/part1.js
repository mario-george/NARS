import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import Cookies from "js-cookie";
import InstructorDashboard from "../../../components/InstructorDashboard";

const part1 = ({ cookies }) => {
  if (cookies.role != "instructor" || cookies.loggedInStatus != "true") {
    return <div className="error">404 could not found</div>;
  }

  useEffect(() => {
    console.log(cookies);

    console.log(JSON.stringify(cookies));
  }, []);

  const contactHours = useRef();

  const specialization = useRef();
  const selectedCourseTitle = useRef();
  const [coursesTitles, setCoursesTitles] = useState([]);
  const router = useRouter();
  // const [invalidData, setInvalidData] = useState(false);

  useEffect(() => {
    let courses = JSON.parse(cookies.courses);
    async function createCourses() {
      courses.map(async (c) => {
        const obj = {
          course: c,
        };

        console.log(c);
        let resp = await fetch(
          `${process.env.url}api/v1/courses/created-courses`,
          {
            method: "POST",
            body: JSON.stringify(obj),

            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + cookies.token,
            },
          }
        );
        let data = await resp.json();
        console.log(data);
      });
      // courses.map(async (c) => {
      // });
    }
    async function getCoursesNames() {
      const d = await fetch(
        `${process.env.url}api/v1/courses/original-courses`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + cookies.token,
          },
        }
      );
      const data = await d.json();

      console.log(data);
      const newArr = data.data.filter((e) => {
        return courses.map((id) => {
          id === e._id;
        });
      });
      setCoursesTitles(newArr);
    }
    createCourses();
    getCoursesNames();
  }, []);
  const submitHandler = async (e) => {
    e.preventDefault();

    Cookies.set("contactHours", contactHours.current.ref);
    Cookies.set("specialization", specialization.current.ref);

    /*const r = await fetch(
            "url",
            {
                method: "",

                body: JSON.stringify({
                     : code.current.value,
                     : year.current.value,
                     : special.current.value,
                     : hours.current.value,
                     : lecture.current.value,
                     : practical.current.value,
                 }),
headers: { "Content-Type": "application/json" },
             }
         );

const resp = await r.json();
console.log(resp);
Cookies.set("data", resp.data);
Cookies.set("", resp.data.);
Cookies.set("", resp.data.);
Cookies.set("", resp.data.);
Cookies.set("", resp.data.);
Cookies.set("", resp.data.);
Cookies.set("", resp.data.);*/
    window.location.href = "/instructor/coursespecs/part2";
  };

  const clickHandler = async () => {
    const obj = {
      course: "63fcb475b5833ef49fd468bc",
    };
    // console.log(JSON.stringify(obj));

    let resp = await fetch(`${process.env.url}api/v1/courses/created-courses`, {
      method: "POST",
      body: JSON.stringify(obj),

      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await resp.json();
    console.log(data);
  };
  console.log(coursesTitles);
  return (
    <>
      <div className="flex flex-row w-screen h-screen mt-2">
        <InstructorDashboard />
        <form
          onSubmit={submitHandler}
          className="bg-sky-50 h-screen w-screen flex flex-col justify-center items-center text-black ml-1"
        >
          <div className="contentAddUser2 flex flex-col gap-10">
            <p className="underline mb-1">-Course Data:</p>
            <div className="flex gap-20 ">
              <div className="flex flex-col gap-5 w-1/3">
                <div>Course Code & Title:</div>
                <select
                  id="small"
                  class="block w-full text-xl md:text-lg p-3   text-gray-900 border border-gray-300 rounded-lg  focus:ring-blue-500 focus:border-blue-500  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 active:bg-white bg-gray-100 "
                >
                  <option selected>Choose a course</option>
                  {coursesTitles.map((e) => {
                    return <option value={e._id}>{e.name}</option>;
                  })}
                </select>
              </div>
              <div className="flex flex-col gap-5  w-2/5">
                <div> Semester/Year:</div>
                <input
                  type="text"
                  name="year"
                  className="input-form  w-full"
                  required
                />
              </div>
            </div>

            <div className="flex gap-20 ">
              <div className="flex flex-col gap-5 w-1/3">
                <div>Specialization:</div>
                <input
                  type="text"
                  name="special"
                  className="input-form w-full"
                  ref={specialization}
                  required
                />
              </div>
              <div className="flex flex-col gap-5  w-2/5">
                <div> Contact Hours: </div>
                <input
                  type="number"
                  name="hours"
                  className="input-form  w-full"
                  ref={contactHours}
                  required
                />
              </div>
            </div>

            <div className="flex gap-20 ">
              <div className="flex flex-col gap-5 w-1/3">
                <div>Lecture:</div>
                <input
                  type="number"
                  name="lecture"
                  className="input-form w-full"
                  required
                />
              </div>
              <div className="flex flex-col gap-5  w-2/5">
                <div> Practical/Practice: </div>
                <input
                  type="number"
                  name="practical"
                  className="input-form  w-full"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                class="w-[6rem]  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg px-5 py-2.5 mx-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Next
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default part1;
