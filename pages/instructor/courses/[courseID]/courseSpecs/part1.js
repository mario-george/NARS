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
import PdfFileCard from "@/components/filesView/pdfFileCard";
import { Document, Page } from "react-pdf";
import dynamic from "next/dynamic";

const part1 = ({ cookies }) => {
  const router = useRouter();
  const { courseID } = router.query;

  const [client, setClient] = useState(false);
  const [InvoicePDF, setInvoicePDF] = useState(null);
  // useEffect(() => {
  //   const loadInvoicePDF = async () => {
  //     const pdfModule = await import(`@/components/pdfContinue/pdf.js`);
  //     setInvoicePDF(pdfModule.default);
  //   };
  //   loadInvoicePDF();
  //   setClient(true);
  // }, []);
  const [numPages, setNumPages] = useState(null);
  const [pdfBlob, setpdfBlob] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [blobIsFound, setBlobIsFound] = useState(false);
  async function downloadPdf(e) {
    e.preventDefault();
    const blob = pdfBlob;
    const url = window.URL.createObjectURL(new Blob([blob]));

    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = "file.pdf";

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    window.URL.revokeObjectURL(url);
  }
  async function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

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
        practice.current
      ) {
        lecture.current.value = data.data.courseSpecs.courseData.lectures;
        hours.current.value = data.data.courseSpecs.courseData.contactHours;
        special.current.value = data.data.courseSpecs.courseData.specialization;
        semester.current.value = data.data.courseSpecs.courseData.semester;
        practice.current.value = data.data.courseSpecs.courseData.practice;
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
      const s = dataGetNameCodeReq.data[0].course.code + " ";
      dataGetNameCodeReq.data[0].course.name;
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
      // code.current.value=data.courseSpecs.courseData.courseCode
      // year.current.value=data.courseSpecs.courseData.year
      // practice.current.value=data.courseSpecs.courseData.practice
      if (
        lecture.current &&
        special.current &&
        hours.current &&
        semester.current &&
        practice.current
      ) {
        lecture.current.value = data.data.courseSpecs.courseData.lectures;
        hours.current.value = data.data.courseSpecs.courseData.contactHours;
        special.current.value = data.data.courseSpecs.courseData.specialization;
        semester.current.value = data.data.courseSpecs.courseData.semester;
        practice.current.value = data.data.courseSpecs.courseData.practice;
      }
      // body: JSON.stringify({
      //   courseSpecs: {
      //     courseData: {
      //       courseCode: code.current.value,
      //       year: year.current.value,
      //       practice: practice.current.value,
      //       lectures: lecture.current.value,
      //       contactHours: hours.current.value,
      //       specialization: special.current.value,
      //     },
      //   },
      // }),

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
    // window.location.href = `/instructor/courses/${courseID}/courseSpecs/part2`;
    router.push(`/instructor/courses/${courseID}/courseSpecs/part2`);
    // window.location.href = `/instructor/courses/${cookies.instance_id}/courseSpecs/part2`;
  };
  //   function MyPdfViewer(props) {
  //     const { pdfBlob } = props;

  //     return (
  // <Document file={{ blob: pdfBlob }} onLoadSuccess={onDocumentLoadSuccess} onError={console.error}>
  //   <Page pageNumber={1} />
  // </Document>
  //     );
  //   }

  if (blobIsFound) {
    console.log(pdfBlob);
    return (
      <>
        <div className="flex flex-row w-screen h-screen mt-2 scrollbar-none">
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
                name={"Course Specs"}
                id={"CourseSpecs"}
                cookies={cookies}
                setBlobIsFound={setBlobIsFound}
                downloadPdf={downloadPdf}
              />
              <div>
                <div>
                  {/* {client && InvoicePDF && <InvoicePDF pdfBlob={pdfBlob} variable2="value2" />} */}
                </div>
                {/* {pdfBlob ? (
        <MyPdfViewer pdfBlob={pdfBlob} />
      ) : (
        <p>Loading PDF...</p>
      )} */}

                {/* {numPages !== null ? (
        <p>
          Page {pageNumber} of {numPages}
        </p>
      ) : null} */}
              </div>
            </div>
          </form>
        </div>
      </>
    );
  }
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
                  ref={semester}
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
                  name="practice"
                  className="input-form  w-full"
                  ref={practice}
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
// export async function getServerSideProps(context) {

//   const r = await fetch(
//     `${process.env.url}api/v1/courses/specsPdf/${context.query.courseID}`,
//     {

//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: "Bearer " + appProps.cookies.token,
//       },
//     }
//   );
//   const data = await r.json();
//   console.log(data)
//   const response = await fetch("{{URL}}api/v1/courses/specsPdf/641466ee7036ef196c01ff8e");
//   const blob = await response.blob();
//   return { props: { pdfFile: blob } };
// }
export default part1;
