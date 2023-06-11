import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, createRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import CustomReactToPdf from "@/pages/pdf2/pdf333";
import Navbar from "@/components/Navbar/Navbar";
import { updateField } from "@/components/store/userSlice";
import PdfFileCard from "@/components/filesView/pdfFileCard";
import Textarea from "@/components/Textarea/Textarea";
import LearningOutcomes from "@/components/helper/LearningOutcomes";
import HeaderSpecs from "@/components/helper/HeaderSpecs";
import CourseData from "@/components/helper/CourseData";
import DefaultPage from "@/components/helper/DefaultPage";
import ProgramCompetencesServed from "@/components/helper/ProgramCompetencesServed";

const part1 = ({ cookies }) => {
  const [courseSpecs, setCourseSpecs] = useState(null);
  const [errors, setErrors] = useState([]);

  const router = useRouter();
  const { courseID } = router.query;
  const [hasClass, setHasClass] = useState(true);
  useEffect(() => {
    localStorage.removeItem("pdf1");
    localStorage.removeItem("pdf2");
    localStorage.removeItem("pdf3");
    localStorage.removeItem("pdf33");
  }, []);
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
  const [courseCode, setCourseCode] = useState("");
  const removeLO2 = (e, input) => {
    e.preventDefault();
    setInputs2(
      inputs2.filter((e) => {
        return e != input;
      })
    );
  };
  const removeLO3 = (e, input) => {
    e.preventDefault();
    setInputs3(
      inputs3.filter((e) => {
        return e != input;
      })
    );
  };
  const removeLO1 = (e, input) => {
    e.preventDefault();
    setInputs(
      inputs.filter((e) => {
        return e != input;
      })
    );
  };

  const handleSubmit = async (e) => {
    const cognitive = inputs.map((input) => {
      return {
        description: input.ref.current.value,
        value: input.ref.current.value,
        counter: input.counter,
        code: input.name,
        name: input.name,
      };
    });
    const psychomotor = inputs2.map((input) => {
      return {
        description: input.ref.current.value,
        value: input.ref.current.value,
        counter: input.counter,
        code: input.name,
        name: input.name,
      };
    });
    const affective = inputs3.map((input) => {
      return {
        description: input.ref.current.value,
        value: input.ref.current.value,

        counter: input.counter,
        code: input.name,
        name: input.name,
      };
    });
    let courseLearningOutcomes = [
      {
        title: "cognitive",
        learningOutcomes: cognitive,
      },
      {
        title: "psychomotor",
        learningOutcomes: psychomotor,
      },
      {
        title: "affective",
        learningOutcomes: affective,
      },
    ];
    d(
      updateField({
        field: "courseLearningOutcomes",
        value: courseLearningOutcomes,
      })
    );
    function compareLearningOutcomes(outcomes1, outcomes2) {
      if (outcomes1.length !== outcomes2.length) {
        return false;
      }

      for (let i = 0; i < outcomes1.length; i++) {
        const outcome1 = outcomes1[i];
        const outcome2 = outcomes2[i];

        if (outcome1.title !== outcome2.title) {
          return false;
        }

        const learningOutcomes1 = outcome1.learningOutcomes;
        const learningOutcomes2 = outcome2.learningOutcomes;
        if (learningOutcomes1.length !== learningOutcomes2.length) {
          return false;
        }

        for (let j = 0; j < learningOutcomes1.length; j++) {
          const learningOutcome1 = learningOutcomes1[j];
          const learningOutcome2 = learningOutcomes2[j];

          if (
            learningOutcome1.description !== learningOutcome2.description ||
            learningOutcome1.code !== learningOutcome2.code
          ) {
            return false;
          }
        }
      }

      return true;
    }

    function checkLearningOutcomesEquality(outcomes1, outcomes2) {
      return compareLearningOutcomes(outcomes1, outcomes2);
    }

    const identicalOrNot = checkLearningOutcomesEquality(
      courseLearningOutcomes,
      cookies.courseSpecs.courseLearningOutcomes
    );
    console.log(identicalOrNot);
    if (identicalOrNot) {
      courseLearningOutcomes = cookies.courseSpecs.courseLearningOutcomes;
    }
    const r = await fetch(
      `${process.env.url}api/v1/courses/created-courses/${courseID}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          courseSpecs: {
            courseLearningOutcomes: courseLearningOutcomes,
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
  const [inputs, setInputs] = useState([]);
  const [inputs2, setInputs2] = useState([]);
  const [inputs3, setInputs3] = useState([]);
  const handleAddInput = (e) => {
    e.preventDefault();
    console.log(inputs);
    setInputs([
      ...inputs,
      {
        ref: createRef(),
        counter: inputs2.length + inputs3.length + inputs.length + 1,
        code:
          "LO" +
          (inputs2.length + inputs3.length + inputs.length + 1).toString(),
        name:
          "LO" +
          (inputs2.length + inputs3.length + inputs.length + 1).toString(),
      },
    ]);
  };
  const handleAddInput2 = (e) => {
    e.preventDefault();
    console.log(inputs2);
    setInputs2([
      ...inputs2,
      {
        ref: createRef(),
        counter: inputs2.length + inputs3.length + inputs.length + 1,
        code:
          "LO" +
          (inputs2.length + inputs3.length + inputs.length + 1).toString(),
        name:
          "LO" +
          (inputs2.length + inputs3.length + inputs.length + 1).toString(),
      },
    ]);
  };
  const handleAddInput3 = (e) => {
    e.preventDefault();

    setInputs3([
      ...inputs3,
      {
        ref: createRef(),
        counter: inputs2.length + inputs3.length + inputs.length + 1,
        code:
          "LO" +
          (inputs2.length + inputs3.length + inputs.length + 1).toString(),
        name:
          "LO" +
          (inputs2.length + inputs3.length + inputs.length + 1).toString(),
      },
    ]);
  };
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
      const fetchedCourseSpecs = data.data.courseSpecs;
      setCourseSpecs(data.data);
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
      try {
        setInputs3(
          data.data.courseSpecs.courseLearningOutcomes[2].learningOutcomes.map(
            (e) => {
              return {
                ref: createRef(),
                code: e.code,
                name: e.code,
                description: e.description,
              };
            }
          )
        );
        setInputs(
          data.data.courseSpecs.courseLearningOutcomes[0].learningOutcomes.map(
            (e) => {
              return {
                ref: createRef(),
                code: e.code,
                name: e.code,
                description: e.description,
              };
            }
          )
        );
        setInputs2(
          data.data.courseSpecs.courseLearningOutcomes[1].learningOutcomes.map(
            (e) => {
              return {
                ref: createRef(),
                code: e.code,
                name: e.code,
                description: e.description,
              };
            }
          )
        );
      } catch (e) {
        console.log(e);
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
      const s =
        dataGetNameCodeReq.data[0].course.name +
        " " +
        dataGetNameCodeReq.data[0].course.code;
      setInstanceName(dataGetNameCodeReq.data[0].course.name);
      setCourseCode(dataGetNameCodeReq.data[0].course.code)
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
      if (r2.status === 200) {
        // PDF is found
        const blobpdfFile = await r2.blob();

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
  const refToImgBlob = useRef();
  const refToImgBlob2 = useRef();
  const refToImgBlob3 = useRef();
  const refToImgBlob33 = useRef();
  const buttonRef = useRef(null);
  const buttonRef2 = useRef(null);
  const buttonRef3 = useRef(null);
  const buttonRef33 = useRef(null);

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
  function ChildComponent2({ toPdf }) {
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
    };

    return (
      <>
        {" "}
        <button ref={buttonRef2} onClick={handleClick} hidden>
          Capture as PDF
        </button>
      </>
    );
  }
  function ChildComponent3({ toPdf }) {
    const handleClick = async () => {
      try {
        console.log(toPdf);
        const pdfBlob = await toPdf();
        const reader = new FileReader();
        reader.readAsDataURL(pdfBlob);

        reader.onload = () => {
          const pdfBase64 = reader.result.split(",")[1];
          localStorage.setItem("pdf3", pdfBase64);
        };
        // do something with pdfBlob
      } catch (error) {
        console.error("Failed to capture PDF:", error);
      }
    };

    return (
      <>
        {" "}
        <button ref={buttonRef3} onClick={handleClick} hidden>
          Capture as PDF
        </button>
      </>
    );
  }
  function ChildComponent4({ toPdf }) {
    const handleClick = async () => {
      try {
        console.log(toPdf);
        const pdfBlob = await toPdf();
        const reader = new FileReader();

        reader.readAsDataURL(pdfBlob);

        reader.onload = () => {
          const pdfBase64 = reader.result.split(",")[1];
          localStorage.setItem("pdf33", pdfBase64);
        };
        // do something with pdfBlob
      } catch (error) {
        console.error("Failed to capture PDF:", error);
      }
    };

    return (
      <>
        {" "}
        <button ref={buttonRef33} onClick={handleClick} hidden>
          Capture as PDF
        </button>
      </>
    );
  }
  const d = useDispatch();
  d(updateField({ field: "instance_id", value: courseID }));

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(inputs.length + inputs2.length + inputs3.length);
    const newErrors = [];
    if (inputs.length + inputs2.length + inputs3.length < 3) {
      const error = "At least 3 Learning Outcomes must be stated.";
      newErrors.push(error);
    }
    const cognitive = inputs.map((input) => {
      const description = input.ref.current.value;
      const newInput = {
        description,
        value: description,
        counter: input.counter,
        code: input.name,
        name: input.name,
      };

      if (description?.trim() === "") {
        const error = "Description of Learning Outcomes should not be empty.";
        if (!newErrors.includes(error)) {
          newErrors.push(error);
        }
      }

      return newInput;
    });
    const psychomotor = inputs.map((input) => {
      const description = input.ref.current.value;
      const newInput = {
        description,
        value: description,
        counter: input.counter,
        code: input.name,
        name: input.name,
      };

      if (description?.trim() === "") {
        const error = "Description of Learning Outcomes should not be empty.";
        if (!newErrors.includes(error)) {
          newErrors.push(error);
        }
      }

      return newInput;
    });
    const affective = inputs3.map((input) => {
      const description = input.ref.current.value;
      const newInput = {
        description,
        value: description,
        counter: input.counter,
        code: input.name,
        name: input.name,
      };

      if (description?.trim() === "") {
        const error = "Description of Learning Outcomes should not be empty.";
        if (!newErrors.includes(error)) {
          newErrors.push(error);
        }
      }

      return newInput;
    });
    if (semester.current?.value.trim() === "") {
      newErrors.push("Semester/Year should not be empty.");
      setIsSemesterYearInvalid(true);
    } else {
      setIsSemesterYearInvalid(false);
    }
    if (
      isNaN(Number(lecture.current?.value)) ||
      lecture.current?.value.trim() === "" ||
      Number(lecture.current?.value) <= 0
    ) {
      newErrors.push("Lecture should be a positive non-zero value.");
      setIsLectureInvalid(true);
    } else {
      setIsLectureInvalid(false);
    }
    if (
      isNaN(Number(practice.current?.value)) ||
      practice.current?.value.trim() === "" ||
      Number(practice.current?.value) <= 0
    ) {
      newErrors.push("Practical/Practice should be a positive non-zero value.");
      setIsPracticalPracticeInvalid(true);
    } else {
      setIsPracticalPracticeInvalid(false);
    }
    if (special.current?.value.trim() === "") {
      newErrors.push("Specialization should not be empty.");
      setIsSpecializationInvalid(true);
    } else {
      setIsSpecializationInvalid(false);
    }
    if (
      isNaN(Number(hours.current?.value)) ||
      hours.current?.value.trim() === "" ||
      Number(hours.current?.value) <= 0
    ) {
      newErrors.push("Contact Hours should be a positive non-zero value.");
      setIsContactHoursInvalid(true);
    } else {
      setIsContactHoursInvalid(false);
    }
    if (
      courseAims.current?.value.trim() === "" ||
      courseAims.current?.value.length < 10
    ) {
      newErrors.push(
        "Course Aims should not be empty and should have at least 10 characters."
      );
      setIsCourseAimsInvalid(true);
    } else {
      setIsCourseAimsInvalid(false);
    }
    if (
      courseContent.current?.value.trim() === "" ||
      courseContent.current?.value.length < 10
    ) {
      newErrors.push(
        "Course Content should not be empty and should have at least 10 characters."
      );
      setIsCourseContentInvalid(true);
    } else {
      setIsCourseContentInvalid(false);
    }
    if (newErrors.length === 0) {
      setErrors([]);

      console.log("Form submitted successfully!");

      setIsSubmitting(true);
      setHasClass(false);
      handleSubmit();
      await buttonRef.current.click();
      await buttonRef2.current.click();
      await buttonRef3.current.click();
      await buttonRef33.current.click();

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
      router.push(`/instructor/courses/${courseID}/courseSpecs/part4`);
    } else {
      setErrors(newErrors);
    }
  };
  const [isSemesterYearInvalid, setIsSemesterYearInvalid] = useState(false);
  const [isSpecializationInvalid, setIsSpecializationInvalid] = useState(false);
  const [isContactHoursInvalid, setIsContactHoursInvalid] = useState(false);
  const [isLectureInvalid, setIsLectureInvalid] = useState(false);
  const [isPracticalPracticeInvalid, setIsPracticalPracticeInvalid] =
    useState(false);
  const [isCourseAimsInvalid, setIsCourseAimsInvalid] = useState(false);
  const [isCourseContentInvalid, setIsCourseContentInvalid] = useState(false);

  if (blobIsFound) {
    return (
      <DefaultPage
        downloadPdf={downloadPdf}
        cookies={cookies}
        courseID={courseID}
        instanceName={instanceName}
        setBlobIsFound={setBlobIsFound}
        courseCode={courseCode}
      />
    );
  }
  return (
    <>
      <div className="flex flex-row w-screen h-auto  scrollbar-none">
        <CustomReactToPdf targetRef={refToImgBlob} filename="part1.pdf">
          {({ toPdf }) => <ChildComponent toPdf={toPdf} />}
        </CustomReactToPdf>
        <CustomReactToPdf targetRef={refToImgBlob2} filename="part2.pdf">
          {({ toPdf }) => <ChildComponent2 toPdf={toPdf} />}
        </CustomReactToPdf>
        <CustomReactToPdf targetRef={refToImgBlob3} filename="part3.pdf">
          {({ toPdf }) => <ChildComponent3 toPdf={toPdf} />}
        </CustomReactToPdf>
        <CustomReactToPdf targetRef={refToImgBlob33} filename="part33.pdf">
          {({ toPdf }) => <ChildComponent4 toPdf={toPdf} />}
        </CustomReactToPdf>
        <form
          onSubmit={submitHandler}
          className="bg-sky-50 h-auto w-[80%] translate-x-[25%] flex flex-col justify-center items-center text-black ml-1 "
        >
          <div className="contentAddUserFlexible2 flex flex-col   ">
            <div className="topNav2 ">
              <Navbar cookies={cookies} id={courseID} />
            </div>
            <div ref={refToImgBlob}>
              {courseSpecs && <HeaderSpecs data={courseSpecs} token={token} />}

              <div></div>
            </div>
            <div ref={refToImgBlob2}>
              <CourseData
                setIsContactHoursInvalid={setIsContactHoursInvalid}
                setIsLectureInvalid={setIsLectureInvalid}
                setIsPracticalPracticeInvalid={setIsPracticalPracticeInvalid}
                setIsSemesterYearInvalid={setIsSemesterYearInvalid}
                setIsSpecializationInvalid={setIsSpecializationInvalid}
                setIsCourseAimsInvalid={setIsCourseAimsInvalid}
                setIsCourseContentInvalid={setIsCourseContentInvalid}
                isLectureInvalid={isLectureInvalid}
                isContactHoursInvalid={isContactHoursInvalid}
                isSpecializationInvalid={isSpecializationInvalid}
                isSemesterYearInvalid={isSemesterYearInvalid}
                isPracticalPracticeInvalid={isPracticalPracticeInvalid}
                isCourseAimsInvalid={isCourseAimsInvalid}
                isCourseContentInvalid={isCourseContentInvalid}
                hasClass={hasClass}
                semester={semester}
                code={code}
                special={special}
                hours={hours}
                lecture={lecture}
                practice={practice}
                courseAims={courseAims}
                courseContent={courseContent}
              />
            </div>
            {courseSpecs && (
              <div ref={refToImgBlob3}>
                <ProgramCompetencesServed data={courseSpecs} />
              </div>
            )}
            <div ref={refToImgBlob33}>
              <div className="flex ">
                <LearningOutcomes
                  hasClass={hasClass}
                  handleAddInput={handleAddInput}
                  handleAddInput2={handleAddInput2}
                  handleAddInput3={handleAddInput3}
                  removeLO1={removeLO1}
                  removeLO2={removeLO2}
                  removeLO3={removeLO3}
                  inputs={inputs}
                  inputs2={inputs2}
                  inputs3={inputs3}
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
            {errors.length > 0 && (
              <div className="mt-4 bg-red-200 text-red-700 p-4 rounded">
                <p className="font-bold">Invalid Input:</p>
                <ul>
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default part1;
