import React from "react";

const CourseData = ({ courseData }) => {
  return (
    <div className="flex flex-col justify-center items-start">
      <h2 className="font-bold text-xl mb-2">Course Data</h2>
      <div className="h-0.5 w-full bg-gray-300 mb-2" />

      <div className="grid grid-cols-2 grid-cols-50/50 w-full">
        <div className="flex flex-row m-1 mt-2 justify-start">
          <label className=" text-green-700">Course Code: </label>
          <label className="ml-2"> ECEasd</label>
        </div>
        <div className="flex flex-row m-1">
          <label className=" text-green-700">Course Title: </label>
          <label className="ml-2"> System Analysis and Design</label>
        </div>
      </div>
      <div className="grid grid-cols-2 grid-cols-50/50 w-full">
        <div className="flex flex-row m-1">
          <label className=" text-green-700">Semester/Year: </label>
          <label className="ml-2"> First 2021/2022</label>
        </div>
        <div className="flex flex-row m-1">
          <label className=" text-green-700">Specialization: </label>
          <label className="ml-2"> Programming Requirements</label>
        </div>
      </div>
      <div className="grid grid-cols-2 grid-cols-50/50 w-full">
        <div className="flex flex-row m-1">
          <label className=" text-green-700">Contact Hours: </label>
          <label className="ml-2"> 45</label>
        </div>
      </div>
    </div>
  );
};

export default CourseData;
