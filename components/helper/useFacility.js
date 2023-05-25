import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useEffect } from "react";
import Cookies from "js-cookie";
import Checkbox from "@/components/checkbox/checkbox";
import CustomReactToPdf from "@/pages/pdf2/pdf333";
import jsPDF from "jspdf";
// import mergePDFs from "@/pages/pdf2/merge2.js";
import mergeTest from "@/pages/instructor/courses/[courseID]/getPdf/courseReportPdf";
// import mergeAllPdf from "./mergePagesToOnePDF";
import { saveAs } from "file-saver";
import { PDFDocument } from "pdf-lib";
import { Worker } from "pdfjs-dist/legacy/build/pdf.worker.entry";
import * as pdfjs from "pdfjs-dist";
import LZString from "lz-string";
import { updateField } from "@/components/store/userSlice";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const useFacility = ({ cookies, courseID }) => {
  const d = useDispatch();
  const [t, setT] = useState(true);

  const refArray = [
    "Classroom",
    "Smart Board",
    "Lecture Hall",
    "White Board",
    "Sound and Microphone",
    "Data Show",
    "Computer with software",
    "MIS system",
    "Internet Access",
  ];
  const checkboxRefs = useRef(
    Array.from({ length: refArray.length }, () => false)
  );
  const checkboxRefs2 = useRef(false);
  const [tableData, setTableData] = useState(checkboxRefs.current);

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
      d(updateField({ field: "courseSpecs", value: data.data.courseSpecs }));

      const length1 = cookies.courseLearningOutcomes[0].learningOutcomes.length;

      try {
        if (t) {
          let splicedArr = data.data.courseSpecs.facilities;
          const mc = data.data.courseSpecs.facilities;
          console.log(checkboxRefs.current);
          let d = false;
          for (let j = 0; j < mc.length; j++) {
            const ind = refArray.indexOf(mc[j]);
            if (ind >= 0) {
              checkboxRefs.current[ind] = true;
            } else {
              other.current.value = mc[j];
              splicedArr = mc.filter((element) => element !== mc[j]);
              setHandler(true);
            }
            setTableData([...checkboxRefs.current]);
          }
          setTableData([...checkboxRefs.current]);
          setSelectedItems(splicedArr);
          setT(false);
        }

        console.log(checkboxRefs.current);
      } catch (e) {
        console.log(e);
      }
    };

    getData();
  }, []);
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

      console.log(data);
    };

    getData();
  }, []);
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
    };
    getData();
  }, []);
  const userState = useSelector((s) => s.user);

  if (userState.role != "instructor" || userState.loggedInStatus != "true") {
    return <div className="error">404 could not found</div>;
  }
  const sendPdfBlob = async (blob) => {
    const formData = new FormData();

    formData.append("courseInstance", courseID);
    formData.append("courseSpcs", blob, "mypdf.pdf");
    try {
      const r = await fetch(`${process.env.url}api/v1/courses/specsPdf/`, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/form-data",
          Authorization: "Bearer " + token,
        },
      });

      const resp = await r.json();
      console.log(resp);
    } catch (e) {
      console.log(e);
    }
  };
  const token = userState.token;
  const [isRunning, setIsRunning] = useState(true);
  const downloadMergedPDF = async () => {
    const pdfBase64 = localStorage.getItem("pdf1");
    const pdfBase64_2 = localStorage.getItem("pdf2");
    const pdfBase64_22 = localStorage.getItem("pdf3");
    const pdfBase64_222 = localStorage.getItem("pdf4");
    const pdfBase64_33 = localStorage.getItem("pdf5");
    const pdfBase64_233 = localStorage.getItem("pdf6");
    const pdfBase64_244 = localStorage.getItem("pdf7");
    const pdfBase64_2444 = localStorage.getItem("pdf8");
    const pdfBase64_255 = localStorage.getItem("pdf9");
    const pdfBase64_2555 = localStorage.getItem("pdf10");
    const binaryData = atob(pdfBase64);
    const binaryData2 = atob(pdfBase64_2);
    const binaryData3 = atob(pdfBase64_22);
    const binaryData4 = atob(pdfBase64_222);
    const binaryData5 = atob(pdfBase64_33);
    const binaryData6 = atob(pdfBase64_233);
    const binaryData7 = atob(pdfBase64_244);
    const binaryData8 = atob(pdfBase64_2444);
    const binaryData9 = atob(pdfBase64_255);
    const binaryData10 = atob(pdfBase64_2555);
    const array = new Uint8Array(binaryData.length);
    for (let i = 0; i < binaryData.length; i++) {
      array[i] = binaryData.charCodeAt(i);
    }
    const array2 = new Uint8Array(binaryData2.length);
    for (let i = 0; i < binaryData2.length; i++) {
      array2[i] = binaryData2.charCodeAt(i);
    }

    const array3 = new Uint8Array(binaryData3.length);
    for (let i = 0; i < binaryData3.length; i++) {
      array3[i] = binaryData3.charCodeAt(i);
    }
    const array4 = new Uint8Array(binaryData4.length);
    for (let i = 0; i < binaryData4.length; i++) {
      array4[i] = binaryData4.charCodeAt(i);
    }

    const array5 = new Uint8Array(binaryData5.length);
    for (let i = 0; i < binaryData5.length; i++) {
      array5[i] = binaryData5.charCodeAt(i);
    }

    const array6 = new Uint8Array(binaryData6.length);
    for (let i = 0; i < binaryData6.length; i++) {
      array6[i] = binaryData6.charCodeAt(i);
    }

    const array7 = new Uint8Array(binaryData7.length);
    for (let i = 0; i < binaryData7.length; i++) {
      array7[i] = binaryData7.charCodeAt(i);
    }
    const array8 = new Uint8Array(binaryData8.length);
    for (let i = 0; i < binaryData8.length; i++) {
      array8[i] = binaryData8.charCodeAt(i);
    }
    const array9 = new Uint8Array(binaryData9.length);
    for (let i = 0; i < binaryData9.length; i++) {
      array9[i] = binaryData9.charCodeAt(i);
    }
    const array10 = new Uint8Array(binaryData10.length);
    for (let i = 0; i < binaryData10.length; i++) {
      array10[i] = binaryData10.charCodeAt(i);
    }

    const blob = new Blob([array], { type: "image/jpeg" });
    const blob2 = new Blob([array2], { type: "image/jpeg" });
    const blob3 = new Blob([array3], { type: "image/jpeg" });
    const blob4 = new Blob([array4], { type: "image/jpeg" });
    const blob5 = new Blob([array5], { type: "image/jpeg" });
    const blob6 = new Blob([array6], { type: "image/jpeg" });
    const blob7 = new Blob([array7], { type: "image/jpeg" });
    const blob8 = new Blob([array8], { type: "image/jpeg" });
    const blob9 = new Blob([array9], { type: "image/jpeg" });
    const blob10 = new Blob([array10], { type: "image/jpeg" });

    const mergedPdf1 = await mergeTest([blob, blob2]);
    const mergedPdf2 = await mergeTest([blob3, blob4]);
    const mergedPdf3 = await mergeTest([blob5, blob6]);
    const mergedPdf4 = await mergeTest([blob7, blob8]);
    const mergedPdf5 = await mergeTest([blob9, blob10]);

    const blobs = [mergedPdf1, mergedPdf2, mergedPdf3, mergedPdf4, mergedPdf5];
    const ImgBlobs = [
      blob,
      blob2,
      blob3,
      blob4,
      blob5,
      blob6,
      blob7,
      blob8,
      blob9,
      blob10,
    ];
    const mergedBlob = await mergeTest(ImgBlobs);
    // const compressedBlob = await compressBlob(mergedBlob);
    // console.log(compressedBlob)
    sendPdfBlob(mergedBlob);
    saveAs(mergedBlob, "CourseSpecs.pdf");
    console.log("asdsadsad");
    console.log(mergedBlob);
  };
  const refToImgBlob = useRef();
  const buttonRef = useRef(null);
  const buttonRef2 = useRef(null);
  function ChildComponent({ toPdf }) {
    const handleClick = async () => {
      try {
        console.log(toPdf);
        const pdfBlob = await toPdf();
        const reader = new FileReader();
        reader.readAsDataURL(pdfBlob);

        reader.onload = () => {
          const pdfBase64 = reader.result.split(",")[1];
          localStorage.setItem("pdf10", pdfBase64);
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
  useEffect(() => {
    document.querySelector("body").classList.add("scrollbar-none");
  });
  const closeMsg = () => {
    setMsg("");
  };
  const [msg, setMsg] = useState("");
  let fail = (
    <div
      id="alert-border-2"
      className="flex p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800"
      role="alert"
    >
      <i className="fa-sharp fa-solid fa-circle-exclamation"></i>
      <div className="ml-3 text-sm font-medium">
        Something went wrong please try again
        <a href="#" className="font-semibold underline hover:no-underline"></a>.
      </div>
      <button
        type="button"
        onClick={closeMsg}
        className="ml-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
        data-dismiss-target="#alert-border-2"
        aria-label="Close"
      >
        <span className="sr-only">Dismiss</span>
        <svg
          aria-hidden="true"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  );

  let success = (
    <div
      id="alert-border-3"
      className="flex p-4 mb-4 text-green-800 border-t-4 border-green-300 bg-green-50 dark:text-green-400 dark:bg-gray-800 dark:border-green-800"
      role="alert"
    >
      <i className="fa-solid fa-circle-check"></i>
      <div className="ml-3 text-sm font-medium">
        Course Specs completed successfully!
        <a href="#" className="font-semibold underline hover:no-underline"></a>
      </div>
      <button
        onClick={closeMsg}
        type="button"
        className="ml-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700"
        data-dismiss-target="#alert-border-3"
        aria-label="Close"
      >
        <span className="sr-only">Dismiss</span>
        <svg
          aria-hidden="true"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  );

  const [selectedItems, setSelectedItems] = useState([]);
  const [handler, setHandler] = useState(false);
  const addOtherHander = () => {
    setHandler(!handler);
  };
  const other = useRef();
  const handleCheckboxChange = (value, isChecked, index) => {
    console.log(checkboxRefs.current);
    checkboxRefs.current[index] = !checkboxRefs.current[index];
    setTableData([...checkboxRefs.current]);
    let removeItem = refArray[index];
    if (checkboxRefs.current[index]) {
      setSelectedItems([...selectedItems, refArray[index]]);
    } else {
      let newArray = selectedItems.filter((item) => item !== removeItem);
      setSelectedItems(newArray);
    }
  };
  /*if (cookies.role != "instructor" || cookies.loggedInStatus != "true") {
    return <div className="error">404 could not found</div>;
  }*/
  const items = [
    "Classroom",
    "Smart Board",
    "Lecture Hall",
    "White Board",
    "Sound and Microphone",
    "Data Show",
    "Computer with software",
    "MIS system",
    "Internet Access",
  ];

  const submitHandler = async (e) => {

    // buttonRef.current.click();
    let sentArr = [];
    if (handler) {
      sentArr = selectedItems.concat([other.current.value]);
    } else {
      sentArr = selectedItems;
    }
    e.preventDefault();
    const r = await fetch(
      `${process.env.url}api/v1/courses/created-courses/${courseID}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          courseSpecs: {
            facilities: sentArr,
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
    if (resp.status == "success") {
      setMsg(success);
    } else {
      setMsg(fail);
    }
    console.log(resp);
    // setTimeout(() => {

    //   downloadMergedPDF();
    // }, 1000);
  };
  let content = (
    <>
      {" "}
      <div className="text-2xl my-4 bg-yellow-200">10-Facilities</div>{" "}
      <p className=" mb-0 font-normal">
        *The following facilities are needed for this course:
      </p>
      <div className="">
        <div className="grid grid-cols-3 gap-4">
          {items.map((item, index) => (
            <Checkbox
              key={item}
              label={item}
              value={item}
              index={index}
              onChange={handleCheckboxChange}
              checkboxRefs={checkboxRefs}
            />
          ))}
          <div className="flex items-center  space-x-3">
            <input
              type="checkbox"
              className="w-6 h-6"
              onChange={addOtherHander}
              checked={handler === true}
            />
            <input
              type="text"
              ref={other}
              className="border input-form "
              placeholder="Other..."
            />
          </div>
        </div>
      </div>
    </>
  );
  return {msg,content,submitHandler}
  return (
    <>
      <div className="flex flex-row w-screen h-screen mt-2">
        <CustomReactToPdf targetRef={refToImgBlob} filename="part10.pdf">
          {({ toPdf }) => <ChildComponent toPdf={toPdf} />}
        </CustomReactToPdf>
        <form
          onSubmit={submitHandler}
          className="bg-sky-50 h-screen w-[80%] translate-x-[25%] flex flex-col justify-center items-center text-black ml-1 scrollbar-none relative"
        >
          <div
            className="contentAddUser2 flex flex-col gap-10"
            ref={refToImgBlob}
          >
            <div className="text-2xl my-4 bg-yellow-200">10-Facilities</div>{" "}
            <p className=" mb-0 font-normal">
              *The following facilities are needed for this course:
            </p>
            <div className="">
              <div className="grid grid-cols-3 gap-4">
                {items.map((item, index) => (
                  <Checkbox
                    key={item}
                    label={item}
                    value={item}
                    index={index}
                    onChange={handleCheckboxChange}
                    checkboxRefs={checkboxRefs}
                  />
                ))}
                <div className="flex items-center  space-x-3">
                  <input
                    type="checkbox"
                    className="w-6 h-6"
                    onChange={addOtherHander}
                    checked={handler === true}
                  />
                  <input
                    type="text"
                    ref={other}
                    className="border input-form "
                    placeholder="Other..."
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between absolute bottom-[20rem] right-[7rem]">
            <div>{msg}</div>
            <button
              type="submit"
              class="w-[6rem]  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg px-5 py-2.5 mx-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Export
            </button>
            <button
              ref={buttonRef2}
              class="w-[6rem]  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg px-5 py-2.5 mx-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              hidden
            >
              Download pdf
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default useFacility;
