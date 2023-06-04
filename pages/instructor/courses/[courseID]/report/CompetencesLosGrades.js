import React from "react";
import CLOBar from "@/components/chart/CLOBar";
import CLOQ from "@/components/chart/CLOQ";
import CompetenciesQ from "@/components/chart/CompetenciesQ";
import CompetenciesBar from "@/components/chart/CompetenciesBar";

export const CompetencesLosGrades = ({
  competenciesMap,
  learningOutcomes,
  numberOfStudents,
  avgValues,

  refToImgBlob7,
  refToImgBlob8,
}) => {
  return (
    <div className="flex flex-col w-full items-start">
      <div className="w-full" ref={refToImgBlob7}>
        <h2 className="font-bold text-xl mb-2">
          Learning Outcomes & Competences Direct Assessment
        </h2>
        <div className="h-0.5 w-full bg-gray-300 mb-2" />
        <div className="flex flex-col w-full items-center">
          <label className="mt-6">Competences</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-2 gap-y-1 w-[90%]">
            <div>
              <CompetenciesQ cmap={competenciesMap} w={20} h={20} />
            </div>
            <div>
              <CompetenciesBar
                cAvg={avgValues}
                snum={numberOfStudents}
                w={20}
                h={20}
                grid={10}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center" ref={refToImgBlob8}>
        <label className="mt-6">Learning Outcomes</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-2 gap-y-1 w-[90%] h-[30%] mb-10">
          <div>
            <CLOQ cmap={competenciesMap} clomap={learningOutcomes} />
          </div>
          <div>
            <CLOBar
              cAvg={avgValues}
              snum={numberOfStudents}
              w={20}
              h={20}
              grid={10}
              clomap={learningOutcomes}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
