import React from "react";
import CLOBar from "@/components/chart/CLOBar";
import CLOQ from "@/components/chart/CLOQ";
import CompetenciesQ from "@/components/chart/CompetenciesQ";
import CompetenciesBar from "@/components/chart/CompetenciesBar";

export const CompetencesLosOverall = ({
  competenciesMap,
  learningOutcomes,
  numberOfStudents,
  avgValues,
  avgValuesSurvey,
  avgLOS,
  avgAvg
}) => {
  return (
    <div className="flex flex-col w-full items-start">
      <h2 className="font-bold text-xl mb-2">
        Learning Outcomes & Competences Overall Assessment
      </h2>
      <div className="h-0.5 w-full bg-gray-300 mb-2" />
      <div className="flex flex-col w-full items-center">
        <label className="mt-6 mb-2">Competences & Learning Outcomes</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-2 gap-y-1 w-[90%] h-[30%] mb-20">
          <div>
            <CompetenciesBar
              cAvg={avgAvg}
              snum={numberOfStudents}
              title={"All Assessment"}
              w={20}
              h={20}
              grid={10}
            />
          </div>
          <div>
            <CLOBar
              cAvg={avgAvg}
              snum={numberOfStudents}
              w={20}
              h={20}
              grid={10}
              clomap={learningOutcomes}
              title={"All Assessment"}
              avgLOS={avgLOS}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
