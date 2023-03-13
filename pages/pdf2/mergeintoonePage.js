import { PDFDocument, PDFImage } from "pdf-lib";

export default async function mergePDFs(blob1, blob2) {
  console.log("asdasda");

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
  console.log(img1);

  const pdfDoc = await PDFDocument.create();
  const [page] = await pdfDoc.addPage();

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
  console.log(pngImage2);

  const mergedPdfBytes = await pdfDoc.save();
  const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });
  console.log(blob);
  console.log("asdasda");

  return blob;
}
