import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { header } from "./header";
import { useEffect, useState } from "react";
import HeaderElement from "./headerElement/headerElement";
export default function InstructorDashboard() {
  const [c, sC] = useState([]);
  const cookies = useSelector((s) => s.user.cookies);
  useEffect(() => {
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
      const newData = resp.data.map((e) => {
        return {
          _id: e._id,
        };
      });
      // console.log(newData)
      // const final=newData.map(e=>{
      //   return header(e._id.toString(), [
      //     "course specs",
      //     "Materials",
      //     "Assignments",
      //     "Exams",
      //     "Grades",
      //     "Direct assesment",
      //     "Indirect assesment",
      //   ])

      // }

      // )

      // let last = newData.map((e) => {
      //   return header(e._id.toString(), [
      //     "course specs",
      //     "Materials",
      //     "Assignments",
      //     "Exams",
      //     "Grades",
      //     "Direct assesment",
      //     "Indirect assesment",
      //   ]);
      // });
      let last = newData.map((e) => (
        <HeaderElement key={e._id} id={e._id.toString()} />
      ));

      sC(last);
    }
    getCreatedCoursesForInstructor();
  }, []);
  const router = useRouter();
  const courseName = useSelector((s) => s.user.data.courses);
  return (
    <nav className="nav44">
      <Link className="link2 focus:text-green-400 " href="/instructor/profile">
        Profile
      </Link>

      {header("courses", [Array(c)])}

      {/* {c.length!=0?c.map((e) => {
         
        
         return header(e._id.toString(), [ "course specs", "Materials",
          "Assignments", "Exams", "Grades", "Direct assesment",
           "Indirect assesment", ]);

          
   
        
      }):null} */}

      {header("Create Course", [
        <a
          className="link2 focus:text-green-400 "
          href="/instructor/coursespecs/part1"
        >
          Course Specs
        </a>,
        <a
          className="link2 focus:text-green-400 "
          href="/instructor/courses/create"
        >
          Create Course
        </a>,
      ])}
      <a className="link2 focus:text-green-400 " href="/instructor/report">
        Course report
      </a>
      <Link className="link2 focus:text-green-400 " href="/login">
        Logout
      </Link>
    </nav>
  );
}
