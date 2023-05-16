import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { header } from "./header";
import { userActions } from "./store/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";
import { CgLogOut } from "react-icons/cg";
import { BsBook } from "react-icons/bs";
import { GrAddCircle, GrOrderedList } from "react-icons/gr";
import HeaderElementStudent from "./HeaderElementStudent.js";

export default function StudentDashboard({ cookies }) {
  const router = useRouter();
  const navStatus = useSelector((s) => s.user.navStatus);
  const userState = useSelector((s) => s.user);
  const [coursesState, setCoursesState] = useState([]);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    router.push("/logout");
  };
  useEffect(() => {
    console.log("ID IS ", userState._id);
    console.log("TOKEN IS ", userState.token);
    try {
      getCreatedCoursesForStudent();
    } catch (e) {
      console.log(e);
    }
  }, []);
  async function getCreatedCoursesForStudent() {
    const data = await fetch(
      `${process.env.url}api/v1/users/students/getCourses/${userState._id}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + userState.token,
        },
      }
    );

    const resp = await data.json();
    // console.log("COURSES ARE ", JSON.stringify(resp.courses));
    let courses = [];
    resp.courses.forEach((item) => {
      if (item.course) {
        courses.push(item.course);
      }
    });
    setCoursesState(courses);
  }
  console.log(coursesState);
  return (
    <nav
      className={`nav2 transition-all duration-300 transform ${
        navStatus ? ` -translate-x-full` : `translate-x-0 `
      }`}
    >
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
            coursesState.map((courseInstance) => {
              return (
                <div key={courseInstance._id} className=" mb-5 -mx-4  px-0 ">
                  <HeaderElementStudent
                    className={``}
                    key={courseInstance.course._id}
                    id={courseInstance._id}
                    originalId={courseInstance.course._id}
                    name={courseInstance.course.name}
                    createdAt={courseInstance.createdAt.split("T")[0]}
                    cookies={cookies}
                    passed={courseInstance.passed}
                  />
                </div>
              );
            })
          ),
        ]
      )}
      <Link
        className="link2 focus:text-green-400 "
        href={{
          pathname: "/indirectAssessment/surveys",
          query: {
            role: "isStudent",
          },
        }}
      >
        <span>
          <GrOrderedList
            style={{ fontSize: 30, display: "inline", marginBottom: 5 }}
          />
        </span>
        <span className="ml-2">Surveys</span>
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
