import React, { useState } from "react";
import { useRouter } from "next/router";
import { Line } from "rc-progress";
import Upload from "rc-upload";

const part1 = ({ cookies }) => {
  if (cookies.role != "instructor" || cookies.loggedInStatus != "true") {
    return <div className="error">404 could not found</div>;
  }

  const submitHandler = async (e) => {
    e.preventDefault();
  };

  const [percentage, setPercentage] = useState(0);
  const [imgData, setImgdata] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState();
  const [fileSize, setFileSize] = useState();

  const props = {
    action: "https://httpbin.org/post",
    accept: ".png, .pdf, .txt , .xlsx",
    beforeUpload(file) {
      // Start upload
      setIsUploading(true);
      // Set file details
      setFileName(file.name);
      setFileSize(Math.floor(file.size / 1000));
      // Display image for .png format
      if (file.type === "image/png") {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImgdata(reader.result);
        };
        reader.readAsDataURL(file);
      }
    },
    onSuccess() {
      // Finish upload
      setIsUploading(false);
    },
    onProgress(step) {
      // Update progress
      setPercentage(Math.round(step.percent));
    },
    onError(err) {
      console.log("onError", err);
    },
  };

  return (
    <>
      <div className="flex flex-row w-screen h-screen mt-2">
        <form
          onSubmit={submitHandler}
          className="bg-sky-50 h-screen w-screen flex flex-col justify-center items-center text-black ml-1"
        >
          <div className="contentAddUser2 flex flex-col gap-10">
            <div className="font-sans text-center h-screen flex flex-col justify-center items-center gap-5">
              {fileName && (
                <React.Fragment>
                  {imgData && (
                    <div>
                      <img src={imgData} alt="uploaded" width="250" />
                    </div>
                  )}
                  <div className="flex gap-3	items-center text-slate-100	border-2 border-solid border-slate-400 rounded p-2.5 w-96	">
                    <div className="whitespace-nowrap overflow-hidden text-ellipsis w-48 text-black">
                      <b>{fileName}</b>
                    </div>
                    <div className="w-60 text-sky-800	grid grid-cols-1 grid-rows-1 h-5 text-sm font-normal  ">
                      <Line
                        percent={percentage}
                        strokeWidth={9}
                        trailWidth={9}
                        trailColor="#FFF"
                        strokeColor={isUploading ? "#41C3D2" : "#92ed14"}
                      />
                      <div className="progress-text">
                        {isUploading ? `Uploading ${percentage}% ` : `Finished`}
                      </div>
                    </div>
                    <div className="text-lime-400">{`${fileSize} KB`}</div>
                  </div>
                </React.Fragment>
              )}
              <Upload {...props}>
                <button className="bg-indigo-800 text-white py-2 px-4 border-none font-sans rounded-md cursor-pointer text-base hover:opacity-80">
                  Upload File
                </button>
              </Upload>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default part1;
