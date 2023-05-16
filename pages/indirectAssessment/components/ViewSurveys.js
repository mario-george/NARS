import React, { useEffect, useState } from "react";
import Link from "next/link";
import { GrCheckmark, GrFormClock, GrChat } from "react-icons/gr";

const ViewSurveys = ({ surveys, role }) => {
  const currentDate = Date.now();

  return (
    <div>
      {surveys.length > 0 && (
        <div className="flex flex-col">
          <label className="text-3xl mb-4">All Surveys</label>
          {surveys.map((survey) => (
            <Link
              href={{
                pathname: `/indirectAssessment/${survey._id}/Submission`,
                query: {
                  role: role,
                  isEnded: currentDate > new Date(survey.dueTo),
                },
              }}
            >
              <div
                className="cursor-pointer flex flex-row justify-between border-2 rounded mt-4 p-6 hover:h-15 hover:border-gray-400"
                key={survey._id}
              >
                <label>{survey.name}</label>
                <div className="flex flew-row items-center">
                  {survey.submitted ? (
                    <GrCheckmark className="mr-2" />
                  ) : currentDate > new Date(survey.dueTo) ? (
                    <GrFormClock className="mr-2" />
                  ) : (
                    <></>
                  )}

                  {role === "isStudent" ? (
                    <label
                      className={`${
                        survey.submitted
                          ? "text-green-500"
                          : currentDate > new Date(survey.dueTo)
                          ? "text-black"
                          : "text-blue-400"
                      }`}
                    >
                      {survey.submitted
                        ? "Submitted"
                        : currentDate > new Date(survey.dueTo)
                        ? "Ended"
                        : "Submit"}
                    </label>
                  ) : (
                    <label
                      className={`${
                        currentDate > new Date(survey.dueTo)
                          ? "text-red-400"
                          : "text-green-400"
                      } `}
                    >
                      {currentDate > new Date(survey.dueTo)
                        ? "Ended"
                        : "Ongoing"}
                    </label>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewSurveys;
