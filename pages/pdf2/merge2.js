import jsPDF from "jspdf";
import "jspdf-autotable";

export default async function mergeTestmergePDFs(blob1, blob2) {
  try {
    const img1 = await new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = URL.createObjectURL(blob1);
    });

    const img2 = await new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = URL.createObjectURL(blob2);
    });

    const pdf = new jsPDF("p", "pt", "a4");

    // Add first image
    pdf.addImage(img1, "PNG", 0, 0, pdf.internal.pageSize.getWidth() , pdf.internal.pageSize.getHeight() / 2);
    

    // Add second image
    pdf.addImage(img2, "PNG", 0, pdf.internal.pageSize.getHeight() / 2, pdf.internal.pageSize.getWidth() , pdf.internal.pageSize.getHeight() / 2);

    // Save PDF
    const mergedPdfBytes = pdf.output("blob");
    console.log(mergedPdfBytes);
    return new Blob([mergedPdfBytes], { type: "application/pdf" });
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while merging the PDF files.");
  }
}
