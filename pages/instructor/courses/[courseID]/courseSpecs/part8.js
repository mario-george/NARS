import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { createRef, useRef, useState ,useEffect} from "react";
import Cookies from "js-cookie";
import InstructorDashboard from "@/components/InstructorDashboard";
import CustomReactToPdf from "@/pages/pdf2/pdf333";

const part69 = ({ cookies }) => {
  const [isRunning, setIsRunning] = useState(true);

  const refToImgBlob = useRef();
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
          localStorage.setItem("pdf8", pdfBase64);
        };
        // do something with pdfBlob
      } catch (error) {
        console.error("Failed to capture PDF:", error);
      }
        setIsRunning(false);
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
  /*if (cookies.role != "instructor" || cookies.loggedInStatus != "true") {
        return <div className="error">404 could not found</div>;
    }*/
    useEffect( () => { document.querySelector("body").classList.add("scrollbar-none") } );
  const updateTotal = () => {
    weight5.current.value =
      Number(weight0.current.value) +
      Number(weight1.current.value) +
      Number(weight2.current.value) +
      Number(weight3.current.value) +
      Number(weight4.current.value);
  };
  const router = useRouter();
  const { courseID } = router.query;
  const token = Cookies.get("token");
  const assesment0 = useRef();
  const assesment1 = useRef();
  const assesment2 = useRef();
  const assesment3 = useRef();
  const assesment4 = useRef();
  const assesment5 = useRef();

  const week0 = useRef();
  const week1 = useRef();
  const week2 = useRef();
  const week3 = useRef();
  const week4 = useRef();
  const week5 = useRef();

  const weight0 = useRef();
  const weight1 = useRef();
  const weight2 = useRef();
  const weight3 = useRef();
  const weight4 = useRef();
  const weight5 = useRef();

  const arr = [];

  const submitHandler = async (e) => {

buttonRef.current.click()
    
    e.preventDefault();

    const r = await fetch(
      `${process.env.url}api/v1/courses/created-courses/${courseID}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          courseSpecs: {
            studentAssessment: {
              assessmentSchedulesWeight: [
                {
                  assessment: assesment0.current.value,
                  week: week0.current.value,
                  weight: weight0.current.value,
                },
                {
                  assessment: assesment1.current.value,
                  week: week1.current.value,
                  weight: weight1.current.value,
                },
                {
                  assessment: assesment2.current.value,
                  week: week2.current.value,
                  weight: weight2.current.value,
                },
                {
                  assessment: assesment3.current.value,
                  week: week3.current.value,
                  weight: weight3.current.value,
                },
                {
                  assessment: assesment4.current.value,
                  week: week4.current.value,
                  weight: weight4.current.value,
                },
                {
                  assessment: assesment5.current.value,
                  week: week5.current.value,
                  weight: weight5.current.value,
                },
              ],
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
    //window.location.href = "/instructor/coursespecs/part9"

    window.location.href = `/instructor/courses/${courseID}/courseSpecs/part9`;

  };
  return (
    <>
      <div className="flex flex-row w-screen h-screen mt-2">
        <InstructorDashboard />
        <CustomReactToPdf targetRef={refToImgBlob} filename="part8.pdf">
          {({ toPdf }) => <ChildComponent toPdf={toPdf} />}
        </CustomReactToPdf>
        <form
          onSubmit={submitHandler}
          
          className="bg-sky-50 h-screen w-screen flex flex-col justify-center items-center text-black ml-1 relative"
        >
          <div className="contentAddUser2 flex flex-col gap-10 overflow-auto" ref={refToImgBlob}>
            <table className="table-auto">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Assesments</th>
                  <th className="border px-4 py-2">week</th>
                  <th className="border px-4 py-2">Weight</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">
                    <label className="inline-flex items-center">
                      <input
                        type="text"
                        name="assesment"
                        className="w-96 font-normal"
                        value={"Midterm Examination"}
                        ref={assesment0}
                      />
                    </label>
                  </td>

                  <td className="border px-2 py-2 w-0.5">
                    <label className="inline-flex items-center">
                      <input type="number" name="week" ref={week0} />
                    </label>
                  </td>

                  <td className="border px-2 py-2 w-0.5">
                    <label className="inline-flex items-center">
                      <input
                        type="number"
                        name="weight"
                        ref={weight0}
                        onChange={updateTotal}
                      />
                    </label>
                  </td>
                </tr>

                <tr>
                  <td className="border px-4 py-2">
                    <label className="inline-flex items-center">
                      <input
                        type="text"
                        name="assesment"
                        className="w-96 font-normal"
                        ref={assesment1}
                        value="Final Examination"
                      />
                    </label>
                  </td>

                  <td className="border px-2 py-2 w-0.5">
                    <label className="inline-flex items-center">
                      <input type="number" name="week" ref={week1} />
                    </label>
                  </td>

                  <td className="border px-2 py-2 w-0.5">
                    <label className="inline-flex items-center">
                      <input
                        type="number"
                        name="weight"
                        ref={weight1}
                        onChange={updateTotal}
                      />
                    </label>
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">
                    <label className="inline-flex items-center">
                      <input
                        type="text"
                        name="assesment"
                        className="w-96 font-normal"
                        value={"Quizzes"}
                        ref={assesment2}
                      />
                    </label>
                  </td>

                  <td className="border px-2 py-2 w-0.5">
                    <label className="inline-flex items-center">
                      <input type="number" name="week" ref={week2} />
                    </label>
                  </td>

                  <td className="border px-2 py-2 w-0.5">
                    <label className="inline-flex items-center">
                      <input
                        type="number"
                        name="weight"
                        ref={weight2}
                        onChange={updateTotal}
                      />
                    </label>
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">
                    <label className="inline-flex items-center">
                      <input
                        type="text"
                        name="assesment"
                        className="w-96 font-normal"
                        value={"Home assignments, and Reports"}
                        ref={assesment3}
                      />
                    </label>
                  </td>

                  <td className="border px-2 py-2 w-0.5">
                    <label className="inline-flex items-center">
                      <input type="number" name="week" ref={week3} />
                    </label>
                  </td>

                  <td className="border px-2 py-2 w-0.5">
                    <label className="inline-flex items-center">
                      <input
                        type="number"
                        name="weight"
                        ref={weight3}
                        onChange={updateTotal}
                      />
                    </label>
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">
                    <label className="inline-flex items-center">
                      <input
                        type="text"
                        name="assesment"
                        className="w-96 font-normal"
                        value={"Mini Project"}
                        ref={assesment4}
                      />
                    </label>
                  </td>

                  <td className="border px-2 py-2 w-0.5">
                    <label className="inline-flex items-center">
                      <input type="number" name="week" ref={week4} />
                    </label>
                  </td>

                  <td className="border px-2 py-2 w-0.5">
                    <label className="inline-flex items-center">
                      <input
                        type="number"
                        name="weight"
                        ref={weight4}
                        onChange={updateTotal}
                      />
                    </label>
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">
                    <label className="inline-flex items-center">
                      <input
                        type="text"
                        name="assesment"
                        className="w-96 font-bold"
                        value={"Total"}
                        ref={assesment5}
                      />
                    </label>
                  </td>

                  <td className="border px-2 py-2 w-0.5">
                    <label className="inline-flex items-center">
                      <input type="number" name="week" ref={week5} disabled/>
                    </label>
                  </td>

                  <td className="border px-2 py-2 w-0.5">
                    <label className="inline-flex items-center">
                      <input type="number" name="weight" ref={weight5} />
                    </label>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

              <div className="flex justify-end absolute bottom-[20rem] right-[7rem]">
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
export default part69;
