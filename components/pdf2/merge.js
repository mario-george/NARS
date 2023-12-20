import { PDFDocument, PDFImage } from "pdf-lib";
console.log(PDFDocument);
console.log(PDFImage);
export default async function mergePDFs(blob1, blob2) {
  try {
    const img1 = await new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = URL.createObjectURL(blob1);
    });
    document.body.appendChild(img1);

    const img2 = await new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = URL.createObjectURL(blob2);
    });
    document.body.appendChild(img2);

    const pdfDoc = await PDFDocument.create();

    const [page] = await pdfDoc.getPages();
    const pngImage1 = await pdfDoc.embedPng(img1.src);
    const pngImage2 = await pdfDoc.embedPng(img2.src);

    page.drawImage(pngImage1, {
      x: 0,
      y: page.getHeight() / 2,
      width: page.getWidth() / 2,
      height: page.getHeight() / 2,
    });
    page.drawImage(pngImage2, {
      x: page.getWidth() / 2,
      y: page.getHeight() / 2,
      width: page.getWidth() / 2,
      height: page.getHeight() / 2,
    });

    const mergedPdfBytes = await pdfDoc.save();
    console.log(mergedPdfBytes);
    return new Blob([mergedPdfBytes], { type: "application/pdf" });
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while merging the PDF files.");
  }
}
