import React from "react";
import CLOAttainment from "@/components/chart/CLOAttainment";
import CLOAttainmentPie from "@/components/chart/CLOAttainmentPie";
import Attainment from "@/components/chart/Attainment";
import AttainmentPie from "@/components/chart/AttainmentPie";

export const CompetencesLosAchievementSurvey = ({
  avgValues,
  learningOutcomes,
}) => {
  return (
    <div className="flex flex-col w-full items-start">
      <h2 className="font-bold text-xl mb-2">
        Learning Outcomes & Competences Achievement Percentage
      </h2>
      <div className="h-0.5 w-full bg-gray-300 mb-2" />
      <div className="flex flex-col w-full items-center">
        <label className="mt-12">Competences Achievement</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-2 gap-y-1 w-[90%]">
          <div>
            <Attainment cAvg={avgValues} w={20} h={20} title={"Survey"} />
          </div>
          <div>
            <AttainmentPie cAvg={avgValues} title={"Survey"} />
          </div>
        </div>
        <label className="mt-12">Learning Outcomes Achievement</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-2 gap-y-1 w-[90%] mb-10">
          <div>
            <CLOAttainment
              clomap={learningOutcomes}
              cAvg={avgValues}
              title={"Survey"}
              w={20}
              h={20}
            />
          </div>
          <div>
            <CLOAttainmentPie
              clomap={learningOutcomes}
              cAvg={avgValues}
              title={"Survey"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
