import React, { useEffect } from "react";
import CLOAttainment from "@/components/chart/CLOAttainment";
import CLOAttainmentPie from "@/components/chart/CLOAttainmentPie";
import Attainment from "@/components/chart/Attainment";
import AttainmentPie from "@/components/chart/AttainmentPie";

export const CompetencesLosAchievement = ({
  avgValues,
  learningOutcomes,
  target,
  refToImgBlob9,
  refToImgBlob10,
}) => {
  useEffect(() => {
    console.log("HEEEREEE", JSON.stringify(avgValues));
    console.log("HEEEREEE", JSON.stringify(learningOutcomes));
  }, []);

  return (
    <div className="flex flex-col w-full items-start">
      <div className="w-full" ref={refToImgBlob9}>
        <h2 className="font-bold text-xl mb-2">
          Learning Outcomes & Competences Direct Achievement
        </h2>
        <div className="h-0.5 w-full bg-gray-300 mb-2" />
        <div className="flex flex-col w-full items-center">
          <label className="mt-12">Competences Achievement</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-2 gap-y-1 w-[90%]">
            <div>
              <Attainment target={target} cAvg={avgValues} w={20} h={20} />
            </div>
            <div>
              <AttainmentPie target={target} cAvg={avgValues} />
            </div>
          </div>
        </div></div>
        <div className="w-full flex flex-col items-center" ref={refToImgBlob10}>
          <label className="mt-12">Learning Outcomes Achievement</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-2 gap-y-1 w-[90%] h-[30%] mb-10">
            <div>
              <CLOAttainment
                target={target}
                clomap={learningOutcomes}
                cAvg={avgValues}
                w={20}
                h={20}
              />
            </div>
            <div>
              <CLOAttainmentPie
                target={target}
                clomap={learningOutcomes}
                cAvg={avgValues}
              />
            </div>
          </div>
        </div>
      
    </div>
  );
};
