import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import CustomReactToPdf from "@/pages/pdf2/pdf333";
import Textarea from "@/components/Textarea/Textarea";
import { updateField } from "@/components/store/userSlice";

const part2 = ({ cookies }) => {
  const courseSpecs = cookies.courseSpecs;
  const d = useDispatch();
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
      console.log(data.data.courseSpecs.courseAims);
      if (data.data.courseSpecs.courseAims) {
        courseAims.current.value = data.data.courseSpecs.courseAims;
      }
      if (data.data.courseSpecs.courseContent) {
        courseContent.current.value = data.data.courseSpecs.courseContent;
      }
      d(updateField({ field: "courseSpecs", value: data.data.courseSpecs }));
    };
    getData();
  }, []);
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

  return (
    <>
      <form
        onSubmit={submitHandler}
        className="bg-sky-50 h-screen w-[80%] translate-x-[25%] flex flex-col justify-center items-center text-black ml-1 scrollbar-none relative"
      >
        <CustomReactToPdf targetRef={refToImgBlob} filename="part2.pdf">
          {({ toPdf }) => <ChildComponent toPdf={toPdf} />}
        </CustomReactToPdf>
        <div className="contentAddUser2 flex flex-col   ">
          <div className="flex my-24 ">
            <div className="flex flex-col gap-5 w-full">
              <div>-Course Aims:</div>

              <Textarea
                rows="4"
                placeholder="Type here the Course Aims"
                ref={courseAims}
                v={courseAims.current?.value}
              />
            </div>
          </div>
          <div className="flex flex-col gap-5  w-full">
            <div> -Course Contents(As indicated in the program):</div>

            <Textarea
              rows="4"
              placeholder="Type here the Course Contents"
              ref={courseContent}
              v={courseContent.current?.value}
            />
          </div>
        </div>
        
      </form>
      <div className="flex justify-end absolute bottom-8 right-24">
        <button
          onClick={submitHandler}
          type="submit"
          class="w-[6rem]  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg px-5 py-2.5 mx-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Next
        </button>
      </div>
      <div
          className="contentAddUser2 flex flex-col transform translate-x-[200%]   "
          ref={refToImgBlob}
        >
          <div className="flex my-24 ">
            <div className="flex flex-col gap-5 w-full">
              <div>-Course Aims:</div>

              <Textarea
                rows="4"
                placeholder="Type here the Course Aims"
                ref={courseAims}
                v={courseAims.current?.value}
              />
            </div>
          </div>
          <div className="flex flex-col gap-5  w-full">
            <div> -Course Contents(As indicated in the program):</div>

            <Textarea
              rows="4"
              placeholder="Type here the Course Contents"
              ref={courseContent}
              v={courseContent.current?.value}
            />
          </div>
        </div>
    </>
  );
};

export default part2;
