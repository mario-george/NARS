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
import { motion } from "framer-motion";
import { Button, IconButton } from "@material-tailwind/react";

export default function InstructorDashboard({ cookies }) {
  const [c, sC] = useState([]);
  const coursesRef = useRef([]);
  const r = useRouter();
  const userState = useSelector((s) => s.user);
  console.log(userState.navStatus);
  const CreatedCoursesForInstructor = userState.CreatedCoursesForInstructor;
  const dispatch = useDispatch();
  const ITEMS_PER_PAGE = 3;

  // Function to chunk the array into multiple pages
  const chunkArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  const [currentPage, setCurrentPage] = useState(1);

  // Chunk the array into pages
  const pages = chunkArray(c, ITEMS_PER_PAGE);

  // Get the current page content
  const currentPageContent = pages[currentPage - 1] || [];
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
  const prev = () => {
    setCurrentPage(currentPage - 1);
  };

  const next = () => {
    setCurrentPage(currentPage + 1);
  };
  const navHandler = () => {
    dispatch(
      updateField({
        field: "navStatus",
        value: !navStatus,
      })
    );
  };
  return (
    <>

     
      <nav
        className={`z-30 nav2  md:translate-x-0 transition-all duration-300 transform ${
          userState.navStatus ? ` -translate-x-full` : `translate-x-0 `
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
              currentPageContent.map((courseInstance) => {
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
            <div className="flex justify-center mt-4">
              <Button
                variant="filled"
                color={currentPage === 1 ? "gray" : "lightBlue"}
                ripple="light"
                className="flex items-center gap-2 rounded-full text-white"
                onClick={prev}
                disabled={currentPage === 1}
              >
                <i class="fa-solid fa-arrow-left"></i>{" "}
              </Button>

              <motion.div
                className="mx-4 text-gray-600 font-medium"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Page {currentPage} of {pages.length}
              </motion.div>

              <Button
                variant="filled"
                color={currentPage === pages.length ? "gray" : "lightBlue"}
                ripple="light"
                className="flex items-center gap-2 rounded-full text-white"
                onClick={next}
                disabled={currentPage === pages.length}
              >
                <i class="fa-solid fa-arrow-right"></i>
              </Button>
            </div>,
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
    </>
  );
}
