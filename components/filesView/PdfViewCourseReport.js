import React, { useState } from "react";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import InsertDriveFileRounded from "@mui/icons-material/InsertDriveFileRounded";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownToLine } from "@fortawesome/free-regular-svg-icons";

const PdfFileCard = ({
  name,
  id,
  cookies,
  setBlobIsFound,
  downloadPdf,
  code,
}) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const pdfFile = `${process.env.url}api/v1/courses/exams/63ffebc34bef8c7adbf0b482`;
  const file =
    "../../media/ECE312C Control Systems (1) Course Specs 221CBL.pdf";
  const handleView = () => {};
  const handleUpdate = async () => {
    try {
      setBlobIsFound(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className=" -px-[12rem]  flex flex-col space-y-6 items-center justify-center">
      <div className="  " onClick={handleView}>
        <InsertDriveFileRounded
          className="text-zinc-600"
          style={{ fontSize: 200 }}
        />
      </div>
      <div className=" flex flex-col space-y-3">
        <div className="text-2xl font-bold text-center">Course Report</div>
        <div className="text-2xl font-bold text-center">{name}</div>
        <div className="text-xl text-center">{code}</div>
      </div>
      <button
        className="group flex items-center space-x-3 justify-center align-center bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2.5 rounded-xl w-48 h-auto transition-all duration-150"
        onClick={handleUpdate}
      >
        <div>View</div>
        <i class="  fa-solid fa-eye"></i>
      </button>
      <button
        class=" group flex items-center space-x-3 font-medium  rounded-xl  text-white bg-blue-700 transition-all duration-150 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 text-sm md:text-lg px-5 py-2.5 mx-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={downloadPdf}
      >
        <div className=" ">Download PDF</div>

        <i class="fa-solid fa-download fa-lg  "></i>
      </button>
    </div>
  );
};

export default PdfFileCard;
