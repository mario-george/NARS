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
      const maxFactor = Math.max(widthScaleFactor, heightScaleFactor);

      if (
        yOffset + img.height * scaleFactor >
        pdf.internal.pageSize.getHeight()
      ) {
        pdf.setFillColor(240, 249, 255); // sky blue
        pdf.rect(
          0,
          yOffset,
          pdf.internal.pageSize.getWidth(),
          pdf.internal.pageSize.getHeight() - yOffset,
          "F"
        );
        yOffset = 0;
      }
      if (i < blobs.length - 1) {
        const blob2 = blobs[i + 1];
        const img2 = await new Promise((resolve) => {
          const img2 = new Image();
          img2.onload = () => resolve(img2);
          img2.src = URL.createObjectURL(blob2);
        });
        const widthScaleFactor2 = pdf.internal.pageSize.getWidth() / img2.width;
        const heightScaleFactor2 =
          pdf.internal.pageSize.getHeight() / img2.height;
        const scaleFactor2 = Math.min(widthScaleFactor2, heightScaleFactor2);
        if (
          yOffset + img2.height * scaleFactor2 <=
          pdf.internal.pageSize.getHeight() / 2
        ) {
          // will be concatentate
          pdf.addImage(
            img,
            "PNG",
            10,
            yOffset + 10,
            (img.width * widthScaleFactor * 19) / 20,
            (img.height * heightScaleFactor * 19) / 20
          );
          yOffset += 10 + (img.height * heightScaleFactor * 19) / 20;
        } else {
          pdf.addImage(
            img,
            "PNG",
            10,
            yOffset + 10,
            (img.width * widthScaleFactor * 19) / 20,
            (img.height * heightScaleFactor * 19) / 20
          );
          yOffset += 10 + (img.height * heightScaleFactor * 19) / 20;
        }
      }else{
        // last
        pdf.addImage(
          img,
          "PNG",
          10,
          yOffset + 10,
          (img.width * widthScaleFactor * 19) / 20,
          (img.height * heightScaleFactor * 19) / 20
        );
        yOffset += 10 + (img.height * heightScaleFactor * 19) / 20;

      }

      if (i < blobs.length - 1) {
        const blob2 = blobs[i + 1];
        const img2 = await new Promise((resolve) => {
          const img2 = new Image();
          img2.onload = () => resolve(img2);
          img2.src = URL.createObjectURL(blob2);
        });

        const widthScaleFactor2 = pdf.internal.pageSize.getWidth() / img2.width;
        const heightScaleFactor2 =
          pdf.internal.pageSize.getHeight() / img2.height;
        const scaleFactor2 = Math.min(widthScaleFactor2, heightScaleFactor2);

        if (
          yOffset + img2.height * scaleFactor2 <=
          pdf.internal.pageSize.getHeight() / 2
        ) {
          pdf.addImage(
            img2,
            "PNG",
            0,
            yOffset,
            (img2.width * widthScaleFactor2 * 19) / 20,
            (img2.height * heightScaleFactor2 * 19) / 20
          );
          yOffset += 10 + (img2.height * heightScaleFactor2 * 19) / 20;
          if ( i < blobs.length - 1) {
            yOffset = 0;
            pdf.addPage();
          }
        } else {
          pdf.setFillColor(240, 249, 255); // sky blue
          pdf.rect(
            0,
            yOffset,
            pdf.internal.pageSize.getWidth(),
            pdf.internal.pageSize.getHeight() - yOffset,
            "F"
          );
          if (i < blobs.length - 2) {
            pdf.addPage();
          }
          yOffset = 0;
        }
      }

    }


    const mergedPdfBytes = pdf.output("blob");
    console.log(mergedPdfBytes);
    return new Blob([mergedPdfBytes], { type: "application/pdf" });
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while merging the PDF files.");
  }
}
