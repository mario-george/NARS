import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import Cookies from "js-cookie";
import InstructorDashboard from "@/components/InstructorDashboard";

const part1 = ({ cookies }) => {
  if (cookies.role != "instructor" || cookies.loggedInStatus != "true") {
    return <div className="error">404 could not found</div>;
  }

  const token = Cookies.get("token");
  const code = useRef();
  const year = useRef();
  const special = useRef();
  const hours = useRef();
  const lecture = useRef();
  const practical = useRef();
  const router = useRouter();
  const { courseID } = router.query;
  const submitHandler = async (e) => {
    e.preventDefault();
    const r = await fetch(
      `${process.env.url}api/v1/courses/created-courses/${courseID}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          courseSpecs: {
            courseData: {
              courseCode: code.current.value,
              year: year.current.value,
              practical: practical.current.value,
              lectures: lecture.current.value,
              contactHourse: hours.current.value,
              specialization: special.current.value,
            },
          },
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    const resp = await r.json();
    console.log(resp);
    // window.location.href = "/instructor/coursespecs/part2";
  };
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
                <input
                  type="text"
                  name="code"
                  className="input-form w-full"
                  ref={code}
                />
              </div>
              <div className="flex flex-col gap-5  w-2/5">
                <div> Semester/Year:</div>
                <input
                  type="text"
                  name="year"
                  className="input-form  w-full"
                  ref={year}
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
                  ref={special}
                />
              </div>
              <div className="flex flex-col gap-5  w-2/5">
                <div> Contact Hours: </div>
                <input
                  type="number"
                  name="hours"
                  className="input-form  w-full"
                  ref={hours}
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
                  ref={lecture}
                />
              </div>
              <div className="flex flex-col gap-5  w-2/5">
                <div> Practical/Practice: </div>
                <input
                  type="number"
                  name="practical"
                  className="input-form  w-full"
                  ref={practical}
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
