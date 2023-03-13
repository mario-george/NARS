import jsPDF from "jspdf";

const convertPNGToPDF = (pngBlob) => {
  const downloadFile = () => {
    // const fileData = localStorage.getItem("pdf2");
    // const binaryData = atob(fileData);
    // const array = new Uint8Array(binaryData.length);
    // for (let i = 0; i < binaryData.length; i++) {
    //   array[i] = binaryData.charCodeAt(i);
    // }
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
    const pdfBase64 = localStorage.getItem("pdf4");

    // Decode the Base64 string to binary data
    const binaryData = atob(pdfBase64);

    // Create a Uint8Array from the binary data
    const array = new Uint8Array(binaryData.length);
    for (let i = 0; i < binaryData.length; i++) {
      array[i] = binaryData.charCodeAt(i);
    }

    // Create a Blob object from the Uint8Array
    // blob = new Blob([array], { type: "application/pdf" });
    // const blob = new Blob([array], { type: "application/pdf" });
    const blob = new Blob([array], { type: "image/png" });
    convertPNGToPDF(blob)
      .then((pdfBlob) => {
        // Do something with the PDF Blob object
        const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "myFile.pdf";
    link.click();
      })
      .catch((error) => {
        console.error(error);
      });
    // const url = URL.createObjectURL(blob);
    // const link = document.createElement("a");
    // link.href = url;
    // link.download = "myFile.pdf";
    // link.click();
  };

  return <button onClick={downloadFile}>Download PDF</button>;
  // Load the PNG image as a data URL
  const reader = new FileReader();
  reader.readAsDataURL(pngBlob);
  return new Promise((resolve, reject) => {
    reader.onload = () => {
      const imageData = reader.result;
      // Create a new PDF document
      const doc = new jsPDF();
      // Add the PNG image as a page
      doc.addImage(imageData, "PNG", 0, 0, 210, 297); // assuming A4 page size
      // Save the PDF document as a Blob object
      const pdfBlob = doc.output("blob");
      resolve(pdfBlob);
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
};

// Example usage:
export default convertPNGToPDF