import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import CustomReactToPdf from "@/pages/pdf2/pdf333";
import Navbar from "@/components/Navbar/Navbar";
import { updateField } from "@/components/store/userSlice";
import PdfFileCard from "@/components/filesView/pdfFileCard";
import Textarea from "@/components/Textarea/Textarea";

const part1 = ({ cookies }) => {
  const router = useRouter();
  const { courseID } = router.query;
  const [hasClass, setHasClass] = useState(true);

  const courseAims = useRef("");
  const courseContent = useRef("");
  const [pdfBlob, setpdfBlob] = useState();
  const [blobIsFound, setBlobIsFound] = useState(false);
  async function downloadPdf(e) {
    e.preventDefault();
    const blob = pdfBlob;
    const url = window.URL.createObjectURL(new Blob([blob]));

    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    let replacedIns = instanceName;
    replacedIns = replacedIns.replace(/\n$/, "");
    downloadLink.download = replacedIns + ".pdf";

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    window.URL.revokeObjectURL(url);
  }

  const [instanceName, setInstanceName] = useState("Course Specs");

  useEffect(() => {
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
      console.log(data);
      console.log(data.data.courseSpecs);
      d(updateField({ field: "courseSpecs", value: data.data.courseSpecs }));

      if (
        lecture.current &&
        special.current &&
        hours.current &&
        semester.current &&
        practice.current &&
        data.data.courseSpecs.courseData
      ) {
        lecture.current.value = data.data.courseSpecs.courseData.lectures;
        hours.current.value = data.data.courseSpecs.courseData.contactHours;
        special.current.value = data.data.courseSpecs.courseData.specialization;
        semester.current.value = data.data.courseSpecs.courseData.semester;
        practice.current.value = data.data.courseSpecs.courseData.practice;
      }
      if (courseAims.current && data.data.courseSpecs.courseAims) {
        courseAims.current.value = data.data.courseSpecs.courseAims;
      }
      if (courseContent.current && data.data.courseSpecs.courseContent) {
        courseContent.current.value = data.data.courseSpecs.courseContent;
      }

      console.log(data);
    };
    const getNameCode = async function () {
      const getNameCodeReq = await fetch(
        `${process.env.url}api/v1/courses/created-courses/?_id=${courseID}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + cookies.token,
          },
        }
      );
      const dataGetNameCodeReq = await getNameCodeReq.json();
      console.log(dataGetNameCodeReq.data[0].course.code);
      const s =
        dataGetNameCodeReq.data[0].course.name +
        " " +
        dataGetNameCodeReq.data[0].course.code;
      setInstanceName(dataGetNameCodeReq.data[0].course.name);

      try {
        code.current.value = s;
      } catch (e) {
        console.log(e);
      }
    };

    getNameCode();
    getData();
  }, [blobIsFound]);

  useEffect(() => {
    const getData = async function () {
      const r2 = await fetch(
        `${process.env.url}api/v1/courses/specsPdf/${courseID}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + cookies.token,
          },
        }
      );

      const blobpdfFile = await r2.blob();
      console.log(blobpdfFile);
      console.log(blobpdfFile.constructor === Blob);

      if (blobpdfFile.size > 400) {
        setpdfBlob(blobpdfFile);
        setBlobIsFound(true);
      }
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
      console.log(data);
      console.log(data.data.courseSpecs);
      d(updateField({ field: "courseSpecs", value: data.data.courseSpecs }));

      if (
        lecture.current &&
        special.current &&
        hours.current &&
        semester.current &&
        practice.current &&
        data.data.courseSpecs.courseData
      ) {
        lecture.current.value = data.data.courseSpecs.courseData.lectures;
        hours.current.value = data.data.courseSpecs.courseData.contactHours;
        special.current.value = data.data.courseSpecs.courseData.specialization;
        semester.current.value = data.data.courseSpecs.courseData.semester;
        practice.current.value = data.data.courseSpecs.courseData.practice;
      }

      console.log(data);
    };
    getData();
  }, []);

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
  const semester = useRef("");
  const special = useRef("");
  const hours = useRef("");
  const lecture = useRef("");
  const practice = useRef("");
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
  const d = useDispatch();
  d(updateField({ field: "instance_id", value: courseID }));

  useEffect(() => {
    document.querySelector("body").classList.add("scrollbar-none");
  });
  useEffect(() => {}, []);

  const submitHandler = async (e) => {
    setIsSubmitting(true);
    setHasClass(false);
    buttonRef.current.click();

    e.preventDefault();

    const r = await fetch(
      `${process.env.url}api/v1/courses/created-courses/${courseID}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          courseSpecs: {
            courseAims: courseAims.current.value,
            courseContent: courseContent.current.value,

            courseData: {
              courseCode: code.current.value,
              semester: semester.current.value,
              practice: practice.current.value,
              lectures: lecture.current.value,
              contactHours: hours.current.value,
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
    router.push(`/instructor/courses/${courseID}/courseSpecs/part3`);
  };

  if (blobIsFound) {
    console.log(pdfBlob);
    return (
      <>
        <div className="flex flex-row w-screen h-auto mt-2 scrollbar-none">
          <form
            onSubmit={downloadPdf}
            className="bg-sky-50 h-screen w-[80%] translate-x-[25%] flex flex-col justify-center items-center text-black ml-1 scrollbar-none relative"
          >
            <div className="topNav absolute top-14">
              <Navbar cookies={cookies} id={courseID} />
            </div>
            <div className="contentAddUser2 flex flex-col gap-10 overflow-auto scrollbar-none py-[10rem] m-10 ">
              <div className="mt-[6rem]"></div>
              <PdfFileCard
                name={instanceName}
                id={courseID}
                cookies={cookies}
                setBlobIsFound={setBlobIsFound}
                downloadPdf={downloadPdf}
              />
              <div>
                <div></div>
              </div>
            </div>
          </form>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="flex flex-row w-screen h-screen  scrollbar-none">
        <CustomReactToPdf targetRef={refToImgBlob} filename="part1.pdf">
          {({ toPdf }) => <ChildComponent toPdf={toPdf} />}
        </CustomReactToPdf>
        <form
          onSubmit={submitHandler}
          className="bg-sky-50 h-screen w-[80%] translate-x-[25%] flex flex-col justify-center items-center text-black ml-1 scrollbar-none relative"
        >
          <div className="contentAddUserFlexible33 flex flex-col   ">
            <div className="topNav2 ">
              <Navbar cookies={cookies} id={courseID} />
            </div>
            <div ref={refToImgBlob}>
              <div className="courseDataMainTitle">1-Course Data</div>
              <div className="flex  ">
                <div className="flex items-center  gap-5 w-1/2">
                  <div className="text-red-500 text-xl  font-bold">
                    Course Code & Title:
                  </div>
                  <input
                    type="text"
                    name="code"
                    className={`${hasClass ? "input-form" : ""} w-[60%]`}
                    ref={code}
                  />
                </div>
                <div className="flex items-center gap-5  w-1/2">
                  <div className="text-red-500  text-xl font-bold">
                    {" "}
                    Semester/Year:
                  </div>
                  <input
                    type="text"
                    name="year"
                    className={`${hasClass ? "input-form" : ""} w-[60%]`}
                    ref={semester}
                  />
                </div>
              </div>
              <div className="flex  ">
                <div className="flex items-center  gap-5 w-1/2">
                  <div className="text-red-500 text-xl  font-bold">
                    Specialization:
                  </div>
                  <input
                    type="text"
                    name="special"
                    className={`${hasClass ? "input-form" : ""} w-[60%]`}
                    ref={special}
                  />
                </div>
              </div>
              <div className="flex  ">
                <div className="flex items-center  gap-5 w-1/2">
                  <div className="text-red-500 text-xl  font-bold">
                    Contact Hours:
                  </div>
                  <input
                    type="number"
                    name="hours"
                    className={`${hasClass ? "input-form" : ""} w-[60%]`}
                    ref={hours}
                  />
                </div>
                <div className="flex items-center gap-5  w-1/4">
                  <div className="text-red-500  text-xl font-bold">
                    {" "}
                    Lecture:
                  </div>
                  <input
                    type="number"
                    name="lecture"
                    className={`${hasClass ? "input-form" : ""} w-[60%]`}
                    ref={lecture}
                  />
                </div>
                <div className="flex items-center gap-5  w-1/4">
                  <div className="text-red-500  text-xl font-bold">
                    {" "}
                    Practical/Practice:
                  </div>
                  <input
                    type="number"
                    name="practice"
                    className={`${hasClass ? "input-form" : ""} w-[60%]`}
                    ref={practice}
                  />
                </div>
              </div>

                <div className="flex  flex-col w-full my-0 ">
                  <div className="text-2xl my-2 bg-yellow-200 ">2-Course Aims:</div>

                  <Textarea
                    rows="4"
                    placeholder="Type here the Course Aims"
                    ref={courseAims}
                    v={courseAims.current?.value}
                    hasClass={hasClass}
                  />
                </div>
              <div className="flex flex-col  w-full">
                <div className="text-2xl my-2 bg-yellow-200">
                  {" "}
                  3-Course Contents(As indicated in the program):
                </div>
                <Textarea
                  rows="4"
                  placeholder="Type here the Course Contents"
                  ref={courseContent}
                  v={courseContent.current?.value}
                  hasClass={hasClass}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                class="w-[6rem]  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg px-5 py-2.5 mx-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Next
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default part1;
