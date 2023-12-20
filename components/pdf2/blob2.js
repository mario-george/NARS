import jsPDF from "jspdf";
import mergePDFs from "./merge2";
import { saveAs } from "file-saver";
import { PDFDocument } from "pdf-lib";

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
  try {
    const pdfBase64 = localStorage.getItem("pdf4");
    const pdfBase642 = localStorage.getItem("pdf1");
    const binaryData = atob(pdfBase64);
    const binaryData2 = atob(pdfBase642);
    const array = new Uint8Array(binaryData.length);
    for (let i = 0; i < binaryData.length; i++) {
      array[i] = binaryData.charCodeAt(i);
    }
    const array2 = new Uint8Array(binaryData2.length);
    for (let i = 0; i < binaryData2.length; i++) {
      array2[i] = binaryData2.charCodeAt(i);
    }
    const blob = new Blob([array], { type: "image/png" });
    const blob2 = new Blob([array2], { type: "image/png" });
    const mergedPdf = await mergePDFs(blob, blob2);
    const blob3 = new Blob([mergedPdf], { type: "application/pdf" });
    saveAs(mergedPdf, "merged.pdf");
    //     convertPNGToPDF(blob)
    //     .then((pdfBlob) => {
    //         convertPNGToPDF(blob2).then(async pdfBlob2=>{
    //             const mergedPdf = await mergePDFs(pdfBlob, pdfBlob2);
    //             const blob3 = new Blob([mergedPdf], { type: "application/pdf" });
    //             saveAs(blob3, "merged.pdf");
    //         })
    //         const url = URL.createObjectURL(mergedPdf);
    //   const link = document.createElement("a");
    //   link.href = url;
    //   link.download = "myFile.pdf";
    //   link.click();

    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // console.log(PDFBLOB2);
    // console.log(PDFBLOB2);

    // console.log(PDFBLOB);

    // const mergedPdf = await mergePDFs(blob, blob2);
    // const blob3 = new Blob([mergedPdf], { type: "application/pdf" });
    console.log(mergedPdf);
    console.log("sadasdsada");
    const url = URL.createObjectURL(blob3);
    const link = document.createElement("a");
    link.href = url;
    link.download = "myFile.pdf";
    link.click();
  } catch (error) {
    console.error(error);
  }
};

// Example usage:
export default function MyComponent() {
  return <button onClick={downloadMergedPDF}>Download PDF</button>;
}
