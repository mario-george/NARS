// import jsPDF from "jspdf";
// import "jspdf-autotable";

// export default async function mergePDFs(blobs) {
//   try {
//     const pdf = new jsPDF("p", "pt", "a4");
//     let yOffset = 0;

//     for (let i = 0; i < blobs.length; i++) {
//       const blob = blobs[i];
//       const img = await new Promise((resolve) => {
//         const img = new Image();
//         img.onload = () => resolve(img);
//         img.src = URL.createObjectURL(blob);
//       });

//       // Calculate scale factor
//       const widthScaleFactor = pdf.internal.pageSize.getWidth() / img.width;
//       const heightScaleFactor = pdf.internal.pageSize.getHeight() / img.height;
//       const scaleFactor = Math.min(widthScaleFactor, heightScaleFactor);

//       // Adjust page height if needed
//       if (yOffset + img.height * scaleFactor > pdf.internal.pageSize.getHeight()) {
//         pdf.internal.pageSize.setHeight(yOffset + img.height * scaleFactor);
//       }

//       // Add image
//       pdf.addImage(img, "PNG", 0, yOffset, img.width * scaleFactor, img.height * scaleFactor);
//       yOffset += img.height * scaleFactor;
//     }

//     // Save PDF
//     const mergedPdfBytes = pdf.output("blob");
//     console.log(mergedPdfBytes);
//     return new Blob([mergedPdfBytes], { type: "application/pdf" });
//   } catch (error) {
//     console.error(error);
//     throw new Error("An error occurred while merging the PDF files.");
//   }
// }

// import jsPDF from "jspdf";
// import "jspdf-autotable";

// export default async function mergePDFs(blobs) {
//   try {
//     const pdf = new jsPDF("p", "pt", "a4");
//     let yOffset = 0;

//     for (let i = 0; i < blobs.length; i++) {
//       const blob = blobs[i];
//       const img = await new Promise((resolve) => {
//         const img = new Image();
//         img.onload = () => resolve(img);
//         img.onerror = (e) => reject(e);
//         img.src = URL.createObjectURL(blob);
//       });

//       // Calculate scale factor
//       const widthScaleFactor = pdf.internal.pageSize.getWidth() / img.width;
//       const heightScaleFactor = pdf.internal.pageSize.getHeight() / img.height;
//       const scaleFactor = Math.min(widthScaleFactor, heightScaleFactor);

//       // Add image
//       const x = 0;
//       const y = yOffset;
//       const width = img.width * scaleFactor;
//       const height = img.height * scaleFactor;

//       if (y + height > pdf.internal.pageSize.getHeight()) {
//         // Image does not fit on current page, create a new page
//         pdf.addPage();
//         yOffset = 0;

//       }

//       pdf.addImage(img, "PNG", x, y, width, height);
//       yOffset += height;
//     }

//     // Save PDF
//     const mergedPdfBytes = pdf.output("blob");
//     console.log(mergedPdfBytes);
//     return new Blob([mergedPdfBytes], { type: "application/pdf" });
//   } catch (error) {
//     console.error(error);
//     throw new Error("An error occurred while merging the PDF files.");
//   }
// }
import jsPDF from "jspdf";
import "jspdf-autotable";

