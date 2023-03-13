import jsPDF from "jspdf";
import mergePDFs from "./mergeAddAnotherPage";
import { saveAs } from 'file-saver'
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
        doc.addImage(imageData, 'PNG', 0, 0, 210, 160); // assuming A4 page size

        // Save the PDF document as a Blob object
        const pdfBlob = doc.output('blob');
        resolve(pdfBlob);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

const downloadMergedPDF = async () => {
  try {
    const pdfBase64 = localStorage.getItem("pdf2");
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
    const PDFBLOB2 = await convertPNGToPDF(blob2);
   
    const PDFBLOB = await convertPNGToPDF(blob);
    
    const mergedPdf = await mergePDFs(PDFBLOB, PDFBLOB2);
    console.log(mergedPdf)
    const blob3 = new Blob([mergedPdf], { type: 'application/pdf' });
    saveAs(blob3, 'merged.pdf');
  } catch (error) {
    console.error(error);
  }
};

// Example usage:
export default function MyComponent() {
  return <button onClick={downloadMergedPDF}>Download PDF</button>;
}
