import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import Cookies from "js-cookie";
import NavbarStudent from "@/components/NavbarStudent/Navbar";
import { updateField } from "@/components/store/userSlice";

const coursedetails = ({ cookies }) => {
  const d = useDispatch();
  const router = useRouter();
  const { courseID } = router.query;
  //d(updateField({ field: "instance_id", value: "640a00ddf2c159ff55229106" }));
  useEffect(() => {
    document.querySelector("body").classList.add("scrollbar-none");
    const getData = async function () {
      const r = await fetch(
        `${process.env.url}api/v1/courses/created-courses/${courseID}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      const data = await r.json();
      console.log("DATA IS ", data);
      console.log(data.data.courseSpecs);
      d(updateField({ field: "courseSpecs", value: data.data.courseSpecs }));
      // code.current.value=data.courseSpecs.courseData.courseCode
      // year.current.value=data.courseSpecs.courseData.year
      // practical.current.value=data.courseSpecs.courseData.practical
      if (lecture.current && special.current && hours.current) {
        lecture.current.value = data.data.courseSpecs.courseData.lectures;
        hours.current.value = data.data.courseSpecs.courseData.contactHourse;
        special.current.value = data.data.courseSpecs.courseData.specialization;
      }
    };
    getData();
  }, []);
  const userState = useSelector((s) => s.user);
  const token = userState.token;
  const code = useRef("");
  const year = useRef("");
  const special = useRef("");
  const hours = useRef("");
  const lecture = useRef("");
  const practical = useRef("");
  return (
    <>
      <div className="flex flex-row w-screen h-screen mt-2 scrollbar-none">
        <form className="bg-sky-50 h-screen w-[80%] translate-x-[25%] flex flex-col justify-center items-center text-black ml-1 scrollbar-none relative">
          <div className="contentAddUser2 flex flex-col gap-10 overflow-auto  scrollbar-none">
            <NavbarStudent cookies={cookies} id={courseID} />
            <p className="underline mb-1 ">-Course Data:</p>
            <div className="flex gap-20 ">
              <div className="flex flex-col gap-5 w-1/3">
                <div>Course Code & Title:</div>
                <input
                  type="text"
                  name="code"
                  className="input-form w-full"
                  ref={code}
                  disabled
                />
              </div>
              <div className="flex flex-col gap-5  w-2/5">
                <div> Semester/Year:</div>
                <input
                  type="text"
                  name="year"
                  className="input-form  w-full"
                  ref={year}
                  disabled
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
                  disabled
                />
              </div>
              <div className="flex flex-col gap-5  w-2/5">
                <div> Contact Hours: </div>
                <input
                  type="number"
                  name="hours"
                  className="input-form  w-full"
                  ref={hours}
                  disabled
                />
              </div>
            </div>

            <div className="flex gap-20 j ">
              <div className="flex flex-col gap-5 w-1/3">
                <div>Lecture:</div>
                <input
                  type="number"
                  name="lecture"
                  className="input-form w-full"
                  ref={lecture}
                  disabled
                />
              </div>
              <div className="flex flex-col gap-5  w-2/5">
                <div> Practical/Practice: </div>
                <input
                  type="number"
                  name="practical"
                  className="input-form  w-full"
                  ref={practical}
                  disabled
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default coursedetails;
