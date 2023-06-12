import Link from "next/link";
import { userActions } from "./store/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import HeaderElementProgramCoordinator from "./HeaderElementProgramCoordinator.js";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { header } from "./header";
import { useEffect, useState, useRef } from "react";
import { CgProfile } from "react-icons/cg";
import { CgLogOut } from "react-icons/cg";
import { BsBook } from "react-icons/bs";
import { RiFileList2Line } from "react-icons/ri";

export default function ProgramCoordinatorDashboard({ cookies }) {
  const [c, sC] = useState([]);
  const coursesRef = useRef([]);
  const r = useRouter();
  const userState = useSelector((s) => s.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const myFileInput = useRef(null);

  const logoutHandler = () => {
    r.push("/logout");
  };
  var file;
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
  }, []);

  async function getCreatedCoursesForInstructor() {
    const data = await fetch(
      `${process.env.url}api/v1/courses/original-courses?program=${userState.program}`,
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

    console.log(resp);

    sC(resp.data);
  }
  const navStatus = useSelector((s) => s.user.navStatus);

  const handelFile = () => {
    myFileInput.current.click();
  };

  const [selectedFile, setSelectedFile] = useState(null);
  async function handleUploadFile(e) {
    setSelectedFile(e);
    const data = new FormData();
    data.append("programSpcs", selectedFile);
    data.append("program", userState.program);

    try {
      const r = await fetch(`${process.env.url}api/v1/programs/programSpcs`, {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/form-data",
          Authorization: "Bearer " + userState.token,
        },
      });

      const resp = await r.json();
      console.log(resp);
      console.log(selectedFile);
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <nav
      className={`nav2 transition-all duration-300 transform ${navStatus ? ` -translate-x-full` : `translate-x-0 `
        }`}
    >
      <Link className="link2  focus:text-green-400 " href="/profile">
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
            c.map((original) => {
              return (
                <div key={original._id} className=" mb-5 -mx-4  px-0 ">
                  <HeaderElementProgramCoordinator
                    className={``}
                    key={original._id}
                    id={original._id}
                    name={original.name}
                    code={original.code}
                    cookies={cookies}
                  />
                </div>
              );
            })
          ),
        ]
      )}

      {header(
        <span>
          <RiFileList2Line
            style={{
              fontSize: 30,
              display: "inline",
              marginBottom: 0,
              marginRight: 9,
            }}
          />
          Program specs
        </span>,
        [
          <input
            type="file"
            className=""
            id="myFileInput"
            ref={myFileInput}
            onChange={async (e) => {
              setSelectedFile(e.target.files[0]);
              file=e.target.files[0];
              const data = new FormData();
              data.append("programSpcs", file);
              data.append("program", userState.program);

              try {
                const r = await fetch(
                  `${process.env.url}api/v1/programs/programSpcs`,
                  {
                    method: "POST",
                    body: data,
                    headers: {
                      Accept: "application/form-data",
                      Authorization: "Bearer " + userState.token,
                    },
                  }
                );

                const resp = await r.json();
                console.log(resp);
                console.log(selectedFile);
              } catch (e) {
                console.log(e);
              }
            }}
          />,
          <button className="normalLinkDashboard2" onClick={handelFile}>
            Upload program specs
          </button>,
          <Link
            className={
              router.pathname === "/programcoordiator/downloadspecs"
                ? "activeLinkDashboard2"
                : "normalLinkDashboard2"
            }
            href={`${process.env.url}api/v1/programs/programSpcs/${userState.program}`}
            target="_blank"
            download
          >
            Download program specs
          </Link>,
          <Link
            className={
              router.pathname === "/report/programReport"
                ? "activeLinkDashboard2"
                : "normalLinkDashboard2"
            }
            href={`/report/programReport`}
          >
            Program Report
          </Link>
        ]
      )}

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
