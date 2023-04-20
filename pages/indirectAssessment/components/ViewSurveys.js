import React, { useEffect, useState } from "react";

const ViewSurveys = ({ surveys }) => {
  const currentDate = Date.now();

  return (
    <div>
      {surveys.length > 0 && (
        <div>
          {surveys.map((survey) => (
            <div className="flex flex-row justify-between border-2 rounded mt-4 p-4">
              <label>{survey.name}</label>
              <label
                className={`${
                  currentDate > new Date(survey.dueTo)
                    ? "text-red-400"
                    : "text-green-400"
                }`}
              >
                {currentDate > new Date(survey.dueTo) ? "Ended" : "Ongoing"}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewSurveys;
