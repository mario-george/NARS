import React from "react";
import CLOBar from "@/components/chart/CLOBar";
import CLOAttainment from "@/components/chart/CLOAttainment";
import CLOAttainmentPie from "@/components/chart/CLOAttainmentPie";
import CLOQ from "@/components/chart/CLOQ";

export const LoExamAssessment = ({
  competenciesMap,
  learningOutcomes,
  numberOfStudents,
  avgValues,
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-2 gap-y-1 w-[90%] h-[30%] mb-20">
        <p className="grad-title">
          <span className="md:col-span-2">LOs Exam Assessment</span>
        </p>
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
        <br></br>
        <div>
          <CLOAttainment
            clomap={learningOutcomes}
            cAvg={avgValues}
            w={20}
            h={20}
          />
        </div>
        <div>
          <CLOAttainmentPie clomap={learningOutcomes} cAvg={avgValues} />
        </div>
      </div>
    </>
  );
};
