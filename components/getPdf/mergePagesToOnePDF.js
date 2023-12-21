import jsPDF from "jspdf";
import "jspdf-autotable";

export default async function mergePDFs(blobs) {
    const pdf = new jsPDF("p", "pt", "a4");

    for (let i = 0; i < blobs.length; i++) {
      const img = await new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = URL.createObjectURL(blobs[i]);
      });

      if (i > 0) {
        pdf.addPage();
      }

      pdf.addImage(
        img,
        "PNG",
        0,
        0,
        pdf.internal.pageSize.getWidth(),
        pdf.internal.pageSize.getHeight() / 2
      );
    }

    // Save PDF
    const mergedPdfBytes = pdf.output("blob");
    console.log(mergedPdfBytes);
    return new Blob([mergedPdfBytes], { type: "application/pdf" });
  } 
