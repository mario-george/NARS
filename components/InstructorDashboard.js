import Link from "next/link";
import { userActions } from "./store/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { header } from "./header";
import { useEffect, useRef, useState } from "react";
import HeaderElement from "./headerElement/headerElement";

export default function InstructorDashboard() {
  const [c, sC] = useState([]);
  const coursesRef = useRef([]);
  const cookies = useSelector((s) => s.user.cookies);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(userActions.logOut());
    window.location.href = "/logout";
  };
  useEffect(() => {
    let newData33 = [];

    async function getCreatedCoursesForInstructor() {
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
      const newData = await resp.data.map(async (e) => {
        let data2 = await fetch(
          `${process.env.url}api/v1/courses/original-courses?_id=${e.course}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + cookies.token,
            },
          }
        );
        let resp2 = await data2.json();

        const dateString = e.createdAt;

        const dateOnly = dateString.split("T")[0];

        newData33.push({
          name: resp2.data[0].name,
          createdAt: dateOnly,
          _id: e._id,
        });
      });

      sC(newData33);
    }

    try {
      getCreatedCoursesForInstructor();
    } catch (e) {
      console.log(e);
    }
  }, []);
  const router = useRouter();
  const courseName = useSelector((s) => s.user.data.courses);
  return (
    <nav className="nav44">
      <a className="link2 focus:text-green-400 " href="/instructor/profile">
        Profile
      </a>

      {header("courses", [
        Array(
          c.map((e) => {
            return (
              <div key={e._id} className=" mb-5 -mx-4  px-0 ">
                <HeaderElement
                  className={``}
                  key={e._id}
                  id={e._id.toString()}
                  name={e.name}
                  createdAt={e.createdAt}
                />
              </div>
            );
          })
        ),
      ])}

      {/* {c.length!=0?c.map((e) => {
         
        
         return header(e._id.toString(), [ "course specs", "Materials",
          "Assignments", "Exams", "Grades", "Direct assesment",
           "Indirect assesment", ]);

          
   
        
      }):null} */}

      <a
        className="link2 focus:text-green-400 "
        href="/instructor/courses/create"
      >
        Create Course
      </a>
      <button
        className="link2 focus:text-green-400 text-left mx-2"
        onClick={logoutHandler}
      >
        Logout
      </button>
    </nav>
  );
}
