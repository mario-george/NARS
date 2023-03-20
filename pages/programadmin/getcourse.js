import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import UserList from "@/components/user/CourseList";

const getcourse = ({ cookies }) => {
  if (cookies.role != "program admin" || cookies.loggedInStatus != "true") {
    return <div className="error">404 could not found</div>;
  }

  useEffect(() => {
    document.querySelector("body").classList.add("scrollbar-none");
  });
  console.log(cookies.token);
  const router = useRouter();
  const [course, setCourse] = useState([]);
  useEffect(() => {
    submitHandler();
  }, []);
  const submitHandler = async (e) => {
    if (e) {
      e.preventDefault();
    }
    try {
      const resp = await fetch(
        "http://localhost:80/api/v1/courses/original-courses",
        {
          headers: {
            Authorization: "Bearer " + cookies.token,
          },
        }
      );
      const data = await resp.json();
      console.log(data.data);
      let arr = data.data;

      arr = arr.map((e) => {
        return {
          name: e.name,
          code: e.code,
          academicYear: e.academicYear,
          faculty: e.faculty,
          fullMark: e.fullMark,
        };
      });
      setCourse(arr);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="flex flex-row w-screen h-screen">
        <form
          onSubmit={submitHandler}
          className="bg-sky-50 h-screen w-[80%]  translate-x-[25%]  flex flex-col justify-center items-center text-black ml-1 rounded-2xl"
          >
          <div className="contentAddUser2 overflow-auto flex flex-col gap-10">
            <div className="flex items-center justify-between">
              <p className="font-normal">Courses {">"} Assign Instrctor</p>
            </div>

            <UserList courses={course} />
          </div>
        </form>
      </div>
    </>
  );
};

export default getcourse;
