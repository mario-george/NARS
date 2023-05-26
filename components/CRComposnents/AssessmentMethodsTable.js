import React from "react";

const AssessmentMethodsTable = ({
  questions,
  competences,
  studentAssessments,
}) => {
  const assessmentsData = [
    {
      type: "final",
      competences: [],
      percentage: 0,
    },
    {
      type: "midterm",
      competences: [],
      percentage: 0,
    },
    {
      type: "supports",
      competences: [],
      percentage: 0,
    },
  ];

  (function calculatePercentageAndCompetences() {
    //add final exam competences
    questions.forEach((question) => {
      if (question.type === "final") {
        question.competences.forEach((comp) => {
          if (!assessmentsData[0].competences.includes(comp)) {
            assessmentsData[0].competences.push(comp);
          }
        });
      }
    });
    //add final exam competences
    questions.forEach((question) => {
      if (question.type === "midterm") {
        question.competences.forEach((comp) => {
          if (!assessmentsData[1].competences.includes(comp)) {
            assessmentsData[1].competences.push(comp);
          }
        });
      }
    });
    //add final exam competences
    questions.forEach((question) => {
      if (question.type === "quiz") {
        question.competences.forEach((comp) => {
          if (!assessmentsData[2].competences.includes(comp)) {
            assessmentsData[2].competences.push(comp);
          }
        });
      }
    });
    //add percentage for each of them
    studentAssessments.forEach((assessment) => {
      if (assessment.assessment === "Final Examination") {
        assessmentsData[0].percentage = assessment.weight;
      }
      if (assessment.assessment === "Midterm Examination") {
        assessmentsData[1].percentage = assessment.weight;
      }
      assessmentsData[2].percentage =
        100 - (assessmentsData[0].percentage + assessmentsData[1].percentage);
    });
  })();

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-xl mb-2">
        Matrix of Assessment Methods & Learning Outcomes
      </h2>
      <div className="h-0.5 w-full bg-gray-300 mb-2" />

      <table className="table table-auto mt-6">
        <thead>
          <tr>
            <th className="border-2 px-4 py-2 " rowSpan="2">
              Assessment Tools
            </th>
            <th
              className="border-2 mx-4 my-2 py-2"
              rowSpan="1"
              colSpan={`${competences.length}`}
            >
              Competences
            </th>
            <th
              className="border-2 px-4 py-2"
              rowSpan="2"
              colSpan={`${competences.length}`}
            >
              Percentage total
            </th>
          </tr>
          <tr className="border-2 ">
            {Array.from({ length: competences.length }).map((_, rowIndex) => (
              <th className="border-2 px-4 py-2" key={rowIndex}>
                {competences[rowIndex].code}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="border-2 px-4 py-2">
            <td className="text-center">Final Exam</td>
            {Array.from({ length: competences.length }).map((_, index) => (
              <th className="border-2 px-4 py-2" key={index}>
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600 custom-checkbox"
                  checked={assessmentsData[0].competences.includes(
                    competences[index].code
                  )}
                  readOnly={true}
                />
              </th>
            ))}
            <td className="text-center">{`${assessmentsData[0].percentage} %`}</td>
          </tr>
          <tr className="border-2 px-4 py-2">
            <td className="text-center">Midterm Exam</td>
            {Array.from({ length: competences.length }).map((_, index) => (
              <th className="border-2 px-4 py-2" key={index}>
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600 custom-checkbox"
                  checked={assessmentsData[1].competences.includes(
                    competences[index].code
                  )}
                  readOnly={true}
                />
              </th>
            ))}
            <td className="text-center">{`${assessmentsData[1].percentage} %`}</td>
          </tr>
          <tr className="border-2 px-4 py-2">
            <td className="text-center">Quizzes, Project and Course Work</td>
            {Array.from({ length: competences.length }).map((_, index) => (
              <th className="border-2 px-4 py-2" key={index}>
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600 custom-checkbox"
                  checked={assessmentsData[2].competences.includes(
                    competences[index].code
                  )}
                  readOnly={true}
                />
              </th>
            ))}
            <td className="text-center">{`${assessmentsData[2].percentage} %`}</td>
          </tr>
          <tr className="border-2 px-4 py-2">
            <td colSpan={4} className="text-center border-2">
              total
            </td>
            <td className="text-center">100 %</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AssessmentMethodsTable;
