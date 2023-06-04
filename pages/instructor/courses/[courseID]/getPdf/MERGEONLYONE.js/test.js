import jsPDF from "jspdf";
import "jspdf-autotable";

export default async function mergePDFs(blobs) {
  try {
    const pdf = new jsPDF("p", "pt", "a4");
    let yOffset = 0;

    for (let i = 0; i < blobs.length; i++) {
      const blob = blobs[i];
      const img = await new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = URL.createObjectURL(blob);
      });

      const widthScaleFactor = pdf.internal.pageSize.getWidth() / img.width;
      const heightScaleFactor = pdf.internal.pageSize.getHeight() / img.height;
      const scaleFactor = Math.min(widthScaleFactor, heightScaleFactor);

      if (yOffset + img.height * scaleFactor > pdf.internal.pageSize.getHeight()) {
        pdf.addPage();
        yOffset = 0;
      }

      pdf.addImage(
        img,
        "PNG",
        10,
        yOffset + 10,
        (img.width * widthScaleFactor * 19) / 20,
        (img.height * scaleFactor * 19) / 20
      );

      yOffset += 10 + (img.height * scaleFactor * 19) / 20;
    }

    const mergedPdfBytes = pdf.output("blob");
    return new Blob([mergedPdfBytes], { type: "application/pdf" });
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while merging the PDF files.");
  }
}
