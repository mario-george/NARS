import React, { useEffect, useState } from "react";

import { RxCheck, RxCross1 } from "react-icons/rx";

const ReportNotComplete = ({
  isInDirectAssessmentComplete,
  isDirectAssessmentComplete,
  isCourseSpecsComplete,
  doesCourseHaveCompetences,
  doesCourseHaveTarget,
}) => {
  const [Lottie, setLottie] = useState(null);
const [notFound, setNotFound] = useState(null);
useEffect(() => {
  import("lottie-react").then((module) => {
    setLottie(module.default);
  });

  import("./notFound.json").then((module) => {
    setNotFound(module.default);
  });

  // Your logic for setting sections...
}, [
  isInDirectAssessmentComplete,
  isDirectAssessmentComplete,
  isCourseSpecsComplete,
  doesCourseHaveCompetences,
  doesCourseHaveTarget,
]);

if (!Lottie || !notFound) {
  return <div>Not found</div>; // or a loading indicator while waiting for the dynamic imports

}
  const [allNeededSections, setAllNeededSections] = useState([]);

  useEffect(() => {
    const sections = [];
    sections.push({
      title: "Course Indirect Assessment",
      isCompleted: isInDirectAssessmentComplete,
    });
    sections.push({
      title: "Course Direct Assessment",
      isCompleted: isDirectAssessmentComplete,
    });
    sections.push({
      title: "Course Specs",
      isCompleted: isCourseSpecsComplete,
    });
    if (!doesCourseHaveTarget) {
      sections.push({
        title: "Course Target",
        isCompleted: isCourseSpecsComplete,
      });
    }
    if (!doesCourseHaveCompetences) {
      sections.push({
        title: "Course Competences",
        isCompleted: isCourseSpecsComplete,
      });
    }

    sections.sort((section1, section2) => (!section1.isCompleted ? -1 : 1));
    setAllNeededSections(sections);
  }, []);

  return (
    <div className=" flex justify-center flex-col items-center">
       {typeof window !== "undefined" && ( // Conditionally render Lottie on client-side
        <Lottie
          animationData={notFound}
          style={{ height: "400px", width: "400px" }}
        />
      )}
      <div className="flex flex-col">
        {allNeededSections.map((section) => (
          <div>
            <CheckItem isCompleted={section.isCompleted} text={section.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

const CheckItem = ({ isCompleted, text }) => {
  return (
    <>
      <div className="flex flex-row items-center">
        {isCompleted ? (
          <RxCheck color="green" className="h-6 w-6 " />
        ) : (
          <RxCross1 color="red" className="h-4 w-6" />
        )}
        <div
          className={`ml-4 flex flex-row ${
            isCompleted ? "text-green-500" : "text-black"
          }`}
        >
          <label className="text-xl">{`${text} is ${
            !isCompleted ? "not" : ""
          } Completed`}</label>
        </div>
      </div>
    </>
  );
};

export default ReportNotComplete;
