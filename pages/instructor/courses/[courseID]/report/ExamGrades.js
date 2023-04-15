import React from "react";
import Grad2Litter from "@/components/chart/Grad2Litter";
import GradPie from "@/components/chart/GradPie";

const ExamGrades = ({ final, mid, numberOfStudents }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-2 gap-y-1 w-[90%] h-[30%] mb-20">
        <p className="grad-title">
          <span className="md:col-span-2">Midterm Grad</span>
        </p>
        <div>
          <Grad2Litter data={mid} w={100} h={100} grid={15} title="Midterm" />
        </div>
        <div>
          <GradPie
            data={mid}
            snum={numberOfStudents}
            w={500}
            h={100}
            title="Midterm"
          />
        </div>

        <p className="grad-title">
          <span className="md:col-span-2">Final Grad</span>
        </p>
        <div>
          <Grad2Litter data={final} w={100} h={100} grid={15} title="Final" />
        </div>
        <div>
          <GradPie
            data={final}
            snum={numberOfStudents}
            w={500}
            h={100}
            title="Final"
          />
        </div>
      </div>
    </>
  );
};

export default ExamGrades;
