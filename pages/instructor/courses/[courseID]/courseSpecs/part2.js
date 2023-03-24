import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import CustomReactToPdf from "@/pages/pdf2/pdf333";
import Textarea from "@/components/Textarea/Textarea";

const part2 = ({ cookies }) => {
  const [isRunning, setIsRunning] = useState(true);
  const refToImgBlob = useRef();
  /* if (cookies.role != 'instructor' || cookies.loggedInStatus != 'true') {
 
         return <div className='error'>404 could not found</div>
     }*/
  const buttonRef = useRef(null);

  function ChildComponent({ toPdf }) {
    const handleClick = async () => {
      try {
        console.log(toPdf);
        const pdfBlob = await toPdf();
        const reader = new FileReader();
        reader.readAsDataURL(pdfBlob);

        reader.onload = () => {
          const pdfBase64 = reader.result.split(",")[1];
          localStorage.setItem("pdf2", pdfBase64);
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
  const userState = useSelector((s) => s.user);

  if (userState.role != "instructor" || userState.loggedInStatus != "true") {
    return <div className="error">404 could not found</div>;
  }
  const token = userState.token;
  const courseAims = useRef();
  const courseContent = useRef();
  const lvla = useRef();
  const lvlb = useRef();
  const router = useRouter();
  const { courseID } = router.query;
  useEffect(() => {
    document.querySelector("body").classList.add("scrollbar-none");
  });
  const submitHandler = async (e) => {
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
            levelA: lvla.current.value,
            levelB: lvlb.current.value,
          },
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    //Cookies.set('courseAims',courseAims.current.value)
    const resp = await r.json();
    console.log(resp);
    // window.location.href = '/instructor/coursespecs/part3';
    router.push(`/instructor/courses/${courseID}/courseSpecs/part3`);
  };

  return (
    <>
      <form
        onSubmit={submitHandler}
        className="bg-sky-50 h-screen w-[80%] translate-x-[25%] flex flex-col justify-center items-center text-black ml-1 scrollbar-none relative"
      >
        <CustomReactToPdf targetRef={refToImgBlob} filename="part2.pdf">
          {({ toPdf }) => <ChildComponent toPdf={toPdf} />}
        </CustomReactToPdf>
        <div className="contentAddUser2 flex flex-col   " ref={refToImgBlob}>
          <div className="flex gap-20 ">
            <div className="flex flex-col gap-5 w-full">
              <div>-Course Aims:</div>
              {/* <textarea
                  rows="4"
                  name="aims"
                  className="w-full input-form"
                  //defaultValue={cookies.courseAims}
                  ref={courseAims}
                  placeholder="Type here the Course Aims"
                ></textarea> */}
              <Textarea
                rows="4"
                placeholder="Type here the Course Aims"
                ref={courseAims}
              />
            </div>
          </div>
          <div className="flex flex-col gap-5  w-full">
            <div> -Course Contents(As indicated in the program):</div>
            {/* <textarea
                ref={courseContent}
                rows="4"
                name="contents"
                className="w-full input-form"
                placeholder="Type here the Course Contents"
              ></textarea> */}
            <Textarea
              rows="4"
              placeholder="Type here the Course Contents"
              ref={courseContent}
            />
          </div>

          <div className="flex gap-20 ">
            <div className="flex flex-col gap-5 w-full">
              <div>-Level (A) Competencies:</div>
              {/* <textarea
                  ref={lvla}
                  rows="4"
                  name="lvla"
                  className="w-full input-form pl-1"
                  placeholder="Level (A) Competencies"
                ></textarea> */}
              <Textarea
                rows="4"
                placeholder="Level (A) Competencies "
                ref={lvla}
              />
            </div>
          </div>
          <div className="flex flex-col gap-5  w-full">
            <div> -Level (B) Competencies: </div>
            {/* <textarea
                ref={lvlb}
                rows="4"
                name="lvlb"
                className="w-full input-form pl-1  mb-32 h-auto resize-none overflow-hidden   "
                placeholder="Level (B) Competencies "
              ></textarea> */}
            <Textarea
              className="  "
              rows="4"
              placeholder="Level (B) Competencies "
              ref={lvlb}
            />
            <div className="mb-32"></div>
          </div>
        </div>
      </form>
      <div className="flex justify-end absolute bottom-12 right-24">
        <button
          onClick={submitHandler}
          type="submit"
          class="w-[6rem]  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg px-5 py-2.5 mx-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Next
        </button>
      </div>
    </>
  );
};
export default part2;