export default async function mergePDFs(blobs) {
  try {
    const pdf = new jsPDF("p", "pt", "a4");
    let yOffset = 0;

    for (let i = 0; i < blobs.length; i++) {
      const blob = blobs[i];
      const blob2 = blobs[i + 1];
      const img = await new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = URL.createObjectURL(blob);
      });
      const img2 = await new Promise((resolve) => {
        const img2 = new Image();
        img2.onload = () => resolve(img2);
        img2.src = URL.createObjectURL(blob2);
      });
      if (yOffset > pdf.internal.pageSize.getHeight() / 2) {
        pdf.setFillColor(240, 249, 255); // sky blue
        pdf.rect(
          0,
          yOffset,
          pdf.internal.pageSize.getWidth(),
          pdf.internal.pageSize.getHeight() - yOffset,
          "F"
        );
        pdf.addPage();
        yOffset = 0;
      }
      // Calculate scale factor
      const widthScaleFactor = pdf.internal.pageSize.getWidth() / img.width;
      const heightScaleFactor = pdf.internal.pageSize.getHeight() / img.height;
      const scaleFactor = Math.min(widthScaleFactor, heightScaleFactor);

      // Add image
      pdf.addImage(
        img,
        "PNG",
        0,
        yOffset,
        img.width * scaleFactor,
        img.height * scaleFactor
      );
      yOffset += img.height * scaleFactor;

      if (
        pdf.internal.pageSize.getHeight() >=
        yOffset <=
        pdf.internal.pageSize.getHeight() / 2
      ) {
        const widthScaleFactor2 = pdf.internal.pageSize.getWidth() / img2.width;
        const heightScaleFactor2 =
          pdf.internal.pageSize.getHeight() / img2.height;
        const scaleFactor2 = Math.min(widthScaleFactor2, heightScaleFactor2);

        // Add image
        if (i + 2 === blobs.length) {
          // pdf.setFillColor(240, 249, 255); // sky blue
          // pdf.rect(
          //   0,
          //   yOffset,
          //   pdf.internal.pageSize.getWidth(),
          //   pdf.internal.pageSize.getHeight() - yOffset,
          //   "F"
          // );
          console.log('lol')
          pdf.addImage(
            img2,
            "PNG",
            0,
            yOffset,
            pdf.internal.pageSize.getWidth(),
            pdf.internal.pageSize.getHeight() - yOffset
          );
          yOffset += img2.height * scaleFactor2;
          i++;
          break;
        }
        pdf.addImage(
          img2,
          "PNG",
          0,
          yOffset,
          img2.width * scaleFactor2,
          img2.height * scaleFactor2
        );
        yOffset += img2.height * scaleFactor;

        pdf.setFillColor(240, 249, 255); // sky blue
        pdf.rect(
          0,
          yOffset,
          pdf.internal.pageSize.getWidth(),
          pdf.internal.pageSize.getHeight() - yOffset,
          "F"
        );
      } else {
        pdf.setFillColor(240, 249, 255); // sky blue
        pdf.rect(
          0,
          yOffset,
          pdf.internal.pageSize.getWidth(),
          pdf.internal.pageSize.getHeight() - yOffset,
          "F"
        );

        pdf.addPage();
        yOffset = 0;
        const widthScaleFactor2 = pdf.internal.pageSize.getWidth() / img2.width;
        const heightScaleFactor2 =
          pdf.internal.pageSize.getHeight() / img2.height;
        const scaleFactor2 = Math.min(widthScaleFactor2, heightScaleFactor2);

        // Add image
        if (i + 2 === blobs.length) {
          // pdf.setFillColor(240, 249, 255); // sky blue
          // pdf.rect(
          //   0,
          //   yOffset,
          //   pdf.internal.pageSize.getWidth(),
          //   pdf.internal.pageSize.getHeight() - yOffset,
          //   "F"
          // );
          console.log('lol')
          pdf.addImage(
            img2,
            "PNG",
            0,
            yOffset,
            pdf.internal.pageSize.getWidth(),
            pdf.internal.pageSize.getHeight() - yOffset
          );
          yOffset += img2.height * scaleFactor2;
          i++;
          break;
        }
        pdf.addImage(
          img2,
          "PNG",
          0,
          yOffset,
          img2.width * scaleFactor2,
          img2.height * scaleFactor2
        );
        yOffset += img2.height * scaleFactor2;
        i++;
        // if( i+1 ===blobs.length){
        //   pdf.setFillColor(240, 249, 255); // sky blue
        //   pdf.rect(
        //     0,
        //     yOffset,
        //     pdf.internal.pageSize.getWidth(),
        //     pdf.internal.pageSize.getHeight() - yOffset,
        //     "F"
        //   );
        // }
        continue;
      }
      // Image does not fit on current page, create a new page

      // Check if the image fits on the current page
      // if (yOffset < pdf.internal.pageSize.getHeight()) {
      //   // Add sky-colored background to the remaining space
      //   pdf.setFillColor(135, 206, 235); // sky blue
      //   pdf.rect(
      //     0,
      //     yOffset,
      //     pdf.internal.pageSize.getWidth(),
      //     pdf.internal.pageSize.getHeight() - yOffset,
      //     "F"
      //   );
      //   yOffset = 0;
      // }
      if (i + 2 == blobs.length || i + 1 === blobs.length) {
        pdf.setFillColor(240, 249, 255); // sky blue
        pdf.rect(
          0,
          yOffset,
          pdf.internal.pageSize.getWidth(),
          pdf.internal.pageSize.getHeight() - yOffset,
          "F"
        );
      }
      i++;
      if (i + 1 === blobs.length) {
        break;
      }
      pdf.addPage();
      yOffset = 0;
    }

    // Save PDF
    const mergedPdfBytes = pdf.output("blob");
    console.log(mergedPdfBytes);
    return new Blob([mergedPdfBytes], { type: "application/pdf" });
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while merging the PDF files.");
  }
}
