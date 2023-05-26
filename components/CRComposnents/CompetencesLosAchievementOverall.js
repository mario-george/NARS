import React from "react";
import CLOAttainment from "@/components/chart/CLOAttainment";
import CLOAttainmentPie from "@/components/chart/CLOAttainmentPie";
import Attainment from "@/components/chart/Attainment";
import AttainmentPie from "@/components/chart/AttainmentPie";

export const CompetencesLosAchievementOVerall = ({
  avgValues,
  avgLOS,
  avgValuesSurvey,
  learningOutcomes,
  target,
  avgAvg
}) => {
  return (
    <div className="flex flex-col w-full items-start">
      <h2 className="font-bold text-xl mb-2">
        Learning Outcomes & Competences Overall Achievement
      </h2>
      <div className="h-0.5 w-full bg-gray-300 mb-2" />
      <div className="flex flex-col w-full items-center">
        <label className="mt-12">Competences Achievement</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-2 gap-y-1 w-[90%]">
          <div>
            <Attainment
              target={target}
              cAvg={avgAvg}
              avgS={[
                avgValues,
                avgValuesSurvey,
              ]}
              w={20}
              h={20}
              title={"All Assessment"}
            />
          </div>
          <div>
            <AttainmentPie target={target} cAvg={avgAvg} title={"All Assessment"} />
          </div>
        </div>
        <label className="mt-12">Learning Outcomes Achievement</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-2 gap-y-1 w-[90%] mb-10">
          <div>
            <CLOAttainment
              target={target}
              clomap={learningOutcomes}
              cAvg={avgAvg}
              avgS={avgValues}
              title={"All Assessment"}
              w={20}
              h={20}
              avgLOS={avgLOS}
            />
          </div>
          <div>
            <CLOAttainmentPie
              target={target}
              clomap={learningOutcomes}
              cAvg={avgAvg}
              title={"All Assessment"}
              avgLOS={avgLOS}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
