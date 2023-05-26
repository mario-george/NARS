import React, { useEffect } from "react";

const competencesTable = ({ courseCompetences, learningOutcomes }) => {
  let cognitiveLearningOutcomes = learningOutcomes[0].learningOutcomes;
  let psychomotorLearningOutcomes = learningOutcomes[1].learningOutcomes;
  let affectiveLearningOutcomes = learningOutcomes[2].learningOutcomes;

  return (
    <div>
      <div className="flex flex-col">
        <h2 className="font-bold text-xl mb-2">
          Achievement of Course Learning Outcomes and Competences
        </h2>
        <div className="h-0.5 w-full bg-gray-300 mb-2" />
        <table className="table table-striped mt-6">
          <thead>
            <tr>
              <th className="border-2 px-4 py-2">LO/Competences</th>
              {courseCompetences.map((e, i) => (
                <th key={i} className="border-2 px-4 py-2">
                  {e.code}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="w-full bg-sky-50">
              <th className="border-l px-4 py-2 text-left ">
                Cognitive domain
              </th>
              <th className=" bg-sky-50"></th>
              <th className=" "></th>
              <th className=" border-r"></th>
            </tr>
            {Array.from({ length: cognitiveLearningOutcomes.length }).map(
              (_, rowIndex) => (
                <tr key={rowIndex}>
                  <td className="border-2 px-4 py-2">
                    {" "}
                    {cognitiveLearningOutcomes[rowIndex].code}
                  </td>
                  {Array.from({ length: courseCompetences.length }).map(
                    (_, colIndex) => (
                      <td className="border-2 px-4 py-2" key={colIndex}>
                        <label className="inline-flex items-center justify-center">
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-blue-600 custom-checkbox"
                            checked={cognitiveLearningOutcomes[
                              rowIndex
                            ].mappedCompetence.includes(
                              courseCompetences[colIndex].code
                            )}
                            readOnly={true}
                          />
                        </label>
                      </td>
                    )
                  )}
                </tr>
              )
            )}
            <tr className="w-full bg-sky-50">
              <th className="border-l px-4 py-2 text-left ">
                Psychomotor domain
              </th>
              <th className=" bg-sky-50"></th>
              <th className=" "></th>
              <th className=" border-r"></th>
            </tr>
            {Array.from({ length: psychomotorLearningOutcomes.length }).map(
              (_, rowIndex) => (
                <tr key={rowIndex}>
                  <td className="border-2 px-4 py-2">
                    {" "}
                    {psychomotorLearningOutcomes[rowIndex].code}
                  </td>
                  {Array.from({ length: courseCompetences.length }).map(
                    (_, colIndex) => (
                      <td className="border-2 px-4 py-2" key={colIndex}>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-blue-600 custom-checkbox"
                            checked={psychomotorLearningOutcomes[
                              rowIndex
                            ].mappedCompetence.includes(
                              courseCompetences[colIndex].code
                            )}
                            readOnly={true}
                          />
                        </label>
                      </td>
                    )
                  )}
                </tr>
              )
            )}
            <tr className="w-full bg-sky-50">
              <th className="border-l px-4 py-2 text-left ">
                Affective domain
              </th>
              <th className=" bg-sky-50"></th>
              <th className=" "></th>
              <th className=" border-r"></th>
            </tr>
            {Array.from({ length: affectiveLearningOutcomes.length }).map(
              (_, rowIndex) => (
                <tr key={rowIndex}>
                  <td className="border-2 px-4 py-2">
                    {" "}
                    {affectiveLearningOutcomes[rowIndex].code}
                  </td>
                  {Array.from({ length: courseCompetences.length }).map(
                    (_, colIndex) => (
                      <td className="border-2 px-4 py-2" key={colIndex}>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-blue-600 custom-checkbox"
                            checked={affectiveLearningOutcomes[
                              rowIndex
                            ].mappedCompetence.includes(
                              courseCompetences[colIndex].code
                            )}
                            readOnly={true}
                          />
                        </label>
                      </td>
                    )
                  )}
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default competencesTable;
