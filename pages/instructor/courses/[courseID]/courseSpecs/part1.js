import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import Cookies from "js-cookie";
import CustomReactToPdf from "@/pages/pdf2/pdf333";
import ReactDOMServer from "react-dom/server";
import Navbar from "@/components/Navbar/Navbar";
import { updateField } from "@/components/store/userSlice";
const part1 = ({ cookies }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const userState = useSelector((s) => s.user);

  if (userState.role != "instructor" || userState.loggedInStatus != "true") {
    return <div className="error">404 could not found</div>;
  }
  const token = userState.token;
  const [isRunning, setIsRunning] = useState(true);
  const refToImgBlob = useRef();
  const buttonRef = useRef(null);

  const code = useRef("");
  const year = useRef("");
  const special = useRef("");
  const hours = useRef("");
  const lecture = useRef("");
  const practical = useRef("");
  const router = useRouter();
  function ChildComponent({ toPdf }) {
    const handleClick = async () => {
      try {
        console.log(toPdf);
        const pdfBlob = await toPdf();
        const reader = new FileReader();
        reader.readAsDataURL(pdfBlob);

        reader.onload = () => {
          const pdfBase64 = reader.result.split(",")[1];
          localStorage.setItem("pdf1", pdfBase64);
        };
        // do something with pdfBlob
      } catch (error) {
        console.error("Failed to capture PDF:", error);
      }
      setTimeout(() => {
        setIsRunning(false);
      }, 300);
    };

    return (
      <>
        {" "}
        <button ref={buttonRef} onClick={handleClick} hidden>
          Capture as PDF
        </button>
      </>
    );
  }
  const { courseID } = router.query;
  const d = useDispatch();
  d(updateField({ field: "instance_id", value: courseID }));

  useEffect(() => {
    document.querySelector("body").classList.add("scrollbar-none");
  });
  useEffect(() => {}, []);

  const submitHandler = async (e) => {
    setIsSubmitting(true);

    buttonRef.current.click();

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

    // window.location.href = `/instructor/courses/${courseID}/courseSpecs/part2`;
    router.push(`/instructor/courses/${courseID}/courseSpecs/part2`);
    // window.location.href = `/instructor/courses/${cookies.instance_id}/courseSpecs/part2`;
  };
  return (
    <>
      <div className="flex flex-row w-screen h-screen mt-2 scrollbar-none">
        <CustomReactToPdf targetRef={refToImgBlob} filename="part1.pdf">
          {({ toPdf }) => <ChildComponent toPdf={toPdf} />}
        </CustomReactToPdf>
        <form
          onSubmit={submitHandler}
          className="bg-sky-50 h-screen w-[80%] translate-x-[25%] flex flex-col justify-center items-center text-black ml-1 scrollbar-none relative"
        >
          {/* <div className="absolute top-12 "> */}

          {/* </div> */}
          <div className="topNav absolute top-14 ">
            <Navbar cookies={cookies} id={courseID} />
          </div>
          <div
            className="contentAddUser2 flex flex-col gap-10 overflow-auto scrollbar-none py-[10rem] m-10"
            ref={refToImgBlob}
          >
            <p className="underline mb-1 pt-[5rem]">-Course Data:</p>
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

            <div className="flex gap-20 j ">
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
          </div>
          <div className="flex justify-end absolute bottom-12 right-24">
            <button
              type="submit"
              class="w-[6rem]  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg px-5 py-2.5 mx-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default part1;
