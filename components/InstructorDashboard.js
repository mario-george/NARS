import Link from "next/link";
import { userActions } from "./store/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import HeaderElement from "./HeaderElement.js";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { header } from "./header";
import { useEffect, useState, useRef } from "react";
import { CgProfile } from "react-icons/cg";
import { CgLogOut } from "react-icons/cg";
import { BsBook } from "react-icons/bs";
import { GrAddCircle } from "react-icons/gr";

export default function InstructorDashboard() {
  const [c, sC] = useState([]);
  const coursesRef = useRef([]);
  const r = useRouter();
  const cookies = useSelector((s) => s.cookies);
  const userState = useSelector((s) => s.user);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(userActions.logOut());
    window.location.href = "/logout";
    // r.push('/logout')
  };
  const handel_set_cookies = (e) => {
    Cookies.set("instance_id", e);
    //window.location.href=`/instructor/courses/${e}/courseSpecs/part1`
  };
  useEffect(() => {
    let newData33 = [];

    async function getCreatedCoursesForInstructor() {
      const data = await fetch(
        `${process.env.url}api/v1/courses/created-courses?instructor=${userState._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + userState.token,
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
              Authorization: "Bearer " + userState.token,
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
  return (
    <nav className="nav44 scrollbar-none">
      <Link className="link2 focus:text-green-400 " href="/profile">
        <span>
          <CgProfile
            style={{ fontSize: 30, display: "inline", marginBottom: 5 }}
          />
        </span>
        <span className="ml-2">Profile</span>
      </Link>

      {header(
        <span>
          <BsBook
            style={{
              fontSize: 30,
              display: "inline",
              marginBottom: 0,
              marginRight: 9,
            }}
          />
          courses
        </span>,
        [
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
                    cookies={cookies}
                  />
                </div>
              );
            })
          ),
        ]
      )}

      {/* {c.length!=0?c.map((e) => {
         
        
         return header(e._id.toString(), [ "course specs", "Materials",
          "Assignments", "Exams", "Grades", "Direct assesment",
           "Indirect assesment", ]);

          
   
        
      }):null} */}

      <Link
        className="link2 focus:text-green-400 "
        href="/instructor/courses/create"
      >
        <span>
          <GrAddCircle
            style={{ fontSize: 30, display: "inline", marginBottom: 5 }}
          />
        </span>
        <span className="ml-2">Create course </span>
      </Link>
      <button
        className="link2 focus:text-green-400 text-left"
        onClick={logoutHandler}
      >
        <span>
          <CgLogOut
            style={{ fontSize: 30, display: "inline", marginBottom: 0 }}
          />
        </span>
        <span className="ml-2">Logout</span>
      </button>
    </nav>
  );
}
