import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { createRef, useRef, useState, useEffect } from "react";
import Cookies from "js-cookie";
import CustomReactToPdf from "@/pages/pdf2/pdf333";
import { updateField } from "@/components/store/userSlice";

const useAssessmentSchedule = ({ cookies, courseID }) => {
  const d = useDispatch();

  const userState = useSelector((s) => s.user);

  if (userState.role != "instructor" || userState.loggedInStatus != "true") {
    return <div className="error">404 could not found</div>;
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
      d(updateField({ field: "courseSpecs", value: data.data.courseSpecs }));

      console.log(data);

      try {
        setWeek0(
          data.data.courseSpecs.studentAssessment.assessmentSchedulesWeight[0]
            .week
        );

        setWeek1(
          data.data.courseSpecs.studentAssessment.assessmentSchedulesWeight[1]
            .week
        );
        setWeek2(
          data.data.courseSpecs.studentAssessment.assessmentSchedulesWeight[2]
            .week
        );
        setWeek3(
          data.data.courseSpecs.studentAssessment.assessmentSchedulesWeight[3]
            .week
        );
        setWeek4(
          data.data.courseSpecs.studentAssessment.assessmentSchedulesWeight[4]
            .week
        );
        setWeek5(
          data.data.courseSpecs.studentAssessment.assessmentSchedulesWeight[5]
            .week
        );
        setAssessment0(
          data.data.courseSpecs.studentAssessment.assessmentSchedulesWeight[0]
            .assessment
        );
        setAssessment1(
          data.data.courseSpecs.studentAssessment.assessmentSchedulesWeight[1]
            .assessment
        );
        setAssessment2(
          data.data.courseSpecs.studentAssessment.assessmentSchedulesWeight[2]
            .assessment
        );
        setAssessment3(
          data.data.courseSpecs.studentAssessment.assessmentSchedulesWeight[3]
            .assessment
        );
        setAssessment4(
          data.data.courseSpecs.studentAssessment.assessmentSchedulesWeight[4]
            .assessment
        );
        setAssessment5(
          data.data.courseSpecs.studentAssessment.assessmentSchedulesWeight[5]
            .assessment
        );
        setWeight0(
          data.data.courseSpecs.studentAssessment.assessmentSchedulesWeight[0]
            .weight
        );
        setWeight1(
          data.data.courseSpecs.studentAssessment.assessmentSchedulesWeight[1]
            .weight
        );
        setWeight2(
          data.data.courseSpecs.studentAssessment.assessmentSchedulesWeight[2]
            .weight
        );
        setWeight3(
          data.data.courseSpecs.studentAssessment.assessmentSchedulesWeight[3]
            .weight
        );
        setWeight4(
          data.data.courseSpecs.studentAssessment.assessmentSchedulesWeight[4]
            .weight
        );
        setWeight5(
          data.data.courseSpecs.studentAssessment.assessmentSchedulesWeight[5]
            .weight
        );
      } catch (e) {
        console.log(e);
      }
    };

    getData();
  }, []);
  const token = userState.token;
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

  const [assessment0, setAssessment0] = useState("Midterm Examination");
  const [assessment1, setAssessment1] = useState("Final Examination");
  const [assessment2, setAssessment2] = useState("Quizzes");
  const [assessment3, setAssessment3] = useState(
    "Home assignments, and Reports"
  );
  const [assessment4, setAssessment4] = useState("Mini Project");
  const [assessment5, setAssessment5] = useState("Total");

  const [week0, setWeek0] = useState("");
  const [week1, setWeek1] = useState("");
  const [week2, setWeek2] = useState("");
  const [week3, setWeek3] = useState("");
  const [week4, setWeek4] = useState("");
  const [week5, setWeek5] = useState("");

  const [weight0, setWeight0] = useState("");
  const [weight1, setWeight1] = useState("");
  const [weight2, setWeight2] = useState("");
  const [weight3, setWeight3] = useState("");
  const [weight4, setWeight4] = useState("");
  const [weight5, setWeight5] = useState("");
  useEffect(() => {
    setWeight5(
      Number(weight0) +
        Number(weight1) +
        Number(weight2) +
        Number(weight3) +
        Number(weight4)
    );
  }, [weight0, weight1, weight2, weight3, weight4]);
  const arr = [];

  const submitHandler = async (e) => {
    if (e) {
      e.preventDefault();
    }

    const r = await fetch(
      `${process.env.url}api/v1/courses/created-courses/${courseID}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          courseSpecs: {
            studentAssessment: {
              assessmentSchedulesWeight: [
                {
                  assessment: "Midterm Examination",
                  week: week0,
                  weight: weight0,
                },
                {
                  assessment: " Final Examination",
                  week: week1,
                  weight: weight1,
                },
                {
                  assessment: "Quizzes",
                  week: week2,
                  weight: weight2,
                },
                {
                  assessment: "Home assignments, and Reports",
                  week: week3,
                  weight: weight3,
                },
                {
                  assessment: "Mini Project",
                  week: week4,
                  weight: weight4,
                },
                {
                  assessment: "Total",
                  week: week5,
                  weight: weight5,
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
  };
  let content = (
    <>
      <div className="text-xl my-4 bg-[#f0e1c2] ml-4">
        b- Assessment Schedule and Weight
      </div>

      <table className="table-auto">
        <thead>
          <tr className="bg-gray-300 ">
            <th className="border-2 px-4 py-2 border-t-black border-l-black ">
              Assesments
            </th>
            <th className="border-2 px-4 py-2  border-t-black ">week</th>
            <th className="border-2 px-4 py-2 border-r-black border-t-black">
              Weight
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border-2 border-l-black  px-4 py-2">
              <label className="inline-flex items-center">
                <input
                  type="text"
                  name="assesment"
                  className="w-96 font-normal"
                  value={assessment0}
                />
              </label>
            </td>

            <td className="border-2 px-2 py-2 w-0.5">
              <label className="inline-flex items-center">
                <input
                  type="number"
                  name="week"
                  value={week0}
                  onChange={(e) => setWeek0(e.target.value)}
                />
              </label>
            </td>

            <td className="border-2 border-r-black  px-2 py-2 w-0.5">
              <label className="inline-flex items-center">
                <input
                  type="number"
                  name="weight"
                  value={weight0}
                  onChange={(e) => {
                    setWeight0(e.target.value);
                  }}
                />
              </label>
            </td>
          </tr>

          <tr>
            <td className="border-2 border-l-black  px-4 py-2">
              <label className="inline-flex items-center">
                <input
                  type="text"
                  name="assesment"
                  className="w-96 font-normal"
                  value={assessment1}
                />
              </label>
            </td>

            <td className="border-2  px-2 py-2 w-0.5">
              <label className="inline-flex items-center">
                <input
                  type="number"
                  name="week"
                  value={week1}
                  onChange={(e) => {
                    setWeek1(e.target.value);
                  }}
                />
              </label>
            </td>

            <td className="border-2 border-r-black px-2 py-2 w-0.5">
              <label className="inline-flex items-center">
                <input
                  type="number"
                  name="weight"
                  value={weight1}
                  onChange={(e) => {
                    setWeight1(e.target.value);
                  }}
                />
              </label>
            </td>
          </tr>
          <tr>
            <td className="border-2 border-l-black px-4 py-2">
              <label className="inline-flex items-center">
                <input
                  type="text"
                  name="assesment"
                  className="w-96 font-normal"
                  value={assessment2}
                />
              </label>
            </td>

            <td className="border-2  px-2 py-2 w-0.5">
              <label className="inline-flex items-center">
                <input
                  type="number"
                  name="week"
                  value={week2}
                  onChange={(e) => {
                    setWeek2(e.target.value);
                  }}
                />
              </label>
            </td>

            <td className="border-2 border-r-black px-2 py-2 w-0.5">
              <label className="inline-flex items-center">
                <input
                  type="number"
                  name="weight"
                  value={weight2}
                  onChange={(e) => {
                    setWeight2(e.target.value);
                  }}
                />
              </label>
            </td>
          </tr>
          <tr>
            <td className="border-2 border-l-black  px-4 py-2">
              <label className="inline-flex items-center">
                <input
                  type="text"
                  name="assesment"
                  className="w-96 font-normal"
                  value={assessment3}
                />
              </label>
            </td>

            <td className="border-2 px-2 py-2 w-0.5">
              <label className="inline-flex items-center">
                <input
                  type="number"
                  name="week"
                  value={week3}
                  onChange={(e) => {
                    setWeek3(e.target.value);
                  }}
                />
              </label>
            </td>

            <td className="border-2 border-r-black px-2 py-2 w-0.5">
              <label className="inline-flex items-center">
                <input
                  type="number"
                  name="weight"
                  value={weight3}
                  onChange={(e) => {
                    setWeight3(e.target.value);
                  }}
                />
              </label>
            </td>
          </tr>
          <tr>
            <td className="border-2 border-l-black px-4 py-2">
              <label className="inline-flex items-center">
                <input
                  type="text"
                  name="assesment"
                  className="w-96 font-normal"
                  value={assessment4}
                />
              </label>
            </td>

            <td className="border-2 px-2 py-2 w-0.5">
              <label className="inline-flex items-center">
                <input
                  type="number"
                  name="week"
                  value={week4}
                  onChange={(e) => {
                    setWeek4(e.target.value);
                  }}
                />
              </label>
            </td>

            <td className="border-2 border-r-black px-2 py-2 w-0.5">
              <label className="inline-flex items-center">
                <input
                  type="number"
                  name="weight"
                  value={weight4}
                  onChange={(e) => {
                    setWeight4(e.target.value);
                  }}
                />
              </label>
            </td>
          </tr>
          <tr>
            <td className="border-2 border-b-black border-l-black px-4 py-2">
              <label className="inline-flex items-center">
                <input
                  type="text"
                  name="assesment"
                  className="w-96 font-bold"
                  value={assessment5}
                />
              </label>
            </td>

            <td className="border-2 border-b-black  px-2 py-2 w-0.5">
              <label className="inline-flex items-center">
                <input
                  type="number"
                  name="week"
                  value={week5}
                  onChange={(e) => {
                    setWeek5(e.target.value);
                  }}
                  disabled
                />
              </label>
            </td>

            <td className="border-2 border-r-black border-b-black px-2 py-2 w-0.5">
              <label className="inline-flex items-center">
                <input type="number" name="weight" value={weight5} disabled />
              </label>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
  return { content, submitHandler };
};
export default useAssessmentSchedule;
