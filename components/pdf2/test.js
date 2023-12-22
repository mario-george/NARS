import React from "react";
import ReactToPdf from "react-to-pdf";
import jsPDF from "jspdf";

const MyComponent = () => (
  <div>
    <h1>My Component</h1>
    <p>This is some text that will be rendered on the first page</p>
    <div style={{ pageBreakAfter: "always" }}>
      <p>This is some text that will be rendered on the second page</p>
    </div>
  </div>
);

const options = {
  orientation: "portrait",
  unit: "in",
  format: [8.5, 11],
};

const ref = React.createRef();

const DownloadPDFButton = () => (
  <ReactToPdf targetRef={ref} filename="my-document.pdf" options={options}>
    {({ toPdf }) => (
      <button
        onClick={() => {
          const pdf = new jsPDF();
          const pdfPromise = new Promise((resolve, reject) => {
            toPdf(() => {
              resolve();
            });
          });

          if (pdfPromise && typeof pdfPromise.then === "function") {
            pdfPromise.then((data) => {
              pdf.addPage();
              pdf.addImage(data, "JPEG", 0, 0);
              pdf.save("my-document.pdf");
            });
          } else {
            console.error("toPdf() did not return a Promise");
          }
        }}
      >
        Download PDF
      </button>
    )}
  </ReactToPdf>
);

const App = () => (
  <div>
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
                    // value={props.lecture}
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
        <div
          style={{ pageBreakAfter: "always" }}
          className="flex flex-row w-50vw h-screen mt-2"
        >
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
                    // value={props.lecture}
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
      {/* <h1 className='bg-red-500 text-center'>{props.title}</h1> */}
      {/* <img  className='bg-red-500 text-center' src={props.image} alt={props.title} /> */}
      {/* <p className='bg-red-500 text-center'>{props.content}</p> */}
    </div>
    <DownloadPDFButton />
  </div>
);
export default App;
