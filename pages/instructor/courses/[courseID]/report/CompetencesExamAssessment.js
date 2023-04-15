import React from "react";
import CompetenciesQ from "@/components/chart/CompetenciesQ";
import CompetenciesBar from "@/components/chart/CompetenciesBar";
import Attainment from "@/components/chart/Attainment";
import AttainmentPie from "@/components/chart/AttainmentPie";

export const CompetencesExamAssessment = ({
  competenciesMap,
  avgValues,
  numberOfStudents,
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-2 gap-y-1 w-[90%] h-[30%] mb-20">
        <p className="grad-title">
          <span className="md:col-span-2">Competencies Exam Assessment</span>
        </p>
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
        <br></br>
        <div>
          <Attainment cAvg={avgValues} w={20} h={20} />
        </div>
        <div>
          <AttainmentPie cAvg={avgValues} />
        </div>
      </div>
    </>
  );
};
