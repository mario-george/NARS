import { useRef } from "react";
import Pdf from "react-to-pdf";
import CustomReactToPdf from "./pdf333";

function App() {
  const ref = useRef();

  const toPdfPromise = () => {
    return new Promise((resolve, reject) => {
      try {
        const { toPdf } = require("react-to-pdf");
        toPdf().then((pdfBlob) => {
          resolve(pdfBlob);
        });
      } catch (error) {
        reject(error);
      }
    });
  };

  const handleCapturePDF = async () => {
    try {
      const pdfBlob = await toPdf();
      const reader = new FileReader();
      reader.readAsDataURL(pdfBlob);

      reader.onload = () => {
        const pdfBase64 = reader.result;
        localStorage.setItem("pdf", pdfBase64);
      };
    } catch (error) {
      console.error("Failed to capture PDF:", error);
    }
  };
  function ChildComponent({ toPdf }) {
    const handleClick = async () => {
      try {
        console.log(toPdf);
        const pdfBlob = await toPdf();
        const reader = new FileReader();
        reader.readAsDataURL(pdfBlob);

        reader.onload = () => {
          const pdfBase64 = reader.result.split(",")[1];
          localStorage.setItem("pdf2", pdfBase64);
        };
        // do something with pdfBlob
      } catch (error) {
        console.error("Failed to capture PDF:", error);
      }
    };
    const downloadFile = () => {
      // const fileData = localStorage.getItem("pdf2");
      // const binaryData = atob(fileData);
      // const array = new Uint8Array(binaryData.length);
      // for (let i = 0; i < binaryData.length; i++) {
      //   array[i] = binaryData.charCodeAt(i);
      // }
      const pdfBase64 = localStorage.getItem("pdf4");

      // Decode the Base64 string to binary data
      const binaryData = atob(pdfBase64);

      // Create a Uint8Array from the binary data
      const array = new Uint8Array(binaryData.length);
      for (let i = 0; i < binaryData.length; i++) {
        array[i] = binaryData.charCodeAt(i);
      }

      // Create a Blob object from the Uint8Array
      // blob = new Blob([array], { type: "application/pdf" });
      const blob = new Blob([array], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const reader = new FileReader();
      reader.readAsText(blob);
      reader.onload = function (event) {
        console.log(event.target.result);
      };
      console.log(url);

      const link = document.createElement("a");
      link.href = url;
      link.download = "myFile.pdf";
      link.click();
    };

    return (
      <>
        {" "}
        <button onClick={downloadFile}>Download PDF</button>;
        <button onClick={handleClick}>Capture as PDF</button>
      </>
    );
  }

  return (
    <>
      {/* <Pdf targetRef={ref} filename="post.pdf">
        {({ toPdf }) => (
          <button onClick={() => handleCapturePDF(toPdf)}>
            Capture as PDF
          </button>
        )}
      </Pdf> */}
      <CustomReactToPdf targetRef={ref} filename="post.pdf">
        {({ toPdf }) => <ChildComponent toPdf={toPdf} />}
      </CustomReactToPdf>
      <div className="Post w-1/2" ref={ref}>
        <>
          <div className="flex flex-row w-50vw h-screen mt-2">
            <form className="bg-sky-50 h-screen w-screen flex flex-col justify-center items-center text-black ml-1">
              <div className="contentAddUser2 flex flex-col gap-10">
                <p className="underline mb-1">-Course Data:</p>
                <div className="flex gap-20 ">
                  <div className="flex flex-col gap-5 w-1/3">
                    <div>Course Code & Title:</div>
                    <input
                      type="text"
                      name="code"
                      className="input-form w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-5  w-2/5">
                    <div> Semester/Year:</div>
                    <input
                      type="text"
                      name="year"
                      className="input-form  w-full"
                    />
                  </div>
                </div>

                <div className="flex gap-20 ">
                  <div className="flex flex-col gap-5 w-1/3">
                    <div>Specialization:</div>
                    <input
                      type="text"
                      name="special"
                      className="input-form w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-5  w-2/5">
                    <div> Contact Hours: </div>
                    <input
                      type="number"
                      name="hours"
                      className="input-form  w-full"
                    />
                  </div>
                </div>

                <div className="flex gap-20 ">
                  <div className="flex flex-col gap-5 w-1/3">
                    <div>Lecture:</div>
                    <input
                      type="number"
                      name="lecture"
                      className="input-form w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-5  w-2/5">
                    <div> Practical/Practice: </div>
                    <input
                      type="number"
                      name="practical"
                      className="input-form  w-full"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    class="w-[6rem]  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg px-5 py-2.5 mx-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Next
                  </button>
                </div>
              </div>
            </form>
          </div>
        </>
        <>
          <div className="flex flex-row w-50vw h-screen mt-2">
            <form className="bg-sky-50 h-screen w-screen flex flex-col justify-center items-center text-black ml-1">
              <div className="contentAddUser2 flex flex-col gap-10">
                <p className="underline mb-1">-Course Data:</p>
                <div className="flex gap-20 ">
                  <div className="flex flex-col gap-5 w-1/3">
                    <div>Course Code & Title:</div>
                    <input
                      type="text"
                      name="code"
                      className="input-form w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-5  w-2/5">
                    <div> Semester/Year:</div>
                    <input
                      type="text"
                      name="year"
                      className="input-form  w-full"
                    />
                  </div>
                </div>

                <div className="flex gap-20 ">
                  <div className="flex flex-col gap-5 w-1/3">
                    <div>Specialization:</div>
                    <input
                      type="text"
                      name="special"
                      className="input-form w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-5  w-2/5">
                    <div> Contact Hours: </div>
                    <input
                      type="number"
                      name="hours"
                      className="input-form  w-full"
                    />
                  </div>
                </div>

                <div className="flex gap-20 ">
                  <div className="flex flex-col gap-5 w-1/3">
                    <div>Lecture:</div>
                    <input
                      type="number"
                      name="lecture"
                      className="input-form w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-5  w-2/5">
                    <div> Practical/Practice: </div>
                    <input
                      type="number"
                      name="practical"
                      className="input-form  w-full"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    class="w-[6rem]  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg px-5 py-2.5 mx-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Next
                  </button>
                </div>
              </div>
            </form>
          </div>
        </>
      </div>
    </>
  );
}

export default App;
