import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import Cookies from "js-cookie";
import NavbarStudent from "@/components/NavbarStudent/Navbar";
import { updateField } from "@/components/store/userSlice";
import PdfFileCard from "@/components/filesView/specsDownloadStudent";

const coursedetails = ({ cookies }) => {
  const d = useDispatch();
  const router = useRouter();
  const { courseID } = router.query;
  const [blobIsFound, setBlobIsFound] = useState(false);
  const [pdfBlob, setpdfBlob] = useState();
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
setInstanceName(dataGetNameCodeReq.data[0].course.name)
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
    };
    getData();
  }, []);
  async function downloadPdf(e) {
    e.preventDefault();
    const blob = pdfBlob;
    const url = window.URL.createObjectURL(new Blob([blob]));

    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    let replacedIns=instanceName
    replacedIns = replacedIns.replace(/\n$/, '');

    downloadLink.download = replacedIns+".pdf";

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    window.URL.revokeObjectURL(url);
  }
  const userState = useSelector((s) => s.user);
  const token = userState.token;
  const code = useRef("");
  const year = useRef("");
  const special = useRef("");
  const hours = useRef("");
  const lecture = useRef("");
  const practical = useRef("");
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
            <NavbarStudent cookies={cookies} id={courseID} />
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
           
            </div>
          </form>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="flex flex-row w-screen h-screen mt-2 scrollbar-none">
        <form className="bg-sky-50 h-screen w-[80%] translate-x-[25%] flex flex-col justify-center items-center text-black ml-1 scrollbar-none relative">
          <div className="contentAddUser2 flex flex-col gap-10 overflow-auto  scrollbar-none">
            <NavbarStudent cookies={cookies} id={courseID} />
            <p className="underline mb-1 ">-Course Data:</p>
            <div className="flex gap-20 ">
              <div className="flex flex-col gap-5 w-1/3">
                <div>Course Code & Title:</div>
                <input
                  type="text"
                  name="code"
                  className="input-form w-full"
                  ref={code}
                  disabled
                />
              </div>
              <div className="flex flex-col gap-5  w-2/5">
                <div> Semester/Year:</div>
                <input
                  type="text"
                  name="year"
                  className="input-form  w-full"
                  ref={year}
                  disabled
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
                  disabled
                />
              </div>
              <div className="flex flex-col gap-5  w-2/5">
                <div> Contact Hours: </div>
                <input
                  type="number"
                  name="hours"
                  className="input-form  w-full"
                  ref={hours}
                  disabled
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
                  disabled
                />
              </div>
              <div className="flex flex-col gap-5  w-2/5">
                <div> Practical/Practice: </div>
                <input
                  type="number"
                  name="practical"
                  className="input-form  w-full"
                  ref={practical}
                  disabled
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default coursedetails;
