import React from "react";
import Grad2Litter from "@/components/chart/Grad2Litter";
import GradPie from "@/components/chart/GradPie";

const ExamGrades = ({ final, mid, numberOfStudents }) => {
  return (
    <div className="flex flex-col w-full items-start">
      <h2 className="font-bold text-xl mb-2">Exams Grades</h2>
      <div className="h-0.5 w-full bg-gray-300 mb-2" />
      <div className="flex flex-col w-full items-center">
        <label className="mt-6">Final Exam Grades</label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-2 gap-y-1 w-[90%] h-[30%] mb-20 ">
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
        <label className="mt-12">Midterm Exam Grades</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-2 gap-y-1 w-[90%] h-[30%] ">
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
        </div>
      </div>
    </div>
  );
};

export default ExamGrades;
