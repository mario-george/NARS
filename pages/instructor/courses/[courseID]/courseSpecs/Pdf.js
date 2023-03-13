import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useRef,useEffect } from "react";
import Cookies from "js-cookie";
import Checkbox from "@/components/checkbox/checkbox";
import InstructorDashboard from "@/components/InstructorDashboard";
import CustomReactToPdf from "@/pages/pdf2/pdf333";
import jsPDF from "jspdf";
// import mergePDFs from "@/pages/pdf2/merge2.js";
import mergeTest from "../getPdf/merge2TwoOne";
// import mergeAllPdf from "./mergePagesToOnePDF";
import { saveAs } from "file-saver";
import { PDFDocument } from "pdf-lib";
import { Worker } from 'pdfjs-dist/legacy/build/pdf.worker.entry';
import * as  pdfjs from 'pdfjs-dist';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const convertPNGToPDF = (pngBlob) => {
  // Load the PNG image as a data URL
  const reader = new FileReader();
  reader.readAsDataURL(pngBlob);
  return new Promise((resolve, reject) => {
    reader.onload = () => {
      const imageData = reader.result;
      // Create a new PDF document
      const doc = new jsPDF();
      // Add the PNG image as a page
      // doc.addImage(imageData, 'PNG', 0, 0, 210, 297); // assuming A4 page size
      doc.addImage(imageData, "PNG", 0, 0, 210, 160); // assuming A4 page size

      // Save the PDF document as a Blob object
      const pdfBlob = doc.output("blob");
      resolve(pdfBlob);
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
};
async function convertPngToPdfBlob(pngBlob) {
  const pngData = await pngBlob.arrayBuffer();

  // Load PNG image data
  const pngImage = await PDFImage.load(pngData);

  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();

  // Add a new blank page to the PDF
  const page = pdfDoc.addPage();

  // Draw the PNG image onto the page
  page.drawImage(pngImage, {
    x: 0,
    y: 0,
    width: page.getWidth(),
    height: page.getHeight(),
  });

  // Serialize the PDF document to a blob
  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: "application/pdf" });
}
const convertPNGToPDF2 = (pngBlob) => {
  // Load the PNG image as a data URL
  const reader = new FileReader();
  reader.readAsDataURL(pngBlob);
  return new Promise((resolve, reject) => {
    reader.onload = () => {
      const imageData = reader.result;
      // Create a new PDF document
      const doc = new jsPDF();
      // Add the PNG image as a page
      // doc.addImage(imageData, 'PNG', 0, 0, 210, 297); // assuming A4 page size
      doc.addImage(imageData, "PNG", 0, 0, 210, 160); // assuming A4 page size

      // Save the PDF document as a Blob object
      const pdfBlob = doc.output("blob");
      resolve(pdfBlob);
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
};
const downloadMergedPDF = async () => {
    const pdfBase64 = localStorage.getItem("pdf1");
    const pdfBase64_2 = localStorage.getItem("pdf2");
    const pdfBase64_22 = localStorage.getItem("pdf3");
    const pdfBase64_222 = localStorage.getItem("pdf4");
    const pdfBase64_33 = localStorage.getItem("pdf5");
    const pdfBase64_233 = localStorage.getItem("pdf6");
    const pdfBase64_244 = localStorage.getItem("pdf7");
    const pdfBase64_2444 = localStorage.getItem("pdf8");
    const pdfBase64_255 = localStorage.getItem("pdf9");
    const pdfBase64_2555 = localStorage.getItem("pdf10");
    const binaryData = atob(pdfBase64);
    const binaryData2 = atob(pdfBase64_2);
    const binaryData3 = atob(pdfBase64_22);
    const binaryData4 = atob(pdfBase64_222);
    const binaryData5 = atob(pdfBase64_33);
    const binaryData6 = atob(pdfBase64_233);
    const binaryData7 = atob(pdfBase64_244);
    const binaryData8 = atob(pdfBase64_2444);
    const binaryData9 = atob(pdfBase64_255);
    const binaryData10 = atob(pdfBase64_2555);
    const array = new Uint8Array(binaryData.length);
    for (let i = 0; i < binaryData.length; i++) {
      array[i] = binaryData.charCodeAt(i);
    }
    const array2 = new Uint8Array(binaryData2.length);
    for (let i = 0; i < binaryData2.length; i++) {
      array2[i] = binaryData2.charCodeAt(i);
    }

    const array3 = new Uint8Array(binaryData3.length);
    for (let i = 0; i < binaryData3.length; i++) {
      array3[i] = binaryData3.charCodeAt(i);
    }
    const array4 = new Uint8Array(binaryData4.length);
    for (let i = 0; i < binaryData4.length; i++) {
      array4[i] = binaryData4.charCodeAt(i);
    }

    const array5 = new Uint8Array(binaryData5.length);
    for (let i = 0; i < binaryData5.length; i++) {
      array5[i] = binaryData5.charCodeAt(i);
    }

    const array6 = new Uint8Array(binaryData6.length);
    for (let i = 0; i < binaryData6.length; i++) {
      array6[i] = binaryData6.charCodeAt(i);
    }

    const array7 = new Uint8Array(binaryData7.length);
    for (let i = 0; i < binaryData7.length; i++) {
      array7[i] = binaryData7.charCodeAt(i);
    }
    const array8 = new Uint8Array(binaryData8.length);
    for (let i = 0; i < binaryData8.length; i++) {
      array8[i] = binaryData8.charCodeAt(i);
    }
    const array9 = new Uint8Array(binaryData9.length);
    for (let i = 0; i < binaryData9.length; i++) {
      array9[i] = binaryData9.charCodeAt(i);
    }
    const array10 = new Uint8Array(binaryData10.length);
    for (let i = 0; i < binaryData10.length; i++) {
      array10[i] = binaryData10.charCodeAt(i);
    }

    const blob = new Blob([array], { type: "image/png" });
    const blob2 = new Blob([array2], { type: "image/png" });
    const blob3 = new Blob([array3], { type: "image/png" });
    const blob4 = new Blob([array4], { type: "image/png" });
    const blob5 = new Blob([array5], { type: "image/png" });
    const blob6 = new Blob([array6], { type: "image/png" });
    const blob7 = new Blob([array7], { type: "image/png" });
    const blob8 = new Blob([array8], { type: "image/png" });
    const blob9 = new Blob([array9], { type: "image/png" });
    const blob10 = new Blob([array10], { type: "image/png" });
    // saveAs(blob10, "CourseSpecsasdsawedqada.pdf");

    // const mergedPdf1 = await mergeTest(blob, blob2);
    // const mergedPdf2 = await mergeTest(blob3, blob4);
    // const mergedPdf3 = await mergeTest(blob5, blob6);
    // const mergedPdf4 = await mergeTest(blob7, blob8);
    // const mergedPdf5 = await mergeTest(blob9, blob10);

    const mergedPdf1 = await mergeTest([blob, blob2]);
    const mergedPdf2 = await mergeTest([blob3, blob4]);
    const mergedPdf3 = await mergeTest([blob5, blob6]);
    const mergedPdf4 = await mergeTest([blob7, blob8]);
    const mergedPdf5 = await mergeTest([blob9, blob10]);
    // const ass = await mergeTest(blob5, blob6);
    // saveAs(mergedPdf1, "merged.pdf");
    // saveAs(mergedPdf2, "merged.pdf");
    // saveAs(mergedPdf3, "merged.pdf");
    // saveAs(mergedPdf4, "merged.pdf");
    // saveAs(mergedPdf5, "merged.pdf");
    const blobs = [mergedPdf1, mergedPdf2, mergedPdf3, mergedPdf4, mergedPdf5];
    const ImgBlobs = [blob, blob2, blob3, blob4, blob5,blob6,blob7,blob8,blob9,blob10];
    const mergedBlob = await mergeTest(ImgBlobs);

    saveAs(mergedBlob, "CourseSpecs.pdf");
    console.log("asdsadsad");
    console.log(mergedBlob);

    // const url = URL.createObjectURL(mergedBlob);
    // const link = document.createElement("a");
    // link.href = url;
    // link.download = "myFile.pdf";
    // link.click();
  
};

// Example usage:
// export default function MyComponent() {
//   return <button onClick={downloadMergedPDF}>Download PDF</button>;
// }

// const Pdf =()=>{
//     return <>

//     </>
// }
// export default Pdf

const part10 = ({ cookies }) => {
  const [isRunning, setIsRunning] = useState(true);

  const refToImgBlob = useRef();
  const buttonRef = useRef(null);
 
  useEffect( () => { document.querySelector("body").classList.add("scrollbar-none") } );
  const closeMsg = () => {
    setMsg("");
  };

  const router = useRouter();
  const { courseID } = router.query;
  const token = Cookies.get("token");
  const [selectedItems, setSelectedItems] = useState([]);
  const [handler, setHandler] = useState(false);
  const addOtherHander = () => {
    setHandler(!handler);
  };
  const other = useRef();
  const handleCheckboxChange = (value, isChecked) => {
    if (isChecked) {
      setSelectedItems([...selectedItems, value]);
    } else {
      setSelectedItems(selectedItems.filter((item) => item !== value));
    }
  };
  /*if (cookies.role != "instructor" || cookies.loggedInStatus != "true") {
    return <div className="error">404 could not found</div>;
  }*/
  const items = [
    "Classroom",
    "Smart Board",
    "Lecture Hall",
    "White Board",
    "Sound and Microphone",
    "Data Show",
    "Computer with software",
    "MIS system",
    "Internet Access",
  ];

  const submitHandler = async (e) => {

    e.preventDefault();
    

    // window.location.href = "/instructor/coursespecs/part1";
  };
  const printDataHandler = () => {
    // console.log(selectedItems);
    if (handler) {
      // console.log(other.current.value);
    }
  };
  return (
    <>
      <div className="flex flex-row w-screen h-screen mt-2">
        <InstructorDashboard />
  
        <form
          onSubmit={submitHandler}
          className="bg-sky-50 h-screen w-screen flex flex-col justify-center items-center text-black ml-1 relative"
        >
          <div
            className="contentAddUser2 flex flex-col gap-10"
            
          >
          
        
          </div>
          <div className="flex justify-between absolute bottom-[20rem] right-[7rem]">
            <div>{msg}</div>
            <button
            onClick={downloadMergedPDF}
              class="w-[6rem]  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg px-5 py-2.5 mx-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Download pdf
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default part10;
