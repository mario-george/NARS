import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

function PdfViewer({ blob }) {
  // Load PDF.js worker from an external URL

  return (
    <Document file={blob}>
      <Page pageNumber={1} />
    </Document>
  );
}

function DownloadFile() {
  const downloadFile = () => {
    // const fileData = localStorage.getItem("pdf2");
    // const binaryData = atob(fileData);
    // const array = new Uint8Array(binaryData.length);
    // for (let i = 0; i < binaryData.length; i++) {
    //   array[i] = binaryData.charCodeAt(i);
    // }
    const pdfBase64 = localStorage.getItem("pdf2");

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
    const link = document.createElement("a");
    link.href = url;
    link.download = "myFile.pdf";
    link.click();
  };

  return <button onClick={downloadFile}>Download PDF</button>;
}

export default DownloadFile;
// export default function callBlob() {
//   pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
//   let blob;
//   useEffect(() => {
//     // Retrieve the Base64 string from localStorage
//     const pdfBase64 = localStorage.getItem("pdf2");

//     // Decode the Base64 string to binary data
//     const binaryData = atob(pdfBase64);

//     // Create a Uint8Array from the binary data
//     const array = new Uint8Array(binaryData.length);
//     for (let i = 0; i < binaryData.length; i++) {
//       array[i] = binaryData.charCodeAt(i);
//     }

//     // Create a Blob object from the Uint8Array
//     blob = new Blob([array], { type: "application/pdf" });
//   }, []);
//   const [s, sS] = useState(false);
//   const showBlob = () => {
//     sS(!s);
//   };
//   if (!s) {
//       return <button onClick={showBlob}>Download PDF</button>;
//     }
//     return <PdfViewer blob={blob} />;
// }
