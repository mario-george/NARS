import Link from "next/link";
import { updateField, userActions } from "./store/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import HeaderElement from "./HeaderElement.js";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { header } from "./header";
import { useEffect, useState, useRef } from "react";
import { CgProfile } from "react-icons/cg";
import { CgLogOut } from "react-icons/cg";
import { BsBook } from "react-icons/bs";
import { GrAddCircle, GrOrderedList } from "react-icons/gr";

export default function InstructorDashboard({ cookies }) {
  const [c, sC] = useState([]);
  const coursesRef = useRef([]);
  const r = useRouter();
  const userState = useSelector((s) => s.user);
  const CreatedCoursesForInstructor = userState.CreatedCoursesForInstructor;
  const dispatch = useDispatch();

  const logoutHandler = () => {
    r.push("/logout");
  };

  useEffect(() => {
    console.log("Render");
  });

  useEffect(() => {
    console.log("TOKEN IS ", JSON.stringify(userState._id));
    console.log("TOKEN IS ", JSON.stringify(userState.token));

    try {
      getCreatedCoursesForInstructor();
    } catch (e) {
      console.log(e);
    }
  }, [CreatedCoursesForInstructor]);

  async function getCreatedCoursesForInstructor() {
    try {
      console.log(userState.token);
      console.log(userState._id);
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
      sC(resp.data);
    } catch (e) {
      console.log(e);
    }
  }
  const navStatus = useSelector((s) => s.user.navStatus);

  return (
    <nav
      className={`nav2  transition-all duration-300 transform ${
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
            c.map((courseInstance) => {
              return (
                <div key={courseInstance._id} className=" mb-1 -mx-4  px-0 ">
                  <HeaderElement
                    className={``}
                    key={courseInstance._id}
                    id={courseInstance._id}
                    originalId={courseInstance.course._id}
                    name={courseInstance.course.name}
                    createdAt={courseInstance.createdAt.split("T")[0]}
                    cookies={cookies}
                  />
                </div>
              );
            })
          ),
        ]
      )}

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
      <Link
        className="link2 focus:text-green-400 "
        href={{
          pathname: `/indirectAssessment/surveys`,
          query: {
            role: "isInstructor",
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
